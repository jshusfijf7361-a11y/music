import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useApp } from '../context/AppContext';
import { Course } from '../types';
import { Play, Clock, BookOpen, Star, Sparkles, CheckCircle2 } from 'lucide-react';

export const FreeLearningSection: React.FC = () => {
  const { t } = useLanguage();
  const { courses, setSelectedCourse, user, enrollInCourse } = useApp();
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('All');

  const categories = ['All', 'Music Production', 'Vocals', 'Music Theory', 'Mixing & Mastering', 'Songwriting', 'Music Business'];

  const filteredCourses = selectedCategoryFilter === 'All'
    ? courses
    : courses.filter((c) => c.category === selectedCategoryFilter);

  const handleStartCourse = (course: Course) => {
    enrollInCourse(course.id);
    setSelectedCourse(course);
  };

  return (
    <section className="py-20 md:py-28 bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 border-b border-neutral-200/60 dark:border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs font-mono font-bold tracking-widest uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>100% FREE CURRICULUM</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-neutral-900 dark:text-neutral-50">
            {t('free.title', 'Learn Music. For Free.')}
          </h2>

          <p className="mt-3 text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
            {t('free.subtitle', 'Start your journey today with full access to interactive courses taught by industry legends and master educators.')}
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {categories.map((cat) => {
              const isActive = selectedCategoryFilter === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategoryFilter(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-amber-500 text-neutral-950 font-bold shadow-md shadow-amber-500/20'
                      : 'bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-800 border border-neutral-200 dark:border-neutral-800'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => {
            const isEnrolled = user.enrolledCourseIds.includes(course.id);
            const progress = user.courseProgress[course.id] || 0;

            return (
              <div
                key={course.id}
                className="group relative rounded-3xl overflow-hidden bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800/90 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
              >
                
                {/* Course Banner Image */}
                <div className="relative h-52 w-full overflow-hidden bg-neutral-800">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent" />
                  
                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-amber-500 text-neutral-950 font-black text-[10px] tracking-wider uppercase shadow-md">
                      {course.badge}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-neutral-950/80 backdrop-blur-md text-neutral-200 font-mono text-[10px] uppercase border border-neutral-700">
                      {course.level}
                    </span>
                  </div>

                  <div className="absolute top-4 right-4 flex items-center gap-1 px-2.5 py-1 rounded-full bg-neutral-950/80 backdrop-blur-md text-amber-400 text-xs font-bold border border-amber-500/30">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{course.rating}</span>
                  </div>
                </div>

                {/* Course Details */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 text-xs text-neutral-500 dark:text-neutral-400 mb-2 font-mono">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-amber-500" />
                        {course.duration}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <BookOpen className="w-3.5 h-3.5 text-amber-500" />
                        {course.lessonsCount} Lessons
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-50 group-hover:text-amber-500 transition-colors line-clamp-2">
                      {course.title}
                    </h3>

                    <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-2 line-clamp-2 leading-relaxed">
                      {course.description}
                    </p>
                  </div>

                  {/* Instructor Bio & Progress */}
                  <div className="mt-6 pt-4 border-t border-neutral-200 dark:border-neutral-800">
                    
                    <div className="flex items-center gap-3 mb-4">
                      <img
                        src={course.instructorAvatar}
                        alt={course.instructor}
                        className="w-9 h-9 rounded-full object-cover border border-amber-500/40"
                      />
                      <div>
                        <div className="text-xs font-bold text-neutral-900 dark:text-neutral-100">
                          {course.instructor}
                        </div>
                        <div className="text-[10px] text-neutral-500 dark:text-neutral-400 truncate max-w-[200px]">
                          {course.instructorRole}
                        </div>
                      </div>
                    </div>

                    {/* Progress Bar if enrolled */}
                    {isEnrolled && (
                      <div className="mb-4">
                        <div className="flex justify-between items-center text-[10px] font-mono text-neutral-500 dark:text-neutral-400 mb-1">
                          <span>Progress</span>
                          <span className="font-bold text-amber-500">{progress}%</span>
                        </div>
                        <div className="w-full h-1.5 rounded-full bg-neutral-200 dark:bg-neutral-800 overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full transition-all duration-500"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {/* CTA Button */}
                    <button
                      onClick={() => handleStartCourse(course)}
                      className="w-full py-3 rounded-xl bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-amber-500 dark:hover:bg-amber-400 hover:text-neutral-950 transition-all shadow-md"
                    >
                      {isEnrolled ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-amber-400 dark:text-neutral-950" />
                          <span>{t('free.continueBtn', 'Continue Learning')}</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4 fill-current" />
                          <span>{t('free.startBtn', 'Start Learning Free')}</span>
                        </>
                      )}
                    </button>

                  </div>

                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
