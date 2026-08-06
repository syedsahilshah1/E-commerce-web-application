import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { products } from '../data/mockData';
import ProductCard from '../components/ProductCard';
import FilterSidebar from '../components/FilterSidebar';
import Pagination from '../components/Pagination';
import EmptyState from '../components/EmptyState';
import Breadcrumb from '../components/Breadcrumb';
import { RiSearchLine, RiFilterLine, RiCloseLine } from 'react-icons/ri';

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') || 'all';
  const searchParam = searchParams.get('search') || '';

  // Filter state
  const [filters, setFilters] = useState({
    search: searchParam,
    category: categoryParam,
    priceRange: { min: 0, max: 1000 },
    rating: 0,
    sortBy: 'latest',
    page: 1
  });

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Sync category and search query from URL search parameters
  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      category: categoryParam,
      search: searchParam,
      page: 1
    }));
  }, [categoryParam, searchParam]);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setFilters((prev) => ({ ...prev, search: query, page: 1 }));
    
    // Update URL query parameter
    const newParams = new URLSearchParams(searchParams);
    if (query) {
      newParams.set('search', query);
    } else {
      newParams.delete('search');
    }
    setSearchParams(newParams);
  };

  // Filter and sort items
  const filteredProducts = products
    .filter((product) => {
      // 1. Search Query Filter
      const matchSearch = 
        product.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        product.brand.toLowerCase().includes(filters.search.toLowerCase());
      
      // 2. Category Filter
      const matchCategory = filters.category === 'all' || product.category === filters.category;
      
      // 3. Price Filter
      const activePrice = product.discountPrice || product.price;
      const matchPrice = activePrice >= filters.priceRange.min && activePrice <= filters.priceRange.max;
      
      // 4. Rating Filter
      const matchRating = product.rating >= filters.rating;

      return matchSearch && matchCategory && matchPrice && matchRating;
    })
    .sort((a, b) => {
      const priceA = a.discountPrice || a.price;
      const priceB = b.discountPrice || b.price;

      switch (filters.sortBy) {
        case 'price-low':
          return priceA - priceB;
        case 'price-high':
          return priceB - priceA;
        case 'popular':
          return b.reviewsCount - a.reviewsCount;
        case 'latest':
        default:
          return b.id - a.id;
      }
    });

  // Pagination calculations
  const itemsPerPage = 8;
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (filters.page - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    setFilters((prev) => ({ ...prev, page }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col gap-4 py-2">
      {/* Page Breadcrumb */}
      <Breadcrumb items={[{ name: 'Shop', path: '/shop' }]} />

      {/* Premium Shop Header Banner */}
      <div className="relative overflow-hidden rounded-3xl h-44 md:h-56 flex items-center bg-slate-900 text-white mb-4">
        <img 
          src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&auto=format&fit=crop&q=80" 
          alt="Premium store catalog collections" 
          className="absolute inset-0 w-full h-full object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/70 to-transparent" />
        <div className="relative z-10 px-6 md:px-12 text-left">
          <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-2">Our Catalog</h1>
          <p className="text-xs md:text-sm text-slate-300 max-w-md font-medium leading-relaxed">
            Browse and discover our handpicked collection of premium design products.
          </p>
        </div>
      </div>

      {/* Filter and Action Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-b border-slate-200/60 dark:border-slate-800/80 pb-5">
        <div className="text-left">
          <p className="text-sm font-bold text-slate-700 dark:text-slate-350">
            Showing {filteredProducts.length} items
          </p>
        </div>

        {/* Search Input and Filter Trigger */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          {/* Live Search Field */}
          <div className="relative flex-grow sm:flex-grow-0 sm:w-64">
            <input
              type="text"
              placeholder="Search in catalog..."
              value={filters.search}
              onChange={handleSearchChange}
              className="w-full pl-9 pr-4 py-2 text-sm rounded-xl border border-slate-205 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:outline-hidden focus:ring-2 focus:ring-primary-500 focus:bg-white"
            />
            <RiSearchLine className="absolute left-3 top-3 text-slate-400 w-4 h-4" />
          </div>

          {/* Mobile Filter Button */}
          <button
            onClick={() => setMobileFiltersOpen(true)}
            className="lg:hidden flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm font-bold text-slate-700 dark:text-slate-350 hover:bg-slate-50 cursor-pointer"
          >
            <RiFilterLine className="w-4 h-4" />
            Filters
          </button>
        </div>
      </div>

      {/* Two Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-4">
        {/* Desktop Filter Sidebar */}
        <div className="hidden lg:block lg:col-span-1">
          <FilterSidebar filters={filters} setFilters={setFilters} />
        </div>

        {/* Product Grid and Pagination */}
        <div className="lg:col-span-3 flex flex-col gap-6">
          {paginatedProducts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {paginatedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              <Pagination
                currentPage={filters.page}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </>
          ) : (
            <div className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/80 rounded-3xl p-8">
              <EmptyState
                type="search"
                title="No items match your filters"
                message="Try adjusting your keywords, widening your price range, or selecting a different category to view more products."
                buttonText="Reset All Filters"
                buttonLink="#"
                onClick={() => {
                  setFilters({
                    search: '',
                    category: 'all',
                    priceRange: { min: 0, max: 1000 },
                    rating: 0,
                    sortBy: 'latest',
                    page: 1
                  });
                  setSearchParams({});
                }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Mobile Drawer Slide-Over */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Overlay background */}
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-xs" 
            onClick={() => setMobileFiltersOpen(false)}
          />
          {/* Drawer container */}
          <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-white dark:bg-slate-900 p-4 shadow-xl z-10 overflow-y-auto flex flex-col animate-slide-in">
            <FilterSidebar 
              filters={filters} 
              setFilters={setFilters} 
              onClose={() => setMobileFiltersOpen(false)} 
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Shop;
