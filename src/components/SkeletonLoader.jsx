import React from 'react';

export const ProductCardSkeleton = () => {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-2xl overflow-hidden shadow-sm flex flex-col h-full animate-pulse">
      {/* Image skeleton */}
      <div className="aspect-square bg-slate-200 dark:bg-slate-800 w-full" />
      {/* Details skeleton */}
      <div className="p-4 flex flex-col flex-grow gap-2">
        <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-1/4" />
        <div className="h-5 bg-slate-200 dark:bg-slate-800 rounded w-3/4" />
        <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/3 mt-1" />
        <div className="flex justify-between items-center mt-auto pt-4">
          <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded w-1/3" />
          <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded-full w-8" />
        </div>
      </div>
    </div>
  );
};

export const ProductGridSkeleton = ({ count = 8 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
};

export const ProductDetailsSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 py-6 animate-pulse">
      {/* Image Gallery Skeleton */}
      <div className="flex flex-col gap-4">
        <div className="aspect-square w-full bg-slate-200 dark:bg-slate-800 rounded-2xl" />
        <div className="grid grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="aspect-square bg-slate-200 dark:bg-slate-800 rounded-xl" />
          ))}
        </div>
      </div>
      {/* Text Info Skeleton */}
      <div className="flex flex-col gap-4">
        <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/4" />
        <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded w-3/4" />
        <div className="h-5 bg-slate-200 dark:bg-slate-800 rounded w-1/3" />
        <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded w-1/4 mt-2" />
        <hr className="border-slate-200 dark:border-slate-800" />
        <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-full" />
        <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-full" />
        <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-2/3" />
        <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded w-1/2 mt-4" />
        <div className="flex gap-4 mt-6">
          <div className="h-12 bg-slate-200 dark:bg-slate-800 rounded-xl flex-grow" />
          <div className="h-12 bg-slate-200 dark:bg-slate-800 rounded-xl w-14" />
        </div>
      </div>
    </div>
  );
};
