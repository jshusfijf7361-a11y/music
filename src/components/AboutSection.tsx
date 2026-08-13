import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import { ActiveView } from '../types';
import { ArrowLeft } from 'lucide-react';

interface ArticlePage {
  view: ActiveView;
  title: string;
  heroImage: string;
  paragraphs: string[];
}

const ARTICLE_PAGES: Record<string, ArticlePage> = {
  'about-foundation': {
    view: 'about-foundation',
    title: 'ABOUT FOUNDATION',
    heroImage: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1600&q=80',
    paragraphs: [
      'GLOBAL TALENTS FOUNDATION is a global talent-development foundation committed to discovering, nurturing, educating, developing, and empowering young talents worldwide. Its foundational scope extends across music, arts, dance, entertainment, culture, performance, creative development, and related creative disciplines, establishing accessible opportunities for young minds to realize their potential.',
      'The Foundation operates on a steadfast principle: extraordinary talent can emerge anywhere, and young people deserve opportunities to develop their abilities regardless of their background, origin, or financial circumstances. Circumstances should never determine whether a young person receives access to world-class learning, mentorship, professional training, or creative studio resources.',
      'Through its core educational initiatives, the Foundation provides tuition-free learning programs, structured training curricula, and instructional resources across music theory, vocal technique, instrumental performance, audio engineering, choreography, and creative development. By removing economic barriers, the Foundation ensures that artistic growth remains accessible to all dedicated young creators.',
      'Education at GLOBAL TALENTS FOUNDATION encompasses both technical skill and holistic artistic development. Emerging talents are connected directly with experienced educators, master artists, and industry mentors who provide constructive guidance, practical instruction, and real-world wisdom. This mentorship builds artistic discipline, self-reliance, and confidence.',
      'Whether welcoming beginners taking their first steps, self-taught creators seeking structured instruction, or emerging artists preparing for global platforms, GLOBAL TALENTS FOUNDATION provides an encouraging environment. By equipping young talents with knowledge, mentorship, exposure, and opportunities, the Foundation empowers them to grow, thrive, and contribute meaningfully to the global cultural landscape.'
    ]
  },
  'vision': {
    view: 'vision',
    title: 'VISION',
    heroImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1600&q=80',
    paragraphs: [
      'The vision of GLOBAL TALENTS FOUNDATION is to build a comprehensive global ecosystem where young talent can be discovered, educated, nurtured, developed, mentored, celebrated, and empowered. The Foundation envisions a world where creative potential is recognized and supported wherever it exists, transcending geographic, social, and economic boundaries.',
      'This long-term ambition extends across major world regions—Asia, North America, South America, Europe, Africa, Oceania, and local communities worldwide. The Foundation seeks to create an interconnected global network that bridges cultures, fostering international artistic exchange, cross-border collaboration, and shared learning among young creators.',
      'Through this global ecosystem, young talents from diverse backgrounds will have opportunities to share their unique perspectives, collaborate on creative projects, and learn from world-class mentors. By establishing international masterclasses, virtual residencies, equipment support initiatives, and showcase platforms, the Foundation aims to build a supportive international community for emerging artists.',
      'While advancing toward this long-term global vision, GLOBAL TALENTS FOUNDATION remains dedicated to its immediate purpose—providing accessible education, mentorship, and support to passionate young minds today. This global vision serves as the Foundation\'s guiding light, inspiring every program and initiative created for future generations.'
    ]
  },
  'mission': {
    view: 'mission',
    title: 'MISSION',
    heroImage: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1600&q=80',
    paragraphs: [
      'GLOBAL TALENTS FOUNDATION exists to discover, nurture, educate, and empower young talents by providing accessible opportunities for learning, mentorship, training, creative development, and exposure across music, arts, dance, entertainment, culture, and related creative disciplines.',
      'To fulfill this mission, the Foundation actively seeks out emerging talent across diverse communities, creating open pathways for promising young people to be recognized regardless of their starting point. The Foundation makes quality learning freely accessible through structured courses, instructional masterclasses, and comprehensive educational materials.',
      'A core focus of the mission is developing both creative and technical skills. Training encompasses vocal technique, instrumental mastery, sound design, composition, performance arts, visual arts, and creative entrepreneurship, helping young artists transform raw passion into refined discipline.',
      'Beyond technical instruction, the Foundation prioritizes meaningful mentorship by connecting young creators with experienced professionals and master artists. This guidance helps students navigate artistic challenges, refine their creative voice, and build career confidence.',
      'Furthermore, the Foundation is committed to encouraging authentic artistic expression, fostering cross-cultural exchange, and creating pathways for professional growth. By offering platforms for collaboration and performance, GLOBAL TALENTS FOUNDATION gives young talents the foundation and confidence to flourish.'
    ]
  },
  'founders-chronicle': {
    view: 'founders-chronicle',
    title: "FOUNDERS' CHRONICLE",
    heroImage: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=1600&q=80',
    paragraphs: [
      'GLOBAL TALENTS FOUNDATION was not established by a single individual, but was initiated through the collective vision and dedicated efforts of a founding body known as The Patron Council. The Patron Council consists of a group of credible, reputable, and accomplished figures from the artistic and creative world who came together around a shared belief in the extraordinary potential of young talent.',
      'The idea for the Foundation was inspired by observations made during international concert experiences and artistic gatherings across different parts of the world. Members of the Patron Council witnessed young talents stepping onto stages and participating in musical performances in diverse regions, including experiences connected to performances in North Korea and South America. These moments revealed remarkable natural ability, courage, and creative vitality among young performers across different cultures.',
      'Alongside this immense potential, the Patron Council recognized a critical global challenge: millions of gifted young people lack access to structured education, professional mentorship, studio resources, proper training, and opportunities to develop their gifts. It became clear that while talent is universal, access to educational and creative opportunities is not.',
      'Driven by the conviction that young talents deserve structured support regardless of their circumstances, the Patron Council formally came together in 2023 to formulate the initiative that would become GLOBAL TALENTS FOUNDATION. This marked a pivotal moment in transforming shared artistic experiences into an organized global movement dedicated to discovering, educating, nurturing, developing, and promoting young talent worldwide.',
      'The Patron Council serves as the founding body of GLOBAL TALENTS FOUNDATION. Its members bring decades of artistic leadership, educational dedication, and industry experience to guide the Foundation\'s mission, ensuring that young creators around the world receive the support and mentorship necessary to realize their creative potential.'
    ]
  },
  'organizational-structure': {
    view: 'organizational-structure',
    title: 'ORGANIZATIONAL STRUCTURE',
    heroImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80',
    paragraphs: [
      'GLOBAL TALENTS FOUNDATION operates under a structured institutional framework designed to ensure educational quality, operational integrity, global outreach, and sustainable talent development. The Foundation\'s organizational philosophy connects leadership, governance, education, mentorship, and community engagement into a coordinated effort.',
      'Governance and overarching vision are provided by The Patron Council, serving as the founding body. The Patron Council establishes institutional standards, educational philosophy, and core objectives, ensuring that all Foundation initiatives align with the mission of empowering young creative talent worldwide.',
      'Institutional administration oversees day-to-day operations, technology infrastructure, resource allocation, grant distribution, and organizational compliance. Working closely with administration, the Educational Development division designs curricula, produces masterclasses, and manages learning resources across music, vocal arts, production, visual arts, and performance disciplines.',
      'The Talent Development and Mentorship division coordinates mentor pairings, student support programs, studio equipment access, and artist development pathways. Concurrently, the Creative Programs division organizes masterclass workshops, virtual residencies, collaborative projects, and showcase opportunities for emerging artists.',
      'Completing the organizational structure, the Global Partnerships and Community Outreach team builds collaborative connections with educational institutions, cultural organizations, conservatories, and community partners worldwide. Through this unified structural framework, GLOBAL TALENTS FOUNDATION carries out its institutional mission with clarity, discipline, and purpose.'
    ]
  }
};

export const AboutSection: React.FC = () => {
  const { activeView, setActiveView } = useApp();
  const [isScrolled, setIsScrolled] = useState(false);

  const handleBack = () => {
    setActiveView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentViewKey = (activeView === 'about' || !ARTICLE_PAGES[activeView])
    ? 'about-foundation'
    : activeView;

  const page = ARTICLE_PAGES[currentViewKey];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeView]);

  // Track scroll position to trigger compact title bar at extreme top of viewport
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 180);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <article className="pb-20 bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 transition-colors relative min-h-screen">
      
      {/* 
        COMPACT STICKY TITLE BAR (State B / State C)
        Sticks at top: 0 (EXTREME TOP OF VIEWPORT) when scrolled past header threshold
      */}
      <div
        className={`fixed top-0 left-0 right-0 z-50 h-11 sm:h-12 bg-white/95 dark:bg-neutral-950/95 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800 transition-all duration-300 ease-in-out ${
          isScrolled
            ? 'opacity-100 translate-y-0 shadow-sm pointer-events-auto'
            : 'opacity-0 -translate-y-full pointer-events-none'
        }`}
      >
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
          
          {/* Back Button */}
          <button
            onClick={handleBack}
            className="relative z-10 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-900 hover:bg-neutral-200 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 font-medium text-xs sm:text-sm transition-colors cursor-pointer border border-neutral-200 dark:border-neutral-800 shadow-xs"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-amber-500" />
            <span>Back</span>
          </button>

          {/* Centered Page Title */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none px-16 sm:px-24">
            <span className="text-xs sm:text-sm font-extrabold tracking-widest uppercase text-neutral-900 dark:text-neutral-100 truncate text-center">
              {page.title}
            </span>
          </div>

          {/* Spacer for layout balance */}
          <div className="w-10 pointer-events-none" aria-hidden="true" />
        </div>
      </div>

      {/* 
        LARGE INITIAL HEADER PHOTO BANNER 
        Scrolls up and out of view normally as user reads down the article
      */}
      <div className="relative w-full h-[168px] sm:h-[180px] md:h-[192px] overflow-hidden flex items-center justify-center text-center bg-neutral-950 shadow-sm">
        
        {/* Background Image - 20% bolder visual treatment */}
        <img
          src={page.heroImage}
          alt={page.title}
          className="absolute inset-0 w-full h-full object-cover object-center contrast-[1.12] brightness-[0.88] saturate-[1.12]"
          referrerPolicy="no-referrer"
        />
        
        {/* Subtle Cinematic Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/70 via-neutral-950/40 to-neutral-950/70 backdrop-blur-[0.5px]" />

        {/* Initial Header Back Button */}
        <div className="absolute top-3 sm:top-4 left-4 sm:left-6 lg:left-8 z-20">
          <button
            onClick={handleBack}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-950/75 hover:bg-neutral-950/95 text-white font-medium text-xs sm:text-sm backdrop-blur-md border border-white/20 transition-all cursor-pointer shadow-lg hover:scale-105 active:scale-95"
          >
            <ArrowLeft className="w-4 h-4 text-amber-400" />
            <span>Back</span>
          </button>
        </div>

        {/* Page Title Inside Large Header */}
        <h1 className="relative z-10 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-white tracking-widest uppercase px-4 drop-shadow-lg">
          {page.title}
        </h1>
      </div>

      {/* 
        MAIN ARTICLE CONTENT AREA
        Scrolls unobstructed under the navbar & compact title bar
      */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
        <div className="space-y-6 text-base sm:text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed sm:leading-loose font-sans">
          {page.paragraphs.map((paragraph, index) => (
            <p key={index} className="first-of-type:text-lg sm:first-of-type:text-xl first-of-type:font-medium text-neutral-900 dark:text-neutral-100">
              {paragraph}
            </p>
          ))}
        </div>
      </div>

    </article>
  );
};
