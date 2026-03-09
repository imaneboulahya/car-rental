import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const CATEGORIES = [
  {
    id: 'performance',
    title: 'The Purist',
    subtitle: 'Unfiltered, track-ready adrenaline.',
    image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=2000',
  },
  {
    id: 'luxury',
    title: 'The Executive',
    subtitle: 'Uncompromising comfort and prestige.',
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=2000',
  },
  {
    id: 'exotic',
    title: 'The Maverick',
    subtitle: 'Exotic aesthetics and raw, untamed power.',
    image: 'https://images.unsplash.com/photo-1621135802920-133df287f89c?auto=format&fit=crop&q=80&w=2000',
  },
  {
    id: 'suv',
    title: 'The Commander',
    subtitle: 'Absolute dominance on any terrain.',
    image: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 'electric',
    title: 'The Visionary',
    subtitle: 'The silent, blistering future of driving.',
    image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&q=80&w=2000',
  }
];

export default function FinalCTA() {
  const [activePanel, setActivePanel] = useState<string>('exotic');
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(sectionRef.current,
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
          }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="min-h-screen w-full bg-[#020617] py-12 px-4 md:px-10 flex flex-col"
    >
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-white tracking-tight leading-none">
            Choose Your <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500 italic pr-2">Persona</span>
          </h2>
        </div>
        <p className="text-slate-400 font-light max-w-xs text-sm md:text-base md:text-right">
          Every journey demands a different breed of machine. Select a class to explore.
        </p>
      </div>

      {/* THE ACCORDION CONTAINER */}
      {/* We use h-[700px] on desktop but allow auto-height on mobile to prevent squishing */}
      <div className="flex flex-col lg:flex-row w-full h-auto lg:h-[70vh] min-h-[600px] gap-3">
        
        {CATEGORIES.map((panel) => {
          const isActive = activePanel === panel.id;

          return (
            <div
              key={panel.id}
              onMouseEnter={() => setActivePanel(panel.id)}
              onClick={() => setActivePanel(panel.id)}
              className={`relative cursor-pointer overflow-hidden rounded-[2rem] transition-all duration-[700ms] ease-[cubic-bezier(0.25,1,0.5,1)] group ${
                isActive 
                  ? 'flex-[5] h-[400px] lg:h-full' // Expanded height on mobile
                  : 'flex-[1] h-[80px] lg:h-full'  // Collapsed height on mobile
              }`}
            >
              
              {/* BACKGROUND IMAGE */}
              <div className="absolute inset-0 w-full h-full">
                <img 
                  src={panel.image} 
                  alt={panel.title} 
                  className={`absolute inset-0 w-full h-full object-cover transition-transform duration-[2000ms] ${
                    isActive ? 'scale-105' : 'scale-110 grayscale-[40%] opacity-40'
                  }`}
                />
                {/* GRADIENT OVERLAYS */}
                <div className={`absolute inset-0 transition-opacity duration-700 ${
                    isActive 
                      ? 'bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-100' 
                      : 'bg-slate-950/80 opacity-100'
                }`} />
              </div>

              {/* CONTENT */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 lg:p-10">
                
                {/* TITLE LOGIC */}
                <div className={`transition-all duration-700 transform origin-bottom-left ${
                  !isActive 
                    ? 'lg:-rotate-90 lg:-translate-y-12 opacity-50' 
                    : 'rotate-0 translate-y-0 opacity-100'
                }`}>
                  <h3 className={`font-display font-black text-white uppercase tracking-tighter leading-none transition-all duration-500 ${
                    isActive ? 'text-3xl md:text-5xl' : 'text-xl md:text-2xl whitespace-nowrap'
                  }`}>
                    {panel.title}
                  </h3>
                </div>

                {/* EXPANDABLE INFO */}
                <div 
                  className={`grid transition-all duration-700 ease-in-out ${
                    isActive ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="text-slate-300 text-sm md:text-lg font-light mb-6 max-w-md">
                      {panel.subtitle}
                    </p>
                    
                    <Link 
                      to={`/fleet?category=${panel.id}`}
                      className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-bold uppercase tracking-widest text-[10px] md:text-xs hover:bg-blue-500 hover:text-white transition-colors"
                    >
                      Explore Fleet
                      <ArrowUpRight size={16} />
                    </Link>
                  </div>
                </div>

              </div>
            </div>
          );
        })}

      </div>
    </section>
  );
}