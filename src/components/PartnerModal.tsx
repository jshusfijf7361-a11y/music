import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Sparkles,
  Building2,
  Phone,
  User,
  Mail,
  FileText,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Clock,
  HeartHandshake
} from 'lucide-react';

export const PartnerModal: React.FC = () => {
  const { isPartnerModalOpen, setIsPartnerModalOpen, addPartnerWaitlistEntry } = useApp();

  const [step, setStep] = useState<'coming_soon' | 'form' | 'submitted'>('coming_soon');

  // Form State
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [organization, setOrganization] = useState('');
  const [notes, setNotes] = useState('');
  const [formError, setFormError] = useState('');

  if (!isPartnerModalOpen) return null;

  const handleClose = () => {
    setIsPartnerModalOpen(false);
    // Reset after transition
    setTimeout(() => {
      setStep('coming_soon');
      setName('');
      setPhone('');
      setEmail('');
      setOrganization('');
      setNotes('');
      setFormError('');
    }, 200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setFormError('Please enter your full name.');
      return;
    }
    if (!phone.trim()) {
      setFormError('Please enter your contact phone number.');
      return;
    }

    addPartnerWaitlistEntry({
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim() || undefined,
      organization: organization.trim() || undefined,
      notes: notes.trim() || undefined,
    });

    setStep('submitted');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/85 backdrop-blur-2xl animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-xl my-auto bg-neutral-950 border border-neutral-800 rounded-3xl shadow-2xl overflow-hidden text-neutral-100 p-6 sm:p-8">
        
        {/* Glow ambient background accents */}
        <div className="absolute -top-24 -right-24 w-60 h-60 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-60 h-60 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 p-2 rounded-2xl bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* STEP 1: COMING SOON POPUP */}
        {step === 'coming_soon' && (
          <div className="space-y-6 text-center animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 mx-auto rounded-3xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-xl shadow-amber-500/10">
              <Building2 className="w-8 h-8" />
            </div>

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[11px] font-mono font-bold tracking-widest uppercase">
              <Clock className="w-3.5 h-3.5" />
              <span>Coming Soon</span>
            </div>

            <div className="space-y-3">
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                GTF Global Partner Portal
              </h2>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-md mx-auto">
                We are preparing to launch our full partnership and sponsorship ecosystem connecting corporate donors, audio equipment manufacturers, and music conservatories worldwide.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-neutral-900/80 border border-neutral-800/80 text-left space-y-2">
              <div className="text-[10px] uppercase font-mono font-bold text-amber-500 tracking-wider flex items-center gap-1.5">
                <HeartHandshake className="w-3.5 h-3.5" />
                <span>Partner Benefits</span>
              </div>
              <ul className="text-xs text-neutral-300 space-y-1.5 font-medium">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span>Direct sponsorship of studio equipment grants in underserved regions</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span>Co-branded masterclasses with Grammy-nominated mentors</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span>Priority access to emerging global musical talent</span>
                </li>
              </ul>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setStep('form')}
                className="w-full py-4 rounded-full bg-amber-500 text-neutral-950 hover:bg-amber-400 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-amber-500/20 cursor-pointer transition-all hover:scale-[1.02]"
              >
                <span>Join the waiting list</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: WAITING LIST FORM */}
        {step === 'form' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="space-y-1">
              <h2 className="text-xl sm:text-2xl font-black text-white">
                Join the GTF Partner Waiting List
              </h2>
              <p className="text-xs text-neutral-400">
                Provide your contact details to receive partner onboarding and sponsorship updates.
              </p>
            </div>

            {formError && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-medium">
                {formError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="block text-[11px] font-mono uppercase font-bold text-neutral-300">
                  Full Name <span className="text-amber-500">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => { setName(e.target.value); setFormError(''); }}
                    placeholder="e.g. Elena Rostova"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500 font-medium"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[11px] font-mono uppercase font-bold text-neutral-300">
                  Phone Number <span className="text-amber-500">*</span>
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => { setPhone(e.target.value); setFormError(''); }}
                    placeholder="e.g. +1 (555) 019-2834"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500 font-medium"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[11px] font-mono uppercase font-bold text-neutral-300">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. partner@brand.com"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500 font-medium"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[11px] font-mono uppercase font-bold text-neutral-300">
                  Partnership Interest
                </label>
                <div className="relative">
                  <FileText className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3" />
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="briefly describe your interest Sponsorship, equipment grant, trainer, etc."
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500 font-medium resize-none"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setStep('coming_soon')}
                  className="px-5 py-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 font-mono text-xs font-bold"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Submit Application</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* STEP 3: SUBMITTED CONFIRMATION */}
        {step === 'submitted' && (
          <div className="space-y-6 text-center animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center text-emerald-400 shadow-xl shadow-emerald-500/20">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-black text-white">Application Received!</h2>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-md mx-auto">
                Thank you, <span className="text-amber-400 font-bold">{name}</span>! Your details have been recorded and submitted to the <span className="text-amber-400 font-mono font-bold">Cipher Admin Dashboard</span>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 text-left text-xs font-mono space-y-1">
              <div className="text-neutral-400 text-[10px] uppercase">Submission Summary</div>
              <div className="text-amber-400 font-bold">Name: {name}</div>
              <div className="text-neutral-300">Phone: {phone}</div>
              {organization && <div className="text-neutral-300">Org: {organization}</div>}
              <div className="text-[10px] text-emerald-400 pt-1">✓ Status: Transmitted to Cipher Admin Portal</div>
            </div>

            <button
              onClick={handleClose}
              className="w-full py-3.5 rounded-full bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-xs uppercase tracking-wider"
            >
              Close
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
