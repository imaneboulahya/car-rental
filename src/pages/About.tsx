import React, { useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import DarkVeil from './DarkVeil';

const About: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Hero Reveal
      gsap.fromTo(
        '.hero-text',
        { y: 60, opacity: 0, rotationX: -20 },
        { y: 0, opacity: 1, rotationX: 0, duration: 1.2, stagger: 0.15, ease: 'expo.out' }
      );

      // 2. Parallax Image Reveals (The "Curtain" effect)
      const imageSections = gsap.utils.toArray('.image-container');
      imageSections.forEach((container: any) => {
        const img = container.querySelector('img');
        const overlay = container.querySelector('.reveal-overlay');

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start: 'top 85%',
          }
        });

        // Slide the overlay away
        tl.to(overlay, { height: '0%', duration: 1.2, ease: 'power4.inOut' })
          // Scale the image down simultaneously
          .fromTo(img, { scale: 1.3 }, { scale: 1, duration: 1.5, ease: 'power3.out' }, '-=1');
      });

      // 3. Text & Content Stagger
      const textBlocks = gsap.utils.toArray('.text-block');
      textBlocks.forEach((block: any) => {
        gsap.fromTo(
          block.children,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: { trigger: block, start: 'top 85%' }
          }
        );
      });

      // 4. Animated Counters
      const stats = gsap.utils.toArray('.stat-number');
      stats.forEach((stat: any) => {
        const target = parseFloat(stat.getAttribute('data-target'));
        gsap.to(stat, {
          innerHTML: target,
          duration: 2.5,
          snap: { innerHTML: 1 },
          ease: 'power2.out',
          scrollTrigger: { trigger: '.stats-section', start: 'top 90%' },
          onUpdate: function () {
            stat.innerHTML = Math.ceil(this.targets()[0].innerHTML) + (stat.dataset.suffix || '');
          }
        });
      });

      // 5. Value Cards Stagger
      gsap.fromTo(
        '.value-card',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: 'back.out(1.2)',
          scrollTrigger: { trigger: '.values-section', start: 'top 80%' }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-[#050508] text-white font-sans selection:bg-blue-600 selection:text-white flex flex-col relative overflow-hidden">
      
      {/* DarkVeil Background Effect */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <DarkVeil
          hueShift={24}
          noiseIntensity={0}
          scanlineIntensity={0.48}
          speed={0.8}
          scanlineFrequency={2}
          warpAmount={0}
        />
      </div>

      {/* Optional: Kept the ambient glows but pushed them behind the veil if needed, 
          or you can remove these two lines entirely if DarkVeil handles all the color you need. */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-blue-900/20 blur-[150px] rounded-full pointer-events-none z-0" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-indigo-900/10 blur-[150px] rounded-full pointer-events-none z-0" />

      {/* Navbar needs to sit above the background */}
      <div className="relative z-10">
        <Navbar />
      </div>

      <main className="flex-grow max-w-7xl mx-auto px-6 md:px-12 py-24 relative z-10">
        
        {/* --- HERO SECTION --- */}
        <div className="text-center mb-32 pt-10">
          <div className="hero-text inline-block px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-sm font-medium tracking-widest uppercase mb-6 backdrop-blur-md">
            The Pinnacle of Driving
          </div>
          <h1 className="hero-text text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter mb-8" style={{ perspective: '1000px' }}>
            Beyond <br className="md:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-200 to-blue-600">Transportation.</span>
          </h1>
          <p className="hero-text text-gray-400 text-lg md:text-2xl max-w-3xl mx-auto font-light tracking-wide leading-relaxed">
            We don't just rent cars. We engineer unforgettable moments behind the wheel of the world's most breathtaking automotive masterpieces.
          </p>
        </div>

        {/* --- STATS SECTION --- */}
        <div className="stats-section grid grid-cols-2 md:grid-cols-4 gap-8 mb-40 border-y border-white/5 py-12 bg-white/[0.02] backdrop-blur-sm rounded-3xl">
          {[
            { label: 'Exotic Vehicles', value: '150', suffix: '+' },
            { label: 'Happy Clients', value: '10', suffix: 'k+' },
            { label: 'Global Hubs', value: '12', suffix: '' },
            { label: 'Years of Excellence', value: '15', suffix: '' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <h3 
                className="stat-number text-4xl md:text-5xl font-bold text-white mb-2"
                data-target={stat.value}
                data-suffix={stat.suffix}
              >
                0
              </h3>
              <p className="text-blue-400/80 uppercase tracking-widest text-xs font-semibold">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* --- SECTION 1: WHO WE ARE --- */}
        <div className="flex flex-col md:flex-row items-center gap-16 md:gap-24 mb-40">
          <div className="flex-1 w-full relative">
            {/* Floating Badge */}
            <div className="absolute -top-6 -left-6 z-20 bg-[#0a0a0f] border border-white/10 p-4 rounded-2xl shadow-2xl backdrop-blur-xl hidden md:block">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-600/20 flex items-center justify-center border border-blue-500/30">
                  <span className="text-blue-500 font-bold">✓</span>
                </div>
                <div>
                  <p className="text-sm font-bold">White-Glove</p>
                  <p className="text-xs text-gray-400">Delivery Service</p>
                </div>
              </div>
            </div>

            <div className="image-container overflow-hidden rounded-3xl relative h-[500px] w-full">
              {/* The Reveal Curtain */}
              <div className="reveal-overlay absolute inset-0 bg-[#050508] z-10 w-full" />
              <img 
                src="https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=1000&auto=format&fit=crop" 
                alt="Luxury car steering wheel" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="flex-1 text-block">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">The Architecture of <span className="text-blue-500">Luxury</span></h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-6 font-light">
              Founded by purists and refined by perfectionists, Luxe Drive operates at the intersection of raw power and absolute elegance. We treat our fleet not as inventory, but as a curated gallery of engineering marvels.
            </p>
            <ul className="space-y-4 mt-8">
              {['Immaculately detailed before every handover.', 'Discreet, VIP delivery to your exact location.', '24/7 dedicated concierge during your reservation.'].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-6 h-6 mt-1 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center shrink-0">
                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                  </div>
                  <span className="text-gray-300 text-lg font-light">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* --- SECTION 2: WHAT WE DO --- */}
        <div className="flex flex-col md:flex-row-reverse items-center gap-16 md:gap-24 mb-40">
          <div className="flex-1 w-full">
            <div className="image-container overflow-hidden rounded-3xl relative h-[600px] w-full group">
              <div className="reveal-overlay absolute inset-0 bg-[#050508] z-10 w-full" />
              <img 
                src="https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?q=80&w=1000&auto=format&fit=crop" 
                alt="Sports car on coastal road" 
                className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
              />
              {/* Interactive Hover Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                <p className="text-white text-xl font-light tracking-wide translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  Drive the impossible.
                </p>
              </div>
            </div>
          </div>
          <div className="flex-1 text-block">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Curating the <span className="text-blue-500">Exceptional</span></h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-6 font-light">
              From the aggressive stance of a Lamborghini to the whisper-quiet power of a Rolls-Royce, our selection is uncompromising. We don't just hand over keys; we hand over the reigns to a completely bespoke journey.
            </p>
            <p className="text-gray-400 text-lg leading-relaxed font-light mb-8">
              Whether you are carving mountain roads, arriving at a premier gala, or requiring an armored executive transport, our team orchestrates every detail invisibly in the background.
            </p>
            <button className="px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-blue-500 hover:text-white transition-colors duration-300 group flex items-center gap-3">
              Explore The Fleet
              <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
            </button>
          </div>
        </div>

        {/* --- SECTION 3: THE LUXE STANDARD (Interactive Grid) --- */}
        <div className="values-section mb-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">The Luxe Standard</h2>
            <p className="text-gray-400 font-light max-w-2xl mx-auto">Our commitment to ensuring your experience is completely flawless.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Absolute Discretion', desc: 'Privacy is paramount. We offer completely confidential bookings and ghost-drop deliveries.' },
              { title: 'Zero Compromise', desc: 'Our vehicles are rotated annually. You will never drive a model that feels anything less than showroom new.' },
              { title: 'Unlimited Horizons', desc: 'No restrictive mileage caps on select models. If the road calls, you should have the freedom to answer.' },
            ].map((value, i) => (
               <div 
                key={i} 
                className="value-card group relative p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-blue-500/50 hover:bg-blue-500/5 transition-all duration-500 overflow-hidden"
              >
                {/* Subtle light follow effect (CSS only via group-hover) */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-[50px] rounded-full translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="w-12 h-12 mb-6 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 font-bold text-xl group-hover:scale-110 transition-transform duration-500">
                  {i + 1}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-blue-400 transition-colors">{value.title}</h3>
                <p className="text-gray-400 font-light leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </main>
      
    </div>
  );
};

export default About;