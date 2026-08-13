import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Play,
  CheckCircle,
  FileText,
  Download,
  Award,
  Clock,
  Sparkles,
  MessageSquare,
  BookOpen,
} from 'lucide-react';

export const CourseDetailModal: React.FC = () => {
  const { selectedCourse, setSelectedCourse, user, completeLesson, addToast } = useApp();
  const [activeTab, setActiveTab] = useState<'lessons' | 'resources' | 'discussion' | 'certificate'>('lessons');
  const [activeLessonIndex, setActiveLessonIndex] = useState(0);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState<string[]>([
    'This breakdown of diaphragmatic breath support is incredible! Solved my throat tension issue immediately.',
    'Amazing lesson! Love how simple the harmony explanations are.',
  ]);

  if (!selectedCourse) return null;

  const currentLesson = selectedCourse.lessons[activeLessonIndex] || selectedCourse.lessons[0];
  const isLessonCompleted = user?.completedLessonIds?.includes(currentLesson.id) || false;
  const progress = user?.courseProgress?.[selectedCourse.id] || 0;
  const hasCertificate = progress >= 100;

  const handleToggleComplete = () => {
    completeLesson(selectedCourse.id, currentLesson.id);
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    setComments([commentText, ...comments]);
    setCommentText('');
    addToast('Comment posted to student community board!', 'info');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-6xl h-[92vh] bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 md:p-6 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50/80 dark:bg-neutral-900/80">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-amber-500 text-neutral-950 font-mono text-[10px] font-black uppercase">
              {selectedCourse.category}
            </span>
            <div>
              <h2 className="text-lg md:text-xl font-bold text-neutral-900 dark:text-neutral-100 truncate max-w-xl">
                {selectedCourse.title}
              </h2>
              <div className="text-xs text-neutral-500 dark:text-neutral-400">
                Instructor: <span className="font-semibold text-neutral-800 dark:text-neutral-200">{selectedCourse.instructor}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Overall Progress Badge */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-200 dark:bg-neutral-800 text-xs font-mono">
              <span className="text-neutral-500 dark:text-neutral-400">Progress:</span>
              <span className="font-bold text-amber-500">{progress}%</span>
            </div>

            <button
              onClick={() => setSelectedCourse(null)}
              className="p-2 rounded-xl text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Modal Main Content */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
          
          {/* Left / Top: Interactive Video Player Area (7 Cols) */}
          <div className="lg:col-span-7 bg-black flex flex-col justify-between overflow-y-auto">
            
            {/* Simulated Video Player */}
            <div className="relative w-full aspect-video bg-neutral-900 flex items-center justify-center overflow-hidden group">
              <img
                src={selectedCourse.image}
                alt={selectedCourse.title}
                className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

              {/* Play Center Overlay */}
              <button
                onClick={handleToggleComplete}
                className="relative z-10 w-20 h-20 rounded-full bg-amber-500 text-neutral-950 flex items-center justify-center shadow-2xl hover:scale-110 transition-transform cursor-pointer"
              >
                <Play className="w-8 h-8 fill-neutral-950 ml-1" />
              </button>

              <div className="absolute bottom-4 left-4 right-4 text-white flex justify-between items-center text-xs font-mono">
                <span className="bg-black/80 px-2.5 py-1 rounded border border-neutral-700">
                  {currentLesson.title}
                </span>
                <span className="bg-amber-500/20 text-amber-400 px-2.5 py-1 rounded border border-amber-500/30 font-bold">
                  {currentLesson.duration}
                </span>
              </div>
            </div>

            {/* Lesson Details & Action */}
            <div className="p-6 text-white space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold">{currentLesson.title}</h3>
                  <p className="text-xs text-neutral-400 mt-1">{currentLesson.description}</p>
                </div>

                <button
                  onClick={handleToggleComplete}
                  className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all ${
                    isLessonCompleted
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                      : 'bg-amber-500 hover:bg-amber-400 text-neutral-950'
                  }`}
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>{isLessonCompleted ? 'Completed' : 'Mark as Completed'}</span>
                </button>
              </div>

              {/* Course Outcomes */}
              <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 text-xs">
                <div className="font-bold text-amber-400 mb-2 font-mono flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Key Takeaways From This Module:
                </div>
                <ul className="list-disc list-inside text-neutral-300 space-y-1">
                  {selectedCourse.learningOutcomes.map((out, idx) => (
                    <li key={idx}>{out}</li>
                  ))}
                </ul>
              </div>
            </div>

          </div>

          {/* Right: Tabs & Playlist Sidebar (5 Cols) */}
          <div className="lg:col-span-5 bg-neutral-50 dark:bg-neutral-900 border-l border-neutral-200 dark:border-neutral-800 flex flex-col h-full overflow-hidden">
            
            {/* Tabs Nav */}
            <div className="flex border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 text-xs font-bold">
              <button
                onClick={() => setActiveTab('lessons')}
                className={`flex-1 py-3.5 text-center border-b-2 transition-colors ${
                  activeTab === 'lessons'
                    ? 'border-amber-500 text-amber-600 dark:text-amber-400'
                    : 'border-transparent text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200'
                }`}
              >
                Lessons ({selectedCourse.lessons.length})
              </button>

              <button
                onClick={() => setActiveTab('resources')}
                className={`flex-1 py-3.5 text-center border-b-2 transition-colors ${
                  activeTab === 'resources'
                    ? 'border-amber-500 text-amber-600 dark:text-amber-400'
                    : 'border-transparent text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200'
                }`}
              >
                Resources
              </button>

              <button
                onClick={() => setActiveTab('discussion')}
                className={`flex-1 py-3.5 text-center border-b-2 transition-colors ${
                  activeTab === 'discussion'
                    ? 'border-amber-500 text-amber-600 dark:text-amber-400'
                    : 'border-transparent text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200'
                }`}
              >
                Q&A ({comments.length})
              </button>

              <button
                onClick={() => setActiveTab('certificate')}
                className={`flex-1 py-3.5 text-center border-b-2 transition-colors ${
                  activeTab === 'certificate'
                    ? 'border-amber-500 text-amber-600 dark:text-amber-400'
                    : 'border-transparent text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200'
                }`}
              >
                Certificate
              </button>
            </div>

            {/* Tab Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              
              {/* TAB 1: LESSONS PLAYLIST */}
              {activeTab === 'lessons' && (
                <div className="space-y-2">
                  {selectedCourse.lessons.map((lesson, idx) => {
                    const isSelected = idx === activeLessonIndex;
                    const isDone = user.completedLessonIds.includes(lesson.id);

                    return (
                      <button
                        key={lesson.id}
                        onClick={() => setActiveLessonIndex(idx)}
                        className={`w-full p-3.5 rounded-2xl border text-left transition-all flex items-center justify-between ${
                          isSelected
                            ? 'bg-amber-500/10 border-amber-500/60 text-neutral-900 dark:text-neutral-100 font-bold'
                            : 'bg-white dark:bg-neutral-950 border-neutral-200 dark:border-neutral-800/80 hover:border-neutral-300 dark:hover:border-neutral-700 text-neutral-700 dark:text-neutral-300'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-mono font-bold ${
                              isDone
                                ? 'bg-emerald-500 text-neutral-950'
                                : isSelected
                                ? 'bg-amber-500 text-neutral-950'
                                : 'bg-neutral-200 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400'
                            }`}
                          >
                            {isDone ? <CheckCircle className="w-4 h-4" /> : idx + 1}
                          </div>
                          <div>
                            <div className="text-xs font-semibold">{lesson.title}</div>
                            <div className="text-[10px] text-neutral-500 dark:text-neutral-400 flex items-center gap-1 mt-0.5">
                              <Clock className="w-3 h-3 text-amber-500" />
                              {lesson.duration}
                            </div>
                          </div>
                        </div>

                        {isSelected && <Play className="w-4 h-4 text-amber-500 fill-amber-500" />}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* TAB 2: RESOURCES */}
              {activeTab === 'resources' && (
                <div className="space-y-3">
                  <div className="p-4 rounded-2xl bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-amber-500" />
                        <div>
                          <div className="text-xs font-bold">Course Syllabus & Audio Stem Sheets</div>
                          <div className="text-[10px] text-neutral-400">PDF • 4.2 MB</div>
                        </div>
                      </div>
                      <button
                        onClick={() => addToast('Downloading course resource packet...', 'info')}
                        className="px-3 py-1.5 rounded-lg bg-amber-500 text-neutral-950 text-xs font-bold flex items-center gap-1"
                      >
                        <Download className="w-3.5 h-3.5" />
                        PDF
                      </button>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <BookOpen className="w-5 h-5 text-amber-500" />
                        <div>
                          <div className="text-xs font-bold">DAW Project Template (Logic / Ableton)</div>
                          <div className="text-[10px] text-neutral-400">ZIP • 18.5 MB</div>
                        </div>
                      </div>
                      <button
                        onClick={() => addToast('Downloading DAW template file...', 'info')}
                        className="px-3 py-1.5 rounded-lg bg-amber-500 text-neutral-950 text-xs font-bold flex items-center gap-1"
                      >
                        <Download className="w-3.5 h-3.5" />
                        ZIP
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: DISCUSSION */}
              {activeTab === 'discussion' && (
                <div className="space-y-4">
                  <form onSubmit={handleAddComment} className="flex gap-2">
                    <input
                      type="text"
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      placeholder="Ask instructor or share feedback..."
                      className="flex-1 px-3.5 py-2.5 rounded-xl text-xs bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2.5 rounded-xl bg-amber-500 text-neutral-950 font-bold text-xs"
                    >
                      Post
                    </button>
                  </form>

                  <div className="space-y-2">
                    {comments.map((cmt, i) => (
                      <div key={i} className="p-3 rounded-xl bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-xs">
                        <div className="flex items-center gap-2 mb-1">
                          <MessageSquare className="w-3.5 h-3.5 text-amber-500" />
                          <span className="font-bold text-neutral-800 dark:text-neutral-200">Community Student</span>
                        </div>
                        <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">{cmt}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: CERTIFICATE */}
              {activeTab === 'certificate' && (
                <div className="p-6 rounded-3xl bg-white dark:bg-neutral-950 border border-amber-500/40 text-center space-y-4">
                  <Award className="w-12 h-12 text-amber-500 mx-auto" />
                  
                  {hasCertificate ? (
                    <div>
                      <h4 className="text-lg font-extrabold text-neutral-900 dark:text-neutral-100">
                        Certificate Earned!
                      </h4>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                        Verified by The Global Talents Foundation.
                      </p>
                      <div className="mt-4 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs font-mono">
                        <div className="font-bold text-neutral-800 dark:text-neutral-200">{selectedCourse.title}</div>
                        <div className="text-[10px] text-amber-600 dark:text-amber-400 mt-1">ID: AURA-CERT-2026-99120</div>
                      </div>
                      <button
                        onClick={() => addToast('Downloading high-resolution PDF certificate...', 'success')}
                        className="mt-4 px-6 py-2.5 rounded-full bg-amber-500 text-neutral-950 font-bold text-xs uppercase tracking-wider shadow-md"
                      >
                        Download PDF Certificate
                      </button>
                    </div>
                  ) : (
                    <div>
                      <h4 className="text-base font-bold text-neutral-800 dark:text-neutral-200">
                        Complete All Modules To Earn Your Certificate
                      </h4>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                        You have completed <span className="font-bold text-amber-500">{progress}%</span> of this course.
                      </p>
                    </div>
                  )}
                </div>
              )}

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
