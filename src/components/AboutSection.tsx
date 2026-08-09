import React, { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useApp } from '../context/AppContext';
import { AboutTab, ActiveView } from '../types';
import {
  Globe,
  Award,
  ShieldCheck,
  Sparkles,
  Users,
  Eye,
  HeartHandshake,
  BookOpen,
  Building2,
  Workflow,
  ArrowRight,
  CheckCircle2,
  Calendar,
  GraduationCap,
  Cpu,
  Radio,
  Camera
} from 'lucide-react';

interface PageMeta {
  key: AboutTab;
  view: ActiveView;
  title: string;
  badge: string;
  subtitle: string;
  headerImage: string;
  headerCaption: string;
  icon: React.ElementType;
}

export const AboutSection: React.FC = () => {
  const { t } = useLanguage();
  const { aboutTab, setAboutTab, activeView, setActiveView, setIsPartnerModalOpen } = useApp();

  // Keep aboutTab and activeView in sync if activeView changes externally
  useEffect(() => {
    if (activeView === 'about-foundation' && aboutTab !== 'foundation') setAboutTab('foundation');
    else if (activeView === 'vision' && aboutTab !== 'vision') setAboutTab('vision');
    else if (activeView === 'mission' && aboutTab !== 'mission') setAboutTab('mission');
    else if (activeView === 'founders-chronicle' && aboutTab !== 'founder') setAboutTab('founder');
    else if (activeView === 'board-of-directors' && aboutTab !== 'board') setAboutTab('board');
  }, [activeView, aboutTab, setAboutTab]);

  const pages: PageMeta[] = [
    {
      key: 'foundation',
      view: 'about-foundation',
      title: 'About Foundation',
      badge: 'THE GLOBAL TALENTS FOUNDATION',
      subtitle: 'Democratizing World-Class Music Education & Humanitarian Relief Worldwide',
      headerImage: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1600&q=80',
      headerCaption: '📷 Header Photo: Symphonic Conservatory Hall representing Global Foundation Unity',
      icon: Sparkles,
    },
    {
      key: 'vision',
      view: 'vision',
      title: 'Vision',
      badge: 'OUR ULTIMATE AIM FOR HUMANITY',
      subtitle: 'A Future Where Every Creative Voice Has Sovereign Access & Universal Platform',
      headerImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1600&q=80',
      headerCaption: '📷 Header Photo: Luminous Stage Beams illuminating our ultimate vision for creative freedom',
      icon: Eye,
    },
    {
      key: 'mission',
      view: 'mission',
      title: 'Mission',
      badge: 'SUSTAINABLE ACTION & RELIEF',
      subtitle: 'Actionable Programs Providing Direct Equipment Relief & Tuition-Free Academy Learning',
      headerImage: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1600&q=80',
      headerCaption: '📷 Header Photo: Studio Production Console & Recording Equipment illustrating active mission relief',
      icon: HeartHandshake,
    },
    {
      key: 'founder',
      view: 'founders-chronicle',
      title: 'Founders’ Chronicle',
      badge: 'HISTORY & VALUES JOURNAL',
      subtitle: 'The Historical Record & Journalistic Legacy of Our Foundation Genesis',
      headerImage: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=1600&q=80',
      headerCaption: '📷 Header Photo: Grand Piano & Vintage Composition Scores symbolizing the Founders Chronicle history',
      icon: BookOpen,
    },
    {
      key: 'board',
      view: 'board-of-directors',
      title: 'Board of Directors',
      badge: 'SOVEREIGN ADVISORY COMMITTEE',
      subtitle: 'Distinguished Conservatory Deans, Grammy Producers, & Governance Leaders',
      headerImage: 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=1600&q=80',
      headerCaption: '📷 Header Photo: Executive Conservatory Hall & Summit Stage representing Board Governance',
      icon: Users,
    },
    {
      key: 'structure',
      view: 'about',
      title: 'Organizational Structure',
      badge: 'INTERNAL ACTION WORKFLOWS',
      subtitle: 'How Foundation Endowments & Operational Divisions Convert Direct Relief into Global Impact',
      headerImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80',
      headerCaption: '📷 Header Photo: Collaborative Workshop Hub depicting internal organizational divisions',
      icon: Workflow,
    },
  ];

  const currentPage = pages.find((p) => p.key === aboutTab) || pages[0];

  const handleTabChange = (page: PageMeta) => {
    setAboutTab(page.key);
    setActiveView(page.view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const boardMembers = [
    {
      name: 'Dr. Marcus Vance',
      role: 'Executive Director & Head of Composition',
      bio: 'Former conservatory dean with 25 years in international music education policy & acoustic composition.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
      duties: 'Strategic Leadership, Conservatory Policy, Curricular Standards',
    },
    {
      name: 'Amina Diallo',
      role: 'Global Curriculum Chair',
      bio: 'Grammy-nominated producer advocating for accessible production technology and studio equity.',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      duties: 'Production Pedagogy, Masterclass Onboarding, DAW Stem Archives',
    },
    {
      name: 'Mateo Silva',
      role: 'Director of Audio Technology',
      bio: 'Pioneer in low-latency remote audio collaboration, DSP algorithms, and acoustic research.',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
      duties: 'Infrastructure Logistics, Equipment Grants, Digital Platform Architecture',
    },
    {
      name: 'Elena Rostova',
      role: 'Head of Vocal Arts',
      bio: 'International opera soloist & vocal physiology researcher specializing in vocal health & resonance.',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
      duties: 'Vocal Masterclasses, Global Vocal Residencies, Choir Outreach',
    },
    {
      name: 'Hiroshi Tanaka',
      role: 'Chief Technology Officer',
      bio: 'Architect of scalable streaming backends and interactive web audio engines for global learning.',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80',
      duties: 'AI Music Mentor Systems, Virtual Stage Streaming, Data Privacy',
    },
    {
      name: 'Sophia Al-Mansoor',
      role: 'Global Philanthropy & Governance Officer',
      bio: 'Over 20 years managing international humanitarian funds and cultural endowment programs.',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80',
      duties: 'Fiscal Auditing, 501(c)(3) Transparency, Endowments & Grants',
    },
  ];

  const chronicleEntries = [
    {
      year: '2018',
      title: 'The Initial Spark in Lagos & Bogota',
      desc: 'Our founders recorded youth vocalists using portable studio gear and realized genius talent exists everywhere, but infrastructure is scarce.',
      tag: 'Foundation Genesis'
    },
    {
      year: '2020',
      title: 'Global Remote Learning Crisis Response',
      desc: 'Launched our first free digital masterclasses during pandemic isolation, connecting 10,000+ isolated students with conservatory mentors.',
      tag: 'Digital Expansion'
    },
    {
      year: '2023',
      title: '501(c)(3) Accreditation & Hardware Grants',
      desc: 'Received official non-profit status and distributed over $1.2M in audio interfaces, studio microphones, and keyboards to youth centers.',
      tag: 'Infrastructure Grant'
    },
    {
      year: '2026',
      title: 'Global Talents Academy & AI Music Mentor',
      desc: 'Unveiled a fully multilingual digital conservatory with AI feedback, multitrack DAW practice stems, and active global creators.',
      tag: 'Modern Era'
    },
  ];

  const orgDivisions = [
    {
      title: '1. Executive Leadership & Governance',
      icon: Building2,
      subtitle: 'Board oversight, fiduciary transparency, 501(c)(3) compliance',
      items: ['Annual Public Audit Reports', 'Global Advisory Committee', 'Strategic Endowments'],
    },
    {
      title: '2. Academy & Curriculum Division',
      icon: GraduationCap,
      subtitle: 'Pedagogical design, multitrack stems, university accredited courses',
      items: ['Course Content Review Board', 'Multitrack DAW Practice Assets', 'Certification Engine'],
    },
    {
      title: '3. Artist Mentorship & Network Operations',
      icon: Users,
      subtitle: '1-on-1 private mentorship, masterclasses, regional discovery',
      items: ['Grammy & Conservatory Faculty', 'Artist Residency Stipends', 'Live Masterclass Series'],
    },
    {
      title: '4. Equipment Grants & Supply Logistics',
      icon: Radio,
      subtitle: 'Direct hardware procurement, studio building grants, acoustic kits',
      items: ['Global Shipping Logistics', 'Community Studio Grants', 'Hardware Vetting Board'],
    },
    {
      title: '5. Technology & AI Labs',
      icon: Cpu,
      subtitle: 'AI Music Mentor engine, low-latency streaming, interactive web apps',
      items: ['Web Audio Signal Processing', '15-Language Localized AI', 'Virtual Stage Backends'],
    },
    {
      title: '6. Regional Chapters & Philanthropy',
      icon: Globe,
      subtitle: 'Community relations, partner conservatories, donor stewardship',
      items: ['Regional Community Hubs', 'Donor Impact Reporting', 'Corporate Cultural Partnerships'],
    },
  ];

  const CurrentIcon = currentPage.icon;

  return (
    <section className="py-8 md:py-16 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* DEDICATED PAGE HEADER HERO WITH PHOTOGRAPH DESCRIBING THE PAGE NAME */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-neutral-200 dark:border-neutral-800 transition-all duration-300 min-h-[420px] sm:min-h-[480px] flex flex-col justify-between p-6 sm:p-10 md:p-12 text-white">
          {/* Background Photo describing the Page Name */}
          <div className="absolute inset-0 z-0">
            <img
              src={currentPage.headerImage}
              alt={currentPage.title}
              className="w-full h-full object-cover object-center scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            {/* Dark Gradient Overlay for contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/80 to-neutral-950/40" />
            <div className="absolute inset-0 bg-neutral-950/30 backdrop-blur-[1px]" />
          </div>

          {/* Hero Content Header */}
          <div className="relative z-10 space-y-4 max-w-3xl">
            {/* Page Name Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/20 border border-amber-400/40 backdrop-blur-md text-amber-300 text-xs font-mono font-bold tracking-widest uppercase shadow-lg">
              <CurrentIcon className="w-4 h-4 text-amber-400" />
              <span>{currentPage.badge}</span>
            </div>

            {/* Main Title */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-none drop-shadow-md">
              {currentPage.title}
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base md:text-lg text-neutral-200 font-medium max-w-2xl leading-relaxed drop-shadow">
              {currentPage.subtitle}
            </p>
          </div>

          {/* Navigation Bar & Photo Caption Footer inside Hero */}
          <div className="relative z-10 pt-6 border-t border-white/15 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            
            {/* Quick Page Switcher Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {pages.map((p) => {
                const isActive = p.key === currentPage.key;
                const Icon = p.icon;
                return (
                  <button
                    key={p.key}
                    onClick={() => handleTabChange(p)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 backdrop-blur-md ${
                      isActive
                        ? 'bg-amber-500 text-neutral-950 shadow-lg shadow-amber-500/30 scale-105 font-extrabold'
                        : 'bg-black/50 hover:bg-black/70 text-white/80 hover:text-white border border-white/10'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-neutral-950' : 'text-amber-400'}`} />
                    <span>{p.title}</span>
                  </button>
                );
              })}
            </div>

            {/* Header Photo Description Caption */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/60 border border-white/10 backdrop-blur-md text-[11px] font-mono text-amber-300/90 self-start lg:self-auto">
              <Camera className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span className="line-clamp-1">{currentPage.headerCaption}</span>
            </div>

          </div>
        </div>

        {/* INDIVIDUAL PAGE CONTENT */}

        {/* 1. ABOUT FOUNDATION */}
        {aboutTab === 'foundation' && (
          <div className="space-y-16 animate-in fade-in duration-300">
            <div className="max-w-3xl mx-auto text-center space-y-4">
              <h2 className="text-3xl sm:text-4xl font-black text-neutral-900 dark:text-neutral-50">
                Democratizing World-Class Music Education Worldwide
              </h2>
              <p className="text-base text-neutral-600 dark:text-neutral-300 leading-relaxed">
                Founded by a global coalition of musicians, educators, and producers, The Global Talents Foundation operates as an independent non-profit 501(c)(3) entity dedicated to cultivating raw musical talent regardless of socioeconomic status, ethnicity, or geographical location.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="p-6 rounded-3xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 space-y-3 shadow-sm hover:border-amber-500/50 transition-colors">
                <Globe className="w-8 h-8 text-amber-500" />
                <h3 className="text-base font-bold">Global Equalizer</h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Connecting students in underserved regions directly with world-class mentors and studio production resources.
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 space-y-3 shadow-sm hover:border-amber-500/50 transition-colors">
                <Award className="w-8 h-8 text-amber-500" />
                <h3 className="text-base font-bold">Artistic Integrity</h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Championing original artistic expression, sonic identity, and sustainable career longevity in the music industry.
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 space-y-3 shadow-sm hover:border-amber-500/50 transition-colors">
                <ShieldCheck className="w-8 h-8 text-amber-500" />
                <h3 className="text-base font-bold">100% Non-Profit</h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  100% of donations and foundation revenues directly subsidize equipment grants, studio hardware, and free courses.
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 space-y-3 shadow-sm hover:border-amber-500/50 transition-colors">
                <BookOpen className="w-8 h-8 text-amber-500" />
                <h3 className="text-base font-bold">Open Academy</h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Zero tuition fees, downloadable multitrack stems, and DAW templates accessible to creators globally.
                </p>
              </div>
            </div>

            {/* Foundation Impact Highlights */}
            <div className="p-8 sm:p-10 rounded-3xl bg-neutral-900 text-white dark:bg-neutral-950 dark:border dark:border-neutral-800 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center shadow-xl">
              <div>
                <div className="text-3xl sm:text-4xl font-black text-amber-400">0</div>
                <div className="text-xs font-mono uppercase tracking-widest text-neutral-400 mt-1">Enrolled Creators</div>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-black text-amber-400">0</div>
                <div className="text-xs font-mono uppercase tracking-widest text-neutral-400 mt-1">Countries Represented</div>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-black text-amber-400">$0</div>
                <div className="text-xs font-mono uppercase tracking-widest text-neutral-400 mt-1">Equipment Grants Awarded</div>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-black text-amber-400">100%</div>
                <div className="text-xs font-mono uppercase tracking-widest text-neutral-400 mt-1">Tuition-Free Access</div>
              </div>
            </div>
          </div>
        )}

        {/* 2. VISION */}
        {aboutTab === 'vision' && (
          <div className="space-y-12 animate-in fade-in duration-300">
            <div className="max-w-3xl mx-auto text-center space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-mono font-bold">
                <Eye className="w-4 h-4" />
                <span>OUR ULTIMATE AIM FOR HUMANITY</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-neutral-900 dark:text-neutral-50">
                A World Where Every Creative Voice Has Sovereign Access
              </h2>
              <p className="text-base text-neutral-600 dark:text-neutral-300 leading-relaxed">
                We envision a global creative ecosystem where geographic isolation and financial constraint no longer prevent any individual from mastering their musical craft, recording professional audio, or sharing their unique cultural heritage with the world.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-8 rounded-3xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 space-y-4 shadow-sm hover:border-amber-500/40 transition-colors">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500 font-bold">01</div>
                <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">Virtual Conservatories in Rural & Urban Hubs</h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Building low-latency digital classrooms that allow students in remote regions to receive live feedback from symphony soloists, Grammy-winning producers, and audio engineers.
                </p>
              </div>

              <div className="p-8 rounded-3xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 space-y-4 shadow-sm hover:border-amber-500/40 transition-colors">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500 font-bold">02</div>
                <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">Cultural Heritage Preservation & Open Archives</h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Documenting and modernizing indigenous musical instruments and vocal traditions through open-access digital sample libraries and educational archives available globally.
                </p>
              </div>

              <div className="p-8 rounded-3xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 space-y-4 shadow-sm hover:border-amber-500/40 transition-colors">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500 font-bold">03</div>
                <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">Sovereign Creative Rights & Publishing Education</h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Educating independent artists in music business, copyright, master ownership, publishing, and fair royalty distribution so they maintain complete creative control over their art.
                </p>
              </div>

              <div className="p-8 rounded-3xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 space-y-4 shadow-sm hover:border-amber-500/40 transition-colors">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500 font-bold">04</div>
                <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">AI-Assisted Multilingual Music Guidance</h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Deploying cutting-edge AI mentor engines to provide instant harmonic, vocal, and mix feedback in 15+ native languages directly to any smartphone or web browser.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 3. MISSION */}
        {aboutTab === 'mission' && (
          <div className="space-y-12 animate-in fade-in duration-300">
            <div className="max-w-3xl mx-auto text-center space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-mono font-bold">
                <HeartHandshake className="w-4 h-4" />
                <span>SUSTAINABLE ACTION & RELIEF</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-neutral-900 dark:text-neutral-50">
                Actionable Programs Providing Direct Relief & Free Education
              </h2>
              <p className="text-base text-neutral-600 dark:text-neutral-300 leading-relaxed">
                Our mission is executed through three operational pillars: tuition-free educational curricula, direct hardware grants for artists in need, and global mentorship residencies.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-8 rounded-3xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 space-y-4 shadow-sm hover:border-amber-500/40 transition-colors">
                <Radio className="w-8 h-8 text-amber-500" />
                <h3 className="text-lg font-bold">Emergency Artist Relief Fund</h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Providing rapid emergency grants, replacement studio gear, and crisis support for musicians affected by economic hardship, conflict, or natural disasters.
                </p>
                <div className="pt-2">
                  <span className="text-[11px] font-mono text-amber-500 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> 0 Emergency Grants Issued
                  </span>
                </div>
              </div>

              <div className="p-8 rounded-3xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 space-y-4 shadow-sm hover:border-amber-500/40 transition-colors">
                <Building2 className="w-8 h-8 text-amber-500" />
                <h3 className="text-lg font-bold">Community Studio Infrastructure</h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Outfitting physical community centers and school rooms with professional microphones, interfaces, studio monitors, and acoustic treatment.
                </p>
                <div className="pt-2">
                  <span className="text-[11px] font-mono text-amber-500 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> 0 Global Studio Hubs
                  </span>
                </div>
              </div>

              <div className="p-8 rounded-3xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 space-y-4 shadow-sm hover:border-amber-500/40 transition-colors">
                <Users className="w-8 h-8 text-amber-500" />
                <h3 className="text-lg font-bold">1-on-1 Elite Mentorship</h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Subsidizing 100% of mentorship session fees so emerging vocalists, producers, and instrumentalists can work directly with top industry professionals.
                </p>
                <div className="pt-2">
                  <span className="text-[11px] font-mono text-amber-500 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> 0 Mentorship Hours
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 4. FOUNDERS' CHRONICLE */}
        {aboutTab === 'founder' && (
          <div className="space-y-12 animate-in fade-in duration-300">
            <div className="max-w-3xl mx-auto text-center space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-mono font-bold">
                <BookOpen className="w-4 h-4" />
                <span>HISTORY & VALUES JOURNAL</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-neutral-900 dark:text-neutral-50">
                The Founders’ Chronicle: From a Spark to a Global Movement
              </h2>
              <p className="text-base text-neutral-600 dark:text-neutral-300 leading-relaxed">
                Read the chronological journal of how a group of passionate producers and educators transformed a local recording experiment into an accredited global non-profit foundation.
              </p>
            </div>

            <div className="max-w-4xl mx-auto space-y-8 relative before:absolute before:inset-0 before:left-8 sm:before:left-12 before:w-0.5 before:bg-amber-500/30">
              {chronicleEntries.map((entry, idx) => (
                <div key={idx} className="relative pl-16 sm:pl-24 space-y-2">
                  <div className="absolute left-4 sm:left-8 top-1 w-8 h-8 rounded-full bg-amber-500 text-neutral-950 font-mono font-bold text-xs flex items-center justify-center shadow-lg border-2 border-white dark:border-neutral-900">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div className="inline-block px-3 py-1 rounded-md bg-amber-500/10 text-amber-500 text-[10px] font-mono font-bold uppercase">
                    {entry.year} • {entry.tag}
                  </div>
                  <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">{entry.title}</h3>
                  <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-2xl">
                    {entry.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5. BOARD OF DIRECTORS */}
        {aboutTab === 'board' && (
          <div className="space-y-12 animate-in fade-in duration-300">
            <div className="max-w-3xl mx-auto text-center space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-mono font-bold">
                <Users className="w-4 h-4" />
                <span>SOVEREIGN ADVISORY COMMITTEE</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-neutral-900 dark:text-neutral-50">
                Board of Directors & Advisory Leadership
              </h2>
              <p className="text-base text-neutral-600 dark:text-neutral-300 leading-relaxed">
                Our Board of Directors provides strategic governance, fiscal oversight, and artistic direction to ensure the foundation remains transparent, independent, and deeply impactful.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {boardMembers.map((member, idx) => (
                <div key={idx} className="p-6 rounded-3xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 space-y-4 flex flex-col justify-between shadow-sm hover:border-amber-500/40 transition-colors">
                  <div className="space-y-3">
                    <div className="flex items-center gap-4">
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-16 h-16 rounded-2xl object-cover border-2 border-amber-500/40 shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <h4 className="text-base font-bold text-neutral-900 dark:text-neutral-100">{member.name}</h4>
                        <p className="text-xs font-mono text-amber-500 font-bold mt-0.5">{member.role}</p>
                      </div>
                    </div>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">{member.bio}</p>
                  </div>

                  <div className="pt-3 border-t border-neutral-200 dark:border-neutral-800/80">
                    <div className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest">Core Governance Focus</div>
                    <div className="text-xs font-medium text-neutral-800 dark:text-neutral-200 mt-0.5">{member.duties}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 6. ORGANIZATIONAL STRUCTURE */}
        {aboutTab === 'structure' && (
          <div className="space-y-12 animate-in fade-in duration-300">
            <div className="max-w-3xl mx-auto text-center space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-mono font-bold">
                <Workflow className="w-4 h-4" />
                <span>INTERNAL ACTION WORKFLOWS</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-neutral-900 dark:text-neutral-50">
                Organizational Structure & Action Workflows
              </h2>
              <p className="text-base text-neutral-600 dark:text-neutral-300 leading-relaxed">
                Discover how The Global Talents Foundation converts global donations and volunteer expertise into real-world educational infrastructure, curriculum, and hardware relief.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {orgDivisions.map((division, idx) => {
                const IconComponent = division.icon;
                return (
                  <div key={idx} className="p-8 rounded-3xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 space-y-4 shadow-sm hover:border-amber-500/40 transition-colors">
                    <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100">{division.title}</h3>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">{division.subtitle}</p>
                    </div>

                    <div className="pt-3 border-t border-neutral-200 dark:border-neutral-800 space-y-2">
                      {division.items.map((item, itemIdx) => (
                        <div key={itemIdx} className="flex items-center gap-2 text-xs text-neutral-700 dark:text-neutral-300 font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Bottom Page Switching Pills Navigation */}
        <div className="pt-6 border-t border-neutral-200 dark:border-neutral-800 flex flex-col items-center space-y-4">
          <div className="text-xs font-mono uppercase tracking-widest text-neutral-400 dark:text-neutral-500">Explore Foundation Pages</div>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {pages.map((p) => {
              const isActive = p.key === currentPage.key;
              const Icon = p.icon;
              return (
                <button
                  key={p.key}
                  onClick={() => handleTabChange(p)}
                  className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                    isActive
                      ? 'bg-amber-500 text-neutral-950 shadow-lg shadow-amber-500/20 scale-105'
                      : 'bg-neutral-100 dark:bg-neutral-800/80 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-800'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 text-amber-500" />
                  <span>{p.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Global Bottom CTA Banner */}
        <div className="p-8 sm:p-12 rounded-3xl bg-amber-500 text-neutral-950 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <h3 className="text-2xl sm:text-3xl font-black">Partner With The Global Talents Foundation</h3>
            <p className="text-xs sm:text-sm text-neutral-900 font-medium mt-1 max-w-xl leading-relaxed">
              We collaborate with international conservatories, record labels, audio technology brands, and cultural ministries to build state-of-the-art music learning hubs worldwide.
            </p>
          </div>
          <button
            onClick={() => setIsPartnerModalOpen(true)}
            className="px-8 py-4 rounded-full bg-neutral-950 text-white hover:bg-neutral-800 font-bold text-xs uppercase tracking-wider shrink-0 cursor-pointer flex items-center gap-2 shadow-lg hover:scale-105 transition-all"
          >
            <span>Be a Partner</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
