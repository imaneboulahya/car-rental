import React, { useRef, useEffect } from 'react';
import { Calendar, MapPin, Search, ChevronDown } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function BookingForm() {
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(formRef.current,
        { opacity: 0, y: 40, scale: 0.98 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1, 
          duration: 1, 
          ease: "power4.out",
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 85%", // Triggers slightly before it fully enters the viewport
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    // The negative top margin (-mt-12 to -mt-24) elegantly overlaps this form 
    // over the bottom of your Hero section, creating beautiful spatial depth.
    <section id="booking" className="relative z-30 px-6 -mt-16 md:-mt-24 pb-20">
      <div className="max-w-7xl mx-auto">
        <div 
          ref={formRef}
          className="relative overflow-hidden rounded-3xl bg-slate-900/60 backdrop-blur-2xl border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.6)] p-8 md:p-10 lg:p-12"
        >
          {/* Ambient Form Glows */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-accent/10 rounded-full blur-[80px] -mr-32 -mt-32 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/10 rounded-full blur-[80px] -ml-32 -mb-32 pointer-events-none" />
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-10 text-center tracking-tight">
              Reserve Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-blue-400">Dream Car</span>
            </h2>
            
            <form className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 items-end">
              
              {/* Custom Select Input */}
              <div className="space-y-3 relative">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <MapPin size={16} className="text-brand-accent" />
                  Pickup Location
                </label>
                <div className="relative group">
                  <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white font-medium focus:outline-none focus:ring-2 focus:ring-brand-accent/50 focus:border-brand-accent focus:bg-white/10 transition-all duration-300 appearance-none cursor-pointer">
                    <option className="bg-slate-900 text-white" value="casablanca">Casablanca</option>
                    <option className="bg-slate-900 text-white" value="marrakech">Marrakech</option>
                    <option className="bg-slate-900 text-white" value="rabat">Rabat</option>
                    <option className="bg-slate-900 text-white" value="tangier">Tangier</option>
                    <option className="bg-slate-900 text-white" value="oujda">Oujda</option>
                  </select>
                  <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none group-hover:text-brand-accent transition-colors" />
                </div>
              </div>
              
              {/* Date Input 1 */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <Calendar size={16} className="text-brand-accent" />
                  Pickup Date
                </label>
                {/* [color-scheme:dark] forces the browser's native calendar icon to look good on dark backgrounds */}
                <input 
                  type="date" 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white font-medium focus:outline-none focus:ring-2 focus:ring-brand-accent/50 focus:border-brand-accent focus:bg-white/10 transition-all duration-300 [color-scheme:dark] cursor-pointer"
                />
              </div>
              
              {/* Date Input 2 */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <Calendar size={16} className="text-brand-accent" />
                  Return Date
                </label>
                <input 
                  type="date" 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white font-medium focus:outline-none focus:ring-2 focus:ring-brand-accent/50 focus:border-brand-accent focus:bg-white/10 transition-all duration-300 [color-scheme:dark] cursor-pointer"
                />
              </div>
              
              {/* Submit Button */}
              <div className="pt-2">
                <button 
                  type="button" 
                  className="w-full relative overflow-hidden rounded-xl bg-white px-8 py-3.5 font-bold text-slate-950 transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] group flex items-center justify-center gap-2"
                >
                  <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-150%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(150%)]">
                    <div className="relative h-full w-8 bg-white/40" />
                  </div>
                  <Search size={20} className="relative z-10" />
                  <span className="relative z-10">Find Vehicles</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </section>
  );
}