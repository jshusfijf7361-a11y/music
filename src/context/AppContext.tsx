import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  ActiveView,
  AboutTab,
  Course,
  Artist,
  Booking,
  UserProfile,
  LocalUserAccount,
  EventItem,
  ResourceItem,
  Donation,
  PartnerWaitlistEntry,
} from '../types';
import {
  MOCK_COURSES,
  MOCK_ARTISTS,
  MOCK_EVENTS,
  MOCK_RESOURCES,
} from '../data/mockData';

interface Toast {
  id: string;
  type: 'success' | 'info' | 'error';
  message: string;
}

interface AppContextType {
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
  
  aboutTab: AboutTab;
  setAboutTab: (tab: AboutTab) => void;
  navigateToAboutTab: (tab: AboutTab) => void;
  
  courses: Course[];
  selectedCourse: Course | null;
  setSelectedCourse: (course: Course | null) => void;
  
  artists: Artist[];
  selectedArtist: Artist | null;
  setSelectedArtist: (artist: Artist | null) => void;
  
  events: EventItem[];
  resources: ResourceItem[];
  
  // User Authentication & Profile
  user: UserProfile | null;
  setUser: React.Dispatch<React.SetStateAction<UserProfile | null>>;
  isLoggedIn: boolean;
  
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  authModalTab: 'signup' | 'signin';
  setAuthModalTab: (tab: 'signup' | 'signin') => void;
  openAuthModal: (tab?: 'signup' | 'signin') => void;
  
  signUpLocalUser: (data: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
  }) => { success: boolean; error?: string };

  signInLocalUser: (
    email: string,
    pass: string
  ) => { success: boolean; error?: string };

  logOutUser: () => void;
  deleteUserAccount: () => void;
  updateProfilePhoto: (dataUrl: string) => void;
  removeProfilePhoto: () => void;
  changeUserPassword: (currentPass: string, newPass: string) => { success: boolean; error?: string };
  
  // Modals & Search
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  
  isAIMentorOpen: boolean;
  setIsAIMentorOpen: (open: boolean) => void;
  isAiMentorOpen: boolean;
  setIsAiMentorOpen: (open: boolean) => void;
  
  isLanguageModalOpen: boolean;
  setIsLanguageModalOpen: (open: boolean) => void;
  
  isBookingOpen: boolean;
  setIsBookingOpen: (open: boolean) => void;
  bookingArtist: Artist | null;
  setBookingArtist: (artist: Artist | null) => void;
  
  isDonateOpen: boolean;
  setIsDonateOpen: (open: boolean) => void;
  
  isDashboardOpen: boolean;
  setIsDashboardOpen: (open: boolean) => void;
  
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
  
  isPartnerModalOpen: boolean;
  setIsPartnerModalOpen: (open: boolean) => void;

  isCipherAuthModalOpen: boolean;
  setIsCipherAuthModalOpen: (open: boolean) => void;
  isCipherAuthenticated: boolean;
  setIsCipherAuthenticated: (auth: boolean) => void;
  sessionToken: string | null;
  setSessionToken: (token: string | null) => void;
  cypherLogout: () => Promise<void>;

  partnerWaitlist: PartnerWaitlistEntry[];
  addPartnerWaitlistEntry: (entry: Omit<PartnerWaitlistEntry, 'id' | 'createdAt' | 'status'>) => void;
  updatePartnerWaitlistStatus: (id: string, status: PartnerWaitlistEntry['status']) => void;
  deletePartnerWaitlistEntry: (id: string) => void;
  
  // Actions
  enrollInCourse: (courseId: string) => void;
  completeLesson: (courseId: string, lessonId: string) => void;
  createBooking: (booking: Omit<Booking, 'id' | 'createdAt' | 'status'>) => void;
  addDonation: (amountEUR: number, message?: string) => void;
  
  // Toasts
  toasts: Toast[];
  addToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  removeToast: (id: string) => void;
}

const GTF_ACCOUNTS_KEY = 'gtf_local_user_accounts';
const GTF_SESSION_KEY = 'gtf_active_user_session';

const getStoredAccounts = (): LocalUserAccount[] => {
  try {
    const saved = localStorage.getItem(GTF_ACCOUNTS_KEY);
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.error('Error reading local accounts', e);
  }
  return [];
};

const saveStoredAccounts = (accounts: LocalUserAccount[]) => {
  try {
    localStorage.setItem(GTF_ACCOUNTS_KEY, JSON.stringify(accounts));
  } catch (e) {
    console.error('Error saving local accounts', e);
  }
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeView, setActiveView] = useState<ActiveView>('home');
  const [aboutTab, setAboutTab] = useState<AboutTab>('foundation');

  const navigateToAboutTab = (tab: AboutTab) => {
    setAboutTab(tab);
    if (tab === 'foundation') setActiveView('about-foundation');
    else if (tab === 'vision') setActiveView('vision');
    else if (tab === 'mission') setActiveView('mission');
    else if (tab === 'founder') setActiveView('founders-chronicle');
    else if (tab === 'structure') setActiveView('organizational-structure');
    else setActiveView('about-foundation');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const [courses] = useState<Course[]>(MOCK_COURSES);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  
  const [artists] = useState<Artist[]>(MOCK_ARTISTS);
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);
  
  const [events] = useState<EventItem[]>(MOCK_EVENTS);
  const [resources] = useState<ResourceItem[]>(MOCK_RESOURCES);
  
  // User Authentication State (Frontend-Only LocalStorage persistence)
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const activeId = localStorage.getItem(GTF_SESSION_KEY);
      if (activeId) {
        const accounts = getStoredAccounts();
        const account = accounts.find((a) => a.id === activeId);
        if (account) {
          return {
            id: account.id,
            firstName: account.firstName,
            lastName: account.lastName,
            name: `${account.firstName} ${account.lastName}`,
            email: account.email,
            phone: account.phone || '',
            role: account.role || 'Student',
            avatar: account.avatarUrl || '',
            country: account.country || 'Global',
            selectedInterests: ['Music Production', 'Vocals'],
            enrolledCourseIds: account.enrolledCourseIds || [],
            courseProgress: account.courseProgress || {},
            completedLessonIds: account.completedLessonIds || [],
            savedResourceIds: account.savedResourceIds || [],
            certificates: account.certificates || [],
            bookings: account.bookings || [],
            donations: account.donations || [],
          };
        }
      }
    } catch (e) {
      console.error('Error loading initial session', e);
    }
    return null;
  });

  const isLoggedIn = !!user;

  // Auth Modal State
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<'signup' | 'signin'>('signup');

  const openAuthModal = (tab: 'signup' | 'signin' = 'signup') => {
    setAuthModalTab(tab);
    setIsAuthModalOpen(true);
  };

  const signUpLocalUser = (data: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
  }) => {
    const accounts = getStoredAccounts();
    const cleanEmail = data.email.trim().toLowerCase();
    const existing = accounts.find((a) => a.email.toLowerCase() === cleanEmail);

    if (existing) {
      return { success: false, error: 'An account with this email already exists. Please sign in.' };
    }

    const newAccount: LocalUserAccount = {
      id: `usr-${Date.now()}`,
      firstName: data.firstName.trim(),
      lastName: data.lastName.trim(),
      email: cleanEmail,
      phone: data.phone.trim(),
      password: data.password,
      avatarUrl: '',
      role: 'Student',
      createdAt: new Date().toISOString(),
      enrolledCourseIds: [],
      courseProgress: {},
      completedLessonIds: [],
      savedResourceIds: [],
      certificates: [],
      bookings: [],
      donations: [],
    };

    saveStoredAccounts([...accounts, newAccount]);
    return { success: true };
  };

  const signInLocalUser = (email: string, pass: string) => {
    const accounts = getStoredAccounts();
    const cleanEmail = email.trim().toLowerCase();
    const account = accounts.find((a) => a.email.toLowerCase() === cleanEmail);

    if (!account || account.password !== pass) {
      return { success: false, error: 'Invalid email or password.' };
    }

    localStorage.setItem(GTF_SESSION_KEY, account.id);
    const loggedInProfile: UserProfile = {
      id: account.id,
      firstName: account.firstName,
      lastName: account.lastName,
      name: `${account.firstName} ${account.lastName}`,
      email: account.email,
      phone: account.phone || '',
      role: account.role || 'Student',
      avatar: account.avatarUrl || '',
      country: account.country || 'Global',
      selectedInterests: ['Music Production', 'Vocals'],
      enrolledCourseIds: account.enrolledCourseIds || [],
      courseProgress: account.courseProgress || {},
      completedLessonIds: account.completedLessonIds || [],
      savedResourceIds: account.savedResourceIds || [],
      certificates: account.certificates || [],
      bookings: account.bookings || [],
      donations: account.donations || [],
    };

    setUser(loggedInProfile);
    addToast(`Welcome back, ${account.firstName}!`, 'success');
    return { success: true };
  };

  const logOutUser = () => {
    localStorage.removeItem(GTF_SESSION_KEY);
    setUser(null);
    setIsDashboardOpen(false);
    addToast('You have been logged out.', 'info');
  };

  const deleteUserAccount = () => {
    if (!user) return;
    const accounts = getStoredAccounts();
    const filtered = accounts.filter((a) => a.id !== user.id);
    saveStoredAccounts(filtered);
    localStorage.removeItem(GTF_SESSION_KEY);
    localStorage.removeItem('aura_user_profile');
    setUser(null);
    setIsDashboardOpen(false);
    addToast('Your account and local data have been permanently deleted.', 'info');
  };

  const updateProfilePhoto = (dataUrl: string) => {
    if (!user) return;
    setUser((prev) => (prev ? { ...prev, avatar: dataUrl } : null));
    const accounts = getStoredAccounts();
    const updated = accounts.map((a) => (a.id === user.id ? { ...a, avatarUrl: dataUrl } : a));
    saveStoredAccounts(updated);
    addToast('Profile photo updated successfully!', 'success');
  };

  const removeProfilePhoto = () => {
    if (!user) return;
    setUser((prev) => (prev ? { ...prev, avatar: '' } : null));
    const accounts = getStoredAccounts();
    const updated = accounts.map((a) => (a.id === user.id ? { ...a, avatarUrl: '' } : a));
    saveStoredAccounts(updated);
    addToast('Profile photo removed.', 'info');
  };

  const changeUserPassword = (currentPass: string, newPass: string) => {
    if (!user) return { success: false, error: 'No active user session.' };
    const accounts = getStoredAccounts();
    const account = accounts.find((a) => a.id === user.id);
    if (!account || account.password !== currentPass) {
      return { success: false, error: 'Current password is incorrect.' };
    }
    const updated = accounts.map((a) => (a.id === user.id ? { ...a, password: newPass } : a));
    saveStoredAccounts(updated);
    return { success: true };
  };

  // Search & Modal states
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAIMentorOpen, setIsAIMentorOpen] = useState(false);
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingArtist, setBookingArtist] = useState<Artist | null>(null);
  const [isDonateOpen, setIsDonateOpen] = useState(false);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  
  const [isPartnerModalOpen, setIsPartnerModalOpen] = useState(false);
  const [isCipherAuthModalOpen, setIsCipherAuthModalOpen] = useState(false);
  const [sessionToken, setSessionToken] = useState<string | null>(null);
  const isCipherAuthenticated = !!sessionToken;

  const setIsCipherAuthenticated = (auth: boolean) => {
    if (!auth) {
      setSessionToken(null);
    }
  };

  const cypherLogout = async () => {
    try {
      if (sessionToken) {
        await fetch('/api/cypher/logout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionToken}`,
          },
        });
      }
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      setSessionToken(null);
      setIsAdminOpen(false);
      setIsCipherAuthModalOpen(false);
    }
  };

  const [partnerWaitlist, setPartnerWaitlist] = useState<PartnerWaitlistEntry[]>(() => {
    const saved = localStorage.getItem('gtf_partner_waitlist');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return [
      {
        id: 'PTR-1001',
        name: 'Sarah Jenkins',
        phone: '+1 (555) 234-5678',
        email: 's.jenkins@audiobrand.org',
        organization: 'Apex Acoustic Labs',
        notes: 'Interested in studio equipment sponsorship.',
        createdAt: '2026-08-08',
        status: 'Pending',
      },
      {
        id: 'PTR-1002',
        name: 'Jean-Luc Moreau',
        phone: '+33 6 12 34 56 78',
        email: 'j.moreau@conservatoire-paris.fr',
        organization: 'Paris Cultural Exchange',
        notes: 'Requesting partnership details for conservatory masterclasses.',
        createdAt: '2026-08-09',
        status: 'Contacted',
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('gtf_partner_waitlist', JSON.stringify(partnerWaitlist));
  }, [partnerWaitlist]);

  const addPartnerWaitlistEntry = (entryData: Omit<PartnerWaitlistEntry, 'id' | 'createdAt' | 'status'>) => {
    const newEntry: PartnerWaitlistEntry = {
      ...entryData,
      id: `PTR-${Date.now().toString().slice(-4)}`,
      createdAt: new Date().toISOString().split('T')[0],
      status: 'Pending',
    };
    setPartnerWaitlist((prev) => [newEntry, ...prev]);
    addToast('Your details have been submitted to the GTF Partner Waitlist!', 'success');
  };

  const updatePartnerWaitlistStatus = (id: string, status: PartnerWaitlistEntry['status']) => {
    setPartnerWaitlist((prev) =>
      prev.map((entry) => (entry.id === id ? { ...entry, status } : entry))
    );
    addToast(`Partner entry status updated to "${status}"`, 'info');
  };

  const deletePartnerWaitlistEntry = (id: string) => {
    setPartnerWaitlist((prev) => prev.filter((entry) => entry.id !== id));
    addToast('Partner waitlist entry removed.', 'info');
  };

  // Toasts
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Date.now().toString() + Math.random().toString().slice(2, 5);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const enrollInCourse = (courseId: string) => {
    if (!user) {
      openAuthModal('signup');
      addToast('Please sign in or create an account to enroll in courses.', 'info');
      return;
    }

    if (!user.enrolledCourseIds.includes(courseId)) {
      const updatedEnrolled = [...user.enrolledCourseIds, courseId];
      const updatedProgress = { ...user.courseProgress, [courseId]: 0 };

      setUser((prev) => (prev ? {
        ...prev,
        enrolledCourseIds: updatedEnrolled,
        courseProgress: updatedProgress,
      } : null));

      const accounts = getStoredAccounts();
      const updated = accounts.map((a) => a.id === user.id ? {
        ...a,
        enrolledCourseIds: updatedEnrolled,
        courseProgress: updatedProgress,
      } : a);
      saveStoredAccounts(updated);

      addToast('Successfully enrolled in course!', 'success');
    }
  };

  const completeLesson = (courseId: string, lessonId: string) => {
    if (!user) {
      openAuthModal('signup');
      return;
    }

    setUser((prev) => {
      if (!prev) return null;
      const alreadyCompleted = prev.completedLessonIds.includes(lessonId);
      const updatedCompleted = alreadyCompleted
        ? prev.completedLessonIds
        : [...prev.completedLessonIds, lessonId];
      
      const course = courses.find((c) => c.id === courseId);
      let progress = prev.courseProgress[courseId] || 0;
      if (course && course.lessons.length > 0) {
        const completedCount = course.lessons.filter((l) => updatedCompleted.includes(l.id)).length;
        progress = Math.round((completedCount / course.lessons.length) * 100);
      }

      // Check if course 100% completed and generate certificate if needed
      let updatedCerts = prev.certificates;
      if (progress >= 100 && !updatedCerts.some((c) => c.courseId === courseId) && course) {
        updatedCerts = [
          ...updatedCerts,
          {
            courseId,
            courseTitle: course.title,
            issueDate: new Date().toISOString().split('T')[0],
            certificateId: `AURA-CERT-${Date.now().toString().slice(-6)}`,
          },
        ];
        addToast(`🎉 Congratulations! You completed "${course.title}" and earned your Certificate!`, 'success');
      }

      const updatedUser: UserProfile = {
        ...prev,
        completedLessonIds: updatedCompleted,
        courseProgress: { ...prev.courseProgress, [courseId]: progress },
        certificates: updatedCerts,
      };

      const accounts = getStoredAccounts();
      const updated = accounts.map((a) => (a.id === prev.id ? {
        ...a,
        completedLessonIds: updatedCompleted,
        courseProgress: { ...a.courseProgress, [courseId]: progress },
        certificates: updatedCerts,
      } : a));
      saveStoredAccounts(updated);

      return updatedUser;
    });
  };

  const createBooking = (bookingData: Omit<Booking, 'id' | 'createdAt' | 'status'>) => {
    const newBooking: Booking = {
      ...bookingData,
      id: `BK-${Date.now().toString().slice(-6)}`,
      createdAt: new Date().toISOString(),
      status: 'Confirmed',
    };

    if (user) {
      const updatedBookings = [newBooking, ...user.bookings];
      setUser((prev) => (prev ? {
        ...prev,
        bookings: updatedBookings,
      } : null));

      const accounts = getStoredAccounts();
      const updated = accounts.map((a) => (a.id === user.id ? { ...a, bookings: updatedBookings } : a));
      saveStoredAccounts(updated);
    }

    addToast(`Your private session with ${bookingData.artistName} is confirmed!`, 'success');
  };

  const addDonation = (amountEUR: number, message?: string) => {
    const newDonation: Donation = {
      id: `DON-${Date.now().toString().slice(-6)}`,
      amountEUR,
      donorName: user ? user.name : 'Anonymous Supporter',
      donorEmail: user ? user.email : 'supporter@globaltalent.org',
      message,
      date: new Date().toISOString().split('T')[0],
    };

    if (user) {
      const updatedDonations = [newDonation, ...user.donations];
      setUser((prev) => (prev ? {
        ...prev,
        donations: updatedDonations,
      } : null));

      const accounts = getStoredAccounts();
      const updated = accounts.map((a) => (a.id === user.id ? { ...a, donations: updatedDonations } : a));
      saveStoredAccounts(updated);
    }

    addToast(`Thank you for your generous €${amountEUR} donation to music education!`, 'success');
  };

  return (
    <AppContext.Provider
      value={{
        activeView,
        setActiveView,
        aboutTab,
        setAboutTab,
        navigateToAboutTab,
        courses,
        selectedCourse,
        setSelectedCourse,
        artists,
        selectedArtist,
        setSelectedArtist,
        events,
        resources,
        user,
        setUser,
        isLoggedIn,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authModalTab,
        setAuthModalTab,
        openAuthModal,
        signUpLocalUser,
        signInLocalUser,
        logOutUser,
        deleteUserAccount,
        updateProfilePhoto,
        removeProfilePhoto,
        changeUserPassword,
        searchQuery,
        setSearchQuery,
        isSearchOpen,
        setIsSearchOpen,
        isAIMentorOpen,
        setIsAIMentorOpen,
        isAiMentorOpen: isAIMentorOpen,
        setIsAiMentorOpen: setIsAIMentorOpen,
        isLanguageModalOpen,
        setIsLanguageModalOpen,
        isBookingOpen,
        setIsBookingOpen,
        bookingArtist,
        setBookingArtist,
        isDonateOpen,
        setIsDonateOpen,
        isDashboardOpen,
        setIsDashboardOpen,
        isAdminOpen,
        setIsAdminOpen,
        isPartnerModalOpen,
        setIsPartnerModalOpen,
        isCipherAuthModalOpen,
        setIsCipherAuthModalOpen,
        isCipherAuthenticated,
        setIsCipherAuthenticated,
        sessionToken,
        setSessionToken,
        cypherLogout,
        partnerWaitlist,
        addPartnerWaitlistEntry,
        updatePartnerWaitlistStatus,
        deletePartnerWaitlistEntry,
        enrollInCourse,
        completeLesson,
        createBooking,
        addDonation,
        toasts,
        addToast,
        removeToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
