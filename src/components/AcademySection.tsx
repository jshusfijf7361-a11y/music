import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useApp } from '../context/AppContext';
import { MOCK_CATEGORIES } from '../data/mockData';
import { ArrowRight, BookOpen, Layers, Sparkles } from 'lucide-react';

export const AcademySection: React.FC = () => {
  const { t } = useLanguage();
  const { setActiveView } = useApp();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCategories = MOCK_CATEGORIES.filter(
    (cat) =>
      cat.defaultName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cat.defaultDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cat.featuredTopic.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="py-16 md:py-24 bg-[#0a0a0a] text-[#f5f5f0] border-t border-white/5 transition-colors">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/10">
          <div>
            <h2 className="text-[10px] uppercase tracking-[0.4em] text-white/40 mb-1 font-semibold">
              Music Academy
            </h2>
            <h3 className="text-3xl sm:text-4xl font-serif font-light text-[#f5f5f0]">
              {t('academy.title', 'Browse Expert Disciplines')}
            </h3>
            <p className="mt-2 text-xs text-white/50 max-w-2xl leading-relaxed">
              {t('academy.subtitle', 'Master every discipline of music from foundational theory to high-level production, performance, and music business.')}
            </p>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search 16 Disciplines..."
              className="px-4 py-2 rounded-full text-xs bg-neutral-900 border border-white/10 text-white focus:outline-none focus:border-[#D4AF37] w-52"
            />
            <button
              onClick={() => setActiveView('courses')}
              className="text-[10px] uppercase tracking-widest text-[#D4AF37] border-b border-[#D4AF37]/30 pb-1 hover:border-[#D4AF37] transition-colors cursor-pointer flex items-center gap-2"
            >
              <span>{t('academy.viewAll', 'View All 16 Departments')}</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          {filteredCategories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => setActiveView('courses')}
              className="group relative rounded-xl bg-neutral-900 border border-white/5 overflow-hidden cursor-pointer transition-all hover:border-[#D4AF37]/40 flex flex-col justify-between"
            >
              
              {/* Image & Overlay */}
              <div className="relative h-40 w-full overflow-hidden bg-neutral-950">
                <img
                  src={cat.image}
                  alt={cat.defaultName}
                  className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/40 to-transparent" />
                
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[#D4AF37] text-[9px] uppercase tracking-[0.2em] font-semibold flex items-center gap-1">
                  <BookOpen className="w-3 h-3 text-[#D4AF37]" />
                  <span>{cat.courseCount} Courses</span>
                </div>
              </div>

              {/* Content Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[9px] uppercase tracking-[0.2em] text-[#D4AF37] mb-2 block font-semibold">
                    Department discipline
                  </span>
                  <h4 className="text-lg font-serif mb-2 text-[#f5f5f0] group-hover:text-[#D4AF37] transition-colors">
                    {cat.defaultName}
                  </h4>
                  <p className="text-xs text-white/50 leading-relaxed line-clamp-2">
                    {cat.defaultDescription}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-white/30 uppercase truncate max-w-[150px]">
                    ★ {cat.featuredTopic}
                  </span>
                  <div className="w-7 h-7 rounded-full border border-white/10 flex items-center justify-center text-xs opacity-60 group-hover:opacity-100 group-hover:border-[#D4AF37]/60 group-hover:text-[#D4AF37] transition-all">
                    →
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
