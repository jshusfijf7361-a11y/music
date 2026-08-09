import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle, Info, AlertTriangle, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-md w-full px-4 pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto flex items-center gap-3 p-4 rounded-xl shadow-2xl backdrop-blur-xl border border-neutral-200/20 dark:border-neutral-800 bg-white/95 dark:bg-neutral-900/95 text-neutral-900 dark:text-neutral-100 transition-all transform animate-in slide-in-from-bottom-5"
        >
          {toast.type === 'success' && <CheckCircle className="w-5 h-5 text-amber-500 shrink-0" />}
          {toast.type === 'info' && <Info className="w-5 h-5 text-blue-500 shrink-0" />}
          {toast.type === 'error' && <AlertTriangle className="w-5 h-5 text-red-500 shrink-0" />}
          
          <p className="text-sm font-medium leading-relaxed flex-1">{toast.message}</p>
          
          <button
            onClick={() => removeToast(toast.id)}
            className="p-1 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 transition-colors"
            aria-label="Close notification"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
