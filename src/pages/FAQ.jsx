import React, { useState } from 'react';
import { faqs } from '../data/mockData';
import Breadcrumb from '../components/Breadcrumb';
import { RiArrowDownSLine, RiArrowUpSLine, RiQuestionLine } from 'react-icons/ri';

const FAQ = () => {
  const [openFaqId, setOpenFaqId] = useState(null);

  const toggleFaq = (id) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  // Group FAQs by category
  const categories = {
    shipping: 'Shipping & Delivery',
    returns: 'Returns & Exchanges',
    payments: 'Billing & Payments',
    warranty: 'Warranty & Support'
  };

  const getFaqsByCategory = (cat) => {
    return faqs.filter((faq) => faq.category === cat);
  };

  return (
    <div className="flex flex-col gap-4 py-2">
      {/* Page Breadcrumb */}
      <div>
        <Breadcrumb items={[{ name: 'FAQs', path: '/faq' }]} />
        {/* Premium FAQ Header Banner */}
        <div className="relative overflow-hidden rounded-3xl h-44 md:h-56 flex items-center bg-slate-900 text-white mb-4">
          <img 
            src="https://images.unsplash.com/photo-1557200134-90327ee9fafa?w=1200&auto=format&fit=crop&q=80" 
            alt="FAQ support cover" 
            className="absolute inset-0 w-full h-full object-cover opacity-45"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/70 to-transparent" />
          <div className="relative z-10 px-6 md:px-12 text-left">
            <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-2">Help Center</h1>
            <p className="text-xs md:text-sm text-slate-300 max-w-md font-medium leading-relaxed">
              Find answers to common questions about orders, shipping, and return policies.
            </p>
          </div>
        </div>
      </div>

      {/* Accordion Layout divided by Category */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-4 text-left">
        {/* Quick sidebar intro (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <div className="p-6 bg-slate-50 dark:bg-slate-900/50 border border-slate-200/60 dark:border-slate-800/80 rounded-2xl">
            <RiQuestionLine className="w-10 h-10 text-primary-600 mb-4" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Still Need Help?</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
              If you can't find what you are looking for in our FAQ catalog, please send us a direct message on our contact page.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center justify-center w-full py-2.5 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-950 font-bold hover:bg-slate-800 text-sm transition-colors cursor-pointer"
            >
              Contact Support
            </a>
          </div>
        </div>

        {/* FAQs Accordions list (8 cols) */}
        <div className="lg:col-span-8 flex flex-col gap-8">
          {Object.entries(categories).map(([catKey, catName]) => {
            const catFaqs = getFaqsByCategory(catKey);
            if (catFaqs.length === 0) return null;

            return (
              <div key={catKey} className="flex flex-col gap-3">
                <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-1 pl-2">
                  {catName}
                </h3>
                <div className="flex flex-col gap-3">
                  {catFaqs.map((faq) => {
                    const isOpen = openFaqId === faq.id;

                    return (
                      <div
                        key={faq.id}
                        className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/80 rounded-2xl overflow-hidden shadow-xs"
                      >
                        {/* Header Trigger */}
                        <div
                          onClick={() => toggleFaq(faq.id)}
                          className="flex items-center justify-between p-4 md:p-5 cursor-pointer select-none gap-4"
                        >
                          <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100">
                            {faq.question}
                          </h4>
                          <div className="text-slate-400 flex-shrink-0">
                            {isOpen ? <RiArrowUpSLine className="w-5 h-5" /> : <RiArrowDownSLine className="w-5 h-5" />}
                          </div>
                        </div>

                        {/* Expandable answer panel */}
                        {isOpen && (
                          <div className="px-5 pb-5 border-t border-slate-100 dark:border-slate-850 pt-4 bg-slate-50/50 dark:bg-slate-950/10">
                            <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                              {faq.answer}
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
