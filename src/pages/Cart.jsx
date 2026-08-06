import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import EmptyState from '../components/EmptyState';
import Breadcrumb from '../components/Breadcrumb';
import { 
  RiDeleteBin6Line, 
  RiAddLine, 
  RiSubtractLine, 
  RiCoupon2Line, 
  RiCloseLine,
  RiArrowRightLine,
  RiArrowLeftLine
} from 'react-icons/ri';

const Cart = () => {
  const navigate = useNavigate();
  const {
    cart,
    updateQuantity,
    removeFromCart,
    activeCoupon,
    applyCoupon,
    removeCoupon,
    getCartSubtotal,
    getCartDiscount,
    getShippingCost,
    getTaxAmount,
    getCartTotal,
    user
  } = useApp();

  const [couponCode, setCouponCode] = useState('');

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponCode.trim()) {
      applyCoupon(couponCode.trim());
      setCouponCode('');
    }
  };

  const handleCheckout = () => {
    if (!user) {
      navigate('/login?redirect=checkout');
    } else {
      navigate('/checkout');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="py-4">
        <Breadcrumb items={[{ name: 'Cart', path: '/cart' }]} />
        <div className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/80 rounded-3xl p-8 mt-2">
          <EmptyState type="cart" buttonLink="/shop" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 py-2">
      {/* Page Breadcrumb */}
      <Breadcrumb items={[{ name: 'Cart', path: '/cart' }]} />

      <h1 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white text-left mb-2">
        Shopping Cart
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-2">
        {/* Left Column: Cart Items List (8 cols) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/80 rounded-2xl overflow-hidden shadow-xs">
            {/* Table Header (hidden on mobile) */}
            <div className="hidden sm:grid grid-cols-12 gap-4 px-6 py-4 bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200/50 dark:border-slate-800/80 text-xs font-bold uppercase tracking-wider text-slate-400">
              <span className="col-span-6 text-left">Product</span>
              <span className="col-span-2 text-center">Price</span>
              <span className="col-span-2 text-center">Quantity</span>
              <span className="col-span-2 text-right">Total</span>
            </div>

            {/* Items */}
            <div className="divide-y divide-slate-100 dark:divide-slate-800/85">
              {cart.map((item) => {
                const itemPrice = item.discountPrice || item.price;
                return (
                  <div 
                    key={item.cartItemId} 
                    className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center px-6 py-6"
                  >
                    {/* Info */}
                    <div className="col-span-1 sm:col-span-6 flex items-center gap-4 text-left">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover bg-slate-50 dark:bg-slate-950 flex-shrink-0"
                      />
                      <div className="flex flex-col min-w-0">
                        <span className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">
                          {item.brand}
                        </span>
                        <h4 className="text-sm font-bold text-slate-850 dark:text-slate-100 truncate hover:text-primary-600">
                          <Link to={`/product/${item.id}`}>{item.name}</Link>
                        </h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-350">
                            Color: {item.color}
                          </span>
                          {item.size !== 'Standard' && (
                            <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-350">
                              Size: {item.size}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="col-span-1 sm:col-span-2 text-left sm:text-center flex sm:flex-col justify-between sm:justify-center items-center">
                      <span className="sm:hidden text-xs text-slate-400 font-bold uppercase">Price</span>
                      <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
                        ${itemPrice.toFixed(2)}
                      </span>
                    </div>

                    {/* Quantity controls */}
                    <div className="col-span-1 sm:col-span-2 text-left sm:text-center flex sm:flex-col justify-between sm:justify-center items-center">
                      <span className="sm:hidden text-xs text-slate-400 font-bold uppercase">Quantity</span>
                      <div className="flex items-center gap-1 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 rounded-lg p-0.5 w-[90px]">
                        <button
                          onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                          className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded text-slate-500 cursor-pointer"
                        >
                          <RiSubtractLine className="w-3.5 h-3.5" />
                        </button>
                        <span className="flex-grow text-center text-xs font-bold text-slate-800 dark:text-slate-205">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                          className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded text-slate-500 cursor-pointer"
                        >
                          <RiAddLine className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Total & Remove */}
                    <div className="col-span-1 sm:col-span-2 text-left sm:text-right flex sm:flex-row justify-between sm:justify-end items-center gap-4">
                      <span className="sm:hidden text-xs text-slate-400 font-bold uppercase">Total</span>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-extrabold text-slate-900 dark:text-white">
                          ${(itemPrice * item.quantity).toFixed(2)}
                        </span>
                        <button
                          onClick={() => removeFromCart(item.cartItemId)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-all cursor-pointer"
                          title="Remove item"
                        >
                          <RiDeleteBin6Line className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Continue Shopping & Coupon form */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <Link
              to="/shop"
              className="px-6 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 font-bold text-sm text-slate-700 dark:text-slate-300 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <RiArrowLeftLine className="w-4 h-4" />
              Continue Shopping
            </Link>

            {/* Coupon field */}
            <form onSubmit={handleApplyCoupon} className="flex gap-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Coupon Code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="px-4 py-2.5 pl-9 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm placeholder-slate-450 focus:outline-hidden focus:ring-2 focus:ring-primary-500 focus:bg-white text-slate-800 dark:text-slate-100"
                />
                <RiCoupon2Line className="absolute left-3.5 top-3.5 text-slate-400 w-4 h-4" />
              </div>
              <button
                type="submit"
                className="px-4 py-2.5 rounded-xl bg-slate-900 dark:bg-slate-800 text-white font-bold hover:bg-primary-600 transition-colors shadow-xs text-sm cursor-pointer"
              >
                Apply
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: Order Summary (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/80 rounded-2xl p-6 shadow-xs text-left">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-5">Order Summary</h3>

            {/* Summary list */}
            <div className="flex flex-col gap-4 border-b border-slate-100 dark:border-slate-800 pb-5 mb-5 text-sm font-semibold text-slate-650 dark:text-slate-400">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-slate-900 dark:text-white">${getCartSubtotal().toFixed(2)}</span>
              </div>

              {/* Active coupon banner */}
              {activeCoupon ? (
                <div className="flex justify-between text-emerald-600 dark:text-emerald-500">
                  <div className="flex items-center gap-1.5">
                    <span>Coupon ({activeCoupon.code})</span>
                    <button
                      type="button"
                      onClick={removeCoupon}
                      className="p-0.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600"
                      title="Remove coupon"
                    >
                      <RiCloseLine className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <span>-${getCartDiscount().toFixed(2)}</span>
                </div>
              ) : null}

              <div className="flex justify-between">
                <span>Shipping</span>
                <span>
                  {getShippingCost() === 0 ? (
                    <span className="text-emerald-600 dark:text-emerald-500 font-bold uppercase text-xs">Free</span>
                  ) : (
                    `$${getShippingCost().toFixed(2)}`
                  )}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Tax (8%)</span>
                <span className="text-slate-900 dark:text-white">${getTaxAmount().toFixed(2)}</span>
              </div>
            </div>

            {/* Grand Total */}
            <div className="flex justify-between items-baseline mb-6">
              <span className="font-bold text-slate-800 dark:text-slate-200">Total Amount</span>
              <span className="text-xl md:text-2xl font-black text-slate-950 dark:text-white">
                ${getCartTotal().toFixed(2)}
              </span>
            </div>

            {/* Checkout Button */}
            <button
              onClick={handleCheckout}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-bold transition-all shadow-md hover:shadow-lg cursor-pointer"
            >
              Proceed to Checkout
              <RiArrowRightLine className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
