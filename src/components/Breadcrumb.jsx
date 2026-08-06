import React from 'react';
import { Link } from 'react-router-dom';
import { RiArrowRightSLine, RiHome4Line } from 'react-icons/ri';

const Breadcrumb = ({ items = [] }) => {
  return (
    <nav className="flex py-4 text-slate-500 dark:text-slate-400 text-sm overflow-x-auto whitespace-nowrap" aria-label="Breadcrumb">
      <ol className="inline-flex items-center gap-1.5 md:gap-2">
        <li className="inline-flex items-center">
          <Link
            to="/"
            className="inline-flex items-center gap-1 hover:text-primary-600 dark:hover:text-primary-500 font-medium transition-colors"
          >
            <RiHome4Line className="w-4 h-4" />
            Home
          </Link>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="inline-flex items-center gap-1.5 md:gap-2">
              <RiArrowRightSLine className="w-4 h-4 text-slate-400 dark:text-slate-600" />
              {isLast ? (
                <span className="font-semibold text-slate-800 dark:text-slate-200 select-none">
                  {item.name}
                </span>
              ) : (
                <Link
                  to={item.path}
                  className="hover:text-primary-600 dark:hover:text-primary-500 font-medium transition-colors"
                >
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
