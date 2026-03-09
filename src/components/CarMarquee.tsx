import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import CarCard from './CarCard';
import { CARS } from '../types';

export default function CarMarquee() {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  const handleMouseEnter = () => {
    if (contentRef.current) {
      gsap.to(contentRef.current, { duration: 0.2, ease: "power2.out", xPercent: 0 });
    }
  };

  const handleMouseLeave = () => {
    if (contentRef.current) {
      gsap.to(contentRef.current, { duration: 0.2, ease: "power2.out", xPercent: -50 });
    }
  };

  
  // Duplicate the array so the loop has enough content to seamlessly snap back
  const duplicatedCars = [...CARS, ...CARS];

  useEffect(() => {
    // gsap.context ensures smooth cleanup for React
    const ctx = gsap.context(() => {
      // We animate the inner container exactly 50% to the left.
      // Because it contains exactly two identical sets of cars, 
      // the moment it hits 50%, it instantly snaps back to 0% invisibly.
      const loop = gsap.to(contentRef.current, {
        xPercent: -50,
        repeat: -1,       // Infinite loop
        duration: 30,     // Total time in seconds (increase to slow down)
        ease: "none",     // Linear movement (no speeding up or slowing down)
      });

      // Pause the animation when the user hovers so they can click a car
      const marqueeElement = marqueeRef.current;
      if (marqueeElement) {
        marqueeElement.addEventListener("mouseenter", () => loop.pause());
        marqueeElement.addEventListener("mouseleave", () => loop.play());
      }

      return () => {
        if (marqueeElement) {
          marqueeElement.removeEventListener("mouseenter", () => loop.pause());
          marqueeElement.removeEventListener("mouseleave", () => loop.play());
        }
      };
    }, marqueeRef);

    return () => ctx.revert(); // Cleanup on unmount
  }, []);

  return (
    <section className="relative w-full overflow-hidden py-24 bg-slate-950">
      
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-white">
          Choose Your Ride
        </h2>
      </div>

      {/* Gradient fades on the edges to make the cards smoothly appear/disappear */}
      <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none" />

      {/* The main wrapper that we attach hover events to */}
      <div ref={marqueeRef} className="w-full relative flex items-center">
        
        {/* The content container that GSAP pushes to the left */}
        <div 
          ref={contentRef} 
          className="flex gap-6 px-4 w-max"
        >
          {duplicatedCars.map((car, index) => (
            <CarCard key={`${car.id}-${index}`} car={car} />
          ))}
        </div>

      </div>
    </section>
  );
}