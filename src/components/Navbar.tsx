import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { useApp } from '../context/AppContext';
import { ActiveView, LanguageCode, AboutTab } from '../types';
import {
  Globe,
  Sun,
  Moon,
  User,
  Menu,
  X,
  ShieldCheck,
  ChevronDown,
  Check,
  ArrowRight,
  Search,
  Lock
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguageCode, languages, t } = useLanguage();
  const {
    activeView,
    setActiveView,
    navigateToAboutTab,
    setIsDashboardOpen,
    setIsAdminOpen,
    setIsSearchOpen,
    setIsCipherAuthModalOpen,
    isCipherAuthenticated,
  } = useApp();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [isAboutDropdownOpen, setIsAboutDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const langDropdownRef = useRef<HTMLDivElement>(null);
  const aboutDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
        setIsLangDropdownOpen(false);
      }
      if (aboutDropdownRef.current && !aboutDropdownRef.current.contains(event.target as Node)) {
        setIsAboutDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navItems: { view: ActiveView; labelKey: string; defaultLabel: string }[] = [
    { view: 'academy', labelKey: 'nav.academy', defaultLabel: 'Academy' },
    { view: 'courses', labelKey: 'nav.learn', defaultLabel: 'Free Learn' },
    { view: 'artists', labelKey: 'nav.artists', defaultLabel: 'Artists' },
    { view: 'events', labelKey: 'nav.events', defaultLabel: 'Events' },
    { view: 'resources', labelKey: 'nav.resources', defaultLabel: 'Resources' },
    { view: 'about', labelKey: 'nav.about', defaultLabel: 'About' },
  ];

  const aboutSubPages: { key: AboutTab; title: string; subtitle: string }[] = [
    { key: 'foundation', title: 'About Foundation', subtitle: 'Core humanitarian mission' },
    { key: 'vision', title: 'Vision', subtitle: 'Our ultimate aim for humanity' },
    { key: 'mission', title: 'Mission', subtitle: 'Sustainable action & relief' },
    { key: 'founder', title: 'Founders’ Chronicle', subtitle: 'History and values journal' },
    { key: 'board', title: 'Board of Directors', subtitle: 'Sovereign advisory committee' },
    { key: 'structure', title: 'Organizational Structure', subtitle: 'Internal action workflows' },
  ];

  const handleNavClick = (view: ActiveView) => {
    setActiveView(view);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 dark:bg-black/80 backdrop-blur-md shadow-lg py-3 border-b border-neutral-200 dark:border-white/10'
          : 'bg-white/80 dark:bg-black/40 backdrop-blur-md py-4 border-b border-neutral-200 dark:border-white/10'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand Logo */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3.5 group text-left cursor-pointer p-0 border-0 bg-transparent"
        >
          <img
            src="https://i.imgur.com/vUWitAs.png"
            onError={(e) => {
              const target = e.currentTarget;
              if (!target.dataset.tried) {
                target.dataset.tried = 'true';
                target.src = 'https://i.imgur.com/vUWitAs.jpg';
              }
            }}
            alt="The Global Talents Foundation Logo"
            className="h-12 sm:h-14 w-auto object-contain brightness-110 contrast-125 group-hover:scale-105 transition-transform drop-shadow-md"
            referrerPolicy="no-referrer"
          />
          <div className="flex flex-col">
            <span className="font-sans font-black text-2xl sm:text-3xl tracking-tight text-[#D4AF37] leading-tight">
              GTF
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 dark:text-white/60 font-semibold">
              Global Talents Foundation
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8 text-[11px] uppercase tracking-[0.2em] font-medium text-neutral-700 dark:text-white/70">
          {navItems.map((item) => {
            const isActive = activeView === item.view;
            
            if (item.view === 'about') {
              return (
                <div
                  key={item.view}
                  className="relative"
                  ref={aboutDropdownRef}
                  onMouseEnter={() => setIsAboutDropdownOpen(true)}
                  onMouseLeave={() => setIsAboutDropdownOpen(false)}
                >
                  <button
                    onClick={() => {
                      handleNavClick('about');
                      setIsAboutDropdownOpen(!isAboutDropdownOpen);
                    }}
                    className={`inline-flex items-center gap-1.5 transition-all duration-200 cursor-pointer py-1 ${
                      isActive
                        ? 'text-[#D4AF37] font-semibold border-b-2 border-[#D4AF37] pb-0.5'
                        : 'hover:text-black dark:hover:text-white'
                    }`}
                  >
                    <span>{t(item.labelKey, item.defaultLabel)}</span>
                    <ChevronDown className={`w-3 h-3 text-neutral-400 transition-transform duration-200 ${isAboutDropdownOpen ? 'rotate-180 text-amber-500' : ''}`} />
                  </button>

                  {/* About Mega Menu Dropdown */}
                  {isAboutDropdownOpen && (
                    <div className="absolute right-0 md:-right-36 lg:-right-48 mt-2 w-[720px] max-w-[92vw] bg-white/95 dark:bg-neutral-900/95 backdrop-blur-2xl border border-neutral-200 dark:border-neutral-800 rounded-3xl shadow-2xl p-6 sm:p-8 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                      <div className="grid grid-cols-3 gap-y-6 gap-x-8 text-left normal-case tracking-normal">
                        {aboutSubPages.map((page) => (
                          <button
                            key={page.key}
                            onClick={() => {
                              navigateToAboutTab(page.key);
                              setIsAboutDropdownOpen(false);
                            }}
                            className="group/item flex flex-col justify-between p-3.5 -m-2 rounded-2xl hover:bg-neutral-100/80 dark:hover:bg-neutral-800/70 transition-all text-left cursor-pointer"
                          >
                            <div className="flex items-center justify-between w-full">
                              <span className="font-bold text-sm sm:text-base text-neutral-900 dark:text-neutral-100 group-hover/item:text-amber-500 transition-colors">
                                {page.title}
                              </span>
                              <ArrowRight className="w-4 h-4 text-neutral-400 group-hover/item:text-amber-500 group-hover/item:translate-x-1 transition-all shrink-0 ml-2" />
                            </div>
                            <span className="text-xs text-neutral-400 dark:text-neutral-500 mt-1 font-normal line-clamp-1">
                              {page.subtitle}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            }

            return (
              <button
                key={item.view}
                onClick={() => handleNavClick(item.view)}
                className={`transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'text-[#D4AF37] font-semibold border-b-2 border-[#D4AF37] pb-0.5'
                    : 'hover:text-black dark:hover:text-white'
                }`}
              >
                {t(item.labelKey, item.defaultLabel)}
              </button>
            );
          })}
        </nav>

        {/* Desktop Right Actions */}
        <div className="hidden lg:flex items-center gap-3">
          
          {/* Global Language Dropdown */}
          <div className="relative" ref={langDropdownRef}>
            <button
              onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
              className="flex items-center gap-2 px-3.5 py-1.5 border border-neutral-300 dark:border-white/10 rounded-full text-[11px] tracking-widest cursor-pointer bg-neutral-100 dark:bg-white/5 hover:bg-neutral-200 dark:hover:bg-white/10 text-neutral-800 dark:text-white/80 transition-all font-medium"
            >
              <Globe className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>{language.flag}</span>
              <span className="uppercase text-[10px] font-bold">{language.code}</span>
              <ChevronDown className={`w-3 h-3 text-neutral-400 transition-transform ${isLangDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Inline Dropdown Popover */}
            {isLangDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150 max-h-80 overflow-y-auto">
                <div className="px-3 py-1.5 text-[10px] uppercase tracking-widest font-mono text-neutral-400 dark:text-neutral-500 border-b border-neutral-100 dark:border-neutral-800 mb-1">
                  Select Language
                </div>
                {languages.map((lang) => {
                  const isSelected = language.code === lang.code;
                  return (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguageCode(lang.code as LanguageCode);
                        setIsLangDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3.5 py-2 text-xs text-left transition-colors cursor-pointer ${
                        isSelected
                          ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold'
                          : 'text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-base">{lang.flag}</span>
                        <div>
                          <div className="font-medium">{lang.nativeName}</div>
                          <div className="text-[10px] text-neutral-400 uppercase">{lang.name}</div>
                        </div>
                      </div>
                      {isSelected && <Check className="w-3.5 h-3.5 text-amber-500" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Global Search Button */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="w-9 h-9 rounded-full border border-neutral-300 dark:border-white/10 flex items-center justify-center cursor-pointer bg-neutral-100 dark:bg-white/5 hover:bg-neutral-200 dark:hover:bg-white/10 text-neutral-800 dark:text-white/80 transition-colors"
            title="Search Courses, Artists & Cipher Gate"
          >
            <Search className="w-4 h-4 text-amber-500" />
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="w-9 h-9 rounded-full border border-neutral-300 dark:border-white/10 flex items-center justify-center cursor-pointer bg-neutral-100 dark:bg-white/5 hover:bg-neutral-200 dark:hover:bg-white/10 text-neutral-800 dark:text-white/80 transition-colors"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-[#D4AF37]" /> : <Moon className="w-4 h-4 text-neutral-700" />}
          </button>

          {/* User Account */}
          <button
            onClick={() => setIsDashboardOpen(true)}
            className="w-9 h-9 rounded-full border border-neutral-300 dark:border-white/10 flex items-center justify-center cursor-pointer bg-neutral-100 dark:bg-white/5 hover:bg-neutral-200 dark:hover:bg-white/10 text-neutral-800 dark:text-white/80 transition-colors"
            title="User Account & Dashboard"
          >
            <User className="w-4 h-4" />
          </button>

          {/* Cipher Admin Gate */}
          <button
            onClick={() => {
              if (isCipherAuthenticated) {
                setIsAdminOpen(true);
              } else {
                setIsCipherAuthModalOpen(true);
              }
            }}
            className="w-9 h-9 rounded-full border border-amber-500/30 flex items-center justify-center cursor-pointer bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 transition-all shadow-sm"
            title="Cipher Sovereign Admin Gate"
          >
            <Lock className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile Right Controls */}
        <div className="flex lg:hidden items-center gap-2">
          {/* Mobile Language Select Dropdown */}
          <select
            value={language.code}
            onChange={(e) => setLanguageCode(e.target.value as LanguageCode)}
            className="px-2.5 py-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs font-bold text-neutral-800 dark:text-neutral-100"
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.flag} {lang.code.toUpperCase()}
              </option>
            ))}
          </select>

          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-800 dark:text-neutral-100"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>
          
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-neutral-100"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[65px] max-h-[85vh] overflow-y-auto bg-white/95 dark:bg-neutral-950/95 backdrop-blur-2xl border-b border-neutral-200 dark:border-neutral-800 p-6 shadow-2xl animate-in slide-in-from-top-2 z-50">
          <div className="flex flex-col gap-3">
            {navItems.map((item) => {
              if (item.view === 'about') {
                return (
                  <div key={item.view} className="flex flex-col gap-1.5">
                    <button
                      onClick={() => handleNavClick('about')}
                      className={`px-4 py-3 text-left rounded-xl text-sm font-semibold transition-colors flex items-center justify-between ${
                        activeView === 'about'
                          ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                          : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-900'
                      }`}
                    >
                      <span>{t(item.labelKey, item.defaultLabel)}</span>
                      <ChevronDown className="w-4 h-4 text-neutral-400" />
                    </button>
                    <div className="pl-3 pr-2 py-2 space-y-1 bg-neutral-50 dark:bg-neutral-900/60 rounded-xl border border-neutral-200/60 dark:border-neutral-800/60">
                      {aboutSubPages.map((sub) => (
                        <button
                          key={sub.key}
                          onClick={() => {
                            navigateToAboutTab(sub.key);
                            setIsMobileMenuOpen(false);
                          }}
                          className="w-full flex items-center justify-between px-3 py-2 text-xs text-left rounded-lg text-neutral-700 dark:text-neutral-200 hover:text-amber-500 dark:hover:text-amber-400 hover:bg-neutral-100 dark:hover:bg-neutral-800/80 transition-colors cursor-pointer"
                        >
                          <div>
                            <div className="font-bold text-neutral-900 dark:text-neutral-100">{sub.title}</div>
                            <div className="text-[10px] text-neutral-400 dark:text-neutral-500">{sub.subtitle}</div>
                          </div>
                          <ArrowRight className="w-3.5 h-3.5 text-neutral-400" />
                        </button>
                      ))}
                    </div>
                  </div>
                );
              }

              return (
                <button
                  key={item.view}
                  onClick={() => handleNavClick(item.view)}
                  className={`px-4 py-3 text-left rounded-xl text-sm font-semibold transition-colors ${
                    activeView === item.view
                      ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                      : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-900'
                  }`}
                >
                  {t(item.labelKey, item.defaultLabel)}
                </button>
              );
            })}

            <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setIsDashboardOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className="py-3 rounded-xl bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow"
              >
                <User className="w-4 h-4" />
                <span>My Account</span>
              </button>

              <button
                onClick={() => {
                  setIsAdminOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className="text-center py-2 text-xs font-mono text-neutral-500 hover:text-amber-500 flex items-center justify-center gap-1"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Foundation Admin Portal</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
