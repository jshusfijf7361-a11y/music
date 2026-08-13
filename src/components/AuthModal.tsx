import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Mail,
  Lock,
  User,
  Phone,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
} from 'lucide-react';

export const AuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    setIsAuthModalOpen,
    authModalTab,
    setAuthModalTab,
    signUpLocalUser,
    signInLocalUser,
  } = useApp();

  // Sign Up State
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showSignUpPass, setShowSignUpPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  // Sign In State
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  const [showSignInPass, setShowSignInPass] = useState(false);

  // Feedback State
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleClose = () => {
    setIsAuthModalOpen(false);
    setErrorMessage('');
    setSuccessMessage('');
  };

  const handleTabChange = (tab: 'signup' | 'signin') => {
    setAuthModalTab(tab);
    setErrorMessage('');
    setSuccessMessage('');
  };

  // Sign Up Handler
  const handleSignUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    const cleanFirst = firstName.trim();
    const cleanLast = lastName.trim();
    const cleanEmail = signUpEmail.trim().toLowerCase();
    const cleanPhone = phone.trim();
    const cleanPass = signUpPassword;
    const cleanConfirm = confirmPassword;

    // Validation 1: All fields required
    if (!cleanFirst || !cleanLast || !cleanEmail || !cleanPhone || !cleanPass || !cleanConfirm) {
      setErrorMessage('All fields are required.');
      return;
    }

    // Validation 2: Email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    // Validation 3: Password match
    if (cleanPass !== cleanConfirm) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    setIsSubmitting(true);

    const result = signUpLocalUser({
      firstName: cleanFirst,
      lastName: cleanLast,
      email: cleanEmail,
      phone: cleanPhone,
      password: cleanPass,
    });

    setIsSubmitting(false);

    if (result.success) {
      // Clear form
      setFirstName('');
      setLastName('');
      setSignUpEmail('');
      setPhone('');
      setSignUpPassword('');
      setConfirmPassword('');

      // Pre-fill Sign In email and switch to Sign In
      setSignInEmail(cleanEmail);
      setSignInPassword('');
      setAuthModalTab('signin');
      setSuccessMessage('Account created successfully. Sign in to continue.');
    } else {
      setErrorMessage(result.error || 'Failed to create account.');
    }
  };

  // Sign In Handler
  const handleSignInSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    const cleanEmail = signInEmail.trim().toLowerCase();
    const cleanPass = signInPassword;

    if (!cleanEmail || !cleanPass) {
      setErrorMessage('Please enter your email and password.');
      return;
    }

    setIsSubmitting(true);

    const result = signInLocalUser(cleanEmail, cleanPass);

    setIsSubmitting(false);

    if (result.success) {
      setSignInEmail('');
      setSignInPassword('');
      setIsAuthModalOpen(false);
    } else {
      setErrorMessage(result.error || 'Invalid email or password.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-lg my-auto bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800/90 rounded-3xl shadow-2xl overflow-hidden text-neutral-900 dark:text-neutral-100 p-6 sm:p-8">
        
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 p-2 rounded-2xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer"
          title="Close Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-2 mb-6 pr-6 pl-6 pt-2">
          <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white tracking-tight">
            {authModalTab === 'signup' ? 'Create Your Account' : 'Welcome Back'}
          </h2>

          <p className="text-xs text-neutral-500 dark:text-neutral-400 max-w-sm mx-auto">
            {authModalTab === 'signup'
              ? 'Join the sovereign global network of musicians, creators, and master educators.'
              : 'Sign in to access your profile, courses, and music education portal.'}
          </p>
        </div>

        {/* Tab Switcher: [ SIGN UP ] [ SIGN IN ] */}
        <div className="flex rounded-2xl bg-neutral-100 dark:bg-neutral-900 p-1 mb-6 border border-neutral-200 dark:border-neutral-800">
          <button
            type="button"
            onClick={() => handleTabChange('signup')}
            className={`flex-1 py-2.5 rounded-xl font-sans font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${
              authModalTab === 'signup'
                ? 'bg-white dark:bg-neutral-800 text-neutral-950 dark:text-white shadow-sm'
                : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
            }`}
          >
            Sign Up
          </button>
          <button
            type="button"
            onClick={() => handleTabChange('signin')}
            className={`flex-1 py-2.5 rounded-xl font-sans font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${
              authModalTab === 'signin'
                ? 'bg-white dark:bg-neutral-800 text-neutral-950 dark:text-white shadow-sm'
                : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
            }`}
          >
            Sign In
          </button>
        </div>

        {/* Feedback Messages */}
        {errorMessage && (
          <div className="mb-4 p-3.5 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-xs font-medium flex items-center gap-2.5 animate-in fade-in">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {successMessage && (
          <div className="mb-4 p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-medium flex items-center gap-2.5 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* TAB 1: SIGN UP FORM */}
        {authModalTab === 'signup' && (
          <form onSubmit={handleSignUpSubmit} className="space-y-3.5 text-xs">
            {/* Name Fields: First Name & Last Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold text-neutral-700 dark:text-neutral-300">
                  First Name <span className="text-amber-500">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => { setFirstName(e.target.value); setErrorMessage(''); }}
                    placeholder="e.g. Michael"
                    className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 focus:outline-none focus:border-amber-500 font-medium"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold text-neutral-700 dark:text-neutral-300">
                  Last Name <span className="text-amber-500">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    value={lastName}
                    onChange={(e) => { setLastName(e.target.value); setErrorMessage(''); }}
                    placeholder="e.g. Johnson"
                    className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 focus:outline-none focus:border-amber-500 font-medium"
                  />
                </div>
              </div>
            </div>

            {/* Email Address */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold text-neutral-700 dark:text-neutral-300">
                Email Address <span className="text-amber-500">*</span>
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  value={signUpEmail}
                  onChange={(e) => { setSignUpEmail(e.target.value); setErrorMessage(''); }}
                  placeholder="name@example.com"
                  className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 focus:outline-none focus:border-amber-500 font-medium"
                />
              </div>
            </div>

            {/* Phone Number */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold text-neutral-700 dark:text-neutral-300">
                Phone Number <span className="text-amber-500">*</span>
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3" />
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => { setPhone(e.target.value); setErrorMessage(''); }}
                  placeholder="+1 (555) 000-0000"
                  className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 focus:outline-none focus:border-amber-500 font-medium"
                />
              </div>
            </div>

            {/* Password Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold text-neutral-700 dark:text-neutral-300">
                  Password <span className="text-amber-500">*</span>
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3" />
                  <input
                    type={showSignUpPass ? 'text' : 'password'}
                    required
                    value={signUpPassword}
                    onChange={(e) => { setSignUpPassword(e.target.value); setErrorMessage(''); }}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 focus:outline-none focus:border-amber-500 font-medium"
                  />
                  <button
                    type="button"
                    onClick={() => setShowSignUpPass(!showSignUpPass)}
                    className="absolute right-3 top-3 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200"
                  >
                    {showSignUpPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold text-neutral-700 dark:text-neutral-300">
                  Confirm Password <span className="text-amber-500">*</span>
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3" />
                  <input
                    type={showConfirmPass ? 'text' : 'password'}
                    required
                    value={confirmPassword}
                    onChange={(e) => { setConfirmPassword(e.target.value); setErrorMessage(''); }}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 focus:outline-none focus:border-amber-500 font-medium"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPass(!showConfirmPass)}
                    className="absolute right-3 top-3 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200"
                  >
                    {showConfirmPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-neutral-950 font-sans font-bold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-[1.01]"
              >
                <span>Create Account</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="text-center pt-1 text-[11px] text-neutral-500 dark:text-neutral-400">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => handleTabChange('signin')}
                className="text-amber-600 dark:text-amber-400 font-bold hover:underline cursor-pointer"
              >
                Sign in here
              </button>
            </div>
          </form>
        )}

        {/* TAB 2: SIGN IN FORM */}
        {authModalTab === 'signin' && (
          <form onSubmit={handleSignInSubmit} className="space-y-4 text-xs">
            {/* Email Address */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold text-neutral-700 dark:text-neutral-300">
                Email Address <span className="text-amber-500">*</span>
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  autoFocus
                  value={signInEmail}
                  onChange={(e) => { setSignInEmail(e.target.value); setErrorMessage(''); }}
                  placeholder="name@example.com"
                  className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 focus:outline-none focus:border-amber-500 font-medium"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold text-neutral-700 dark:text-neutral-300">
                Password <span className="text-amber-500">*</span>
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3" />
                <input
                  type={showSignInPass ? 'text' : 'password'}
                  required
                  value={signInPassword}
                  onChange={(e) => { setSignInPassword(e.target.value); setErrorMessage(''); }}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 focus:outline-none focus:border-amber-500 font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowSignInPass(!showSignInPass)}
                  className="absolute right-3 top-3 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200"
                >
                  {showSignInPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-neutral-950 font-sans font-bold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-[1.01]"
              >
                <span>Sign In</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="text-center pt-1 text-[11px] text-neutral-500 dark:text-neutral-400">
              Don't have an account yet?{' '}
              <button
                type="button"
                onClick={() => handleTabChange('signup')}
                className="text-amber-600 dark:text-amber-400 font-bold hover:underline cursor-pointer"
              >
                Create an account
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
