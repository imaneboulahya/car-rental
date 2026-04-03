import React, { useRef, useEffect } from 'react';
import seatLeonPic from '../../asset/seat leon.png';
import { Shield, Award, Zap, Heart } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BorderGlow from './BorderGlow';

export default function About() {
  const outerRef = useRef<HTMLDivElement>(null);
  const scrollTrackRef = useRef<HTMLDivElement>(null);

  const features = [
    {
      icon: <Shield size={32} />,
      title: 'Secure & Insured',
      description: 'Full comprehensive insurance coverage for all our vehicles, ensuring complete peace of mind.'
    },
    {
      icon: <Award size={32} />,
      title: 'Premium Quality',
      description: 'Our fleet consists of the latest models, meticulously maintained to exact factory standards.'
    },
    {
      icon: <Zap size={32} />,
      title: 'Fast Booking',
      description: 'Book your dream car in less than 60 seconds with our streamlined digital process.'
    },
    {
      icon: <Heart size={32} />,
      title: '24/7 Support',
      description: 'Dedicated white-glove concierge team available around the clock to assist you.'
    }
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      let mm = gsap.matchMedia();

      // --- DESKTOP: Bulletproof Horizontal Scroll ---
      mm.add("(min-width: 1024px)", () => { 
        const track = scrollTrackRef.current;
        
        if (track) {
          const getScrollAmount = () => track.scrollWidth - window.innerWidth;

          const tween = gsap.to(track, {
            x: () => -getScrollAmount(),
            ease: "none",
          });

          ScrollTrigger.create({
            trigger: outerRef.current,
            start: "top top",
            end: () => `+=${getScrollAmount()}`,
            pin: true,
            animation: tween,
            scrub: 1,
            invalidateOnRefresh: true, 
          });
        }
      });

      // --- MOBILE & TABLET: Smooth Vertical Fade ---
      mm.add("(max-width: 1023px)", () => {
        const blocks = gsap.utils.toArray(".mobile-fade");
        blocks.forEach((block: any) => {
          gsap.fromTo(block, 
            { opacity: 0, y: 30 },
            { 
              opacity: 1, 
              y: 0, 
              duration: 0.8, 
              ease: "power2.out",
              scrollTrigger: {
                trigger: block,
                start: "top 85%",
              }
            }
          );
        });
      });

    }, outerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={outerRef} 
      id="about" 
      className="bg-[#020617] relative overflow-hidden"
    >
      {/* Ambient Background Glows */}
      <div className="absolute top-1/4 left-[10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[150px] mix-blend-screen pointer-events-none" />
      <div className="absolute bottom-1/4 right-[20%] w-[600px] h-[600px] bg-[#00d2ff]/10 rounded-full blur-[150px] mix-blend-screen pointer-events-none" />

      <div className="lg:h-screen w-full flex items-center py-20 lg:py-0">
        
        {/* THE TRACK: Adjusted gap from lg:gap-32 to lg:gap-16 */}
        <div 
          ref={scrollTrackRef} 
          className="flex flex-col lg:flex-row items-center gap-10 lg:gap-5 px-6 lg:px-[10vw] w-full lg:w-max h-auto"
        >

          {/* --- BLOCK 1: Adjusted width from lg:w-[45vw] to lg:w-[38vw] --- */}
          <div className="mobile-fade w-full lg:w-[38vw] shrink-0 flex flex-col justify-center">
            <div className="w-16 h-1 bg-[#00d2ff] rounded-full mb-8 shadow-[0_0_15px_rgba(0,210,255,0.5)]" />
            
            <h2 className="text-3xl md:text-6xl lg:text-[4rem] font-display font-black text-white mb-6 leading-[1.05] tracking-tight pr-4">
              Redefining the <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d2ff] to-blue-600 italic pr-6">
                Luxury Rental
              </span> <br className="hidden lg:block" /> Experience.
            </h2>
            <p className="text-slate-400 text-lg md:text-xl leading-relaxed font-light max-w-lg border-l-2 border-[#00d2ff]/30 pl-6">
              We blend a seamless digital booking experience with white-glove concierge service, ensuring your journey is completely flawless.
            </p>
          </div>

          {/* --- BLOCK 2: Cinematic Hero Image --- */}
          <div className="mobile-fade w-full lg:w-[400px] xl:w-[500px] shrink-0 relative flex justify-center">
            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl bg-white/5 border border-white/10 p-2 w-full">
              <img 
                src={seatLeonPic} 
                alt="Seat Leon" 
                className="rounded-[1.5rem] w-full h-[500px] lg:h-[600px] object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            
            <div className="absolute -bottom-6 -right-2 lg:-right-10 backdrop-blur-2xl bg-[#0f172a]/90 border border-white/10 shadow-2xl rounded-3xl p-6 z-20 max-w-[200px] lg:max-w-[240px]">
              <div className="text-4xl lg:text-5xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-[#00d2ff] to-blue-400 mb-2">
                10+
              </div>
              <div className="text-xs lg:text-sm text-slate-300 font-bold uppercase tracking-widest leading-snug">
                Years of Excellence
              </div>
            </div>
          </div>

          {/* --- BLOCK 3: The Horizontal Feature Cards --- */}
          {/* Added lg:ml-8 here to keep a bit of extra breathing room between the car and the cards */}
          <div className="w-full lg:w-max shrink-0 flex flex-col lg:flex-row gap-6 lg:gap-8 lg:pr-[10vw] lg:ml-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="mobile-fade w-full lg:w-[320px] shrink-0 h-full"
              >
                <BorderGlow
                  edgeSensitivity={30}
                  glowColor="0 210 255" 
                  backgroundColor="#0f172a" 
                  borderRadius={32} 
                  glowRadius={40}
                  glowIntensity={1}
                  coneSpread={25}
                  animated={true} 
                  colors={['#00d2ff', '#3b82f6', '#020617']} 
                >
                  <div className="p-8 h-full flex flex-col group">
                    <div className="w-16 h-16 rounded-2xl bg-[#020617] border border-white/10 flex items-center justify-center text-[#00d2ff] mb-8 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(0,210,255,0.2)] transition-all duration-500">
                      {feature.icon}
                    </div>
                    <h4 className="text-white font-display font-bold text-2xl mb-4 tracking-wide">
                      {feature.title}
                    </h4>
                    <p className="text-slate-400 text-sm leading-relaxed font-medium">
                      {feature.description}
                    </p>
                  </div>
                </BorderGlow>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}