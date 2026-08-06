import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import EmptyState from '../components/EmptyState';
import Breadcrumb from '../components/Breadcrumb';
import { RiDeleteBin6Line, RiShoppingBag3Line } from 'react-icons/ri';

const Wishlist = () => {
  const { wishlist, toggleWishlist, addToCart } = useApp();

  const handleAddToCart = (product) => {
    // Adds with default first color and size if available
    addToCart(product);
  };

  if (wishlist.length === 0) {
    return (
      <div className="py-4">
        <Breadcrumb items={[{ name: 'Wishlist', path: '/wishlist' }]} />
        <div className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/80 rounded-3xl p-8 mt-2">
          <EmptyState type="wishlist" buttonLink="/shop" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 py-2">
      {/* Page Breadcrumb */}
      <Breadcrumb items={[{ name: 'Wishlist', path: '/wishlist' }]} />

      <h1 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white text-left mb-2">
        My Wishlist
      </h1>

      {/* Wishlist grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-2">
        {wishlist.map((product) => {
          const isOutOfStock = product.stock === 0;

          return (
            <div
              key={product.id}
              className="group relative bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full"
            >
              {/* Image Section */}
              <div className="relative aspect-square w-full overflow-hidden bg-slate-105 dark:bg-slate-950">
                <Link to={`/product/${product.id}`} className="block w-full h-full">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                    loading="lazy"
                  />
                </Link>

                {/* Remove button */}
                <button
                  onClick={() => toggleWishlist(product)}
                  className="absolute top-3 right-3 p-2 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-xs text-slate-400 hover:text-rose-500 hover:bg-white dark:hover:bg-slate-800 shadow-xs transition-all duration-200 z-10 cursor-pointer"
                  title="Remove from wishlist"
                >
                  <RiDeleteBin6Line className="w-4 h-4" />
                </button>
              </div>

              {/* Info Details Section */}
              <div className="p-4 flex flex-col flex-grow text-left">
                <span className="text-[10px] tracking-wider uppercase font-semibold text-primary-600 dark:text-primary-400 mb-1">
                  {product.brand}
                </span>

                <h4 className="text-sm font-bold text-slate-850 dark:text-slate-100 group-hover:text-primary-600 transition-colors duration-200 mb-2 line-clamp-2 min-h-[40px]">
                  <Link to={`/product/${product.id}`}>{product.name}</Link>
                </h4>

                <div className="flex items-baseline gap-2 mb-4">
                  {product.discountPrice ? (
                    <>
                      <span className="text-base font-extrabold text-slate-900 dark:text-white">
                        ${product.discountPrice.toFixed(2)}
                      </span>
                      <span className="text-xs text-slate-450 line-through">
                        ${product.price.toFixed(2)}
                      </span>
                    </>
                  ) : (
                    <span className="text-base font-extrabold text-slate-900 dark:text-white">
                      ${product.price.toFixed(2)}
                    </span>
                  )}
                </div>

                {/* Quick Add to Cart */}
                <button
                  onClick={() => handleAddToCart(product)}
                  disabled={isOutOfStock}
                  className="w-full mt-auto flex items-center justify-center gap-2 py-2.5 rounded-xl border border-slate-205 dark:border-slate-800 bg-slate-900 hover:bg-primary-600 hover:border-primary-600 dark:bg-slate-800 text-white disabled:bg-slate-100 disabled:text-slate-400 disabled:border-transparent text-xs font-bold transition-all shadow-xs cursor-pointer"
                >
                  <RiShoppingBag3Line className="w-4 h-4" />
                  {isOutOfStock ? 'Sold Out' : 'Add to Cart'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Wishlist;
