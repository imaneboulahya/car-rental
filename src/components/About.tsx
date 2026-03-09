import React, { useRef, useEffect } from 'react';
import { Shield, Award, Zap, Heart } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);

  const features = [
    {
      icon: <Shield size={32} />,
      title: 'Secure & Insured',
      description: 'Full comprehensive insurance coverage for all our vehicles, ensuring your peace of mind.'
    },
    {
      icon: <Award size={32} />,
      title: 'Premium Quality',
      description: 'Our fleet consists of the latest models, meticulously maintained to the highest standards.'
    },
    {
      icon: <Zap size={32} />,
      title: 'Fast Booking',
      description: 'Book your dream car in less than 60 seconds with our streamlined digital process.'
    },
    {
      icon: <Heart size={32} />,
      title: '24/7 Support',
      description: 'Dedicated concierge team available around the clock to assist with any request.'
    }
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Set up responsive animations using GSAP MatchMedia
      let mm = gsap.matchMedia();

      // --- DESKTOP & TABLET: Horizontal Scroll ---
      mm.add("(min-width: 768px)", () => {
        const scrollWidth = scrollWrapperRef.current?.scrollWidth || 0;
        const windowWidth = window.innerWidth;

        gsap.to(scrollWrapperRef.current, {
          x: () => -(scrollWidth - windowWidth),
          ease: "none", 
          scrollTrigger: {
            trigger: containerRef.current,
            pin: true, 
            scrub: 1,  
            invalidateOnRefresh: true, 
            end: () => `+=${scrollWidth - windowWidth}`, 
          }
        });
      });

      // --- MOBILE: Simple Vertical Fade-Ins ---
      mm.add("(max-width: 767px)", () => {
        // Since mobile naturally scrolls vertically, we just add a nice fade-up 
        // to the blocks as the user scrolls down the page.
        if (scrollWrapperRef.current) {
          const blocks = gsap.utils.toArray(scrollWrapperRef.current.children);
          blocks.forEach((block: any) => {
            gsap.fromTo(block, 
              { opacity: 0, y: 30 },
              { 
                opacity: 1, 
                y: 0, 
                duration: 0.8, 
                ease: "power3.out",
                scrollTrigger: {
                  trigger: block,
                  start: "top 85%",
                }
              }
            );
          });
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    // Changed h-screen to h-auto on mobile, and py-24 for mobile spacing
    <section ref={containerRef} id="about" className="h-auto md:h-screen py-24 md:py-0 bg-[#000000] relative overflow-hidden flex items-center">
      
      {/* Ambient Background Glows */}
      <div className="absolute top-1/4 left-[10%] w-[500px] h-[500px] bg-brand-accent/5 rounded-full blur-[150px] mix-blend-screen pointer-events-none" />
      <div className="absolute bottom-1/4 right-[20%] w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[150px] mix-blend-screen pointer-events-none" />

      {/* The Wrapper: flex-col on mobile, flex-row horizontally on md+ */}
      <div 
        ref={scrollWrapperRef} 
        className="flex flex-col md:flex-row md:flex-nowrap items-start md:items-center gap-16 lg:gap-24 px-6 md:px-[10vw] h-full w-full md:w-max will-change-transform max-w-lg md:max-w-none mx-auto md:mx-0"
      >

        {/* --- BLOCK 1: The Hook Text --- */}
        {/* Changed w-[85vw] to w-full for mobile */}
        <div className="w-full md:w-[40vw] shrink-0 flex flex-col justify-center">
          <div className="w-16 h-1 bg-brand-accent rounded-full mb-8 shadow-[0_0_15px_rgba(var(--brand-accent-rgb),0.6)]" />
          
          <h2 className="text-5xl md:text-7xl lg:text-[5.5rem] font-display font-bold text-white mb-8 leading-[1.05] tracking-tight">
            Redefining the <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-blue-400">
              Luxury Rental
            </span> <br className="hidden md:block" /> Experience
          </h2>
        </div>

        {/* --- BLOCK 2: The Extended Description --- */}
        <div className="w-full md:w-[35vw] shrink-0 flex flex-col justify-center">
          <p className="text-slate-200 text-xl md:text-2xl leading-relaxed font-light mb-8 drop-shadow-md">
            More than just a rental platform, we are your gateway to the world's most exhilarating automotive masterpieces.
          </p>
          <p className="text-slate-400 text-base md:text-lg leading-relaxed font-light border-l-2 border-brand-accent/50 pl-6 lg:pl-8">
            Whether you are seeking the raw, track-focused power of a Porsche 911, the refined executive elegance of a luxury sedan, or the futuristic thrill of a high-performance EV, our meticulously curated fleet is designed to match your highest ambitions. 
            <br /><br />
            We blend a seamless digital booking experience with white-glove concierge service, ensuring that from the moment you click 'Reserve' to the second you grip the steering wheel, your experience is completely flawless.
          </p>
        </div>

        {/* --- BLOCK 3: The Hero Image --- */}
        <div className="w-full md:w-[28vw] shrink-0 relative flex justify-center mt-8 md:mt-0">
          <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.6)] bg-white/5 backdrop-blur-sm p-2 w-100">
            <img 
              src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=800" 
              alt="Luxury Experience" 
              className="rounded-[1rem] w-full aspect-[3/4] md:aspect-[2/3] object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          
          <div className="absolute -bottom-6 -right-2 md:-right-10 backdrop-blur-2xl bg-slate-900/90 border border-white/10 shadow-2xl rounded-3xl p-6 z-20 max-w-[200px] md:max-w-[240px]">
            <div className="text-4xl md:text-5xl font-display font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-blue-400 mb-2 drop-shadow-sm">
              10+
            </div>
            <div className="text-xs md:text-sm text-slate-300 font-medium leading-snug">
              Years of Excellence in Luxury Rentals
            </div>
          </div>
        </div>

        {/* --- BLOCK 4: The Features Grid --- */}
        <div className="w-full md:w-[45vw] shrink-0 grid grid-cols-1 sm:grid-cols-2 gap-6 md:pl-10 mt-12 md:mt-0">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="p-6 md:p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 hover:bg-white/[0.06] hover:border-white/20 transition-all duration-500 group"
            >
              <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-brand-accent mb-6 group-hover:scale-110 group-hover:bg-brand-accent/20 group-hover:shadow-[0_0_20px_rgba(var(--brand-accent-rgb),0.3)] transition-all duration-500">
                {feature.icon}
              </div>
              <h4 className="text-white font-display font-semibold text-xl mb-3 tracking-wide">
                {feature.title}
              </h4>
              <p className="text-slate-400 text-sm leading-relaxed font-light group-hover:text-slate-300 transition-colors duration-500">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Invisible Spacer (Hidden on mobile) */}
        <div className="hidden md:block w-[5vw] shrink-0" />

      </div>
    </section>
  );
}