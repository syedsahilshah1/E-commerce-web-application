import React from 'react';
import { categories } from '../data/mockData';
import RatingComponent from './RatingComponent';
import { RiCloseLine, RiFilterLine, RiRefreshLine } from 'react-icons/ri';

const FilterSidebar = ({ filters, setFilters, onClose }) => {
  const handleCategoryChange = (catId) => {
    setFilters((prev) => ({
      ...prev,
      category: prev.category === catId ? 'all' : catId,
      page: 1
    }));
  };

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      priceRange: {
        ...prev.priceRange,
        [name]: value === '' ? '' : Number(value)
      },
      page: 1
    }));
  };

  const handleRatingChange = (rating) => {
    setFilters((prev) => ({
      ...prev,
      rating: prev.rating === rating ? 0 : rating,
      page: 1
    }));
  };

  const handleSortChange = (e) => {
    setFilters((prev) => ({
      ...prev,
      sortBy: e.target.value,
      page: 1
    }));
  };

  const resetFilters = () => {
    setFilters({
      search: '',
      category: 'all',
      priceRange: { min: 0, max: 1000 },
      rating: 0,
      sortBy: 'latest',
      page: 1
    });
  };

  return (
    <div className="flex flex-col gap-6 w-full p-5 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-2xl shadow-xs">
      {/* Sidebar Header */}
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <RiFilterLine className="w-5 h-5 text-primary-600 dark:text-primary-400" />
          <h3 className="font-bold text-slate-800 dark:text-slate-100">Filters</h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={resetFilters}
            className="p-1.5 rounded-lg text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all cursor-pointer"
            title="Reset Filters"
          >
            <RiRefreshLine className="w-4 h-4" />
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all cursor-pointer"
            >
              <RiCloseLine className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Sorting options */}
      <div className="flex flex-col gap-2">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Sort By</label>
        <select
          value={filters.sortBy}
          onChange={handleSortChange}
          className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-sm font-medium text-slate-700 dark:text-slate-300 focus:outline-hidden focus:ring-2 focus:ring-primary-500 transition-all cursor-pointer"
        >
          <option value="latest">Latest Arrivals</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="popular">Popularity</option>
        </select>
      </div>

      {/* Categories filter */}
      <div className="flex flex-col gap-2">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Category</label>
        <div className="flex flex-col gap-1.5 mt-1">
          <button
            onClick={() => setFilters((prev) => ({ ...prev, category: 'all', page: 1 }))}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left text-sm font-semibold transition-all cursor-pointer ${
              filters.category === 'all'
                ? 'bg-primary-50 dark:bg-primary-950/30 text-primary-600 dark:text-primary-400'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/30'
            }`}
          >
            <span>All Categories</span>
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.id)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left text-sm font-semibold transition-all cursor-pointer ${
                filters.category === cat.id
                  ? 'bg-primary-50 dark:bg-primary-950/30 text-primary-600 dark:text-primary-400'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/30'
              }`}
            >
              <span>{cat.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Price range filter */}
      <div className="flex flex-col gap-2">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Price Range ($)</label>
        <div className="flex items-center gap-3 mt-1">
          <div className="flex-1">
            <span className="text-[10px] text-slate-400">Min Price</span>
            <input
              type="number"
              name="min"
              value={filters.priceRange.min}
              onChange={handlePriceChange}
              placeholder="0"
              className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs font-semibold text-slate-700 dark:text-slate-300 focus:outline-hidden focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <span className="text-slate-400 font-bold mt-4">-</span>
          <div className="flex-1">
            <span className="text-[10px] text-slate-400">Max Price</span>
            <input
              type="number"
              name="max"
              value={filters.priceRange.max}
              onChange={handlePriceChange}
              placeholder="1000"
              className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs font-semibold text-slate-700 dark:text-slate-300 focus:outline-hidden focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>
      </div>

      {/* Rating filter */}
      <div className="flex flex-col gap-2">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Customer Rating</label>
        <div className="flex flex-col gap-1 mt-1">
          {[4, 3, 2].map((stars) => (
            <button
              key={stars}
              onClick={() => handleRatingChange(stars)}
              className={`w-full flex items-center gap-2.5 px-3 py-1.5 rounded-xl text-left text-xs font-semibold transition-all cursor-pointer ${
                filters.rating === stars
                  ? 'bg-primary-50 dark:bg-primary-950/30 text-primary-600 dark:text-primary-400'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/30'
              }`}
            >
              <RatingComponent rating={stars} size={12} />
              <span>& Up</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
