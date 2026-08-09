import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useApp } from '../context/AppContext';
import { Artist } from '../types';
import { CheckCircle2, Calendar, Star, Globe, Sparkles, UserCheck } from 'lucide-react';

export const ArtistsSection: React.FC = () => {
  const { t } = useLanguage();
  const { artists, setSelectedArtist, setBookingArtist, setIsBookingOpen } = useApp();
  
  const [selectedGenre, setSelectedGenre] = useState<string>('All');

  const genres = ['All', 'Afrobeats', 'Classical', 'Pop', 'Ambient', 'R&B', 'Jazz'];

  const filteredArtists = selectedGenre === 'All'
    ? artists
    : artists.filter((a) => a.genre.includes(selectedGenre));

  const handleBookClick = (artist: Artist, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookingArtist(artist);
    setIsBookingOpen(true);
  };

  return (
    <section className="py-20 md:py-28 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 border-b border-neutral-200/60 dark:border-neutral-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-12 border-b border-neutral-200 dark:border-neutral-800">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs font-mono font-bold tracking-widest uppercase mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>GLOBAL MENTORS & ARTISTS</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-neutral-900 dark:text-neutral-50">
              {t('artists.title', 'Learn From The People Who Live The Music.')}
            </h2>
            <p className="mt-3 text-base text-neutral-600 dark:text-neutral-400 max-w-2xl">
              {t('artists.subtitle', 'Connect with award-winning producers, vocalists, songwriters, and executives dedicated to guiding the next generation.')}
            </p>
          </div>

          {/* Genre Filters */}
          <div className="flex flex-wrap items-center gap-2">
            {genres.map((g) => {
              const isActive = selectedGenre === g;
              return (
                <button
                  key={g}
                  onClick={() => setSelectedGenre(g)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-amber-500 text-neutral-950 font-bold shadow-md shadow-amber-500/20'
                      : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                  }`}
                >
                  {g}
                </button>
              );
            })}
          </div>
        </div>

        {/* Artists Roster Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {filteredArtists.map((artist) => (
            <div
              key={artist.id}
              onClick={() => setSelectedArtist(artist)}
              className="group relative rounded-3xl overflow-hidden bg-neutral-50 dark:bg-neutral-950 border border-neutral-200/80 dark:border-neutral-800/80 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 cursor-pointer flex flex-col justify-between"
            >
              
              {/* Photo Banner */}
              <div className="relative h-72 w-full overflow-hidden bg-neutral-800">
                <img
                  src={artist.image}
                  alt={artist.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent" />

                {/* Country Flag & Availability Badge */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="text-xl bg-neutral-950/80 backdrop-blur-md p-1.5 rounded-full border border-neutral-700">
                    {artist.countryFlag}
                  </span>
                  {artist.isAvailableForMentorship && (
                    <span className="px-3 py-1 rounded-full bg-amber-500 text-neutral-950 font-bold text-[10px] tracking-wider uppercase shadow-md flex items-center gap-1">
                      <UserCheck className="w-3 h-3" />
                      Available 1-on-1
                    </span>
                  )}
                </div>
              </div>

              {/* Artist Body Details */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-50 group-hover:text-amber-500 transition-colors">
                      {artist.name}
                    </h3>
                    {artist.verified && (
                      <CheckCircle2 className="w-4 h-4 text-amber-500 fill-amber-500/10 shrink-0" />
                    )}
                  </div>

                  <p className="text-xs font-mono text-amber-600 dark:text-amber-400 font-semibold mt-1">
                    {artist.role}
                  </p>

                  <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-2 line-clamp-2 leading-relaxed">
                    {artist.bio}
                  </p>

                  {/* Genres & Specialties */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {artist.genre.map((g) => (
                      <span
                        key={g}
                        className="px-2.5 py-0.5 rounded-md bg-neutral-200/60 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 text-[10px] font-medium"
                      >
                        {g}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="mt-6 pt-4 border-t border-neutral-200/60 dark:border-neutral-800/60 flex items-center gap-2">
                  <button
                    onClick={() => setSelectedArtist(artist)}
                    className="flex-1 py-2.5 rounded-xl bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 font-bold text-xs transition-colors"
                  >
                    View Profile
                  </button>

                  <button
                    onClick={(e) => handleBookClick(artist, e)}
                    className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs flex items-center gap-1.5 shadow-md transition-all hover:scale-105"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Book 1-on-1</span>
                  </button>
                </div>

              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
