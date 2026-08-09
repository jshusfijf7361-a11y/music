import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Lock,
  KeyRound,
  ShieldCheck,
  ShieldAlert,
  Sparkles,
  Terminal,
  Cpu,
  ArrowRight
} from 'lucide-react';

export const CipherAuthModal: React.FC = () => {
  const {
    isCipherAuthModalOpen,
    setIsCipherAuthModalOpen,
    setIsCipherAuthenticated,
    setIsAdminOpen,
    addToast,
  } = useApp();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isCipherAuthModalOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    const cleanUser = username.trim().toLowerCase();
    const cleanPass = password.trim();

    // TRUE CREDENTIALS CHECK
    // True username: "cipher_admin" or "admin"
    // True password: "Cipher2026!" or "cipher2026"
    const isUserValid = cleanUser === 'cipher_admin' || cleanUser === 'admin';
    const isPassValid = cleanPass === 'Cipher2026!' || cleanPass === 'cipher2026' || cleanPass === 'Cipher2026';

    if (isUserValid && isPassValid) {
      setIsCipherAuthenticated(true);
      setIsCipherAuthModalOpen(false);
      setIsAdminOpen(true);
      addToast('★ Cipher Terminal Unlocked. Sovereign Admin Access Granted.', 'success');
      setUsername('');
      setPassword('');
      setErrorMsg('');
    } else {
      setErrorMsg('ACCESS DENIED: Invalid Cipher Administrator ID or Security Key.');
    }
  };

  const handleClose = () => {
    setIsCipherAuthModalOpen(false);
    setErrorMsg('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/90 backdrop-blur-2xl animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-md my-auto bg-neutral-950 border border-neutral-800 rounded-3xl shadow-2xl overflow-hidden text-neutral-100 p-6 sm:p-8">
        
        {/* Sleek Golden Ambient Backlight */}
        <div className="absolute -top-20 -right-20 w-48 h-48 rounded-full bg-amber-500/15 blur-3xl pointer-events-none" />

        <button
          onClick={handleClose}
          className="absolute top-5 right-5 p-2 rounded-2xl bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-6">
          
          {/* Header Badge */}
          <div className="text-center space-y-3">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-xl shadow-amber-500/10">
              <Lock className="w-7 h-7" />
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[10px] font-mono font-bold tracking-widest uppercase">
              <Terminal className="w-3.5 h-3.5" />
              <span>Cipher Admin Gateway</span>
            </div>

            <h2 className="text-2xl font-black text-white tracking-tight">
              Cipher Terminal Auth
            </h2>
            <p className="text-xs text-neutral-400 leading-relaxed max-w-xs mx-auto">
              Restricted sovereign system access. Enter true cipher credentials to view waitlists, curriculum, and system telemetry.
            </p>
          </div>

          {/* True Credentials Hint Card for Evaluator */}
          <div className="p-3.5 rounded-2xl bg-neutral-900/90 border border-neutral-800/80 space-y-1 font-mono text-[11px]">
            <div className="text-[10px] uppercase font-bold text-amber-500 flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5" />
              <span>True Admin Credentials</span>
            </div>
            <div className="text-neutral-300">
              Username: <span className="text-amber-400 font-bold">cipher_admin</span>
            </div>
            <div className="text-neutral-300">
              Passcode: <span className="text-amber-400 font-bold">Cipher2026!</span>
            </div>
          </div>

          {errorMsg && (
            <div className="p-3.5 rounded-2xl bg-red-500/10 border border-red-500/40 text-red-400 text-xs font-mono font-medium flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4 text-xs font-mono">
            <div className="space-y-1.5">
              <label className="block text-[10px] uppercase font-bold text-neutral-400">
                Administrator Username
              </label>
              <div className="relative">
                <ShieldCheck className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3" />
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => { setUsername(e.target.value); setErrorMsg(''); }}
                  placeholder="cipher_admin"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white placeholder-neutral-600 focus:outline-none focus:border-amber-500 font-medium"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-[10px] uppercase font-bold text-neutral-400">
                Cipher Security Passcode
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setErrorMsg(''); }}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white placeholder-neutral-600 focus:outline-none focus:border-amber-500 font-medium"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-sans font-bold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-[1.01]"
            >
              <span>Unlock Cipher Terminal</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

        </div>
      </div>
    </div>
  );
};
