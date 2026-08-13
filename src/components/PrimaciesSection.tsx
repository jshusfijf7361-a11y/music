import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PRIMACIES_IMAGES } from '../data/primaciesData';
import { ArrowRight, Eye } from 'lucide-react';

export function PrimaciesSection() {
  const { setActiveView } = useApp();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const primaryImage = PRIMACIES_IMAGES[0];

  const handleOpenGallery = () => {
    setActiveView('foundation-academy-primacies');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section 
      id="primacies-section" 
      className="relative z-10 w-full"
      style={{ marginTop: '4cm' }}
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-neutral-900 dark:text-white uppercase">
            FOUNDATION ACADEMY PRIMACIES
          </h2>
          <div className="w-12 h-0.5 bg-amber-500/60 mx-auto mt-3 rounded-full" />
        </div>

        {/* Large Full-Width Expansive Preview (Spanning 90-100% of Section Width) */}
        <div className="w-full">
          <div 
            onClick={handleOpenGallery}
            role="button"
            tabIndex={0}
            aria-label="View Foundation Academy Primacies Gallery"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleOpenGallery();
              }
            }}
            className="group relative w-full cursor-pointer overflow-hidden rounded-xl sm:rounded-2xl bg-neutral-950 border border-neutral-200/80 dark:border-neutral-800 shadow-xl transition-all duration-300 hover:shadow-2xl hover:border-amber-500/40 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
          >
            {/* Aspect Ratio Container for Zero Layout Shift */}
            <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] md:aspect-[16/9] lg:aspect-[21/10] flex items-center justify-center bg-neutral-950 overflow-hidden">
              
              {/* Subtle Neutral Skeleton Shimmer while loading */}
              {!imageLoaded && !imageError && (
                <div className="absolute inset-0 bg-neutral-900 animate-pulse" />
              )}

              {/* Responsive & Optimized Preview Image */}
              <img
                src={imageError ? primaryImage.fallbackUrl : primaryImage.previewUrl}
                srcSet={imageError ? undefined : primaryImage.srcSetPreview}
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 95vw, 1280px"
                alt={primaryImage.alt}
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
                onLoad={() => setImageLoaded(true)}
                onError={() => {
                  if (!imageError) {
                    setImageError(true);
                  }
                }}
                className={`w-full h-full object-contain md:object-cover transition-opacity duration-500 ease-out ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
              />

              {/* Ambient Vignette Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-neutral-950/20 opacity-40 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none" />

              {/* Subtle Hover Action Badge */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="px-5 py-2.5 rounded-full bg-neutral-950/90 text-amber-400 backdrop-blur-md border border-amber-500/40 shadow-2xl flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-widest">Open Exhibition</span>
                </div>
              </div>

              {/* Bottom Info Bar inside preview */}
              <div className="absolute bottom-0 inset-x-0 p-4 sm:p-6 flex items-end justify-between pointer-events-none">
                <div className="space-y-0.5 drop-shadow-md">
                  <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-amber-400">
                    Primacies • 01 of 03
                  </span>
                  <h3 className="text-sm sm:text-base md:text-lg font-bold text-white tracking-tight">
                    {primaryImage.title}
                  </h3>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 text-white/90 text-xs font-mono border border-white/10 backdrop-blur-sm">
                  <span>1 / 3</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Trigger: View Gallery Button */}
          <div className="mt-6 sm:mt-8 text-center">
            <button
              onClick={handleOpenGallery}
              className="inline-flex items-center gap-2.5 px-7 sm:px-9 py-3 sm:py-3.5 rounded-full bg-neutral-900 text-white dark:bg-amber-500 dark:text-neutral-950 hover:bg-neutral-800 dark:hover:bg-amber-400 text-xs sm:text-sm font-bold uppercase tracking-widest transition-all duration-200 shadow-md hover:shadow-lg active:scale-95"
            >
              <span>VIEW GALLERY</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
