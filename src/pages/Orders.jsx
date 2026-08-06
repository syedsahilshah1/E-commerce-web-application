import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import EmptyState from '../components/EmptyState';
import Breadcrumb from '../components/Breadcrumb';
import { 
  RiFileList3Line, 
  RiArrowDownSLine, 
  RiArrowUpSLine, 
  RiDownload2Line,
  RiMapPinLine,
  RiBankCardLine
} from 'react-icons/ri';

const Orders = () => {
  const { orders, triggerToast } = useApp();
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  const toggleOrderExpand = (orderId) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  const handleDownloadInvoice = (orderId, e) => {
    e.stopPropagation(); // Prevent card collapse
    triggerToast(`Downloading invoice for order ${orderId}...`, 'info');
  };

  if (orders.length === 0) {
    return (
      <div className="py-4">
        <Breadcrumb items={[{ name: 'My Orders', path: '/orders' }]} />
        <div className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/80 rounded-3xl p-8 mt-2">
          <EmptyState type="orders" buttonLink="/shop" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 py-2">
      {/* Page Breadcrumb */}
      <Breadcrumb items={[{ name: 'My Orders', path: '/orders' }]} />

      <h1 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white text-left mb-2">
        Order History
      </h1>

      {/* Orders List */}
      <div className="flex flex-col gap-5 mt-2 text-left">
        {orders.map((order) => {
          const isExpanded = expandedOrderId === order.orderId;
          const totalItemsCount = order.items.reduce((sum, item) => sum + item.quantity, 0);

          return (
            <div
              key={order.orderId}
              className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/80 rounded-2xl overflow-hidden shadow-xs hover:shadow-sm transition-all duration-200"
            >
              {/* Order Card Header Summary */}
              <div
                onClick={() => toggleOrderExpand(order.orderId)}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 sm:p-6 cursor-pointer select-none"
              >
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 flex-grow">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Order ID</span>
                    <span className="text-sm font-bold text-slate-800 dark:text-slate-100 font-mono">{order.orderId}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Date Placed</span>
                    <span className="text-sm font-bold text-slate-800 dark:text-slate-200">{order.date}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Amount</span>
                    <span className="text-sm font-extrabold text-slate-900 dark:text-white">${order.totals.total.toFixed(2)}</span>
                  </div>
                  <div className="flex flex-col gap-1 items-start">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Status</span>
                    <span className="text-[10px] font-bold uppercase bg-blue-50 text-blue-600 dark:bg-blue-950/20 dark:text-blue-400 px-2.5 py-1 rounded-full mt-0.5">
                      {order.status}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-auto mt-2 sm:mt-0">
                  <button
                    onClick={(e) => handleDownloadInvoice(order.orderId, e)}
                    className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-400 hover:text-slate-650 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all cursor-pointer"
                    title="Download Invoice"
                  >
                    <RiDownload2Line className="w-4 h-4" />
                  </button>
                  <div className="p-1 rounded-lg text-slate-400">
                    {isExpanded ? <RiArrowUpSLine className="w-5 h-5" /> : <RiArrowDownSLine className="w-5 h-5" />}
                  </div>
                </div>
              </div>

              {/* Order Card Expanded Details */}
              {isExpanded && (
                <div className="px-6 pb-6 border-t border-slate-100 dark:border-slate-850 pt-6 bg-slate-50/50 dark:bg-slate-950/10">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    {/* Products list (7 cols) */}
                    <div className="md:col-span-8 flex flex-col gap-4">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                        Items Ordered ({totalItemsCount})
                      </h4>
                      <div className="flex flex-col gap-3">
                        {order.items.map((item) => (
                          <div 
                            key={item.cartItemId} 
                            className="flex items-center gap-4 bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/80 p-3.5 rounded-xl"
                          >
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-12 h-12 rounded-lg object-cover bg-slate-50 dark:bg-slate-950"
                            />
                            <div className="flex-grow min-w-0 text-left">
                              <h5 className="text-sm font-bold text-slate-800 dark:text-slate-150 truncate hover:text-primary-600">
                                {item.name}
                              </h5>
                              <p className="text-[10px] text-slate-450 mt-0.5">
                                Qty: {item.quantity} • Color: {item.color} {item.size !== 'Standard' && `• Size: ${item.size}`}
                              </p>
                            </div>
                            <span className="text-sm font-bold text-slate-850 dark:text-slate-200 shrink-0">
                              ${((item.discountPrice || item.price) * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Delivery & Billing details (4 cols) */}
                    <div className="md:col-span-4 flex flex-col gap-5 text-left">
                      {/* Shipping details */}
                      <div className="flex flex-col gap-2">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                          <RiMapPinLine className="w-4 h-4 text-slate-400" />
                          Delivery Address
                        </h4>
                        <div className="text-xs text-slate-600 dark:text-slate-400 leading-normal flex flex-col font-medium pl-5">
                          <span className="font-bold text-slate-800 dark:text-slate-200">{order.shippingDetails.fullName}</span>
                          <span>{order.shippingDetails.street}</span>
                          <span>{order.shippingDetails.city}, {order.shippingDetails.state} {order.shippingDetails.zip}</span>
                          <span>{order.shippingDetails.country}</span>
                        </div>
                      </div>

                      {/* Payment details */}
                      <div className="flex flex-col gap-2">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                          <RiBankCardLine className="w-4 h-4 text-slate-400" />
                          Payment Details
                        </h4>
                        <div className="text-xs text-slate-650 dark:text-slate-400 font-medium pl-5">
                          <span>{order.paymentMethod.method}</span>
                          <span className="block text-slate-400 font-mono mt-0.5">{order.paymentMethod.cardNumber}</span>
                        </div>
                      </div>

                      {/* Summary Pricing details */}
                      <div className="flex flex-col gap-2 pt-2 border-t border-slate-200/50 dark:border-slate-800/80">
                        <div className="flex justify-between text-xs text-slate-450 font-medium">
                          <span>Subtotal</span>
                          <span className="font-bold text-slate-700 dark:text-slate-300">${order.totals.subtotal.toFixed(2)}</span>
                        </div>
                        {order.totals.discount > 0 && (
                          <div className="flex justify-between text-xs text-emerald-600 font-medium">
                            <span>Coupon Discount</span>
                            <span className="font-bold">-${order.totals.discount.toFixed(2)}</span>
                          </div>
                        )}
                        <div className="flex justify-between text-xs text-slate-455 font-medium">
                          <span>Shipping</span>
                          <span className="font-bold text-slate-700 dark:text-slate-300">
                            {order.totals.shipping === 0 ? 'Free' : `$${order.totals.shipping.toFixed(2)}`}
                          </span>
                        </div>
                        <div className="flex justify-between text-xs text-slate-455 font-medium">
                          <span>Tax (8%)</span>
                          <span className="font-bold text-slate-700 dark:text-slate-300">${order.totals.tax.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm font-extrabold text-slate-900 dark:text-white pt-2 border-t border-dashed border-slate-200 dark:border-slate-800">
                          <span>Grand Total</span>
                          <span>${order.totals.total.toFixed(2)}</span>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Orders;
