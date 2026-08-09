import React from 'react';
import { useApp } from './context/AppContext';

// Layout Components
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';

// Homepage & Section Components
import { MissionSection } from './components/MissionSection';
import { AcademySection } from './components/AcademySection';
import { FreeLearningSection } from './components/FreeLearningSection';
import { ArtistsSection } from './components/ArtistsSection';
import { ImpactSection } from './components/ImpactSection';
import { EventsSection } from './components/EventsSection';
import { SuccessStoriesSection } from './components/SuccessStoriesSection';
import { ResourcesSection } from './components/ResourcesSection';
import { NewsletterSection } from './components/NewsletterSection';
import { AboutSection } from './components/AboutSection';
// Modals & Widgets
import { CourseDetailModal } from './components/CourseDetailModal';
import { ArtistProfileModal } from './components/ArtistProfileModal';
import { BookingModal } from './components/BookingModal';
import { UserDashboardModal } from './components/UserDashboardModal';
import { AdminDashboardModal } from './components/AdminDashboardModal';
import { PartnerModal } from './components/PartnerModal';
import { CipherAuthModal } from './components/CipherAuthModal';
import { SearchModal } from './components/SearchModal';
import { AIMentorWidget } from './components/AIMentorWidget';
import { ToastContainer } from './components/ToastContainer';

export function App() {
  const { activeView } = useApp();

  return (
    <div className="min-h-screen bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100 flex flex-col font-sans selection:bg-amber-500 selection:text-neutral-950 transition-colors duration-300">
      
      {/* Toast Feedback System */}
      <ToastContainer />

      {/* Global Navigation Header */}
      <Navbar />

      {/* Main View Switcher */}
      <main className="flex-1">
        {activeView === 'home' && (
          <>
            <Hero />
            <MissionSection />
            <AcademySection />
            <FreeLearningSection />
            <ArtistsSection />
            <ImpactSection />
            <EventsSection />
            <SuccessStoriesSection />
            <ResourcesSection />
            <NewsletterSection />
          </>
        )}

        {activeView === 'courses' && (
          <div className="pt-20">
            <FreeLearningSection />
            <ResourcesSection />
          </div>
        )}

        {activeView === 'artists' && (
          <div className="pt-20">
            <ArtistsSection />
            <SuccessStoriesSection />
          </div>
        )}

        {activeView === 'academy' && (
          <div className="pt-20">
            <AcademySection />
            <FreeLearningSection />
          </div>
        )}

        {activeView === 'events' && (
          <div className="pt-20">
            <EventsSection />
          </div>
        )}

        {activeView === 'resources' && (
          <div className="pt-20">
            <ResourcesSection />
          </div>
        )}

        {(activeView === 'about' ||
          activeView === 'about-foundation' ||
          activeView === 'vision' ||
          activeView === 'mission' ||
          activeView === 'founders-chronicle' ||
          activeView === 'board-of-directors') && (
          <div className="pt-20">
            <AboutSection />
            <ImpactSection />
          </div>
        )}
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Interactive Overlays & Modals */}
      <CourseDetailModal />
      <ArtistProfileModal />
      <BookingModal />
      <UserDashboardModal />
      <AdminDashboardModal />
      <PartnerModal />
      <CipherAuthModal />
      <SearchModal />
      <AIMentorWidget />

    </div>
  );
}

export default App;
