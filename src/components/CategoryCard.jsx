import React from 'react';
import { Link } from 'react-router-dom';

const CategoryCard = ({ category }) => {
  return (
    <Link
      to={`/shop?category=${category.id}`}
      className="group block relative rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 border border-slate-200/50 dark:border-slate-800/80 bg-white dark:bg-slate-900"
    >
      <div className="aspect-16/10 w-full overflow-hidden bg-slate-100 dark:bg-slate-950 relative">
        {/* Category image */}
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

        {/* Content overlaid on image */}
        <div className="absolute bottom-0 inset-x-0 p-4 text-white">
          <h3 className="text-base font-bold tracking-tight mb-1 group-hover:text-primary-300 transition-colors">
            {category.name}
          </h3>
          <p className="text-xs text-slate-300 line-clamp-1 font-medium">
            {category.count} Products
          </p>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
