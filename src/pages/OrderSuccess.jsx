import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { RiCheckboxCircleFill, RiArrowRightSLine, RiShoppingBag3Line } from 'react-icons/ri';

const OrderSuccess = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('id') || 'ORD-' + Math.floor(100000 + Math.random() * 900000);

  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-4 max-w-lg mx-auto">
      {/* Animated Checkmark Wrapper */}
      <div className="relative w-24 h-24 rounded-full bg-emerald-50 dark:bg-emerald-950/20 flex items-center justify-center mb-8 animate-bounce">
        <RiCheckboxCircleFill className="w-16 h-16 text-emerald-500" />
      </div>

      {/* Success Title */}
      <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-2">
        Thank You for Your Order!
      </h1>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-8 leading-relaxed">
        Your payment was processed successfully, and your order has been placed. We are preparing it for delivery.
      </p>

      {/* Order Info Panel */}
      <div className="w-full bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/80 rounded-2xl p-6 shadow-xs text-left mb-8 flex flex-col gap-3">
        <div className="flex justify-between items-center text-sm font-semibold border-b border-slate-100 dark:border-slate-850 pb-3 mb-2">
          <span className="text-slate-400">Order Number</span>
          <span className="text-slate-900 dark:text-white font-mono font-bold">{orderId}</span>
        </div>
        <div className="flex justify-between items-center text-sm font-semibold border-b border-slate-100 dark:border-slate-850 pb-3 mb-2">
          <span className="text-slate-400">Estimated Delivery</span>
          <span className="text-slate-900 dark:text-white font-bold">3-5 Business Days</span>
        </div>
        <div className="flex justify-between items-center text-sm font-semibold">
          <span className="text-slate-400">Confirmation Sent To</span>
          <span className="text-slate-900 dark:text-white font-bold">your-email@example.com</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 w-full">
        <Link
          to="/shop"
          className="flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-bold hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors shadow-xs cursor-pointer"
        >
          <RiShoppingBag3Line className="w-4 h-4" />
          Continue Shopping
        </Link>
        <Link
          to="/orders"
          className="flex-1 flex items-center justify-center gap-1 py-3 px-6 rounded-xl border border-slate-202 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
        >
          View My Orders
          <RiArrowRightSLine className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccess;
