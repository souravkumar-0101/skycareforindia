import React, { useEffect, ReactNode } from 'react';
import { X, CheckCircle, AlertTriangle, Info, AlertCircle } from 'lucide-react';
import { ToastItem } from '../../context/AppContext';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  children: ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  maxWidth = 'md',
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const widthMap = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-2xl',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-fade-in">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-skycare-navy/80 backdrop-blur-md transition-opacity"
        aria-hidden="true"
      />

      {/* Modal Card */}
      <div className={`relative w-full ${widthMap[maxWidth]} bg-gradient-to-b from-skycare-darkBlue/95 to-skycare-navy/95 border border-skycare-softBlue/30 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-skycare-navy z-10 animate-slide-up text-left`}>
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            {title && (
              <h2 className="text-xl sm:text-2xl font-bold text-white font-display">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mt-1 text-sm text-skycare-cloud/70">{subtitle}</p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="p-2 rounded-xl text-skycare-cloud/60 hover:text-white hover:bg-skycare-skyBlue/40 transition-colors focus:outline-none focus:ring-2 focus:ring-skycare-sun"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div>{children}</div>
      </div>
    </div>
  );
};

export interface ToastContainerProps {
  toasts: ToastItem[];
  onRemove: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onRemove }) => {
  if (toasts.length === 0) return null;

  const iconMap = {
    success: <CheckCircle className="w-5 h-5 text-skycare-accentEmerald shrink-0" />,
    warning: <AlertTriangle className="w-5 h-5 text-skycare-sun shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-skycare-accentRose shrink-0" />,
    info: <Info className="w-5 h-5 text-skycare-accentCyan shrink-0" />,
  };

  const borderMap = {
    success: 'border-skycare-accentEmerald/40',
    warning: 'border-skycare-sun/40',
    error: 'border-skycare-accentRose/40',
    info: 'border-skycare-softBlue/40',
  };

  return (
    <div className="fixed bottom-20 md:bottom-6 right-4 sm:right-6 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto flex items-start gap-3 p-4 rounded-2xl bg-skycare-darkBlue/95 backdrop-blur-xl border ${borderMap[toast.type]} shadow-xl shadow-skycare-navy/80 animate-slide-up text-left`}
          role="alert"
        >
          <div className="mt-0.5">{iconMap[toast.type]}</div>
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-semibold text-white tracking-tight">{toast.title}</h4>
            {toast.message && (
              <p className="mt-0.5 text-xs text-skycare-cloud/80 leading-relaxed">
                {toast.message}
              </p>
            )}
          </div>
          <button
            onClick={() => onRemove(toast.id)}
            aria-label="Dismiss notification"
            className="p-1 rounded-lg text-skycare-cloud/50 hover:text-white hover:bg-skycare-navy/50 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
