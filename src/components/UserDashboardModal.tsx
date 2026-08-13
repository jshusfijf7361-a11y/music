import React, { useState, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { useTheme } from '../context/ThemeContext';
import {
  X,
  User,
  Mail,
  Phone,
  Lock,
  Upload,
  Trash2,
  LogOut,
  ShieldAlert,
  CheckCircle2,
  BookOpen,
  Award,
  Calendar,
  KeyRound,
  Eye,
  EyeOff,
} from 'lucide-react';

export const UserDashboardModal: React.FC = () => {
  const {
    isDashboardOpen,
    setIsDashboardOpen,
    user,
    courses,
    setSelectedCourse,
    logOutUser,
    deleteUserAccount,
    updateProfilePhoto,
    removeProfilePhoto,
    changeUserPassword,
  } = useApp();

  const { theme, toggleTheme } = useTheme();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Delete Account Confirmation State
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Change Password State
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');

  if (!isDashboardOpen || !user) return null;

  const initialLetter = (user.firstName || user.name || 'U').trim().charAt(0).toUpperCase();

  // Photo Upload Handler (Converts image to Base64 data URL)
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file type
    if (!file.type.match(/^image\/(jpeg|jpg|png|webp)$/i)) {
      alert('Please upload a valid image file (JPG, PNG, or WEBP).');
      return;
    }

    // Limit size to ~5MB for localStorage safety
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size is too large. Please select an image under 5MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        updateProfilePhoto(dataUrl);
      }
    };
    reader.readAsDataURL(file);
    // Reset file input so user can re-upload if needed
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Password Change Handler
  const handleChangePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess('');

    if (!currentPassword || !newPassword || !confirmNewPassword) {
      setPasswordError('All password fields are required.');
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setPasswordError('New passwords do not match.');
      return;
    }

    if (newPassword.length < 4) {
      setPasswordError('New password must be at least 4 characters long.');
      return;
    }

    const result = changeUserPassword(currentPassword, newPassword);
    if (result.success) {
      setPasswordSuccess('Password changed successfully.');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
      setTimeout(() => {
        setShowChangePassword(false);
        setPasswordSuccess('');
      }, 2000);
    } else {
      setPasswordError(result.error || 'Failed to update password.');
    }
  };

  const enrolledCourses = courses.filter((c) => user.enrolledCourseIds?.includes(c.id));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-3xl my-auto bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-3xl shadow-2xl overflow-hidden text-neutral-900 dark:text-neutral-100 p-6 md:p-8">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-6 border-b border-neutral-200 dark:border-neutral-800">
          <div>
            <h2 className="text-2xl font-black text-neutral-900 dark:text-white tracking-tight">
              MY PROFILE
            </h2>
          </div>

          <button
            onClick={() => setIsDashboardOpen(false)}
            className="p-2 rounded-2xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer"
            title="Close Dashboard"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Profile Content */}
        <div className="py-6 space-y-6">
          
          {/* Top Section: Avatar & Photo Actions */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 p-6 rounded-3xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800/80">
            
            {/* Avatar Display */}
            <div className="relative">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-24 h-24 rounded-full object-cover border-4 border-amber-500 shadow-xl shadow-amber-500/10"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 text-neutral-950 font-black text-4xl flex items-center justify-center border-4 border-amber-400 shadow-xl shadow-amber-500/20 select-none">
                  {initialLetter}
                </div>
              )}
            </div>

            {/* User Core Info & Photo Controls */}
            <div className="flex-1 text-center sm:text-left space-y-2">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
                  {user.firstName} {user.lastName}
                </h3>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 font-mono text-[10px] font-bold uppercase border border-amber-500/30">
                  {user.role || 'Student'}
                </span>
              </div>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 font-mono">
                {user.email}
              </p>

              {/* Photo Upload / Remove Buttons */}
              <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handlePhotoUpload}
                  accept="image/png, image/jpeg, image/jpg, image/webp"
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3.5 py-2 rounded-xl bg-neutral-900 text-white dark:bg-neutral-800 dark:text-neutral-100 hover:bg-neutral-800 dark:hover:bg-neutral-700 text-xs font-bold flex items-center gap-1.5 shadow transition-all cursor-pointer"
                >
                  <Upload className="w-3.5 h-3.5 text-amber-400" />
                  <span>{user.avatar ? 'Change Photo' : 'Upload Profile Photo'}</span>
                </button>

                {user.avatar && (
                  <button
                    type="button"
                    onClick={removeProfilePhoto}
                    className="px-3 py-2 rounded-xl bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-500/20 border border-red-500/20 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
                    title="Revert to initial avatar"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Remove Photo</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* User Details Grid: Name, Email, Phone Number, Password */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Field: Full Name */}
            <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-1">
              <div className="text-[10px] font-mono font-bold uppercase text-neutral-400 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-amber-500" />
                <span>Full Name</span>
              </div>
              <div className="text-sm font-bold text-neutral-900 dark:text-white">
                {user.firstName} {user.lastName}
              </div>
            </div>

            {/* Field: Email */}
            <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-1">
              <div className="text-[10px] font-mono font-bold uppercase text-neutral-400 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-amber-500" />
                <span>Email Address</span>
              </div>
              <div className="text-sm font-bold text-neutral-900 dark:text-white">
                {user.email}
              </div>
            </div>

            {/* Field: Phone Number */}
            <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-1">
              <div className="text-[10px] font-mono font-bold uppercase text-neutral-400 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-amber-500" />
                <span>Phone Number</span>
              </div>
              <div className="text-sm font-bold text-neutral-900 dark:text-white">
                {user.phone || 'Not provided'}
              </div>
            </div>

            {/* Field: Password (Masked, Never exposed) */}
            <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-1 flex items-center justify-between">
              <div>
                <div className="text-[10px] font-mono font-bold uppercase text-neutral-400 flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-amber-500" />
                  <span>Password</span>
                </div>
                <div className="text-sm font-mono tracking-widest text-neutral-600 dark:text-neutral-300">
                  ••••••••
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setShowChangePassword(!showChangePassword);
                  setPasswordError('');
                  setPasswordSuccess('');
                }}
                className="px-3 py-1.5 rounded-lg bg-neutral-200 dark:bg-neutral-800 hover:bg-amber-500/20 hover:text-amber-500 text-neutral-700 dark:text-neutral-300 text-xs font-bold transition-colors cursor-pointer"
              >
                Change
              </button>
            </div>

          </div>

          {/* Change Password Form (Expandable) */}
          {showChangePassword && (
            <div className="p-5 rounded-3xl bg-neutral-100 dark:bg-neutral-900/90 border border-neutral-300 dark:border-neutral-800 space-y-4 animate-in fade-in">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-white flex items-center gap-2">
                  <KeyRound className="w-4 h-4 text-amber-500" />
                  <span>Change Password</span>
                </h4>
                <button
                  type="button"
                  onClick={() => setShowChangePassword(false)}
                  className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 text-xs"
                >
                  Cancel
                </button>
              </div>

              {passwordError && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-xs font-medium flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 shrink-0" />
                  <span>{passwordError}</span>
                </div>
              )}

              {passwordSuccess && (
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-medium flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{passwordSuccess}</span>
                </div>
              )}

              <form onSubmit={handleChangePasswordSubmit} className="space-y-3 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold uppercase text-neutral-500">Current Password</label>
                    <div className="relative">
                      <input
                        type={showCurrentPass ? 'text' : 'password'}
                        required
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        placeholder="Current password"
                        className="w-full pl-3 pr-8 py-2 rounded-xl bg-white dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:border-amber-500 text-xs"
                      />
                      <button
                        type="button"
                        onClick={() => setShowCurrentPass(!showCurrentPass)}
                        className="absolute right-2.5 top-2.5 text-neutral-400"
                      >
                        {showCurrentPass ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold uppercase text-neutral-500">New Password</label>
                    <div className="relative">
                      <input
                        type={showNewPass ? 'text' : 'password'}
                        required
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="New password"
                        className="w-full pl-3 pr-8 py-2 rounded-xl bg-white dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:border-amber-500 text-xs"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPass(!showNewPass)}
                        className="absolute right-2.5 top-2.5 text-neutral-400"
                      >
                        {showNewPass ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold uppercase text-neutral-500">Confirm New Password</label>
                    <input
                      type="password"
                      required
                      value={confirmNewPassword}
                      onChange={(e) => setConfirmNewPassword(e.target.value)}
                      placeholder="Confirm new password"
                      className="w-full px-3 py-2 rounded-xl bg-white dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:border-amber-500 text-xs"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-1">
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs shadow cursor-pointer transition-all"
                  >
                    Save New Password
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Enrolled Courses Summary (If any) */}
          {enrolledCourses.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-xs font-mono font-bold text-amber-500 uppercase tracking-widest flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                <span>My Active Courses ({enrolledCourses.length})</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {enrolledCourses.map((c) => {
                  const progress = user.courseProgress?.[c.id] || 0;
                  return (
                    <div
                      key={c.id}
                      onClick={() => {
                        setSelectedCourse(c);
                        setIsDashboardOpen(false);
                      }}
                      className="p-3.5 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-amber-500/50 transition-all cursor-pointer space-y-2"
                    >
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-bold text-neutral-900 dark:text-white truncate">{c.title}</span>
                        <span className="font-mono text-amber-500 font-bold ml-2">{progress}%</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-neutral-200 dark:bg-neutral-800 overflow-hidden">
                        <div
                          className="h-full bg-amber-500 rounded-full transition-all"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Delete Confirmation Alert Modal/Box */}
          {showDeleteConfirm && (
            <div className="p-5 rounded-3xl bg-red-500/10 border-2 border-red-500/40 space-y-3 animate-in fade-in">
              <div className="flex items-start gap-3">
                <ShieldAlert className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-red-600 dark:text-red-400">
                    Are you sure you want to delete your account?
                  </h4>
                  <p className="text-xs text-neutral-600 dark:text-neutral-300">
                    This action cannot be undone. All of your locally stored profile data, progress, certificates, and uploaded photo will be permanently deleted from this browser.
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setShowDeleteConfirm(false)}
                  className="px-4 py-2 rounded-xl bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 text-xs font-bold cursor-pointer hover:bg-neutral-300 dark:hover:bg-neutral-700 transition-colors"
                >
                  CANCEL
                </button>
                <button
                  type="button"
                  onClick={deleteUserAccount}
                  className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold shadow-md shadow-red-600/30 cursor-pointer transition-all"
                >
                  DELETE ACCOUNT
                </button>
              </div>
            </div>
          )}

          {/* Account Actions Section: Log Out & Delete Account */}
          <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs text-neutral-400 font-mono">Theme:</span>
              <button
                onClick={toggleTheme}
                className="px-3 py-1 rounded-lg bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs font-bold uppercase cursor-pointer"
              >
                {theme}
              </button>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              {/* Log Out Button */}
              <button
                type="button"
                onClick={logOutUser}
                className="px-4 py-2.5 rounded-xl bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>LOG OUT</span>
              </button>

              {/* Delete Account Button */}
              {!showDeleteConfirm && (
                <button
                  type="button"
                  onClick={() => setShowDeleteConfirm(true)}
                  className="px-4 py-2.5 rounded-xl bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-500/20 border border-red-500/30 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>DELETE ACCOUNT</span>
                </button>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
