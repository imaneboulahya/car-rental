import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { X, Calendar, Clock, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import trocPic from '../../asset/troc.jpeg';
import benzPic from '../../asset/benz.jpeg';
import tucsonPic from '../../asset/tucson.jpeg';

// --- DUMMY FLEET DATA ---
const FLEET = [
  {
    id: 'porsche-991-gt3rs',
    name: 'Porsche 911 GT3 RS (991.1)',
    price: '550dh',
    categoryKey: 'car_cat_purist',
    specsKey: 'car_spec_porsche',
    image: trocPic,
  },
  {
    id: 'rolls-royce-ghost',
    name: 'Rolls-Royce Ghost',
    price: '$1,500',
    categoryKey: 'car_cat_executive',
    specsKey: 'car_spec_rolls',
    image: benzPic
  },
  {
    id: 'taycan-turbo',
    name: 'Porsche Taycan Turbo S',
    price: '$950',
    categoryKey: 'car_cat_visionary',
    specsKey: 'car_spec_taycan',
    image: tucsonPic
  },
  {
    id: 'g-wagon',
    name: 'Mercedes-AMG G 63',
    price: '$1,100',
    categoryKey: 'car_cat_commander',
    specsKey: 'car_spec_gwagon',
    image: 'https://images.unsplash.com/photo-1606016159991-d280a5628dd1?auto=format&fit=crop&q=80&w=2000'
  }
];

export default function Fleet() {
  const [selectedCar, setSelectedCar] = useState<typeof FLEET[0] | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const modalOverlayRef = useRef<HTMLDivElement>(null);
  
  const { t } = useTranslation();

  // 1. Initial Page Load Animation
  useEffect(() => {
    let ctx = gsap.context(() => {
      if (gridRef.current) {
        gsap.fromTo(gridRef.current.children,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, stagger: 0.15, duration: 1, ease: "power3.out", delay: 0.2 }
        );
      }
    });
    return () => ctx.revert();
  }, []);

  // 2. Modal Entrance Animation
  useEffect(() => {
    if (selectedCar && modalRef.current && modalOverlayRef.current) {
      document.body.style.overflow = 'hidden';
      
      let ctx = gsap.context(() => {
        gsap.to(modalOverlayRef.current, { opacity: 1, backdropFilter: "blur(16px)", duration: 0.4, ease: "power2.out" });
        gsap.fromTo(modalRef.current,
          { opacity: 0, y: 100, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "back.out(1.2)" }
        );
      });
      return () => {
        ctx.revert();
        document.body.style.overflow = 'unset';
      };
    }
  }, [selectedCar]);

  const handleClose = () => {
    if (modalRef.current && modalOverlayRef.current) {
      gsap.to(modalRef.current, { opacity: 0, y: 50, scale: 0.95, duration: 0.4, ease: "power2.in" });
      gsap.to(modalOverlayRef.current, { 
        opacity: 0, 
        backdropFilter: "blur(0px)", 
        duration: 0.4, 
        ease: "power2.in",
        onComplete: () => setSelectedCar(null)
      });
    }
  };

  return (
    <div className="min-h-full bg-[#020617] pt-25 pb-50 px-6">
      
      {/* --- PAGE HEADER --- */}
      <div className="max-w-7xl mx-auto mb-16">
        <h3 className="text-5xl md:text-7xl font-display font-bold text-white tracking-tighter mb-6">
          {t('fleet_title_1', 'The')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-blue-500 italic pr-2">{t('fleet_title_2', 'Collection')}</span>
        </h3>
        <p className="text-slate-500 text-lg md:text-xl font-light max-w-7xl">
          {t('fleet_subtitle', 'Select your desired vehicle from our curated fleet to begin the reservation process.')}
        </p>
      </div>

      {/* --- FLEET GRID --- */}
      <div ref={gridRef} className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">
        {FLEET.map((car) => (
          <div 
            key={car.id}
            onClick={() => setSelectedCar(car)}
            className="group relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden cursor-pointer"
          >
            <img 
              src={car.image} 
              alt={car.name} 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />
            
            <div className="absolute inset-0 p-8 flex flex-col justify-end">
              <p className="text-brand-accent font-bold uppercase tracking-widest text-xs mb-2 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                {t(car.categoryKey)}
              </p>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-2">{car.name}</h2>
              
              <div className="flex items-end justify-between mt-4">
                <div>
                  <p className="text-white text-xl font-light">
                    {car.price} <span className="text-slate-400 text-sm">/ {t('fleet_per_day', 'day')}</span>
                  </p>
                </div>
                
                <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white transform translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 group-hover:bg-brand-accent group-hover:border-brand-accent group-hover:text-[#020617] transition-all duration-500">
                  <ArrowRight size={20} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* --- CINEMATIC BOOKING MODAL --- */}
      {selectedCar && (
        <div 
          ref={modalOverlayRef}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 opacity-0 bg-[#020617]/60"
        >
          <div className="absolute inset-0" onClick={handleClose} />

          <div 
            ref={modalRef}
            className="relative w-full max-w-6xl h-[90vh] md:h-[700px] bg-slate-900/80 backdrop-blur-2xl border border-white/10 rounded-[2rem] overflow-hidden flex flex-col md:flex-row shadow-[0_50px_100px_rgba(0,0,0,0.8)]"
          >
            <button 
              onClick={handleClose}
              className="absolute top-6 right-6 z-20 w-10 h-10 bg-black/50 backdrop-blur-md border border-white/10 rounded-full flex items-center justify-center text-white hover:bg-brand-accent hover:text-[#020617] hover:border-brand-accent transition-all duration-300"
            >
              <X size={20} />
            </button>

            {/* Left Side: Car Hero Image */}
            <div className="relative w-full md:w-1/2 h-64 md:h-full shrink-0">
              <img src={selectedCar.image} alt={selectedCar.name} className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020617] md:bg-gradient-to-r md:from-transparent md:to-slate-900/90 to-transparent" />
              
              <div className="absolute bottom-0 left-0 p-8 md:p-12">
                <p className="text-brand-accent font-bold uppercase tracking-widest text-xs mb-2">
                  {t(selectedCar.categoryKey)}
                </p>
                <h3 className="text-3xl md:text-5xl font-display font-bold text-white leading-tight mb-4">{selectedCar.name}</h3>
                <p className="text-slate-300 font-light text-sm tracking-wide">
                  {t(selectedCar.specsKey)}
                </p>
              </div>
            </div>

            {/* Right Side: Glassmorphic Booking Form */}
            <div className="flex-1 p-8 md:p-12 flex flex-col justify-center overflow-y-auto custom-scrollbar">
              <h4 className="text-2xl font-display font-bold text-white mb-2">{t('fleet_modal_title', 'Reserve this vehicle')}</h4>
              <p className="text-slate-400 text-sm mb-8 font-light">{t('fleet_modal_desc', 'Select your dates to check availability and finalize your allocation.')}</p>

              <form className="space-y-6">
                
                {/* Pick-up Date & Time */}
                <div className="space-y-4">
                  <h5 className="text-white text-sm font-bold tracking-widest uppercase border-b border-white/10 pb-2">{t('fleet_modal_pickup', 'Pick-Up')}</h5>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-accent" size={18} />
                      <input type="date" className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white text-sm focus:outline-none focus:border-brand-accent focus:bg-white/10 transition-all [color-scheme:dark]" />
                    </div>
                    <div className="relative">
                      <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-accent" size={18} />
                      <input type="time" className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white text-sm focus:outline-none focus:border-brand-accent focus:bg-white/10 transition-all [color-scheme:dark]" />
                    </div>
                  </div>
                </div>

                {/* Drop-off Date & Time */}
                <div className="space-y-4">
                  <h5 className="text-white text-sm font-bold tracking-widest uppercase border-b border-white/10 pb-2">{t('fleet_modal_dropoff', 'Drop-Off')}</h5>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-accent" size={18} />
                      <input type="date" className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white text-sm focus:outline-none focus:border-brand-accent focus:bg-white/10 transition-all [color-scheme:dark]" />
                    </div>
                    <div className="relative">
                      <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-accent" size={18} />
                      <input type="time" className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white text-sm focus:outline-none focus:border-brand-accent focus:bg-white/10 transition-all [color-scheme:dark]" />
                    </div>
                  </div>
                </div>

                {/* Cost Summary */}
                <div className="bg-[#020617]/50 rounded-xl p-6 border border-white/5 mt-8">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-slate-400 font-light">{t('fleet_modal_daily_rate', 'Daily Rate')}</span>
                    <span className="text-white font-medium">{selectedCar.price}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-brand-accent">{t('fleet_modal_disclaimer', 'Final total calculated at checkout.')}</span>
                  </div>
                </div>

                {/* Submit Button */}
                <button 
                  type="button" 
                  className="w-full relative overflow-hidden rounded-xl bg-white px-8 py-4 font-bold text-[#020617] transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] group mt-4"
                >
                  <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-150%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(150%)]">
                    <div className="relative h-full w-8 bg-white/40" />
                  </div>
                  <span className="relative z-10 text-lg">{t('fleet_modal_confirm', 'Confirm Availability')}</span>
                </button>

              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}