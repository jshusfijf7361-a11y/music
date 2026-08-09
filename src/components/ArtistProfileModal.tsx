import React from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  CheckCircle2,
  Calendar,
  Award,
  Music,
  Disc,
  Sparkles,
  DollarSign,
  UserCheck,
} from 'lucide-react';

export const ArtistProfileModal: React.FC = () => {
  const { selectedArtist, setSelectedArtist, setBookingArtist, setIsBookingOpen } = useApp();

  if (!selectedArtist) return null;

  const handleStartBooking = (sessionType?: any) => {
    setBookingArtist(selectedArtist);
    setIsBookingOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-5xl my-auto bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-3xl shadow-2xl overflow-hidden text-neutral-900 dark:text-neutral-100">
        
        {/* Cover Image & Header */}
        <div className="relative h-64 md:h-80 w-full overflow-hidden bg-neutral-900">
          <img
            src={selectedArtist.coverImage || selectedArtist.image}
            alt={selectedArtist.name}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />

          {/* Close Button */}
          <button
            onClick={() => setSelectedArtist(null)}
            className="absolute top-4 right-4 p-2.5 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors z-10"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Artist Profile Body */}
        <div className="relative px-6 md:px-10 pb-10 -mt-20">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-neutral-200 dark:border-neutral-800">
            <div className="flex items-end gap-5">
              <img
                src={selectedArtist.image}
                alt={selectedArtist.name}
                className="w-28 h-28 md:w-36 md:h-36 rounded-2xl object-cover border-4 border-white dark:border-neutral-950 shadow-2xl shrink-0"
              />
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{selectedArtist.countryFlag}</span>
                  <h1 className="text-2xl md:text-4xl font-black text-neutral-900 dark:text-neutral-50">
                    {selectedArtist.name}
                  </h1>
                  {selectedArtist.verified && (
                    <CheckCircle2 className="w-6 h-6 text-amber-500 fill-amber-500/20 shrink-0" />
                  )}
                </div>
                <p className="text-xs md:text-sm font-mono text-amber-600 dark:text-amber-400 font-bold mt-1">
                  {selectedArtist.role}
                </p>
                <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                  {selectedArtist.country} • {selectedArtist.genre.join(', ')}
                </div>
              </div>
            </div>

            <button
              onClick={() => handleStartBooking()}
              className="px-8 py-3.5 rounded-full bg-amber-500 hover:bg-amber-400 text-neutral-950 font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-xl shadow-amber-500/20 transition-all hover:scale-105 shrink-0"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Private Session</span>
            </button>
          </div>

          {/* Grid Layout for Bio & Sessions */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-8">
            
            {/* Left Column: Biography, Specialties, Discography */}
            <div className="lg:col-span-7 space-y-8">
              
              {/* Bio */}
              <div>
                <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100 mb-3 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  Biography & Creative Journey
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                  {selectedArtist.bio}
                </p>
              </div>

              {/* Teaching Specialties */}
              <div>
                <h3 className="text-sm font-bold font-mono text-neutral-500 dark:text-neutral-400 uppercase tracking-widest mb-3">
                  Teaching Specialties
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedArtist.teachingSpecialties.map((spec, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs font-semibold"
                    >
                      ★ {spec}
                    </span>
                  ))}
                </div>
              </div>

              {/* Achievements */}
              <div>
                <h3 className="text-sm font-bold font-mono text-neutral-500 dark:text-neutral-400 uppercase tracking-widest mb-3">
                  Honors & Accomplishments
                </h3>
                <ul className="space-y-2">
                  {selectedArtist.achievements.map((ach, i) => (
                    <li key={i} className="text-xs text-neutral-700 dark:text-neutral-300 flex items-center gap-2">
                      <Award className="w-4 h-4 text-amber-500 shrink-0" />
                      <span>{ach}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Discography */}
              {selectedArtist.discography.length > 0 && (
                <div>
                  <h3 className="text-sm font-bold font-mono text-neutral-500 dark:text-neutral-400 uppercase tracking-widest mb-3">
                    Featured Catalog & Discography
                  </h3>
                  <div className="space-y-2">
                    {selectedArtist.discography.map((disc, i) => (
                      <div
                        key={i}
                        className="p-3.5 rounded-xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex items-center justify-between text-xs"
                      >
                        <div className="flex items-center gap-3">
                          <Disc className="w-4 h-4 text-amber-500" />
                          <span className="font-bold text-neutral-900 dark:text-neutral-100">{disc.title}</span>
                          <span className="text-[10px] text-neutral-400 font-mono">({disc.year})</span>
                        </div>
                        {disc.streamCount && (
                          <span className="font-mono text-[10px] text-amber-500 font-bold">
                            {disc.streamCount} streams
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Right Column: Private One-on-One Sessions */}
            <div className="lg:col-span-5 space-y-4">
              <div className="p-6 rounded-3xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xl space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-black text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
                    <UserCheck className="w-5 h-5 text-amber-500" />
                    Book Private 1-on-1 Session
                  </h3>
                </div>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  Select a private consultation format for catalog review, songwriting, arrangement, or executive career strategy.
                </p>

                <div className="space-y-3 pt-2">
                  {selectedArtist.sessionTypes.map((st) => (
                    <div
                      key={st.id}
                      className="p-4 rounded-2xl bg-white dark:bg-neutral-950 border border-neutral-200/80 dark:border-neutral-800 hover:border-amber-500/60 transition-all space-y-2"
                    >
                      <div className="flex justify-between items-start">
                        <h4 className="text-xs font-bold text-neutral-900 dark:text-neutral-100">
                          {st.title}
                        </h4>
                        <span className="text-sm font-black text-amber-500 font-mono">
                          €{st.priceEUR.toLocaleString()}
                        </span>
                      </div>
                      <p className="text-[11px] text-neutral-500 dark:text-neutral-400 leading-relaxed">
                        {st.description}
                      </p>
                      <div className="flex items-center justify-between pt-2">
                        <span className="text-[10px] font-mono text-neutral-400">
                          {st.durationMinutes} Minutes • HD Video Call
                        </span>
                        <button
                          onClick={() => handleStartBooking(st)}
                          className="px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-[11px] transition-colors"
                        >
                          Book Now
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
