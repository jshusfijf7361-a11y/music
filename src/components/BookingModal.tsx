import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Artist, MentorshipSessionType } from '../types';
import {
  X,
  Calendar as CalendarIcon,
  Clock,
  User,
  CreditCard,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react';

export const BookingModal: React.FC = () => {
  const {
    isBookingOpen,
    setIsBookingOpen,
    bookingArtist,
    artists,
    createBooking,
    user,
  } = useApp();

  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [selectedArtistObj, setSelectedArtistObj] = useState<Artist | null>(bookingArtist || artists[0]);
  const [selectedSessionType, setSelectedSessionType] = useState<MentorshipSessionType | null>(null);
  
  const [selectedDate, setSelectedDate] = useState<string>('2026-09-02');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('15:00 UTC');
  
  const [userName, setUserName] = useState<string>(user.name || '');
  const [userEmail, setUserEmail] = useState<string>(user.email || '');
  const [notes, setNotes] = useState<string>('');

  const [cardNumber, setCardNumber] = useState<string>('•••• •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState<string>('12/28');
  const [cardCvc, setCardCvc] = useState<string>('888');

  if (!isBookingOpen) return null;

  const currentArtist = selectedArtistObj || bookingArtist || artists[0];
  const activeSession = selectedSessionType || currentArtist.sessionTypes[0];

  const timeSlots = [
    '10:00 UTC',
    '12:30 UTC',
    '15:00 UTC',
    '18:00 UTC',
    '20:30 UTC',
  ];

  const handleNext = () => {
    if (step < 4) setStep((prev) => (prev + 1) as any);
  };

  const handleBack = () => {
    if (step > 1) setStep((prev) => (prev - 1) as any);
  };

  const handleConfirmPayment = (e: React.FormEvent) => {
    e.preventDefault();
    createBooking({
      artistId: currentArtist.id,
      artistName: currentArtist.name,
      sessionTitle: activeSession.title,
      durationMinutes: activeSession.durationMinutes,
      priceEUR: activeSession.priceEUR,
      date: selectedDate,
      timeSlot: selectedTimeSlot,
      userName: userName || user.name,
      userEmail: userEmail || user.email,
      notes,
    });
    setStep(5); // Show Confirmation
  };

  const handleClose = () => {
    setIsBookingOpen(false);
    setStep(1);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-3xl my-auto bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-3xl shadow-2xl overflow-hidden text-neutral-900 dark:text-neutral-100 p-6 md:p-8">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-6 border-b border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-500">
              <CalendarIcon className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-50">
                Book Private One-on-One Session
              </h2>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Step {step} of 4 • {currentArtist.name} ({currentArtist.role})
              </p>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="p-2 rounded-xl text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Pills */}
        {step < 5 && (
          <div className="grid grid-cols-4 gap-2 my-6">
            {['1. Format', '2. Time', '3. Info', '4. Payment'].map((label, i) => {
              const num = i + 1;
              const isActive = step === num;
              const isPast = step > num;
              return (
                <div
                  key={i}
                  className={`py-2 rounded-xl text-center text-xs font-mono font-bold transition-all ${
                    isActive
                      ? 'bg-amber-500 text-neutral-950'
                      : isPast
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'bg-neutral-100 dark:bg-neutral-900 text-neutral-400 border border-neutral-200 dark:border-neutral-800'
                  }`}
                >
                  {label}
                </div>
              );
            })}
          </div>
        )}

        {/* STEP 1: SELECT FORMAT */}
        {step === 1 && (
          <div className="space-y-4 my-6">
            <h3 className="text-sm font-bold font-mono text-amber-500 uppercase tracking-widest">
              Choose Mentorship Consultation Format
            </h3>
            
            <div className="space-y-3">
              {currentArtist.sessionTypes.map((st) => {
                const isSel = activeSession.id === st.id;
                return (
                  <div
                    key={st.id}
                    onClick={() => setSelectedSessionType(st)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                      isSel
                        ? 'bg-amber-500/10 border-amber-500 text-neutral-900 dark:text-neutral-100 font-bold'
                        : 'bg-neutral-50 dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:border-neutral-300 dark:hover:border-neutral-700'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-extrabold">{st.title}</span>
                      <span className="text-base font-black text-amber-500 font-mono">
                        €{st.priceEUR.toLocaleString()}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                      {st.description}
                    </p>
                    <div className="mt-2 text-[10px] font-mono text-neutral-400">
                      Duration: {st.durationMinutes} Minutes • Private 1-on-1 Video Session
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-4 flex justify-end">
              <button
                onClick={handleNext}
                className="px-6 py-3 rounded-xl bg-amber-500 text-neutral-950 font-bold text-xs flex items-center gap-2"
              >
                <span>Select Time & Date</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: SELECT DATE & TIME SLOT */}
        {step === 2 && (
          <div className="space-y-6 my-6">
            <div>
              <label className="block text-xs font-mono font-bold text-amber-500 uppercase tracking-widest mb-2">
                Select Date
              </label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full p-3.5 rounded-xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-sm font-semibold"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-bold text-amber-500 uppercase tracking-widest mb-2">
                Select Available Time Slot
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {timeSlots.map((slot) => {
                  const isSel = selectedTimeSlot === slot;
                  return (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedTimeSlot(slot)}
                      className={`p-3 rounded-xl text-xs font-mono font-bold border transition-all ${
                        isSel
                          ? 'bg-amber-500 text-neutral-950 border-amber-500'
                          : 'bg-neutral-50 dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300'
                      }`}
                    >
                      {slot}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-4 flex justify-between">
              <button
                onClick={handleBack}
                className="px-5 py-3 rounded-xl bg-neutral-200 dark:bg-neutral-800 text-xs font-bold"
              >
                Back
              </button>
              <button
                onClick={handleNext}
                className="px-6 py-3 rounded-xl bg-amber-500 text-neutral-950 font-bold text-xs flex items-center gap-2"
              >
                <span>Enter Details</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: USER DETAILS & NOTES */}
        {step === 3 && (
          <div className="space-y-4 my-6">
            <div>
              <label className="block text-xs font-mono font-bold text-neutral-500 dark:text-neutral-400 mb-1">
                Your Full Name
              </label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full p-3 rounded-xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs font-medium"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-bold text-neutral-500 dark:text-neutral-400 mb-1">
                Email Address for Video Invitation
              </label>
              <input
                type="email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                className="w-full p-3 rounded-xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs font-medium"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-bold text-neutral-500 dark:text-neutral-400 mb-1">
                Topics & Specific Questions for {currentArtist.name}
              </label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Share links to your songs, mix files, or career goals..."
                className="w-full p-3 rounded-xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs font-medium"
              />
            </div>

            <div className="pt-4 flex justify-between">
              <button
                onClick={handleBack}
                className="px-5 py-3 rounded-xl bg-neutral-200 dark:bg-neutral-800 text-xs font-bold"
              >
                Back
              </button>
              <button
                onClick={handleNext}
                className="px-6 py-3 rounded-xl bg-amber-500 text-neutral-950 font-bold text-xs flex items-center gap-2"
              >
                <span>Proceed to Checkout</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: CHECKOUT & PAYMENT SUMMARY */}
        {step === 4 && (
          <form onSubmit={handleConfirmPayment} className="space-y-6 my-6">
            {/* Booking Summary Box */}
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-2 text-xs">
              <div className="flex justify-between font-bold">
                <span>{currentArtist.name} • {activeSession.title}</span>
                <span className="font-mono text-amber-500">€{activeSession.priceEUR.toLocaleString()}</span>
              </div>
              <div className="text-[11px] text-neutral-500 dark:text-neutral-400">
                Date: {selectedDate} at {selectedTimeSlot} ({activeSession.durationMinutes} min)
              </div>
            </div>

            {/* Simulated Payment Card Form */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono font-bold text-neutral-500 dark:text-neutral-400">
                <span>SECURE PAYMENT DETAILS</span>
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
              </div>

              <div>
                <label className="block text-[10px] font-mono text-neutral-400 mb-1">Card Number</label>
                <div className="relative">
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full p-3 rounded-xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs font-mono"
                  />
                  <CreditCard className="w-4 h-4 text-neutral-400 absolute right-3 top-3.5" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-mono text-neutral-400 mb-1">Expiry</label>
                  <input
                    type="text"
                    value={cardExpiry}
                    onChange={(e) => setCardExpiry(e.target.value)}
                    className="w-full p-3 rounded-xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono text-neutral-400 mb-1">CVC</label>
                  <input
                    type="text"
                    value={cardCvc}
                    onChange={(e) => setCardCvc(e.target.value)}
                    className="w-full p-3 rounded-xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs font-mono"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 flex justify-between">
              <button
                type="button"
                onClick={handleBack}
                className="px-5 py-3 rounded-xl bg-neutral-200 dark:bg-neutral-800 text-xs font-bold"
              >
                Back
              </button>
              <button
                type="submit"
                className="px-8 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-xl shadow-amber-500/20"
              >
                <span>Pay €{activeSession.priceEUR.toLocaleString()} & Confirm Booking</span>
              </button>
            </div>
          </form>
        )}

        {/* STEP 5: CONFIRMATION SUCCESS */}
        {step === 5 && (
          <div className="py-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <h3 className="text-2xl font-black text-neutral-900 dark:text-neutral-50">
              Your Session Is Confirmed!
            </h3>

            <p className="text-xs text-neutral-600 dark:text-neutral-300 max-w-md mx-auto leading-relaxed">
              We have dispatched calendar details and a high-definition private video stream room link to <span className="font-bold text-amber-500">{userEmail}</span>.
            </p>

            <div className="p-4 rounded-2xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 max-w-sm mx-auto text-xs font-mono space-y-1">
              <div className="text-amber-500 font-bold">Booking Ref: AURA-BK-99801</div>
              <div>Artist: {currentArtist.name}</div>
              <div>Date: {selectedDate} @ {selectedTimeSlot}</div>
            </div>

            <button
              onClick={handleClose}
              className="px-8 py-3 rounded-full bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-950 font-bold text-xs uppercase tracking-wider"
            >
              Return To Platform
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
