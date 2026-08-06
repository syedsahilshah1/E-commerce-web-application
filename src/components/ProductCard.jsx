import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import RatingComponent from './RatingComponent';
import { RiHeartLine, RiHeartFill, RiShoppingBagLine } from 'react-icons/ri';

const ProductCard = ({ product }) => {
  const { addToCart, wishlist, toggleWishlist } = useApp();

  const isWishlisted = wishlist.some((item) => item.id === product.id);
  const discountPrice = product.discountPrice;
  const isDiscounted = discountPrice && discountPrice < product.price;

  return (
    <div className="group relative bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full">
      {/* Product Image Section */}
      <div className="relative aspect-square w-full overflow-hidden bg-slate-100 dark:bg-slate-950">
        <Link to={`/product/${product.id}`} className="block w-full h-full">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
            loading="lazy"
          />
        </Link>

        {/* Discount Badge */}
        {isDiscounted && (
          <span className="absolute top-3 left-3 bg-rose-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-sm z-10">
            -{product.discountPercentage}%
          </span>
        )}

        {/* Wishlist Button */}
        <button
          onClick={() => toggleWishlist(product)}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-xs text-slate-600 dark:text-slate-300 hover:text-rose-500 dark:hover:text-rose-500 shadow-xs hover:shadow-md transition-all duration-200 z-10 cursor-pointer"
          aria-label="Add to wishlist"
        >
          {isWishlisted ? (
            <RiHeartFill className="w-5 h-5 text-rose-500 animate-pulse" />
          ) : (
            <RiHeartLine className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Content Section */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Brand & Category */}
        <div className="flex items-center gap-1.5 mb-1">
          <span className="text-[10px] tracking-wider uppercase font-semibold text-primary-600 dark:text-primary-400">
            {product.brand}
          </span>
          <span className="text-[10px] text-slate-400">•</span>
          <span className="text-[10px] uppercase font-semibold text-slate-400 dark:text-slate-500">
            {product.category}
          </span>
        </div>

        {/* Product Title */}
        <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200 mb-1.5 line-clamp-2 min-h-[40px]">
          <Link to={`/product/${product.id}`}>{product.name}</Link>
        </h4>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <RatingComponent rating={product.rating} size={13} />
          <span className="text-xs text-slate-400 dark:text-slate-500">({product.reviewsCount})</span>
        </div>

        {/* Footer info: Price & Add to Cart */}
        <div className="flex items-end justify-between mt-auto pt-3 border-t border-slate-100 dark:border-slate-800/80">
          <div>
            {isDiscounted ? (
              <div className="flex flex-col">
                <span className="text-xs text-slate-400 dark:text-slate-500 line-through leading-none">
                  ${product.price.toFixed(2)}
                </span>
                <span className="text-base font-extrabold text-slate-900 dark:text-white leading-none mt-1">
                  ${discountPrice.toFixed(2)}
                </span>
              </div>
            ) : (
              <span className="text-base font-extrabold text-slate-900 dark:text-white">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>

          <button
            onClick={() => addToCart(product)}
            className="p-2.5 rounded-xl bg-slate-900 hover:bg-primary-600 dark:bg-slate-800 dark:hover:bg-primary-600 text-white shadow-xs hover:shadow-lg transition-all duration-200 cursor-pointer"
            aria-label="Add to cart"
            disabled={product.stock === 0}
          >
            <RiShoppingBagLine className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
