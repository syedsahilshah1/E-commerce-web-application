import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { 
  RiGithubFill, 
  RiTwitterFill, 
  RiLinkedinBoxFill, 
  RiMailSendLine 
} from 'react-icons/ri';

const Footer = () => {
  const { triggerToast } = useApp();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      triggerToast('Thank you for subscribing to our newsletter!', 'success');
      setEmail('');
    }
  };

  return (
    <footer className="w-full bg-white dark:bg-slate-950 border-t border-slate-200/60 dark:border-slate-800/80 transition-colors duration-200 mt-auto">
      {/* Upper footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 flex flex-col items-start text-left">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <span className="w-8 h-8 rounded-xl bg-slate-900 dark:bg-white flex items-center justify-center font-black text-white dark:text-slate-950 text-base">
                A
              </span>
              <span className="text-lg font-black tracking-wider text-slate-900 dark:text-white uppercase">
                AEROSTORE
              </span>
            </Link>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mb-6 leading-relaxed">
              We design and curate premium everyday essentials that seamlessly blend aesthetics and functionality. Upgrade your lifestyle with AEROSTORE.
            </p>
            {/* Social Links */}
            <div className="flex gap-2.5">
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noreferrer" 
                className="p-2.5 rounded-full border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-primary-600 dark:hover:text-primary-400 hover:border-primary-500 dark:hover:border-primary-500 transition-all cursor-pointer"
                aria-label="Twitter"
              >
                <RiTwitterFill className="w-5 h-5" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noreferrer" 
                className="p-2.5 rounded-full border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-primary-600 dark:hover:text-primary-400 hover:border-primary-500 dark:hover:border-primary-500 transition-all cursor-pointer"
                aria-label="LinkedIn"
              >
                <RiLinkedinBoxFill className="w-5 h-5" />
              </a>
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noreferrer" 
                className="p-2.5 rounded-full border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-primary-600 dark:hover:text-primary-400 hover:border-primary-500 dark:hover:border-primary-500 transition-all cursor-pointer"
                aria-label="GitHub"
              >
                <RiGithubFill className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div className="flex flex-col items-start text-left">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-4">
              Company
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm font-semibold text-slate-600 dark:text-slate-350">
              <li><Link to="/about" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">About Us</Link></li>
              <li><Link to="/shop" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Shop All</Link></li>
              <li><Link to="/contact" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Contact</Link></li>
              <li><Link to="/faq" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">FAQs</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div className="flex flex-col items-start text-left">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-4">
              Categories
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm font-semibold text-slate-600 dark:text-slate-350">
              <li><Link to="/shop?category=electronics" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Electronics</Link></li>
              <li><Link to="/shop?category=fashion" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Fashion</Link></li>
              <li><Link to="/shop?category=home-decor" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Home & Living</Link></li>
              <li><Link to="/shop?category=wellness" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Wellness</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="flex flex-col items-start text-left">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-4">
              Newsletter
            </h4>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 leading-relaxed">
              Subscribe to receive updates, access to exclusive deals, and more.
            </p>
            <form onSubmit={handleSubscribe} className="w-full flex flex-col gap-2">
              <div className="relative w-full">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 rounded-full border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-sm focus:outline-hidden focus:ring-2 focus:ring-primary-500 text-slate-800 dark:text-slate-100 placeholder-slate-400"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1.5 p-1.5 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-950 hover:bg-primary-600 dark:hover:bg-primary-500 dark:hover:text-white transition-colors cursor-pointer"
                  aria-label="Subscribe"
                >
                  <RiMailSendLine className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>

      {/* Bottom footer */}
      <div className="border-t border-slate-100 dark:border-slate-800/80 bg-slate-50 dark:bg-slate-950/50 py-6 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">
            &copy; {new Date().getFullYear()} AEROSTORE. All rights reserved.
          </p>
          <div className="flex gap-4 text-xs font-semibold text-slate-400 dark:text-slate-500">
            <Link to="/faq" className="hover:text-slate-600 dark:hover:text-slate-350">Privacy Policy</Link>
            <span>•</span>
            <Link to="/faq" className="hover:text-slate-600 dark:hover:text-slate-350">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
