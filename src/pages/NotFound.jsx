import React from 'react';
import { Link } from 'react-router-dom';
import { RiHome4Line, RiErrorWarningLine } from 'react-icons/ri';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 px-6 max-w-md mx-auto">
      {/* 404 Visual Icon */}
      <div className="w-24 h-24 rounded-full bg-slate-100 dark:bg-slate-900/50 flex items-center justify-center mb-6 animate-pulse">
        <RiErrorWarningLine className="w-16 h-16 text-slate-350 dark:text-slate-750" />
      </div>

      <h1 className="text-6xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">
        404
      </h1>
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">
        Page Not Found
      </h2>
      <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-8">
        Sorry, the page you are looking for doesn't exist or has been moved. Use the button below to return home.
      </p>

      <Link
        to="/"
        className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-white bg-slate-900 hover:bg-primary-600 dark:bg-white dark:text-slate-950 font-bold transition-all shadow-md hover:shadow-lg duration-205 cursor-pointer"
      >
        <RiHome4Line className="w-4 h-4" />
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
