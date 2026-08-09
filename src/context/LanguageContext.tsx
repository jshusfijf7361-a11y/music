import React, { createContext, useContext, useEffect, useState } from 'react';
import { Language, LanguageCode } from '../types';
import { LANGUAGES, TRANSLATIONS } from '../i18n/translations';

interface LanguageContextType {
  language: Language;
  setLanguageCode: (code: LanguageCode) => void;
  t: (key: string, fallback?: string) => string;
  languages: Language[];
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Helper to set cookie
function setCookie(name: string, value: string, days = 30) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${value}; expires=${expires}; path=/`;
  // Also set for subdomains if any
  const hostParts = window.location.hostname.split('.');
  if (hostParts.length > 1) {
    const rootDomain = hostParts.slice(-2).join('.');
    document.cookie = `${name}=${value}; expires=${expires}; path=/; domain=.${rootDomain}`;
  }
}

// Global script loader for Google Translate engine
let googleTranslateScriptPromise: Promise<void> | null = null;

function loadGoogleTranslateScript(): Promise<void> {
  if (googleTranslateScriptPromise) return googleTranslateScriptPromise;

  googleTranslateScriptPromise = new Promise((resolve) => {
    if ((window as any).google?.translate?.TranslateElement) {
      resolve();
      return;
    }

    // Inject hidden container for translate widget
    if (!document.getElementById('google_translate_element')) {
      const container = document.createElement('div');
      container.id = 'google_translate_element';
      container.style.display = 'none';
      document.body.appendChild(container);
    }

    // Inject CSS to hide default Google Translate top banner
    if (!document.getElementById('gt-custom-style')) {
      const style = document.createElement('style');
      style.id = 'gt-custom-style';
      style.innerHTML = `
        .goog-te-banner-frame, 
        .goog-te-balloon-frame,
        .skiptranslate,
        #goog-gt-tt {
          display: none !important;
        }
        body {
          top: 0px !important;
          position: static !important;
        }
        .goog-text-highlight {
          background-color: transparent !important;
          box-shadow: none !important;
        }
      `;
      document.head.appendChild(style);
    }

    (window as any).googleTranslateElementInit = () => {
      new (window as any).google.translate.TranslateElement(
        {
          pageLanguage: 'en',
          autoDisplay: false,
          layout: (window as any).google.translate.TranslateElement.InlineLayout.SIMPLE,
        },
        'google_translate_element'
      );
      resolve();
    };

    const script = document.createElement('script');
    script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    document.body.appendChild(script);
  });

  return googleTranslateScriptPromise;
}

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [langCode, setLangCode] = useState<LanguageCode>(() => {
    const saved = localStorage.getItem('gtf_lang') || localStorage.getItem('aura_lang');
    if (saved && LANGUAGES.some((l) => l.code === saved)) {
      return saved;
    }
    const navLang = navigator.language.split('-')[0];
    if (LANGUAGES.some((l) => l.code === navLang)) {
      return navLang;
    }
    return 'en';
  });

  const currentLang = LANGUAGES.find((l) => l.code === langCode) || LANGUAGES[0];
  const isRTL = !!currentLang.rtl;

  useEffect(() => {
    localStorage.setItem('gtf_lang', langCode);
    document.documentElement.lang = langCode;
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';

    // Map language code for Google Translate if needed (e.g., 'zh' -> 'zh-CN')
    let gtCode = langCode;
    if (gtCode === 'zh') gtCode = 'zh-CN';

    if (langCode === 'en') {
      // Clear cookie for English
      setCookie('googtrans', '/en/en');
      // If combo exists, reset it
      const selectEl = document.querySelector('.goog-te-combo') as HTMLSelectElement | null;
      if (selectEl) {
        selectEl.value = 'en';
        selectEl.dispatchEvent(new Event('change'));
      }
    } else {
      // Set translation cookie
      setCookie('googtrans', `/en/${gtCode}`);

      // Ensure script loaded and trigger translation dropdown update
      loadGoogleTranslateScript().then(() => {
        setTimeout(() => {
          const selectEl = document.querySelector('.goog-te-combo') as HTMLSelectElement | null;
          if (selectEl) {
            selectEl.value = gtCode;
            selectEl.dispatchEvent(new Event('change'));
          }
        }, 300);
      });
    }
  }, [langCode, isRTL]);

  const setLanguageCode = (code: LanguageCode) => {
    if (LANGUAGES.some((l) => l.code === code)) {
      setLangCode(code);
    }
  };

  const t = (key: string, fallback?: string): string => {
    const dict = TRANSLATIONS[langCode] || TRANSLATIONS['en'];
    if (dict && dict[key]) return dict[key];
    if (TRANSLATIONS['en'] && TRANSLATIONS['en'][key]) return TRANSLATIONS['en'][key];
    return fallback || key;
  };

  return (
    <LanguageContext.Provider value={{ language: currentLang, setLanguageCode, t, languages: LANGUAGES, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
