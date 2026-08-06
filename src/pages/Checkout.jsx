import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import Breadcrumb from '../components/Breadcrumb';
import { RiSecurePaymentLine, RiTruckLine, RiWallet3Line, RiArrowRightLine } from 'react-icons/ri';

const Checkout = () => {
  const navigate = useNavigate();
  const {
    cart,
    user,
    getCartSubtotal,
    getCartDiscount,
    getShippingCost,
    getTaxAmount,
    getCartTotal,
    createOrder,
    triggerToast
  } = useApp();

  // If cart is empty, redirect to shop
  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <h2 className="text-xl font-bold mb-4">Your cart is empty</h2>
        <Link to="/shop" className="px-6 py-3 bg-slate-900 text-white rounded-full font-bold">
          Go to Shop
        </Link>
      </div>
    );
  }

  // Set default shipping form details
  const [shippingDetails, setShippingDetails] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    street: user?.addresses?.[0]?.street || '',
    city: user?.addresses?.[0]?.city || '',
    state: user?.addresses?.[0]?.state || '',
    zip: user?.addresses?.[0]?.zip || '',
    country: user?.addresses?.[0]?.country || 'United States'
  });

  const [deliveryMethod, setDeliveryMethod] = useState('standard'); // standard (free/15) vs express (25)
  const [paymentDetails, setPaymentDetails] = useState({
    cardName: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvv: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails((prev) => ({ ...prev, [name]: value }));
  };

  const calculateFinalShipping = () => {
    const baseShipping = getShippingCost();
    return deliveryMethod === 'express' ? baseShipping + 25.00 : baseShipping;
  };

  const calculateFinalTotal = () => {
    const subtotal = getCartSubtotal();
    const discount = getCartDiscount();
    const shipping = calculateFinalShipping();
    const tax = getTaxAmount();
    return Math.max(0, subtotal - discount + shipping + tax);
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    // Basic Validation
    const requiredShippingFields = ['fullName', 'email', 'phone', 'street', 'city', 'state', 'zip'];
    const isShippingValid = requiredShippingFields.every((field) => shippingDetails[field].trim() !== '');

    const requiredPaymentFields = ['cardName', 'cardNumber', 'cardExpiry', 'cardCvv'];
    const isPaymentValid = requiredPaymentFields.every((field) => paymentDetails[field].trim() !== '');

    if (!isShippingValid) {
      triggerToast('Please complete all shipping address fields.', 'warning');
      return;
    }

    if (!isPaymentValid) {
      triggerToast('Please fill out your billing card details.', 'warning');
      return;
    }

    // Call Context action to clear cart and create order
    const orderId = createOrder(
      shippingDetails,
      {
        method: 'Credit Card',
        cardNumber: `•••• •••• •••• ${paymentDetails.cardNumber.slice(-4) || '4321'}`
      }
    );

    // Redirect to success screen
    navigate(`/order-success?id=${orderId}`);
  };

  return (
    <div className="flex flex-col gap-4 py-2">
      {/* Page Breadcrumb */}
      <Breadcrumb
        items={[
          { name: 'Cart', path: '/cart' },
          { name: 'Checkout' }
        ]}
      />

      <h1 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white text-left mb-2">
        Checkout Shipping & Billing
      </h1>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-2">
        {/* Left Column: Form Details (8 cols) */}
        <div className="lg:col-span-8 flex flex-col gap-8 text-left">
          
          {/* Shipping Address section */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/80 rounded-2xl p-6 shadow-xs flex flex-col gap-5">
            <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
              <RiTruckLine className="w-5 h-5 text-primary-600" />
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Shipping Information</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1 sm:col-span-2">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={shippingDetails.fullName}
                  onChange={handleInputChange}
                  required
                  placeholder="Jane Doe"
                  className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-sm text-slate-850 dark:text-slate-100"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={shippingDetails.email}
                  onChange={handleInputChange}
                  required
                  placeholder="jane@example.com"
                  className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-sm text-slate-850 dark:text-slate-100"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  value={shippingDetails.phone}
                  onChange={handleInputChange}
                  required
                  placeholder="+1 (555) 019-2834"
                  className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-sm text-slate-850 dark:text-slate-100"
                />
              </div>

              <div className="flex flex-col gap-1 sm:col-span-2">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Street Address</label>
                <input
                  type="text"
                  name="street"
                  value={shippingDetails.street}
                  onChange={handleInputChange}
                  required
                  placeholder="128 Pine Street, Suite 400"
                  className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-sm text-slate-850 dark:text-slate-100"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">City</label>
                <input
                  type="text"
                  name="city"
                  value={shippingDetails.city}
                  onChange={handleInputChange}
                  required
                  placeholder="San Francisco"
                  className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-sm text-slate-850 dark:text-slate-100"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">State / Region</label>
                <input
                  type="text"
                  name="state"
                  value={shippingDetails.state}
                  onChange={handleInputChange}
                  required
                  placeholder="CA"
                  className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-sm text-slate-850 dark:text-slate-100"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Postal / ZIP Code</label>
                <input
                  type="text"
                  name="zip"
                  value={shippingDetails.zip}
                  onChange={handleInputChange}
                  required
                  placeholder="94103"
                  className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-sm text-slate-850 dark:text-slate-100"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Country</label>
                <input
                  type="text"
                  name="country"
                  value={shippingDetails.country}
                  onChange={handleInputChange}
                  required
                  placeholder="United States"
                  className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-sm text-slate-850 dark:text-slate-100"
                />
              </div>
            </div>
          </div>

          {/* Delivery Method section */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/80 rounded-2xl p-6 shadow-xs flex flex-col gap-5">
            <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
              <RiTruckLine className="w-5 h-5 text-primary-600" />
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Delivery Method</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Standard */}
              <button
                type="button"
                onClick={() => setDeliveryMethod('standard')}
                className={`p-4 rounded-2xl border text-left flex items-start gap-3.5 transition-all cursor-pointer ${
                  deliveryMethod === 'standard'
                    ? 'border-slate-900 bg-slate-50/50 dark:border-white dark:bg-slate-900'
                    : 'border-slate-200 hover:border-slate-300 dark:border-slate-800 bg-transparent'
                }`}
              >
                <input
                  type="radio"
                  name="delivery"
                  checked={deliveryMethod === 'standard'}
                  onChange={() => {}}
                  className="mt-1 cursor-pointer accent-slate-950 dark:accent-white"
                />
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-slate-800 dark:text-slate-100">Standard Delivery</span>
                  <span className="text-xs text-slate-400 mt-0.5">3-5 Business Days</span>
                  <span className="text-sm font-bold text-slate-800 dark:text-slate-250 mt-2">
                    {getShippingCost() === 0 ? 'Free' : `$${getShippingCost().toFixed(2)}`}
                  </span>
                </div>
              </button>

              {/* Express */}
              <button
                type="button"
                onClick={() => setDeliveryMethod('express')}
                className={`p-4 rounded-2xl border text-left flex items-start gap-3.5 transition-all cursor-pointer ${
                  deliveryMethod === 'express'
                    ? 'border-slate-900 bg-slate-50/50 dark:border-white dark:bg-slate-900'
                    : 'border-slate-200 hover:border-slate-300 dark:border-slate-800 bg-transparent'
                }`}
              >
                <input
                  type="radio"
                  name="delivery"
                  checked={deliveryMethod === 'express'}
                  onChange={() => {}}
                  className="mt-1 cursor-pointer accent-slate-950 dark:accent-white"
                />
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-slate-800 dark:text-slate-100">Express Delivery</span>
                  <span className="text-xs text-slate-400 mt-0.5">1-2 Business Days</span>
                  <span className="text-sm font-bold text-slate-800 dark:text-slate-250 mt-2">
                    + $25.00
                  </span>
                </div>
              </button>
            </div>
          </div>

          {/* Payment Method section */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/80 rounded-2xl p-6 shadow-xs flex flex-col gap-5">
            <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
              <RiWallet3Line className="w-5 h-5 text-primary-600" />
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Payment Method</h3>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3.5 p-4 rounded-2xl border border-slate-900 dark:border-white bg-slate-50/50 dark:bg-slate-900">
                <RiSecurePaymentLine className="w-5 h-5 text-slate-905 dark:text-white" />
                <span className="text-sm font-bold text-slate-800 dark:text-slate-100">Credit / Debit Card</span>
              </div>

              {/* Credit Card inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mt-2">
                <div className="flex flex-col gap-1 sm:col-span-4">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Cardholder Name</label>
                  <input
                    type="text"
                    name="cardName"
                    value={paymentDetails.cardName}
                    onChange={handlePaymentChange}
                    required
                    placeholder="Jane Doe"
                    className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-sm text-slate-850 dark:text-slate-100"
                  />
                </div>

                <div className="flex flex-col gap-1 sm:col-span-2">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Card Number</label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={paymentDetails.cardNumber}
                    onChange={handlePaymentChange}
                    required
                    maxLength="16"
                    placeholder="4111 2222 3333 4444"
                    className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-sm text-slate-850 dark:text-slate-100"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Expiry (MM/YY)</label>
                  <input
                    type="text"
                    name="cardExpiry"
                    value={paymentDetails.cardExpiry}
                    onChange={handlePaymentChange}
                    required
                    placeholder="12/29"
                    className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-sm text-slate-850 dark:text-slate-100"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">CVV</label>
                  <input
                    type="password"
                    name="cardCvv"
                    value={paymentDetails.cardCvv}
                    onChange={handlePaymentChange}
                    required
                    maxLength="3"
                    placeholder="123"
                    className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-sm text-slate-850 dark:text-slate-100"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Order Summary (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/80 rounded-2xl p-6 shadow-xs text-left">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-5">Checkout Summary</h3>

            {/* Cart products check */}
            <div className="flex flex-col gap-3.5 mb-5 max-h-[180px] overflow-y-auto pr-2 border-b border-slate-100 dark:border-slate-800 pb-5">
              {cart.map((item) => (
                <div key={item.cartItemId} className="flex gap-3 items-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-10 h-10 rounded-lg object-cover bg-slate-50 dark:bg-slate-950"
                  />
                  <div className="flex-grow min-w-0">
                    <h5 className="text-xs font-bold text-slate-800 dark:text-slate-100 truncate">{item.name}</h5>
                    <p className="text-[10px] text-slate-400">Qty: {item.quantity} • {item.color}</p>
                  </div>
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    ${((item.discountPrice || item.price) * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            {/* Summary list */}
            <div className="flex flex-col gap-4 border-b border-slate-100 dark:border-slate-800 pb-5 mb-5 text-sm font-semibold text-slate-650 dark:text-slate-400">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-slate-900 dark:text-white">${getCartSubtotal().toFixed(2)}</span>
              </div>

              {getCartDiscount() > 0 && (
                <div className="flex justify-between text-emerald-600 dark:text-emerald-500">
                  <span>Coupon Discount</span>
                  <span>-${getCartDiscount().toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Shipping</span>
                <span>
                  {calculateFinalShipping() === 0 ? (
                    <span className="text-emerald-600 dark:text-emerald-500 font-bold uppercase text-xs">Free</span>
                  ) : (
                    `$${calculateFinalShipping().toFixed(2)}`
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
              <span className="font-bold text-slate-800 dark:text-slate-200">Final Total</span>
              <span className="text-xl md:text-2xl font-black text-slate-950 dark:text-white">
                ${calculateFinalTotal().toFixed(2)}
              </span>
            </div>

            {/* Place Order CTA */}
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-slate-900 dark:bg-white dark:text-slate-950 text-white font-bold transition-all shadow-md hover:shadow-lg cursor-pointer"
            >
              Place Secure Order
              <RiArrowRightLine className="w-4 h-4" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
