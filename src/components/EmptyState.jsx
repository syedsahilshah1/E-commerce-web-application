import React from 'react';
import { Link } from 'react-router-dom';
import { RiShoppingBagLine, RiHeartLine, RiSearchLine, RiFileList3Line } from 'react-icons/ri';

const EmptyState = ({ type = 'cart', title, message, buttonText = 'Go Shopping', buttonLink = '/shop' }) => {
  const renderIcon = () => {
    const iconClass = "w-16 h-16 text-slate-300 dark:text-slate-700";
    switch (type) {
      case 'cart':
        return <RiShoppingBagLine className={iconClass} />;
      case 'wishlist':
        return <RiHeartLine className={iconClass} />;
      case 'search':
        return <RiSearchLine className={iconClass} />;
      case 'orders':
        return <RiFileList3Line className={iconClass} />;
      default:
        return <RiShoppingBagLine className={iconClass} />;
    }
  };

  const getDefaultText = () => {
    switch (type) {
      case 'cart':
        return {
          title: title || 'Your cart is empty',
          message: message || 'Looks like you haven\'t added anything to your cart yet. Explore our top products and find something you love!'
        };
      case 'wishlist':
        return {
          title: title || 'Your wishlist is empty',
          message: message || 'Save your favorite items here to purchase them later. Click the heart icon on any product page!'
        };
      case 'search':
        return {
          title: title || 'No results found',
          message: message || 'We couldn\'t find any matches for your query. Try checking your spelling or adjusting your filters.'
        };
      case 'orders':
        return {
          title: title || 'No orders yet',
          message: message || 'You haven\'t placed any orders yet. Once you complete a purchase, your order history will appear here.'
        };
      default:
        return {
          title: title || 'No items found',
          message: message || 'There are no items to display here at the moment.'
        };
    }
  };

  const text = getDefaultText();

  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-6 max-w-md mx-auto">
      <div className="w-24 h-24 rounded-full bg-slate-100 dark:bg-slate-900/50 flex items-center justify-center mb-6">
        {renderIcon()}
      </div>
      <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">{text.title}</h3>
      <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-8">{text.message}</p>
      {buttonText && buttonLink && (
        <Link
          to={buttonLink}
          className="inline-flex items-center justify-center px-6 py-3 rounded-full text-white bg-primary-600 hover:bg-primary-700 font-medium transition-all shadow-md hover:shadow-lg duration-200"
        >
          {buttonText}
        </Link>
      )}
    </div>
  );
};

export default EmptyState;
