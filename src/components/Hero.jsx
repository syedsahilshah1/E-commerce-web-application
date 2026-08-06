import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri';

const slides = [
  {
    id: 1,
    title: 'AeroSound Max',
    subtitle: 'THE FUTURE OF ACOUSTICS',
    description: 'Experience pure acoustic bliss with active noise cancellation and up to 40 hours of battery life.',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
    link: '/product/1',
    bgColor: 'from-violet-600 to-indigo-900',
    textColor: 'text-white'
  },
  {
    id: 2,
    title: 'Minimalist Oak Chair',
    subtitle: 'HANDCRAFTED NORDIC COMFORT',
    description: 'Bring clean lines and organic warmth to your living room. FSC-certified solid European oak.',
    image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&auto=format&fit=crop&q=80',
    link: '/product/9',
    bgColor: 'from-amber-600 to-amber-900',
    textColor: 'text-white'
  },
  {
    id: 3,
    title: 'Classic Leather Sneakers',
    subtitle: 'ITALIAN LEATHER ESSENTIALS',
    description: 'Crafted from premium full-grain leather, designed to fit seamlessly from the boardroom to weekends.',
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&auto=format&fit=crop&q=80',
    link: '/product/5',
    bgColor: 'from-slate-800 to-slate-950',
    textColor: 'text-white'
  }
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative w-full h-[400px] md:h-[520px] rounded-3xl overflow-hidden shadow-lg mb-8">
      {/* Slides Container */}
      <div className="relative w-full h-full">
        {slides.map((slide, idx) => (
          <div
            key={slide.id}
            className={`absolute inset-0 w-full h-full flex flex-col md:flex-row items-center justify-between p-8 md:p-16 bg-gradient-to-br ${slide.bgColor} transition-opacity duration-1000 ease-in-out ${
              idx === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            {/* Slide Info */}
            <div className="w-full md:w-1/2 flex flex-col items-start text-left z-20">
              <span className="text-xs md:text-sm font-bold tracking-widest text-primary-200 uppercase mb-2">
                {slide.subtitle}
              </span>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-black leading-tight text-white mb-4">
                {slide.title}
              </h2>
              <p className="text-sm md:text-base text-slate-200 max-w-md mb-6 md:mb-8 font-medium leading-relaxed">
                {slide.description}
              </p>
              <Link
                to={slide.link}
                className="px-8 py-3.5 rounded-full bg-white text-slate-900 font-bold hover:bg-primary-100 shadow-md hover:shadow-xl transition-all duration-200 cursor-pointer"
              >
                Shop Collection
              </Link>
            </div>

            {/* Slide Image */}
            <div className="w-full md:w-1/2 h-48 md:h-full flex items-center justify-center relative mt-4 md:mt-0">
              <div className="absolute inset-0 bg-white/5 rounded-full filter blur-3xl" />
              <img
                src={slide.image}
                alt={slide.title}
                className="max-h-[220px] md:max-h-[380px] object-contain rounded-2xl shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500 z-20"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Slider Controls */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white backdrop-blur-xs transition-colors cursor-pointer"
        aria-label="Previous slide"
      >
        <RiArrowLeftSLine className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white backdrop-blur-xs transition-colors cursor-pointer"
        aria-label="Next slide"
      >
        <RiArrowRightSLine className="w-6 h-6" />
      </button>

      {/* Indicator Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              idx === currentSlide ? 'bg-white w-6' : 'bg-white/40'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;
