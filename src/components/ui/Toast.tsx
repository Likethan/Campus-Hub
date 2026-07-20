import React, { createContext, useContext, useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';

export type ToastVariant = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
  id: string;
  message: string;
  title?: string;
  variant: ToastVariant;
  duration?: number;
}

interface ToastContextType {
  addToast: (toast: Omit<Toast, 'id'>) => void;
  success: (message: string, title?: string) => void;
  error: (message: string, title?: string) => void;
  warning: (message: string, title?: string) => void;
  info: (message: string, title?: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

const iconMap = {
  success: <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />,
  error: <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />,
  warning: <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />,
  info: <Info className="w-5 h-5 text-sky-500 shrink-0" />,
};

const styleMap = {
  success: 'bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-800/60',
  error: 'bg-white dark:bg-slate-900 border border-rose-200 dark:border-rose-800/60',
  warning: 'bg-white dark:bg-slate-900 border border-amber-200 dark:border-amber-800/60',
  info: 'bg-white dark:bg-slate-900 border border-sky-200 dark:border-sky-800/60',
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const counterRef = useRef(0);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const addToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = `toast_${Date.now()}_${counterRef.current++}`;
    setToasts(prev => [...prev, { ...toast, id }]);
    const duration = toast.duration ?? 4000;
    setTimeout(() => removeToast(id), duration);
  }, [removeToast]);

  const success = useCallback((message: string, title?: string) => addToast({ message, title, variant: 'success' }), [addToast]);
  const error = useCallback((message: string, title?: string) => addToast({ message, title, variant: 'error' }), [addToast]);
  const warning = useCallback((message: string, title?: string) => addToast({ message, title, variant: 'warning' }), [addToast]);
  const info = useCallback((message: string, title?: string) => addToast({ message, title, variant: 'info' }), [addToast]);

  return (
    <ToastContext.Provider value={{ addToast, success, error, warning, info }}>
      {children}
      {/* Toast Viewport */}
      <div className="fixed bottom-6 right-4 sm:right-6 z-[100] flex flex-col gap-3 w-full max-w-sm pointer-events-none">
        <AnimatePresence mode="popLayout">
          {toasts.map(toast => (
            <motion.div
              key={toast.id}
              layout
              initial={{ opacity: 0, x: 60, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 60, scale: 0.9 }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
              className={`pointer-events-auto flex items-start gap-3 px-4 py-3.5 rounded-ch-lg shadow-soft-lg ${styleMap[toast.variant]}`}
            >
              {iconMap[toast.variant]}
              <div className="flex-1 min-w-0">
                {toast.title && (
                  <p className="text-xs font-extrabold text-slate-900 dark:text-slate-100">{toast.title}</p>
                )}
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{toast.message}</p>
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
};
