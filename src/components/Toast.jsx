import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  RiCheckboxCircleFill, 
  RiCloseCircleFill, 
  RiErrorWarningFill, 
  RiInformationFill,
  RiCloseLine
} from 'react-icons/ri';

const ToastContainer = () => {
  const { toasts } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-20 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        let bgColor = 'bg-white dark:bg-slate-900';
        let borderColor = 'border-slate-200 dark:border-slate-800';
        let textColor = 'text-slate-800 dark:text-slate-200';
        let Icon = RiInformationFill;
        let iconColor = 'text-blue-500';

        switch (toast.type) {
          case 'success':
            borderColor = 'border-emerald-500';
            Icon = RiCheckboxCircleFill;
            iconColor = 'text-emerald-500';
            break;
          case 'error':
            borderColor = 'border-rose-500';
            Icon = RiCloseCircleFill;
            iconColor = 'text-rose-500';
            break;
          case 'warning':
            borderColor = 'border-amber-500';
            Icon = RiErrorWarningFill;
            iconColor = 'text-amber-500';
            break;
          case 'info':
            borderColor = 'border-sky-500';
            Icon = RiInformationFill;
            iconColor = 'text-sky-500';
            break;
          default:
            break;
        }

        return (
          <div
            key={toast.id}
            className={`flex items-center gap-3 p-4 rounded-xl border shadow-lg ${bgColor} ${borderColor} ${textColor} pointer-events-auto transition-all duration-300 transform translate-y-0 scale-100`}
            role="alert"
          >
            <Icon className={`w-5 h-5 flex-shrink-0 ${iconColor}`} />
            <p className="text-sm font-medium flex-grow leading-snug">{toast.message}</p>
          </div>
        );
      })}
    </div>
  );
};

export default ToastContainer;
