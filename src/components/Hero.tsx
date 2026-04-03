import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { CARS } from '../types';
import LiquidEther from './LiquidEther';

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const mainImageRef = useRef<HTMLDivElement>(null);
  const gridImagesRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Desktop Animations
      mm.add("(min-width: 1024px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: '+=150%',
            scrub: 1.2,
            pin: true,
          },
        });

        tl.to(mainImageRef.current, {
          scale: 0.3,
          xPercent: -35,
          yPercent: -30,
          borderRadius: '2rem',
          filter: 'brightness(1)', 
          duration: 1.5,
          ease: 'power4.inOut',
        }, 0)
        .to(textContainerRef.current, {
          y: 50,
          opacity: 0.9,
          scale: 0.9,
          duration: 1.5,
          ease: 'power4.inOut',
        }, 0);

        const items = gridImagesRef.current?.querySelectorAll('.grid-item');
        if (items) {
          tl.from(items, {
            opacity: 0,
            y: 100,
            scale: 0.8,
            stagger: 0.1,
            duration: 1,
            ease: 'power3.out'
          }, 0.4);
        }
      });

      // Mobile Animations
      mm.add("(max-width: 1023px)", () => {
        gsap.to(mainImageRef.current, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            scrub: true,
          },
          opacity: 0.4,
          scale: 1.1
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const mainCar = CARS[0];
  const gridCars = CARS.slice(1, 4);

  return (
    <section ref={sectionRef} className="relative min-h-screen bg-slate-950 overflow-hidden flex items-center justify-center">
      
      {/* LiquidEther Background Effect */}
      <div className="absolute inset-0 -z-40">
        <LiquidEther
          colors={[ '#5227FF', '#FF9FFC', '#B19EEF' ]}
          mouseForce={8}
          cursorSize={100}
          isViscous
          viscous={30}
          iterationsViscous={32}
          iterationsPoisson={32}
          resolution={0.5}
          isBounce={false}
          autoDemo
          autoSpeed={0.5}
          autoIntensity={2.2}
          takeoverDuration={0.25}
          autoResumeDelay={3000}
          autoRampDuration={0.6}
        
        />
      </div>
      {/* Semi-transparent overlay to ensure text readability */}
      <div className="absolute inset-0 bg-[#000000]/60 -z-30" />
      <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-blue-600/10 blur-[120px] -z-20" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-indigo-900/10 blur-[120px] -z-20" />

      {/* Main Image */}
      <div 
        ref={mainImageRef} 
        className="absolute inset-0 z-0 w-full h-full origin-center overflow-hidden brightness-[0.5] will-change-transform"
      >
        <img 
          src={mainCar?.image} 
          alt="Main Car" 
          className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
      </div>

      {/* Grid Images - Desktop Only */}
      <div ref={gridImagesRef} className="absolute inset-0 z-10 pointer-events-none hidden lg:block">
        <div className="grid-item absolute top-[10%] right-[8%] w-[22vw] aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
          <img src={gridCars[0]?.image} className="w-full h-full object-cover" alt="" />
        </div>
        <div className="grid-item absolute bottom-[12%] left-[8%] w-[18vw] aspect-square rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
          <img src={gridCars[1]?.image} className="w-full h-full object-cover" alt="" />
        </div>
        <div className="grid-item absolute bottom-[10%] right-[15%] w-[15vw] aspect-[3/4] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
          <img src={gridCars[2]?.image} className="w-full h-full object-cover" alt="" />
        </div>
      </div>

      {/* Text Content */}
      <div 
        ref={textContainerRef}
        className="relative z-20 flex flex-col items-center text-center px-6 max-w-6xl"
      >
        <h1 className="text-4xl md:text-6xl lg:text-8xl font-black text-white tracking-tight leading-[0.9] mb-6">
          The most powerful <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 italic">
            driving experience.
          </span>
        </h1>
        
        <p className="text-base md:text-xl text-slate-300 mb-10 max-w-2xl font-light">
          Your vision deserves tools with precision, absolute freedom, and the raw power to deliver an unforgettable journey.
        </p>
        
        <Link 
          to="/fleet"
          className="group flex items-center gap-3 rounded-full bg-white px-8 py-4 font-bold text-slate-950 hover:bg-blue-50 transition-all duration-300 shadow-xl"
        >
          <span>Explore Fleet</span>
          <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </section>
  );
}