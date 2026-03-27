import React, { useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom'; // ✅ Consolidated import
import { Instagram, Twitter, Facebook, Linkedin, ArrowUp, ChevronRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import logoPic from '../../asset/logo.jpeg';

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const bottomBarRef = useRef<HTMLDivElement>(null);

  const location = useLocation();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        }
      });

      if (gridRef.current) {
        tl.fromTo(
          gridRef.current.children,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: "power3.out" }
        );
      }

      tl.fromTo(
        bottomBarRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8, ease: "power2.out" },
        "-=0.4"
      );

    }, footerRef);

    // ✅ FIX IMPORTANT
    ScrollTrigger.refresh();

    return () => ctx.revert();

  }, [location.pathname]);

  return (
    <footer ref={footerRef} className="relative bg-[#020617] pt-24 pb-8 overflow-hidden border-t border-white/5">
      
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[300px] bg-brand-accent/5 blur-[150px] pointer-events-none rounded-full" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
          
          <div className="md:col-span-1 flex flex-col items-start pr-8">
            <div className="flex items-center gap-3 mb-8 group cursor-pointer h-12" onClick={scrollToTop}>
              <img 
                src={logoPic} 
                alt="LuxeDrive Logo" 
                className="h-full w-auto object-contain transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            
            <p className="text-slate-400 leading-relaxed font-light mb-8 max-w-sm">
              The world's leading luxury automotive experience. Providing unrestricted access to the most prestigious vehicles since 2015.
            </p>
            
            <div className="flex gap-4">
              {[Instagram, Twitter, Facebook, Linkedin].map((Icon, i) => (
                <a 
                  key={i} 
                  href="#" 
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 transition-all duration-300 hover:-translate-y-1 hover:bg-brand-accent hover:text-[#020617] hover:shadow-[0_5px_15px_rgba(var(--brand-accent-rgb),0.4)] hover:border-brand-accent"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
          
          <div className="md:col-span-1">
            <h4 className="text-white font-display font-bold mb-6 tracking-wide">Quick Links</h4>
            <ul className="space-y-4">
              {[
                { name: 'Home', path: '/' },
                { name: 'Our Fleet', path: '/fleet' },
                { name: 'The Standard', path: '#' },
                { name: 'Request Allocation', path: '#' },
                { name: 'Contact', path: '#' }
              ].map((item, i) => (
                <li key={i}>
                  <Link to={item.path} className="group flex items-center text-slate-400 hover:text-white transition-colors duration-300 font-light">
                    <ChevronRight size={14} className="opacity-0 -ml-4 mr-2 text-brand-accent transition-all duration-300 group-hover:opacity-100 group-hover:ml-0" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="md:col-span-1">
            <h4 className="text-white font-display font-bold mb-6 tracking-wide">Categories</h4>
            <ul className="space-y-4">
              {['The Purist', 'The Executive', 'The Maverick', 'The Commander', 'The Visionary'].map((item, i) => (
                <li key={i}>
                  <a href="#" className="group flex items-center text-slate-400 hover:text-white transition-colors duration-300 font-light">
                    <ChevronRight size={14} className="opacity-0 -ml-4 mr-2 text-brand-accent transition-all duration-300 group-hover:opacity-100 group-hover:ml-0" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{item}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
        </div>

        
        <div ref={bottomBarRef} className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 text-sm text-slate-500 font-light">
            <p>© 2026 LuxeDrive. All rights reserved.</p>
            <div className="flex gap-6">
              <Link to="/privacy-policy" className="hover:text-brand-accent transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-brand-accent transition-colors">Terms of Service</Link>
            </div>
          </div>

          <button 
            onClick={scrollToTop}
            className="group flex items-center gap-3 text-slate-400 hover:text-white transition-colors text-sm font-semibold uppercase tracking-widest"
          >
            Back to Top
            <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-brand-accent group-hover:text-[#020617] group-hover:border-brand-accent group-hover:-translate-y-1 transition-all duration-300 shadow-lg">
              <ArrowUp size={16} />
            </div>
          </button>
          
        </div>

      </div>
    </footer>
  );
}