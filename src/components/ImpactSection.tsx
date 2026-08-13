import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Globe, Users, BookOpen, Award, Heart } from 'lucide-react';

export const ImpactSection: React.FC = () => {
  const { t } = useLanguage();

  const stats = [
    {
      id: 1,
      number: '0',
      labelKey: 'impact.stat1',
      defaultLabel: 'Students Enrolled',
      icon: Users,
    },
    {
      id: 2,
      number: '0',
      labelKey: 'impact.stat2',
      defaultLabel: 'Countries Reached',
      icon: Globe,
    },
    {
      id: 3,
      number: '0',
      labelKey: 'impact.stat3',
      defaultLabel: 'Free Lessons Delivered',
      icon: BookOpen,
    },
    {
      id: 4,
      number: '0',
      labelKey: 'impact.stat4',
      defaultLabel: 'Global Mentors',
      icon: Award,
    },
    {
      id: 5,
      number: '€0',
      labelKey: 'impact.stat5',
      defaultLabel: 'Education Grants Awarded',
      icon: Heart,
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-neutral-950 text-white border-b border-neutral-900 relative overflow-hidden">
      
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-amber-500/10 blur-[120px] pointer-events-none rounded-full" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            {t('impact.title', 'Our Global Impact')}
          </h2>
          <p className="mt-3 text-base text-neutral-400 leading-relaxed">
            {t('impact.subtitle', 'Transforming creative lives across borders through zero-cost music education and empowerment.')}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.id}
                className="p-6 rounded-3xl bg-neutral-900/80 border border-neutral-800 backdrop-blur-xl text-center space-y-3 hover:border-amber-500/50 transition-colors"
              >
                <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center mx-auto">
                  <Icon className="w-5 h-5" />
                </div>

                <div className="text-2xl sm:text-3xl font-black text-amber-400 font-mono tracking-tight">
                  {stat.number}
                </div>

                <div className="text-xs font-medium text-neutral-300">
                  {t(stat.labelKey, stat.defaultLabel)}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
