import React from 'react';
import { useApp } from '../context/AppContext';
import { Search, X, BookOpen, User, Calendar, FileText, ArrowRight } from 'lucide-react';

export const SearchModal: React.FC = () => {
  const {
    isSearchOpen,
    setIsSearchOpen,
    searchQuery,
    setSearchQuery,
    courses,
    artists,
    events,
    resources,
    setSelectedCourse,
    setSelectedArtist,
  } = useApp();

  if (!isSearchOpen) return null;

  const query = searchQuery.toLowerCase().trim();

  const matchingCourses = query
    ? courses.filter((c) => c.title.toLowerCase().includes(query) || c.category.toLowerCase().includes(query))
    : courses.slice(0, 3);

  const matchingArtists = query
    ? artists.filter((a) => a.name.toLowerCase().includes(query) || a.role.toLowerCase().includes(query))
    : artists.slice(0, 3);

  const matchingResources = query
    ? resources.filter((r) => r.title.toLowerCase().includes(query))
    : resources.slice(0, 2);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-3 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-3xl shadow-2xl overflow-hidden text-neutral-900 dark:text-neutral-100 p-6">
        
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 pb-4 border-b border-neutral-200 dark:border-neutral-800">
          <Search className="w-5 h-5 text-amber-500 shrink-0" />
          <input
            type="text"
            autoFocus
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search courses, mentors, vocal guides, theory..."
            className="flex-1 bg-transparent text-sm md:text-base text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:outline-none font-medium"
          />
          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-1.5 rounded-xl text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Container */}
        <div className="mt-4 space-y-6 max-h-[60vh] overflow-y-auto pr-1">
          {/* Courses */}
          {matchingCourses.length > 0 && (
            <div>
              <div className="text-[10px] font-mono font-bold uppercase text-neutral-400 tracking-widest mb-2 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-amber-500" />
                Academy Courses ({matchingCourses.length})
              </div>
              <div className="space-y-2">
                {matchingCourses.map((c) => (
                  <div
                    key={c.id}
                    onClick={() => {
                      setSelectedCourse(c);
                      setIsSearchOpen(false);
                    }}
                    className="p-3 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-amber-500 transition-all cursor-pointer flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="font-bold text-neutral-900 dark:text-neutral-100">{c.title}</div>
                      <div className="text-[10px] text-neutral-400 font-mono">{c.category} • {c.instructor}</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-amber-500" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Mentors */}
          {matchingArtists.length > 0 && (
            <div>
              <div className="text-[10px] font-mono font-bold uppercase text-neutral-400 tracking-widest mb-2 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-amber-500" />
                Global Mentors & Artists ({matchingArtists.length})
              </div>
              <div className="space-y-2">
                {matchingArtists.map((a) => (
                  <div
                    key={a.id}
                    onClick={() => {
                      setSelectedArtist(a);
                      setIsSearchOpen(false);
                    }}
                    className="p-3 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-amber-500 transition-all cursor-pointer flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <img src={a.image} alt={a.name} className="w-8 h-8 rounded-full object-cover" />
                      <div>
                        <div className="font-bold text-neutral-900 dark:text-neutral-100">{a.name}</div>
                        <div className="text-[10px] text-amber-500 font-mono">{a.role}</div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-amber-500" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Resources */}
          {matchingResources.length > 0 && (
            <div>
              <div className="text-[10px] font-mono font-bold uppercase text-neutral-400 tracking-widest mb-2 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-amber-500" />
                Downloadable Resources
              </div>
              <div className="space-y-2">
                {matchingResources.map((r) => (
                  <div
                    key={r.id}
                    className="p-3 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs flex justify-between items-center"
                  >
                    <div>
                      <div className="font-bold text-neutral-900 dark:text-neutral-100">{r.title}</div>
                      <div className="text-[10px] text-neutral-400 font-mono">{r.format} • {r.fileSize}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
