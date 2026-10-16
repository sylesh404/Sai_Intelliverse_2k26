import { useState, useEffect } from 'react';
import { useLenis } from './hooks/useLenis';
import type { EventItem, GalleryItem } from './types';
import symposiumConfig from './config/symposiumConfig';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import CustomCursor from './components/CustomCursor';
import BackgroundGraphics from './components/BackgroundGraphics';
import ComicTitleIntro from './animations/intro/ComicTitleIntro';

import Navbar from './components/Navbar';
import HeroSection from './sections/HeroSection';
import TransitionHeroDepartment from './transitions/TransitionHeroDepartment';

import MarqueeTicker from './components/MarqueeTicker';
import AboutSection from './sections/AboutSection';
import TransitionAboutVision from './transitions/TransitionAboutVision';
import VisionMissionSection from './sections/VisionMissionSection';
import TransitionAboutEvents from './transitions/TransitionAboutEvents';
import EventsSection from './sections/EventsSection';
import TransitionEventsSchedule from './transitions/TransitionEventsSchedule';
import ScheduleSection from './sections/ScheduleSection';
import TransitionScheduleTeam from './transitions/TransitionScheduleTeam';
import TeamSection from './sections/TeamSection';
import TransitionFacultyGallery from './transitions/TransitionFacultyGallery';
import GallerySection from './sections/GallerySection';
import TransitionGalleryCTA from './transitions/TransitionGalleryCTA';
import RegistrationCTA from './sections/RegistrationCTA';
import TransitionCTAFooter from './transitions/TransitionCTAFooter';
import Footer from './sections/Footer';
import EventDetailModal from './components/EventDetailModal';
import GalleryModal from './components/GalleryModal';
import RegistrationModal from './components/RegistrationModal';
import { galleryData } from './data/gallery';

export function App() {
  // Initialize Lenis smooth scroll
  useLenis();

  // Intro state: Opens with cinematic Comic Title & Impact Flash Animation by default
  const [showIntro, setShowIntro] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true;
    const params = new URLSearchParams(window.location.search);
    return params.get('intro') !== 'false';
  });

  // Listen to browser navigation
  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      setShowIntro(params.get('intro') !== 'false');
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Recalculate ScrollTrigger measurements across responsive breakpoints, orientation & zoom levels
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 150);
    };

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('orientationchange', handleResize, { passive: true });
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  // Modal states
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [selectedGalleryItem, setSelectedGalleryItem] = useState<GalleryItem | null>(null);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [registerEventId, setRegisterEventId] = useState<string | undefined>(undefined);

  const handleOpenRegister = (_eventId?: string) => {
    window.open(symposiumConfig.registrationUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="relative min-h-screen bg-[#0D0D0D] text-[#FCFAED] overflow-x-hidden select-auto font-body">
      {/* 1. Custom Smooth Animated Cursor */}
      <CustomCursor />

      {/* 2. Generative Retro Graphics & Subtle Scanlines */}
      <BackgroundGraphics />

      {/* 3. Comic Book Title Sequence (with Skip Intro) */}
      {showIntro && (
        <ComicTitleIntro
          onComplete={() => {
            setShowIntro(false);
            setTimeout(() => {
              ScrollTrigger.refresh();
            }, 60);
          }}
        />
      )}

      {/* 4. Top Navigation Bar */}
      <Navbar
        onOpenRegister={() => handleOpenRegister()}
        onGoHome={() => setShowIntro(true)}
      />

      {/* 5. Main Viewport Contents: One Continuous Visual Experience */}
      <main className="relative z-10">
        {/* 1. HERO SECTION */}
        <HeroSection onOpenRegister={() => handleOpenRegister()} />

        {/* TRANSITION: HERO ➔ ABOUT */}
        <TransitionHeroDepartment />

        {/* Velocity-Reactive Continuous Ticker */}
        <MarqueeTicker
          theme="dark"
          items={[
            "AI & MACHINE LEARNING",
            "BRUTALIST ARCHITECTURES",
            "REVERSE LLM CHALLENGE",
            "12HR HACK-A-VERSE",
            "HIGH-THROUGHPUT CODE CLASH",
            "SAI INTELLIVERSE 3.0",
          ]}
        />

        {/* 2. ABOUT SYMPOSIUM */}
        <AboutSection />

        {/* TRANSITION: ABOUT ➔ VISION & MISSION */}
        <TransitionAboutVision />

        {/* 3. DEPARTMENT VISION & MISSION */}
        <VisionMissionSection />

        {/* TRANSITION: VISION & MISSION ➔ EVENTS */}
        <TransitionAboutEvents />

        {/* 4. EVENTS ARENA */}
        <EventsSection
          onSelectEvent={(evt) => setSelectedEvent(evt)}
        />

        {/* Mid-Break Reverse Red Ticker */}
        <MarqueeTicker
          theme="red"
          reverse
          items={[
            "TROPHIES OF DISTINCTION",
            "INCUBATION OPPORTUNITIES",
            "CHAMPIONSHIP ROLLING SHIELD",
            "NATIONAL LEVEL TECHNICAL SYMPOSIUM",
            "NATIONAL SCALE CONCLAVE",
          ]}
        />

        {/* TRANSITION: EVENTS ➔ SCHEDULE */}
        <TransitionEventsSchedule />

        {/* 5. SCHEDULE TIMELINE */}
        <ScheduleSection />

        {/* TRANSITION: SCHEDULE ➔ TEAM */}
        <TransitionScheduleTeam />

        {/* 6. FACULTY COMMITTEE */}
        <TeamSection />

        {/* TRANSITION: FACULTY ➔ MEMORY GALLERY */}
        <TransitionFacultyGallery />

        {/* 7. MEMORY GALLERY */}
        <GallerySection
          onSelectItem={(item) => setSelectedGalleryItem(item)}
        />

        {/* TRANSITION: GALLERY ➔ FINAL CTA */}
        <TransitionGalleryCTA />

        {/* 8. FINAL REGISTRATION CALL TO ACTION */}
        <RegistrationCTA onOpenRegister={() => handleOpenRegister()} />

        {/* TRANSITION: FINAL CTA ➔ FOOTER */}
        <TransitionCTAFooter />
      </main>

      {/* 9. Minimalist Technical Footer */}
      <Footer />

      {/* Modals & Expanding Transitions */}
      {/* Event Details Expanded View */}
      <EventDetailModal
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
        onRegister={(eventId) => {
          setSelectedEvent(null);
          handleOpenRegister(eventId);
        }}
      />

      {/* Gallery Fullscreen Lightbox */}
      <GalleryModal
        item={selectedGalleryItem}
        items={galleryData}
        onClose={() => setSelectedGalleryItem(null)}
        onSelect={(item) => setSelectedGalleryItem(item)}
      />

      {/* Delegate Pass / Registration Portal */}
      <RegistrationModal
        isOpen={isRegisterOpen}
        onClose={() => {
          setIsRegisterOpen(false);
          setRegisterEventId(undefined);
        }}
        preSelectedEventId={registerEventId}
      />
    </div>
  );
}

export default App;
