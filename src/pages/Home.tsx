import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Hero from '../components/Hero';
import BookingForm from '../components/BookingForm';
import About from '../components/About';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';
import TestMarquee from '../components/TestMarquee';

export default function Home() {
  const fleetHeaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Staggered reveal for the Fleet section header
      if (fleetHeaderRef.current) {
        gsap.fromTo(fleetHeaderRef.current.children,
          { opacity: 0, y: 30 },
          { 
            opacity: 1, 
            y: 0, 
            stagger: 0.15, 
            duration: 1, 
            ease: "power3.out",
            scrollTrigger: {
              trigger: fleetHeaderRef.current,
              start: "top 80%", // Triggers when it enters the bottom 20% of the screen
              toggleActions: "play none none reverse"
            }
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    // Added a global selection color so when users highlight text, it matches your brand
    <main className="bg-slate-950 min-h-screen selection:bg-brand-accent/30 selection:text-white overflow-hidden">
      <div id="top"></div> 
      <Hero />
      
      

      {/* Car Listing Section - Upgraded Style */}
      <section id="cars" className="py-24 relative overflow-hidden">
        {/* Ambient Background Glows */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-accent/5 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />
        <div className="absolute bottom-0 left-[-10%] w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            
            {/* Added ref here to animate the children (line, h2, p) */}
            <div ref={fleetHeaderRef} className="relative">
              {/* Decorative line */}
              <div className="w-12 h-1 bg-brand-accent rounded-full mb-6 shadow-[0_0_10px_rgba(var(--brand-accent-rgb),0.5)]" />
              
              <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-6">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-500">
                  Our Premium Fleet
                </span>
              </h2>
              
              <p className="text-lg md:text-xl text-slate-400 max-w-xl leading-relaxed font-light">
                Choose from our wide range of luxury vehicles, from high-performance sports cars to executive SUVs.
              </p>
            </div>
            
          </div>

          {/* Marquee Wrapper */}
          <div className="relative -mx-6 md:mx-0">
            <div id="services"></div>
            <TestMarquee />
          </div>
        </div>
      </section>
<div id="about"></div>
      <About />
      
      <Testimonials />
      <div id="contact"></div>
      <Contact />
    </main>
  );
}