import React from 'react';
import Breadcrumb from '../components/Breadcrumb';
import { teamMembers } from '../data/mockData';
import { RiDoubleQuotesR, RiPaletteLine, RiLeafLine, RiFocus2Line } from 'react-icons/ri';

const About = () => {
  return (
    <div className="flex flex-col gap-12 md:gap-16 py-2">
      {/* Page Breadcrumb */}
      <div>
        <Breadcrumb items={[{ name: 'About Us', path: '/about' }]} />
        {/* Premium About Header Banner */}
        <div className="relative overflow-hidden rounded-3xl h-44 md:h-56 flex items-center bg-slate-900 text-white mb-4">
          <img 
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&auto=format&fit=crop&q=80" 
            alt="About us story cover" 
            className="absolute inset-0 w-full h-full object-cover opacity-45"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/70 to-transparent" />
          <div className="relative z-10 px-6 md:px-12 text-left">
            <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-2">Our Story</h1>
            <p className="text-xs md:text-sm text-slate-300 max-w-md font-medium leading-relaxed">
              Redefining aesthetic living through conscious product design.
            </p>
          </div>
        </div>
      </div>

      {/* Company Story section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center text-left">
        <div className="flex flex-col gap-4">
          <span className="text-xs font-bold tracking-widest text-primary-600 dark:text-primary-400 uppercase">
            HOW WE STARTED
          </span>
          <h2 className="text-xl md:text-3xl font-black text-slate-900 dark:text-white leading-tight">
            Crafting Essentials That Elevate Everyday Routines
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed leading-normal">
            Founded in 2026, AEROSTORE was born out of a simple frustration: the trade-off between premium aesthetics and everyday functionality. We set out to bridge this gap, curating lifestyle collections that satisfy both design enthusiasts and practical users alike.
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed leading-normal">
            Today, we collaborate with award-winning local and international craftspeople to design items that belong in modern environments. Every item in our catalogue is rigorously inspected to align with our values of pure materials, timeless forms, and long-lasting durability.
          </p>
        </div>
        <div className="h-[280px] md:h-[380px] rounded-3xl overflow-hidden shadow-md bg-slate-100 dark:bg-slate-900">
          <img
            src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&auto=format&fit=crop&q=80"
            alt="Office workspace with furniture designs"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Mission and Core values */}
      <section className="flex flex-col gap-6 text-left">
        <div>
          <span className="text-xs font-bold tracking-widest text-primary-600 dark:text-primary-400 uppercase">
            MISSION & VALUES
          </span>
          <h2 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white mt-1">
            What Drives Us Forward
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-2">
          {/* Quality */}
          <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/80 rounded-2xl shadow-xs">
            <div className="p-3 bg-primary-50 dark:bg-primary-950/20 text-primary-600 dark:text-primary-400 rounded-xl w-fit mb-4">
              <RiPaletteLine className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-850 dark:text-slate-100 mb-2">Curated Aesthetics</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              We choose design over mass production. Every product is handpicked to enrich clean lines and minimal modern spaces.
            </p>
          </div>

          {/* Sustainability */}
          <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/80 rounded-2xl shadow-xs">
            <div className="p-3 bg-primary-50 dark:bg-primary-950/20 text-primary-600 dark:text-primary-400 rounded-xl w-fit mb-4">
              <RiLeafLine className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-850 dark:text-slate-100 mb-2">Conscious Sourcing</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              We prioritize FSC-certified woods, recyclable metals, and vegan leathers to minimize ecological footprint and promote sustainable lifestyles.
            </p>
          </div>

          {/* Customer Focus */}
          <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/80 rounded-2xl shadow-xs">
            <div className="p-3 bg-primary-50 dark:bg-primary-950/20 text-primary-600 dark:text-primary-400 rounded-xl w-fit mb-4">
              <RiFocus2Line className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-850 dark:text-slate-100 mb-2">Acoustic Durability</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Our designs are made to stay, not for landfills. We back all items with extended warranties to secure lifetime reliability.
            </p>
          </div>
        </div>
      </section>

      {/* Team section */}
      <section className="flex flex-col gap-6 text-left">
        <div>
          <span className="text-xs font-bold tracking-widest text-primary-600 dark:text-primary-400 uppercase">
            MEET THE TEAM
          </span>
          <h2 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white mt-1">
            The Creative Minds Behind AEROSTORE
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-2">
          {teamMembers.map((member) => (
            <div
              key={member.name}
              className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/80 rounded-2xl overflow-hidden shadow-xs hover:shadow-sm transition-all duration-200"
            >
              <div className="aspect-square bg-slate-100 dark:bg-slate-950 overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover hover:scale-102 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
              <div className="p-5 flex flex-col items-start">
                <h4 className="text-base font-bold text-slate-900 dark:text-white">{member.name}</h4>
                <span className="text-[10px] uppercase font-bold text-primary-605 mt-0.5 mb-3">
                  {member.role}
                </span>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {member.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
