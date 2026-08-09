import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useApp } from '../context/AppContext';
import { ArrowRight, Play, Users, ChevronDown } from 'lucide-react';

export const Hero: React.FC = () => {
  const { t } = useLanguage();
  const { setActiveView } = useApp();

  // 3 Write-ups rotating endlessly in a single place
  const writeups = [
    {
      id: 'writeup-1',
      text: 'GLOBAL MUSIC EDUCATION & ARTIST DEVELOPMENT FOUNDATION',
      colorClass: 'text-[#D4AF37]',
    },
    {
      id: 'writeup-2',
      text: 'Where Music Meets Possibility.',
      colorClass: 'text-white font-medium',
    },
    {
      id: 'writeup-3',
      text: 'Learn. Create. Perform. Build your future in music with free world-class education, global mentorship, and artist development.',
      colorClass: 'text-amber-100/90',
    },
  ];

  const [currentWriteupIndex, setCurrentWriteupIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentWriteupIndex((prev) => (prev + 1) % writeups.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [writeups.length]);

  // 5 Large Cinematic Panels for continuous Right-to-Left marquee
  const heroPanels = [
    {
      id: 1,
      title: 'Global Concert Stage',
      tag: 'Performance Excellence',
      url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1600&q=80',
    },
    {
      id: 2,
      title: 'Studio Vocal Recording',
      tag: 'Vocal Freedom & Control',
      url: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=1600&q=80',
    },
    {
      id: 3,
      title: 'Master Mixing Console',
      tag: 'Sound Engineering & DAW',
      url: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1600&q=80',
    },
    {
      id: 4,
      title: 'Piano & Orchestral Mentorship',
      tag: '1-on-1 Artist Coaching',
      url: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?auto=format&fit=crop&w=1600&q=80',
    },
    {
      id: 5,
      title: 'Global Creative Academy',
      tag: 'Collaborative Music Network',
      url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1600&q=80',
    },
  ];

  // Duplicate panels array to create seamless infinite loop
  const marqueePanels = [...heroPanels, ...heroPanels];

  return (
    <section className="relative w-full min-h-[90vh] flex flex-col justify-between overflow-hidden bg-[#050505] text-[#f5f5f0] pt-6 pb-12">
      
      {/* Background Continuous Rolling Marquee Carousel - Photo Opacity 90% */}
      <div className="absolute inset-0 w-full h-full opacity-90 pointer-events-none overflow-hidden">
        <div className="flex w-[200%] h-full animate-hero-marquee">
          {marqueePanels.map((panel, index) => (
            <div
              key={`${panel.id}-${index}`}
              className="relative w-[20vw] min-w-[340px] md:min-w-[500px] h-full shrink-0 border-r border-white/10"
            >
              <img
                src={panel.url}
                alt={panel.title}
                className="w-full h-full object-cover object-center filter brightness-75 contrast-110 hover:brightness-90 transition-all duration-700"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent" />
              
              <div className="absolute bottom-10 left-6 right-6">
                <span className="text-[9px] uppercase tracking-[0.2em] text-[#D4AF37] mb-1 block font-semibold">
                  {panel.tag}
                </span>
                <h4 className="text-xs font-serif text-white/90 truncate">
                  {panel.title}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dark Vignette Overlay for Text Legibility over 90% photo background */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/90 via-[#050505]/70 to-black/40 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-[#050505] pointer-events-none" />

      {/* Hero Content Overlay */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full my-auto py-12 md:py-20 flex flex-col justify-center">
        
        {/* Single Rotating Write-Ups Container */}
        <div className="min-h-[120px] sm:min-h-[140px] md:min-h-[160px] flex flex-col justify-center">
          <div key={currentWriteupIndex} className="transition-all duration-700 animate-in fade-in slide-in-from-bottom-2">
            {/* Main Rotating Statement - Clean Sans-Serif Typography */}
            <h1
              className={`font-sans font-light text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-relaxed max-w-4xl ${writeups[currentWriteupIndex].colorClass}`}
            >
              {writeups[currentWriteupIndex].text}
            </h1>
          </div>

          {/* Rotating Loop Indicators */}
          <div className="flex items-center gap-2 mt-6">
            {writeups.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => setCurrentWriteupIndex(idx)}
                className={`h-1 rounded-full transition-all duration-500 cursor-pointer ${
                  idx === currentWriteupIndex ? 'w-10 bg-[#D4AF37]' : 'w-2 bg-white/30 hover:bg-white/60'
                }`}
                title={`View writeup ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Action CTAs */}
        <div className="mt-8 flex flex-wrap items-center gap-4">
          
          <button
            onClick={() => setActiveView('courses')}
            className="bg-white text-black px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-3 hover:bg-neutral-200 transition-colors shadow-lg hover:scale-105 transition-transform"
          >
            <span>{t('hero.ctaStart', 'Start Learning Free')}</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </button>

          <button
            onClick={() => setActiveView('academy')}
            className="border border-white/20 bg-white/5 backdrop-blur-md px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest text-white hover:bg-white/10 transition-colors flex items-center gap-2 hover:scale-105 transition-transform"
          >
            <Play className="w-3.5 h-3.5 text-[#D4AF37] fill-[#D4AF37]" />
            <span>{t('hero.ctaAcademy', 'Explore Academy')}</span>
          </button>

          <button
            onClick={() => setActiveView('artists')}
            className="border border-white/10 bg-transparent px-6 py-4 rounded-full text-xs font-bold uppercase tracking-widest text-white/70 hover:text-white hover:border-white/30 transition-colors flex items-center gap-2"
          >
            <Users className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>{t('hero.ctaArtists', 'Meet Artists')}</span>
          </button>
        </div>

        {/* Feature Stats */}
        <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-6 text-white/50 text-[11px] font-medium tracking-wide">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
            <span className="text-white/80 font-semibold">100% Free Music Curriculum</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
            <span className="text-white/80 font-semibold">0 Countries Enrolled</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
            <span className="text-white/80 font-semibold">Private Artist Sessions</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
            <span className="text-white/80 font-semibold">Verified Certificates</span>
          </div>
        </div>

      </div>

      {/* Scroll Indicator */}
      <div className="relative z-10 flex justify-center pt-2 opacity-50 hover:opacity-100 transition-opacity">
        <button
          onClick={() => {
            window.scrollTo({ top: window.innerHeight * 0.85, behavior: 'smooth' });
          }}
          className="flex flex-col items-center gap-2 text-white/50 hover:text-[#D4AF37] transition-colors text-[9px] uppercase tracking-[0.2em] group"
        >
          <span>{t('hero.scroll', 'Scroll to discover')}</span>
          <ChevronDown className="w-3.5 h-3.5 animate-bounce text-[#D4AF37]" />
        </button>
      </div>

      {/* Custom CSS Animation for smooth endless right-to-left rolling */}
      <style>{`
        @keyframes heroMarquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-hero-marquee {
          animation: heroMarquee 38s linear infinite;
        }
        .animate-hero-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

