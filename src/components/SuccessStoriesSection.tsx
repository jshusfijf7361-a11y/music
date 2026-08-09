import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { MOCK_TESTIMONIALS } from '../data/mockData';
import { Quote, Sparkles, Award } from 'lucide-react';

export const SuccessStoriesSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="py-20 md:py-28 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 border-b border-neutral-200/60 dark:border-neutral-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs font-mono font-bold tracking-widest uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>STUDENT TRANSFORMATIONS</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-neutral-900 dark:text-neutral-50">
            {t('stories.title', 'Student Success Stories')}
          </h2>

          <p className="mt-3 text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
            {t('stories.subtitle', 'Real stories from artists around the world who transformed their careers with the Foundation.')}
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {MOCK_TESTIMONIALS.map((test) => (
            <div
              key={test.id}
              className="relative p-8 rounded-3xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200/80 dark:border-neutral-800 shadow-xl flex flex-col justify-between"
            >
              <Quote className="w-10 h-10 text-amber-500/30 mb-4" />

              <p className="text-sm text-neutral-700 dark:text-neutral-300 italic leading-relaxed mb-6">
                "{test.quote}"
              </p>

              <div className="space-y-4 pt-4 border-t border-neutral-200/60 dark:border-neutral-800/60">
                {/* Transformation highlight */}
                <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs">
                  <div className="font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1.5 mb-1 font-mono">
                    <Award className="w-3.5 h-3.5" />
                    Key Achievement:
                  </div>
                  <div className="text-neutral-800 dark:text-neutral-200 font-medium">
                    {test.afterAchievement}
                  </div>
                </div>

                {/* Author Info */}
                <div className="flex items-center gap-3">
                  <img
                    src={test.avatar}
                    alt={test.name}
                    className="w-11 h-11 rounded-full object-cover border-2 border-amber-500/40"
                  />
                  <div>
                    <div className="text-sm font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-1.5">
                      <span>{test.name}</span>
                      <span className="text-base">{test.countryFlag}</span>
                    </div>
                    <div className="text-xs text-neutral-500 dark:text-neutral-400">
                      {test.role} • {test.country}
                    </div>
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
