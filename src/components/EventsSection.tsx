import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useApp } from '../context/AppContext';
import { EventItem } from '../types';
import { Calendar, MapPin, Clock, Users, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

export const EventsSection: React.FC = () => {
  const { t } = useLanguage();
  const { events, addToast } = useApp();
  const [registeredEvents, setRegisteredEvents] = useState<string[]>([]);

  const handleRegister = (evt: EventItem) => {
    if (!registeredEvents.includes(evt.id)) {
      setRegisteredEvents((prev) => [...prev, evt.id]);
      addToast(`Registered for "${evt.title}"! Video access link sent to your email.`, 'success');
    }
  };

  return (
    <section className="py-20 md:py-28 bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 border-b border-neutral-200/60 dark:border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-neutral-200 dark:border-neutral-800">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs font-mono font-bold tracking-widest uppercase mb-4">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>LIVE WORKSHOPS & CONFERENCES</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-neutral-900 dark:text-neutral-50">
              {t('events.title', 'Upcoming Events & Masterclasses')}
            </h2>
            <p className="mt-3 text-base text-neutral-600 dark:text-neutral-400 max-w-2xl">
              {t('events.subtitle', 'Join live virtual workshops, international conferences, and artist Q&A sessions.')}
            </p>
          </div>
        </div>

        {/* Events Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {events.map((evt) => {
            const isRegistered = registeredEvents.includes(evt.id);

            return (
              <div
                key={evt.id}
                className="group rounded-3xl overflow-hidden bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
              >
                
                {/* Event Image */}
                <div className="relative h-48 w-full overflow-hidden bg-neutral-800">
                  <img
                    src={evt.image}
                    alt={evt.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent" />

                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-amber-500 text-neutral-950 font-black text-[10px] tracking-wider uppercase">
                      {evt.type}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-emerald-500 text-neutral-950 font-bold text-[10px] tracking-wider uppercase">
                      {t('events.freeTag', 'FREE ENTRY')}
                    </span>
                  </div>
                </div>

                {/* Event Details */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center gap-3 text-xs text-neutral-500 dark:text-neutral-400 font-mono mb-2">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-amber-500" />
                        {evt.date}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-amber-500" />
                        {evt.time} {evt.timezone}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-50 group-hover:text-amber-500 transition-colors">
                      {evt.title}
                    </h3>

                    <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-2 leading-relaxed">
                      {evt.description}
                    </p>

                    <div className="mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-800 text-xs text-neutral-500 space-y-1">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-amber-500" />
                        <span>{evt.location}</span>
                      </div>
                      <div className="flex items-center gap-1.5 font-semibold text-neutral-800 dark:text-neutral-200">
                        <Users className="w-3.5 h-3.5 text-amber-500" />
                        <span>Host: {evt.host} ({evt.hostRole})</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleRegister(evt)}
                    className={`w-full py-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                      isRegistered
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                        : 'bg-amber-500 hover:bg-amber-400 text-neutral-950 shadow-md'
                    }`}
                  >
                    {isRegistered ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>Registered For Live Stream</span>
                      </>
                    ) : (
                      <>
                        <span>{t('events.register', 'Register Now')}</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
