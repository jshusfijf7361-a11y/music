import React from 'react';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import {
  X,
  BookOpen,
  Calendar,
  Award,
  FileText,
  User,
  CheckCircle,
  Globe,
  Sun,
  Moon,
  Sparkles,
} from 'lucide-react';

export const UserDashboardModal: React.FC = () => {
  const {
    isDashboardOpen,
    setIsDashboardOpen,
    user,
    courses,
    resources,
    setSelectedCourse,
    setIsAdminOpen,
  } = useApp();

  const { language } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  if (!isDashboardOpen) return null;

  const enrolledCourses = courses.filter((c) => user.enrolledCourseIds.includes(c.id));
  const savedResources = resources.filter((r) => user.savedResourceIds.includes(r.id));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-4xl my-auto bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-3xl shadow-2xl overflow-hidden text-neutral-900 dark:text-neutral-100 p-6 md:p-8">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-6 border-b border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center gap-4">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-12 h-12 rounded-full object-cover border-2 border-amber-500"
            />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-50">
                  {user.name}
                </h2>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-500 font-mono text-[10px] font-bold uppercase">
                  {user.role}
                </span>
              </div>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                {user.email} • {user.country}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsDashboardOpen(false)}
            className="p-2 rounded-xl text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Dashboard Sections */}
        <div className="space-y-8 my-6">
          
          {/* SECTION 1: Enrolled Courses & Progress */}
          <div>
            <h3 className="text-xs font-mono font-bold text-amber-500 uppercase tracking-widest mb-3 flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Active Enrolled Courses ({enrolledCourses.length})
            </h3>

            {enrolledCourses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {enrolledCourses.map((c) => {
                  const progress = user.courseProgress[c.id] || 0;
                  return (
                    <div
                      key={c.id}
                      onClick={() => {
                        setSelectedCourse(c);
                        setIsDashboardOpen(false);
                      }}
                      className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-amber-500/60 transition-all cursor-pointer space-y-2"
                    >
                      <div className="flex justify-between items-start">
                        <span className="text-xs font-bold text-neutral-900 dark:text-neutral-100 line-clamp-1">
                          {c.title}
                        </span>
                        <span className="text-xs font-mono font-bold text-amber-500">
                          {progress}%
                        </span>
                      </div>
                      
                      <div className="w-full h-1.5 rounded-full bg-neutral-200 dark:bg-neutral-800 overflow-hidden">
                        <div
                          className="h-full bg-amber-500 rounded-full transition-all"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      <div className="text-[10px] text-neutral-400 font-mono">
                        Instructor: {c.instructor}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-xs text-neutral-500">No active enrolled courses yet.</p>
            )}
          </div>

          {/* SECTION 2: Booked 1-on-1 Sessions */}
          <div>
            <h3 className="text-xs font-mono font-bold text-amber-500 uppercase tracking-widest mb-3 flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Upcoming Private Sessions ({user.bookings.length})
            </h3>

            {user.bookings.length > 0 ? (
              <div className="space-y-2">
                {user.bookings.map((bk) => (
                  <div
                    key={bk.id}
                    className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="font-bold text-neutral-900 dark:text-neutral-100">
                        {bk.artistName} • {bk.sessionTitle}
                      </div>
                      <div className="text-[10px] text-neutral-500 dark:text-neutral-400 font-mono mt-0.5">
                        Date: {bk.date} @ {bk.timeSlot} ({bk.durationMinutes} min)
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 font-mono font-bold text-[10px] uppercase">
                      {bk.status}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-neutral-500">No upcoming private artist bookings.</p>
            )}
          </div>

          {/* SECTION 3: Earned Certificates */}
          <div>
            <h3 className="text-xs font-mono font-bold text-amber-500 uppercase tracking-widest mb-3 flex items-center gap-2">
              <Award className="w-4 h-4" />
              Earned Foundation Certificates ({user.certificates.length})
            </h3>

            {user.certificates.length > 0 ? (
              <div className="space-y-2">
                {user.certificates.map((cert) => (
                  <div
                    key={cert.certificateId}
                    className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="font-bold text-neutral-900 dark:text-neutral-100">
                        {cert.courseTitle}
                      </div>
                      <div className="text-[10px] text-amber-500 font-mono mt-0.5">
                        ID: {cert.certificateId} • Issued: {cert.issueDate}
                      </div>
                    </div>
                    <button className="px-3 py-1.5 rounded-lg bg-amber-500 text-neutral-950 font-bold text-[10px]">
                      Download PDF
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-neutral-500">Complete 100% of any course to earn a certificate.</p>
            )}
          </div>

          {/* SECTION 4: Preferences & Admin Entry */}
          <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between text-xs">
            <div className="flex items-center gap-3">
              <span className="text-neutral-500 font-mono">Theme:</span>
              <button
                onClick={toggleTheme}
                className="px-3 py-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-900 font-bold uppercase"
              >
                {theme}
              </button>
            </div>

            <button
              onClick={() => {
                setIsAdminOpen(true);
                setIsDashboardOpen(false);
              }}
              className="text-amber-500 hover:underline font-mono font-bold"
            >
              ★ Access Foundation Admin Portal
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
