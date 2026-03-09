import React, { useRef, useEffect, useState } from 'react';
import { Mail, Phone, MapPin, Send, ChevronDown } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const glowsRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    fullName: '',
    emailAddress: '',
    subject: 'General Inquiry',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('http://localhost:8080/api/contact/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          fullName: '',
          emailAddress: '',
          subject: 'General Inquiry',
          message: ''
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        }
      });

      // 1. Stagger in the contact info on the left
      tl.fromTo(infoRef.current?.children as HTMLCollection,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, stagger: 0.15, duration: 0.8, ease: "power3.out" }
      )

        // 2. Slide and fade in the form on the right
        .fromTo(formRef.current,
          { opacity: 0, x: 30, scale: 0.95 },
          { opacity: 1, x: 0, scale: 1, duration: 0.8, ease: "power3.out" },
          "-=0.6" // Overlap for a seamless reveal
        );

      // 3. Ambient floating animation for the background glows
      if (glowsRef.current) {
        gsap.to(glowsRef.current.children, {
          y: "random(-30, 30)",
          x: "random(-30, 30)",
          duration: 5,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          stagger: 0.5,
        });
      }

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="contact" className="py-24 lg:py-32 relative overflow-hidden bg-[#020617]">

      {/* --- AMBIENT GLOWS --- */}
      <div ref={glowsRef} className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-brand-accent/5 rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute bottom-[-10%] right-[10%] w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[120px] mix-blend-screen" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* --- LEFT COLUMN: INFO --- */}
          <div ref={infoRef} className="flex flex-col">
            <div className="w-12 h-1 bg-brand-accent rounded-full mb-8 shadow-[0_0_10px_rgba(var(--brand-accent-rgb),0.5)]" />

            <h2 className="text-5xl md:text-6xl font-display font-bold text-white mb-6 tracking-tight">
              Connect with the <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-blue-400 italic pr-2">Concierge</span>
            </h2>

            <p className="text-slate-400 mb-12 text-lg md:text-xl font-light leading-relaxed max-w-md">
              Have questions about our fleet or services? Our dedicated team is available 24/7 to orchestrate your next journey.
            </p>

            <div className="space-y-8">
              {/* Phone */}
              <div className="flex items-start gap-6 group cursor-pointer">
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-brand-accent shrink-0 group-hover:scale-110 group-hover:bg-brand-accent group-hover:text-[#020617] group-hover:shadow-[0_0_20px_rgba(var(--brand-accent-rgb),0.4)] transition-all duration-500">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="text-white font-display font-bold text-xl mb-1 tracking-wide">Direct Line</h4>
                  <p className="text-brand-accent text-lg">+212 6 53 90 46 65</p>
                  <p className="text-slate-500 text-sm font-semibold uppercase tracking-widest mt-1">Mon-Sun, 24/7</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-6 group cursor-pointer">
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-brand-accent shrink-0 group-hover:scale-110 group-hover:bg-brand-accent group-hover:text-[#020617] group-hover:shadow-[0_0_20px_rgba(var(--brand-accent-rgb),0.4)] transition-all duration-500">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="text-white font-display font-bold text-xl mb-1 tracking-wide">Email Us</h4>
                  <p className="text-slate-300 group-hover:text-white transition-colors">ocationvoiture@gmail.com</p>
                  <p className="text-slate-500 text-sm font-semibold uppercase tracking-widest mt-1">Response within 1 hour</p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-6 group cursor-pointer">
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-brand-accent shrink-0 group-hover:scale-110 group-hover:bg-brand-accent group-hover:text-[#020617] group-hover:shadow-[0_0_20px_rgba(var(--brand-accent-rgb),0.4)] transition-all duration-500">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="text-white font-display font-bold text-xl mb-1 tracking-wide">Headquarters</h4>
                  <p className="text-slate-300 group-hover:text-white transition-colors">Avenue UMP, Oujda</p>
                  <p className="text-slate-500 text-sm font-semibold uppercase tracking-widest mt-1">Morocco, 60000</p>
                </div>
              </div>
            </div>
          </div>

          {/* --- RIGHT COLUMN: FORM --- */}
          <div ref={formRef} className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-accent/10 to-transparent rounded-[2rem] blur-xl transform translate-y-4 -z-10" />

            <div className="bg-slate-900/60 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-8 md:p-10 lg:p-12 shadow-[0_30px_60px_rgba(0,0,0,0.5)]">
              <form className="space-y-6" onSubmit={handleSubmit}>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Full Name</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      placeholder="Ayoub El Idrissi"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white font-medium focus:outline-none focus:ring-2 focus:ring-brand-accent/50 focus:border-brand-accent focus:bg-white/10 transition-all duration-300 placeholder:text-slate-600"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Email Address</label>
                    <input
                      type="email"
                      name="emailAddress"
                      value={formData.emailAddress}
                      onChange={handleChange}
                      required
                      placeholder="ayoub@idrissi.com"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white font-medium focus:outline-none focus:ring-2 focus:ring-brand-accent/50 focus:border-brand-accent focus:bg-white/10 transition-all duration-300 placeholder:text-slate-600"
                    />
                  </div>
                </div>

                <div className="space-y-2 relative">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Subject</label>
                  <div className="relative group">
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white font-medium focus:outline-none focus:ring-2 focus:ring-brand-accent/50 focus:border-brand-accent focus:bg-white/10 transition-all duration-300 appearance-none cursor-pointer"
                    >
                      <option className="bg-slate-900 text-white" value="General Inquiry">General Inquiry</option>
                      <option className="bg-slate-900 text-white" value="Booking Question">Booking Question</option>
                      <option className="bg-slate-900 text-white" value="Corporate Partnership">Corporate Partnership</option>
                      <option className="bg-slate-900 text-white" value="Feedback">Feedback</option>
                    </select>
                    <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none group-hover:text-brand-accent transition-colors" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Message</label>
                  <textarea
                    rows={4}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="How can we elevate your experience?"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white font-medium focus:outline-none focus:ring-2 focus:ring-brand-accent/50 focus:border-brand-accent focus:bg-white/10 transition-all duration-300 resize-none placeholder:text-slate-600"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full relative overflow-hidden rounded-xl bg-white px-8 py-4 font-bold text-[#020617] transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] group flex items-center justify-center gap-3 mt-4 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {/* Diagonal Shine Effect */}
                  <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-150%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(150%)]">
                    <div className="relative h-full w-8 bg-white/40" />
                  </div>
                  <span className="relative z-10 text-lg">
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </span>
                  {!isSubmitting && <Send size={18} className="relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                </button>

                {submitStatus === 'success' && (
                  <p className="text-green-400 text-sm font-medium text-center mt-4">Message sent successfully! We will get back to you shortly.</p>
                )}
                {submitStatus === 'error' && (
                  <p className="text-red-400 text-sm font-medium text-center mt-4">There was an error sending your message. Please try again later.</p>
                )}

              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}