import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useApp } from '../context/AppContext';
import { X, Globe, Check, Search } from 'lucide-react';

interface LanguageModalProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const LanguageModal: React.FC<LanguageModalProps> = ({ isOpen: propsIsOpen, onClose: propsOnClose }) => {
  const { language, setLanguageCode, languages } = useLanguage();
  const { isLanguageModalOpen, setIsLanguageModalOpen } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('All');

  const isOpen = propsIsOpen !== undefined ? propsIsOpen : isLanguageModalOpen;
  const handleClose = propsOnClose || (() => setIsLanguageModalOpen(false));

  if (!isOpen) return null;

  const regions = ['All', 'Americas', 'Europe', 'Asia & Pacific', 'Middle East & Africa'];

  const filteredLanguages = languages.filter((lang) => {
    const matchesSearch =
      lang.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lang.nativeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lang.code.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRegion = selectedRegion === 'All' || lang.region === selectedRegion;
    return matchesSearch && matchesRegion;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-2xl overflow-hidden p-6 md:p-8 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-500 dark:text-amber-400">
              <Globe className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
                Select Global Language ({languages.length} Languages)
              </h2>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Translates all pages, navigation, headers, and content across the entire foundation.
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-2 rounded-xl text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Region Filters */}
        <div className="py-4 space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search language name or native script..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50 text-neutral-900 dark:text-neutral-100"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {regions.map((reg) => (
              <button
                key={reg}
                onClick={() => setSelectedRegion(reg)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedRegion === reg
                    ? 'bg-amber-500 text-neutral-950 shadow-sm'
                    : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                }`}
              >
                {reg}
              </button>
            ))}
          </div>
        </div>

        {/* Grid of Languages */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 my-2 overflow-y-auto pr-1 flex-1 min-h-[300px]">
          {filteredLanguages.length > 0 ? (
            filteredLanguages.map((lang) => {
              const isSelected = lang.code === language.code;
              return (
                <button
                  key={lang.code}
                  onClick={() => {
                    setLanguageCode(lang.code);
                    handleClose();
                  }}
                  className={`flex items-center justify-between p-3 rounded-xl border text-left transition-all ${
                    isSelected
                      ? 'border-amber-500 bg-amber-500/10 text-neutral-900 dark:text-neutral-100 font-semibold shadow-sm'
                      : 'border-neutral-200 dark:border-neutral-800 hover:border-amber-500/50 bg-neutral-50/50 dark:bg-neutral-900/50 text-neutral-700 dark:text-neutral-300'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="text-2xl leading-none shrink-0">{lang.flag}</span>
                    <div className="min-w-0">
                      <div className="text-xs font-bold truncate">{lang.nativeName}</div>
                      <div className="text-[10px] text-neutral-400 truncate">{lang.name}</div>
                    </div>
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-amber-500 shrink-0 ml-1" />}
                </button>
              );
            })
          ) : (
            <div className="col-span-full py-12 text-center text-sm text-neutral-400">
              No languages found matching "{searchQuery}"
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="text-xs text-center text-neutral-400 border-t border-neutral-200 dark:border-neutral-800 pt-3 mt-2 shrink-0">
          Preference saved. Real-time global translation engine active across all pages & content.
        </div>
      </div>
    </div>
  );
};
