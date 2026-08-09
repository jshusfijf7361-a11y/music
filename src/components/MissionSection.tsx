import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useApp } from '../context/AppContext';
import { ShieldCheck, Globe2, Sparkles, HeartHandshake, ArrowUpRight } from 'lucide-react';

export const MissionSection: React.FC = () => {
  const { t } = useLanguage();
  const { setActiveView, setIsDonateOpen } = useApp();

  return (
    <section className="py-20 md:py-28 bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 border-b border-neutral-200/60 dark:border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column - Editorial Headline */}
          <div className="lg:col-span-7">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs font-mono font-bold tracking-widest uppercase mb-6">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>FOUNDATION MISSION</span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-neutral-900 dark:text-neutral-50">
              {t('mission.title', 'Music Should Be Accessible To Everyone.')}
            </h2>

            <p className="mt-6 text-base sm:text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed">
              {t('mission.desc', 'The Global Talents Foundation exists to remove financial and geographic barriers to world-class music education. We empower creative voices from every corner of the planet through free courses, artist mentorship, and professional career development.')}
            </p>

            {/* Core Values / Pillars */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-sm">
                <Globe2 className="w-6 h-6 text-amber-500 mb-2" />
                <h4 className="text-sm font-bold">100% Free Access</h4>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">Zero tuition fees or hidden paywalls for core courses.</p>
              </div>

              <div className="p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-sm">
                <ShieldCheck className="w-6 h-6 text-amber-500 mb-2" />
                <h4 className="text-sm font-bold">Industry Mentors</h4>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">Learn directly from Grammy winners & legends.</p>
              </div>

              <div className="p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-sm">
                <HeartHandshake className="w-6 h-6 text-amber-500 mb-2" />
                <h4 className="text-sm font-bold">Equipment Grants</h4>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">Funding software & studio gear for talented youth.</p>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-4 items-center">
              <button
                onClick={() => setActiveView('about')}
                className="px-6 py-3.5 rounded-full bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2 hover:opacity-90 transition-opacity"
              >
                <span>Our Story & Philosophy</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* Right Column - Visual Composition */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-neutral-200 dark:border-neutral-800 group">
              <img
                src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80"
                alt="Music Academy Class & Studio"
                className="w-full h-[440px] object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl bg-black/60 backdrop-blur-xl border border-neutral-700/50 text-white">
                <div className="text-xs font-mono text-amber-400 font-bold tracking-widest uppercase">
                  GLOBAL REACH
                </div>
                <div className="text-2xl font-black mt-1">0 Students</div>
                <p className="text-xs text-neutral-300 mt-1">
                  Empowered across global nations with zero-cost music training.
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
