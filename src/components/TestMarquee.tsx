import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { Users, Fuel, Gauge, ArrowRight } from 'lucide-react';
import { CARS } from '../types';

// 1. Ultra-Premium Cinematic Card
function MarqueeCard({ car }: { car: any }) {
  return (
    <div className="group relative w-[360px] h-[485px] flex-shrink-0 rounded-[2rem] overflow-hidden border border-white/10 bg-slate-900 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:border-brand-accent/50 cursor-pointer">
      
      {/* Full Bleed Image with smooth scale */}
      <img 
        src={car.image} 
        alt={car.name} 
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-100 scale-105"
        referrerPolicy="no-referrer"
      />

      {/* Deep Gradient Overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent opacity-90 transition-opacity duration-500" />
      
      {/* Top Floating Badge */}
      <div className="absolute top-5 left-5 backdrop-blur-md bg-white/10 border border-white/20 px-4 py-1.5 rounded-full text-xs text-white uppercase font-bold tracking-widest">
        {car.type}
      </div>

      {/* Content Container - Pushed to the bottom */}
      <div className="absolute bottom-0 left-0 w-full p-6 flex flex-col justify-end h-full">
        
        {/* Title & Price */}
        <div className="mb-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
          <p className="text-brand-accent text-sm font-bold uppercase tracking-widest mb-1">{car.brand}</p>
          <h3 className="text-2xl font-display font-bold text-white leading-tight mb-2">{car.name}</h3>
          <div className="text-white font-medium">
            <span className="text-xl font-bold">${car.pricePerDay}</span>
            <span className="text-slate-400 text-sm"> / day</span>
          </div>
        </div>

        {/* Specs Grid - Hidden by default, reveals on hover */}
        <div className="grid grid-cols-3 gap-2 py-4 border-t border-white/10 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-75">
          <div className="flex flex-col items-start gap-1">
            <Users size={16} className="text-slate-400" />
            <span className="text-xs text-slate-300 font-medium">{car.specs.seats} Seats</span>
          </div>
          <div className="flex flex-col items-start gap-1">
            <Fuel size={16} className="text-slate-400" />
            <span className="text-xs text-slate-300 font-medium">{car.specs.fuel}</span>
          </div>
          <div className="flex flex-col items-start gap-1">
            <Gauge size={16} className="text-slate-400" />
            <span className="text-xs text-slate-300 font-medium">{car.specs.acceleration?.split(' ')[0]}</span>
          </div>
        </div>

        {/* Action Button - Slides in */}
        <Link 
          to={`/car/${car.id}`} 
          className="w-full py-3 rounded-xl backdrop-blur-md bg-white/10 border border-white/20 text-white font-semibold flex items-center justify-center gap-4 hover:bg-brand-accent hover:text-brand-deep hover:border-brand-accent transition-all duration-300 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 delay-100"
        >
          View Details
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </Link>

      </div>
    </div>
  );
}

// 2. The GSAP Marquee Container
export default function TestMarquee() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  
  // Duplicate array for the infinite loop
  const infiniteCars = [...CARS, ...CARS, ...CARS]; 

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Move the row left by exactly one-third of its total width since we tripled the array
      const tween = gsap.to(rowRef.current, {
        xPercent: -33.333333,
        repeat: -1, // Changed back to -1 so it loops infinitely!
        duration: 40, // Nice, slow, luxurious speed
        ease: "none",
      });

      // Hover to pause
      if (containerRef.current) {
        containerRef.current.addEventListener("mouseenter", () => tween.pause());
        containerRef.current.addEventListener("mouseleave", () => tween.play());
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    // THE MAGIC SAUCE: w-screen, left-1/2, and -translate-x-1/2 forces this to break out 
    // of the parent container and touch the absolute edges of the monitor.
    <section className="py-12 overflow-hidden relative w-screen left-1/2 -translate-x-1/2">
      
      {/* Edge Fades - Fixed to use the slate-950 background color to fade seamlessly */}
      <div className="absolute left-0 top-0 bottom-0 w-16 md:w-48 bg-gradient-to-r  to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 md:w-48 bg-gradient-to-l  to-transparent z-10 pointer-events-none" />

      {/* GSAP Target Wrapper */}
      <div ref={containerRef} className="w-full flex">
        <div ref={rowRef} className="flex flex-nowrap gap-6 px-6 w-max">
          {infiniteCars.map((car, i) => (
            <MarqueeCard key={`${car.id}-${i}`} car={car} />
          ))}
        </div>
      </div>
    </section>
  );
}