export type Theme = 'light' | 'dark';

export type LanguageCode = string;

export interface Language {
  code: LanguageCode;
  name: string;
  nativeName: string;
  flag: string;
  rtl?: boolean;
  region?: 'Americas' | 'Europe' | 'Asia & Pacific' | 'Middle East & Africa';
}

export type SkillLevel = 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  videoUrl?: string;
  description: string;
  isCompleted?: boolean;
  resources?: { name: string; url: string; size: string }[];
}

export interface CourseCategory {
  id: string;
  nameKey: string;
  defaultName: string;
  iconName: string;
  descriptionKey: string;
  defaultDescription: string;
  image: string;
  courseCount: number;
  featuredTopic: string;
}

export interface Course {
  id: string;
  title: string;
  instructor: string;
  instructorRole: string;
  instructorAvatar: string;
  category: string;
  level: SkillLevel;
  duration: string;
  lessonsCount: number;
  rating: number;
  enrolledStudents: number;
  image: string;
  badge: 'Free' | 'Featured' | 'New' | 'Masterclass';
  description: string;
  lessons: Lesson[];
  prerequisites?: string[];
  learningOutcomes: string[];
}

export interface MentorshipSessionType {
  id: string;
  title: string;
  description: string;
  durationMinutes: number;
  priceEUR: number;
}

export interface Artist {
  id: string;
  name: string;
  role: string;
  genre: string[];
  instruments: string[];
  country: string;
  countryFlag: string;
  image: string;
  coverImage: string;
  bio: string;
  verified: boolean;
  isAvailableForMentorship: boolean;
  sessionTypes: MentorshipSessionType[];
  discography: { title: string; year: string; streamCount?: string; coverUrl?: string }[];
  teachingSpecialties: string[];
  achievements: string[];
  videoHighlightUrl?: string;
  socials: { spotify?: string; instagram?: string; youtube?: string; website?: string };
}

export interface Booking {
  id: string;
  artistId: string;
  artistName: string;
  sessionTitle: string;
  durationMinutes: number;
  priceEUR: number;
  date: string;
  timeSlot: string;
  userName: string;
  userEmail: string;
  notes?: string;
  status: 'Confirmed' | 'Pending' | 'Completed';
  createdAt: string;
}

export interface EventItem {
  id: string;
  title: string;
  type: 'Live Workshop' | 'Masterclass' | 'Conference' | 'Artist Talk' | 'Global Challenge';
  date: string;
  time: string;
  timezone: string;
  isOnline: boolean;
  location: string;
  host: string;
  hostRole: string;
  image: string;
  description: string;
  isFree: boolean;
  priceEUR?: number;
  registeredCount: number;
}

export interface ResourceItem {
  id: string;
  title: string;
  category: 'Articles' | 'Guides' | 'Templates' | 'Exercises' | 'Theory Sheets' | 'Industry Guides';
  format: 'PDF' | 'ZIP' | 'Audio Sheet' | 'DAW Template' | 'Article';
  description: string;
  downloadUrl: string;
  fileSize?: string;
  readTime?: string;
  featured: boolean;
  image: string;
}

export interface Testimonial {
  id: string;
  name: string;
  country: string;
  countryFlag: string;
  role: string;
  beforeStory: string;
  afterAchievement: string;
  quote: string;
  avatar: string;
  audioSample?: string;
}

export interface Donation {
  id: string;
  amountEUR: number;
  donorName: string;
  donorEmail: string;
  message?: string;
  date: string;
  isRecurring?: boolean;
}

export interface PartnerWaitlistEntry {
  id: string;
  name: string;
  phone: string;
  email?: string;
  organization?: string;
  notes?: string;
  createdAt: string;
  status: 'Pending' | 'Contacted' | 'Approved' | 'Declined';
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'Student' | 'Artist' | 'Admin';
  avatar: string;
  country: string;
  selectedInterests: string[];
  enrolledCourseIds: string[];
  courseProgress: Record<string, number>; // courseId -> percentage (0-100)
  completedLessonIds: string[];
  savedResourceIds: string[];
  certificates: { courseId: string; courseTitle: string; issueDate: string; certificateId: string }[];
  bookings: Booking[];
  donations: Donation[];
}

export type AboutTab = 'foundation' | 'vision' | 'mission' | 'founder' | 'board' | 'structure';

export type ActiveView = 
  | 'home' 
  | 'academy' 
  | 'courses' 
  | 'artists' 
  | 'events' 
  | 'resources' 
  | 'community' 
  | 'about' 
  | 'about-foundation'
  | 'vision'
  | 'mission'
  | 'founders-chronicle'
  | 'board-of-directors'
  | 'donate' 
  | 'dashboard' 
  | 'admin';
