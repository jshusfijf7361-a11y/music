import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useApp } from '../context/AppContext';
import { PRIMACIES_IMAGES, PrimacyImage } from '../data/primaciesData';
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  Eye,
} from 'lucide-react';

export function PrimaciesGalleryPage() {
  const { setActiveView } = useApp();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreenOpen, setIsFullscreenOpen] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState<Record<string, boolean>>({});

  const totalImages = PRIMACIES_IMAGES.length;
  const currentImage: PrimacyImage = PRIMACIES_IMAGES[currentIndex];

  // Touch Swipe tracking refs
  const touchStartXRef = useRef<number | null>(null);
  const touchEndXRef = useRef<number | null>(null);
  const minSwipeDistance = 45;

  // Preload ONLY the immediate next and previous image for snappy transitions
  useEffect(() => {
    const nextIdx = (currentIndex + 1) % totalImages;
    const prevIdx = (currentIndex - 1 + totalImages) % totalImages;

    const preload = (url: string) => {
      const img = new Image();
      img.src = url;
    };

    // Preload next image first, then prev
    preload(isFullscreenOpen ? PRIMACIES_IMAGES[nextIdx].fullUrl : PRIMACIES_IMAGES[nextIdx].previewUrl);
    preload(isFullscreenOpen ? PRIMACIES_IMAGES[prevIdx].fullUrl : PRIMACIES_IMAGES[prevIdx].previewUrl);
  }, [currentIndex, totalImages, isFullscreenOpen]);

  // Navigate next / prev with looping
  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalImages);
  }, [totalImages]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalImages) % totalImages);
  }, [totalImages]);

  const handleBackToHome = () => {
    setActiveView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Keyboard navigation & Esc to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'Escape') {
        if (isFullscreenOpen) {
          setIsFullscreenOpen(false);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev, isFullscreenOpen]);

  // Touch swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchEndXRef.current = null;
    touchStartXRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndXRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartXRef.current || !touchEndXRef.current) return;
    const distance = touchStartXRef.current - touchEndXRef.current;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }
  };

  const markImageLoaded = (id: string) => {
    setImagesLoaded((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100 pt-24 pb-20 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Controls: Back Button */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-neutral-200 dark:border-neutral-800">
          <button
            onClick={handleBackToHome}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white bg-neutral-100 dark:bg-neutral-900 hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold tracking-widest text-amber-600 dark:text-amber-400 uppercase">
              {currentIndex + 1} / {totalImages}
            </span>
          </div>
        </div>

        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-neutral-900 dark:text-white uppercase">
            FOUNDATION ACADEMY PRIMACIES
          </h1>
          <p className="mt-3 text-sm sm:text-base text-neutral-600 dark:text-neutral-400 max-w-xl mx-auto">
            {currentImage.subtitle}
          </p>
        </div>

        {/* Main Exhibition Viewer Card */}
        <div className="relative max-w-5xl mx-auto">
          
          <div 
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="group relative rounded-2xl sm:rounded-3xl overflow-hidden bg-neutral-950 border border-neutral-200/80 dark:border-neutral-800 shadow-2xl transition-all duration-300"
          >
            {/* Image Stage */}
            <div 
              onClick={() => setIsFullscreenOpen(true)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setIsFullscreenOpen(true);
                }
              }}
              className="relative w-full aspect-[4/3] sm:aspect-[16/10] flex items-center justify-center cursor-pointer select-none overflow-hidden bg-neutral-950"
            >
              {!imagesLoaded[currentImage.id] && (
                <div className="absolute inset-0 bg-neutral-900 animate-pulse flex items-center justify-center" />
              )}

              {/* Responsive & Optimized Gallery Image */}
              <img
                key={currentImage.id}
                src={currentImage.previewUrl}
                srcSet={currentImage.srcSet}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1024px"
                alt={currentImage.alt}
                loading="eager"
                decoding="async"
                referrerPolicy="no-referrer"
                onLoad={() => markImageLoaded(currentImage.id)}
                className={`max-w-full max-h-full w-auto h-auto object-contain transition-opacity duration-300 ${
                  imagesLoaded[currentImage.id] ? 'opacity-100' : 'opacity-0'
                }`}
              />

              {/* Hover Expand Overlay Banner */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                <div className="px-4 py-2 rounded-full bg-neutral-950/90 text-white border border-white/20 text-xs font-semibold flex items-center gap-2 backdrop-blur-md shadow-lg">
                  <Maximize2 className="w-4 h-4 text-amber-400" />
                  <span>Click for Fullscreen</span>
                </div>
              </div>
            </div>

            {/* Desktop / In-Viewer Previous & Next Arrow Controls */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              aria-label="Previous Image"
              className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-neutral-950/70 hover:bg-neutral-950 text-white border border-white/10 hover:border-amber-500/50 backdrop-blur-md flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg z-10"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              aria-label="Next Image"
              className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-neutral-950/70 hover:bg-neutral-950 text-white border border-white/10 hover:border-amber-500/50 backdrop-blur-md flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg z-10"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Bottom Caption Bar */}
            <div className="p-4 sm:p-5 bg-neutral-900/90 dark:bg-neutral-900 border-t border-neutral-800 flex items-center justify-between text-white">
              <div className="space-y-0.5">
                <span className="text-[11px] font-mono uppercase tracking-wider text-amber-400">
                  Primacy {currentIndex + 1} of {totalImages}
                </span>
                <h2 className="text-sm sm:text-base font-bold text-white tracking-tight">
                  {currentImage.title}
                </h2>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsFullscreenOpen(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 hover:text-white text-xs font-semibold transition-colors"
                >
                  <Eye className="w-3.5 h-3.5 text-amber-400" />
                  <span className="hidden sm:inline">Fullscreen</span>
                </button>
              </div>
            </div>

          </div>

          {/* Lightweight Thumbnail Selector Strip */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4 mt-6">
            {PRIMACIES_IMAGES.map((img, idx) => {
              const isActive = idx === currentIndex;
              return (
                <button
                  key={img.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`group relative rounded-xl overflow-hidden aspect-[16/10] bg-neutral-950 border-2 transition-all duration-200 focus:outline-none ${
                    isActive
                      ? 'border-amber-500 ring-2 ring-amber-500/30 scale-[1.02] shadow-lg'
                      : 'border-neutral-200 dark:border-neutral-800 opacity-70 hover:opacity-100 hover:border-neutral-400 dark:hover:border-neutral-600'
                  }`}
                >
                  <img
                    src={img.thumbnailUrl}
                    alt={img.alt}
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-2 sm:p-3">
                    <span className={`text-[10px] sm:text-xs font-mono font-bold tracking-wider ${
                      isActive ? 'text-amber-400' : 'text-white/80'
                    }`}>
                      0{idx + 1}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

        </div>

      </div>

      {/* ==========================================================
          FULLSCREEN LIGHTBOX / HIGH-RES IMAGE VIEWER
          ========================================================== */}
      {isFullscreenOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col justify-between select-none animate-in fade-in duration-200"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Top Bar with Counter & Close Button */}
          <div className="relative z-20 flex items-center justify-between px-4 sm:px-8 py-4 sm:py-6 bg-gradient-to-b from-black/90 to-transparent">
            
            {/* Image Counter */}
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-white/10 text-white text-xs sm:text-sm font-mono tracking-widest border border-white/10">
                {currentIndex + 1} / {totalImages}
              </span>
              <span className="hidden sm:inline text-neutral-400 text-xs font-mono tracking-wide">
                • {currentImage.title}
              </span>
            </div>

            {/* Close Button */}
            <button
              onClick={() => setIsFullscreenOpen(false)}
              aria-label="Close Lightbox"
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 border border-white/10"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>

          {/* Center Stage: Full Screen Image Contain */}
          <div className="relative flex-1 w-full h-full flex items-center justify-center p-2 sm:p-6 md:p-10 overflow-hidden">
            
            {/* Previous Navigation Arrow (Desktop & Mobile Tap) */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              aria-label="Previous Image"
              className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-black/50 hover:bg-black/80 text-white border border-white/20 backdrop-blur-md flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 shadow-2xl z-30"
            >
              <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>

            {/* Main Full-Resolution Image with object-fit: contain (Loaded on demand in viewer) */}
            <div className="relative w-full h-full flex items-center justify-center">
              <img
                key={currentImage.id}
                src={currentImage.fullUrl}
                srcSet={currentImage.srcSet}
                sizes="100vw"
                alt={currentImage.alt}
                loading="eager"
                decoding="async"
                referrerPolicy="no-referrer"
                className="max-w-full max-h-[82vh] w-auto h-auto object-contain transition-transform duration-200 ease-out shadow-2xl rounded-sm sm:rounded-lg"
              />
            </div>

            {/* Next Navigation Arrow (Desktop & Mobile Tap) */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              aria-label="Next Image"
              className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-black/50 hover:bg-black/80 text-white border border-white/20 backdrop-blur-md flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 shadow-2xl z-30"
            >
              <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>
          </div>

          {/* Bottom Bar Controls & Gestures Hint */}
          <div className="relative z-20 px-4 sm:px-8 py-3 sm:py-5 bg-gradient-to-t from-black/90 to-transparent flex items-center justify-between text-neutral-400 text-xs">
            <div className="font-mono text-neutral-400 text-[11px] sm:text-xs">
              Use <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white font-sans text-[10px]">←</kbd> <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white font-sans text-[10px]">→</kbd> or swipe to navigate
            </div>

            <div className="flex items-center gap-2">
              {PRIMACIES_IMAGES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    idx === currentIndex ? 'w-6 bg-amber-400' : 'bg-white/30 hover:bg-white/60'
                  }`}
                />
              ))}
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
