import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { RiGoogleFill, RiAppleFill, RiMailLine, RiLockPasswordLine } from 'react-icons/ri';

const Login = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectUrl = searchParams.get('redirect') || '/';

  const { login, user, triggerToast } = useApp();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  // If already logged in, navigate away
  if (user) {
    setTimeout(() => navigate(redirectUrl), 0);
    return null;
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      triggerToast('Please enter both email and password.', 'warning');
      return;
    }

    const success = login(formData.email, formData.password);
    if (success) {
      navigate(redirectUrl);
    }
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    triggerToast('Password reset link sent to your email!', 'info');
  };

  const handleSocialLoginMock = (provider) => {
    login(`${provider.toLowerCase()}User@example.com`, 'password123');
    navigate(redirectUrl);
  };

  return (
    <div className="flex items-center justify-center py-10 sm:py-16">
      <div className="max-w-md w-full bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/80 rounded-3xl p-8 shadow-md text-left">
        {/* Header */}
        <h2 className="text-2xl font-black text-slate-905 dark:text-white mb-1">
          Welcome Back
        </h2>
        <p className="text-sm text-slate-450 dark:text-slate-400 mb-8">
          Sign in to access your cart, wishlist, and orders.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Email */}
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Email Address</label>
            <div className="relative">
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="jane@example.com"
                className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-primary-500"
              />
              <RiMailLine className="absolute left-3.5 top-3.5 text-slate-400 w-4 h-4" />
            </div>
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1">
            <div className="flex justify-between items-center mb-0.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Password</label>
              <button
                onClick={handleForgotPassword}
                type="button"
                className="text-[10px] font-bold uppercase text-primary-600 dark:text-primary-400 hover:underline cursor-pointer"
              >
                Forgot Password?
              </button>
            </div>
            <div className="relative">
              <input
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-primary-500"
              />
              <RiLockPasswordLine className="absolute left-3.5 top-3.5 text-slate-400 w-4 h-4" />
            </div>
          </div>

          {/* Remember Me */}
          <div className="flex items-center gap-2 mt-1">
            <input
              type="checkbox"
              name="rememberMe"
              id="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
              className="w-4 h-4 rounded-sm border-slate-300 dark:border-slate-850 accent-slate-950 dark:accent-white cursor-pointer"
            />
            <label htmlFor="rememberMe" className="text-xs font-semibold text-slate-500 dark:text-slate-400 cursor-pointer">
              Remember me
            </label>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-bold hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors shadow-md mt-2 cursor-pointer"
          >
            Sign In
          </button>
        </form>

        {/* Divider */}
        <div className="relative flex items-center justify-center my-6">
          <div className="absolute inset-x-0 border-t border-slate-100 dark:border-slate-800/80" />
          <span className="relative px-3 bg-white dark:bg-slate-900 text-xs font-bold text-slate-400">
            OR CONTINUE WITH
          </span>
        </div>

        {/* Social logins */}
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => handleSocialLoginMock('Google')}
            type="button"
            className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-sm font-bold text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
          >
            <RiGoogleFill className="w-5 h-5 text-rose-500" />
            Google
          </button>
          <button
            onClick={() => handleSocialLoginMock('Apple')}
            type="button"
            className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-sm font-bold text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
          >
            <RiAppleFill className="w-5 h-5 text-slate-900 dark:text-white" />
            Apple
          </button>
        </div>

        {/* Sign up prompt */}
        <p className="text-center text-xs text-slate-400 mt-8">
          Don't have an account?{' '}
          <Link
            to={`/register?redirect=${encodeURIComponent(redirectUrl)}`}
            className="font-bold text-primary-600 hover:underline"
          >
            Create Account
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Login;
