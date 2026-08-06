import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import Breadcrumb from '../components/Breadcrumb';
import { 
  RiMailLine, 
  RiPhoneLine, 
  RiMapPinLine, 
  RiTimeLine,
  RiSendPlaneLine 
} from 'react-icons/ri';

const Contact = () => {
  const { triggerToast } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      triggerToast('Thank you for contacting us! Our support team will respond shortly.', 'success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    }
  };

  return (
    <div className="flex flex-col gap-4 py-2">
      {/* Page Breadcrumb */}
      <Breadcrumb items={[{ name: 'Contact Us', path: '/contact' }]} />

      {/* Premium Contact Header Banner */}
      <div className="relative overflow-hidden rounded-3xl h-44 md:h-56 flex items-center bg-slate-900 text-white mb-4">
        <img 
          src="https://images.unsplash.com/photo-1423662055902-3f9e02d26c40?w=1200&auto=format&fit=crop&q=80" 
          alt="Contact us support cover" 
          className="absolute inset-0 w-full h-full object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/70 to-transparent" />
        <div className="relative z-10 px-6 md:px-12 text-left">
          <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-2">Contact Us</h1>
          <p className="text-xs md:text-sm text-slate-300 max-w-md font-medium leading-relaxed">
            Have a question or feedback? We would love to hear from you.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mt-4 text-left">
        {/* Left Column: Contact details (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/80 rounded-2xl p-6 shadow-xs flex flex-col gap-6">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Get in Touch</h3>
            
            <div className="flex flex-col gap-5 text-sm font-semibold text-slate-650 dark:text-slate-400">
              {/* Email */}
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-primary-50 dark:bg-primary-950/20 text-primary-650 shrink-0">
                  <RiMailLine className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Customer Support</span>
                  <span className="text-slate-800 dark:text-slate-200 mt-0.5">support@aerostore.com</span>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-primary-50 dark:bg-primary-950/20 text-primary-655 shrink-0">
                  <RiPhoneLine className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Phone Hotline</span>
                  <span className="text-slate-800 dark:text-slate-205 mt-0.5">+1 (800) 555-0199</span>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-primary-50 dark:bg-primary-950/20 text-primary-655 shrink-0">
                  <RiMapPinLine className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Office Headquarters</span>
                  <span className="text-slate-800 dark:text-slate-205 mt-0.5">128 Pine Street, Suite 400, San Francisco, CA 94103</span>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-primary-50 dark:bg-primary-950/20 text-primary-655 shrink-0">
                  <RiTimeLine className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Operating Hours</span>
                  <span className="text-slate-800 dark:text-slate-205 mt-0.5">Monday - Friday: 9:00 AM - 6:00 PM EST</span>
                </div>
              </div>
            </div>
          </div>

          {/* Google Maps placeholder (using styled iframe) */}
          <div className="h-60 rounded-2xl overflow-hidden shadow-xs border border-slate-200/50 dark:border-slate-800/80 bg-slate-100 dark:bg-slate-900">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.5658607147775!2d-122.40871342358172!3d37.77884261198642!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858087265cd8bb%3A0x6b5a3e144a2c3a50!2sPine%20St%2C%20San%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="AEROSTORE HQ Map Location"
            />
          </div>
        </div>

        {/* Right Column: Contact form (7 cols) */}
        <div className="lg:col-span-7">
          <form 
            onSubmit={handleContactSubmit}
            className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/80 rounded-2xl p-6 md:p-8 shadow-xs flex flex-col gap-4"
          >
            <h3 className="text-lg font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3 mb-2">
              Send Us a Message
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Full Name */}
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Full Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Jane Doe"
                  className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-sm text-slate-850 dark:text-slate-100"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Email Address</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="jane@example.com"
                  className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-sm text-slate-855 dark:text-slate-100"
                />
              </div>
            </div>

            {/* Subject */}
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Subject</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                placeholder="Product Curation Inquiry"
                className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-sm text-slate-850 dark:text-slate-100"
              />
            </div>

            {/* Message Description */}
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Message Description</label>
              <textarea
                name="message"
                required
                value={formData.message}
                onChange={handleInputChange}
                rows={6}
                placeholder="Write your detailed questions or comments here..."
                className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-sm text-slate-850 dark:text-slate-100 resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full sm:w-auto self-end flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-bold hover:bg-primary-650 dark:hover:bg-slate-100 transition-colors shadow-md cursor-pointer mt-2"
            >
              <RiSendPlaneLine className="w-4 h-4" />
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
