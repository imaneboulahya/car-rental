import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// Assets
import benzPic from '../../asset/benz.jpeg';
import rangePic from '../../asset/range.avif';
import trocPic from '../../asset/troc.jpeg';
import tucsonPic from '../../asset/tucson.jpeg';
import golfPic from '../../asset/golf.jpg';
import clioPic from '../../asset/clio.jpg';

const CATEGORIES = [
  { id: 'Sport', title: 'Sport', subtitle: 'Pure performance and driving pleasure..', image: benzPic },
  { id: 'Luxury', title: 'Luxury', subtitle: 'Uncompromising comfort and prestige.', image: rangePic },
  { id: 'SUV', title: 'SUV', subtitle: 'Power and versatility for any journey.', image: trocPic },
  { id: 'Off-Road', title: 'Off-Road', subtitle: 'Ready for adventure on any terrain.', image: tucsonPic },
  { id: 'Electric', title: 'Electric', subtitle: 'The future of smart and eco driving.', image: golfPic },
  { id: 'Economy', title: 'Economy', subtitle: 'Affordable and perfect for everyday use.', image: clioPic }
];

export default function FinalCTA() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const activeCategory = CATEGORIES[activeIndex] || CATEGORIES[0];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      // Pin the section and link the scroll progress to the active index
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "center center", // Locks the section when it reaches the middle of the screen
        end: "+=2000", // Requires 2000px of scrolling to go through all categories
        pin: true,
        scrub: true,
        onUpdate: (self) => {
          // Calculate which category should be active based on scroll progress (0 to 1)
          let newIndex = Math.floor(self.progress * CATEGORIES.length);
          
          // Safety clamp to ensure the index doesn't go out of bounds
          if (newIndex >= CATEGORIES.length) newIndex = CATEGORIES.length - 1;
          if (newIndex < 0) newIndex = 0;
          
          setActiveIndex(newIndex);
        }
      });

      // Quick entrance animation for the section itself
      gsap.fromTo(sectionRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1, ease: "power3.out" }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="w-full min-h-screen bg-[#020617] py-10 px-6 md:px-12 lg:px-20 flex flex-col justify-center"
    >
      {/* HEADER SECTION */}
      <div className="mb-10 md:mb-16">
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-black text-white tracking-tighter leading-[1.1]">
          Choose Your <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d2ff] to-blue-600 italic pr-2">Persona</span>
        </h2>
      </div>

      <div className="flex flex-col lg:flex-row gap-10 lg:gap-20 h-full max-h-[700px]">
        
        {/* LEFT COLUMN: SCROLL-DRIVEN LIST */}
        <div className="w-full lg:w-1/3 flex flex-col justify-center gap-4 lg:gap-6 relative z-10">
          {CATEGORIES.map((cat, index) => {
            const isActive = activeIndex === index;
            
            return (
              <div key={cat.id} className="relative pl-6 py-2 transition-all duration-500">
                {/* Active Indicator Line */}
                <div className={`absolute left-0 top-0 w-1 h-full bg-[#00d2ff] transition-all duration-500 origin-top ${
                  isActive ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'
                }`} />
                {/* Inactive Track Line */}
                <div className={`absolute left-0 top-0 w-1 h-full bg-white/10 transition-opacity ${
                  isActive ? 'opacity-0' : 'opacity-100'
                }`} />

                <h3 className={`font-display font-black uppercase tracking-widest transition-colors duration-500 ${
                  isActive ? 'text-white text-2xl lg:text-3xl' : 'text-slate-600 text-xl lg:text-2xl'
                }`}>
                  {cat.title}
                </h3>
                
                {/* Smooth expanding subtitle */}
                <div className={`grid transition-all duration-500 ease-in-out ${
                  isActive ? 'grid-rows-[1fr] mt-2 opacity-100' : 'grid-rows-[0fr] opacity-0'
                }`}>
                  <div className="overflow-hidden">
                    <p className="text-slate-400 text-sm lg:text-base font-medium pr-4">
                      {cat.subtitle}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* RIGHT COLUMN: CRISP STATIC IMAGE REVEAL */}
        <div className="w-full lg:w-2/3 relative h-[350px] lg:h-[600px] rounded-[2rem] overflow-hidden shadow-2xl border border-white/5">
          {CATEGORIES.map((cat, index) => (
            <div 
              key={cat.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                activeIndex === index ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            >
              {/* Image zoom completely removed. Perfectly fitted. */}
              <img 
                src={cat.image} 
                alt={cat.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/20 to-transparent opacity-90" />
            </div>
          ))}

          {/* DYNAMIC CONTENT OVERLAY */}
          <div className="absolute bottom-0 left-0 w-full p-6 lg:p-12 z-20 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div className="max-w-md">
              <p className="text-[#00d2ff] font-bold text-xs uppercase tracking-[0.2em] mb-2 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {activeCategory.title} Class
              </p>
              <p className="text-white text-lg lg:text-xl font-medium leading-snug animate-in fade-in slide-in-from-bottom-4 duration-700">
                {activeCategory.subtitle}
              </p>
            </div>
            
            <Link 
              to={`/fleet?category=${activeCategory.id}`}
              className="shrink-0 inline-flex items-center gap-2 bg-[#00d2ff] text-[#020617] px-6 lg:px-8 py-3 lg:py-4 rounded-full font-black uppercase tracking-widest text-[10px] lg:text-xs hover:bg-white transition-all duration-300 hover:scale-105 shadow-[0_0_20px_rgba(0,210,255,0.3)]"
            >
              Explore Fleet
              <ArrowUpRight size={18} strokeWidth={3} />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}