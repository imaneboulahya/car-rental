import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { 
  ArrowLeft, 
  Users, 
  Fuel, 
  Gauge, 
  Shield, 
  CheckCircle2, 
  Calendar,
  CreditCard,
  Zap,
  Star
} from 'lucide-react';
import { CARS } from '../types';

export default function CarDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const car = CARS.find(c => c.id === id);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!car) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-brand-deep text-white p-6">
        <h2 className="text-3xl font-display font-bold mb-4">Car Not Found</h2>
        <Link to="/" className="text-brand-accent flex items-center gap-2 hover:underline">
          <ArrowLeft size={20} />
          Back to Fleet
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 min-h-screen bg-brand-deep">
      <div className="max-w-7xl mx-auto px-6">
        {/* Breadcrumbs / Back button */}
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-slate-400 hover:text-brand-accent transition-colors mb-8 group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Back to Fleet
        </Link>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column: Image & Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="perspective-1000">
              <motion.div 
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                  rotateX,
                  rotateY,
                  transformStyle: "preserve-3d",
                }}
                className="relative rounded-3xl overflow-hidden blue-glow"
              >
                <img 
                  src={car.image} 
                  alt={car.name} 
                  style={{ transform: "translateZ(50px)" }}
                  className="w-full h-auto object-cover aspect-[16/10]"
                  referrerPolicy="no-referrer"
                />
                <div 
                  style={{ transform: "translateZ(80px)" }}
                  className="absolute top-6 left-6"
                >
                  <span className="px-4 py-1.5 rounded-full bg-brand-accent text-brand-deep text-sm font-bold uppercase tracking-widest blue-glow">
                    {car.type}
                  </span>
                </div>
              </motion.div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="rounded-2xl overflow-hidden border border-white/10 hover:border-brand-accent/50 transition-colors cursor-pointer">
                  <img 
                    src={`${car.image}&sig=${i}`} 
                    alt={`${car.name} view ${i}`} 
                    className="w-full h-24 object-cover opacity-60 hover:opacity-100 transition-opacity"
                    referrerPolicy="no-referrer"
                  />
                </div>
              ))}
            </div>

            <div className="glass-card p-8">
              <h3 className="text-xl font-display font-bold text-white mb-6">Key Specifications</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                <div className="flex flex-col items-center text-center gap-2">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-brand-accent">
                    <Users size={24} />
                  </div>
                  <span className="text-xs text-slate-500 uppercase">Seats</span>
                  <span className="text-sm font-bold text-white">{car.specs.seats} Persons</span>
                </div>
                <div className="flex flex-col items-center text-center gap-2">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-brand-accent">
                    <Fuel size={24} />
                  </div>
                  <span className="text-xs text-slate-500 uppercase">Fuel</span>
                  <span className="text-sm font-bold text-white">{car.specs.fuel}</span>
                </div>
                <div className="flex flex-col items-center text-center gap-2">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-brand-accent">
                    <Zap size={24} />
                  </div>
                  <span className="text-xs text-slate-500 uppercase">Transmission</span>
                  <span className="text-sm font-bold text-white">{car.specs.transmission}</span>
                </div>
                <div className="flex flex-col items-center text-center gap-2">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-brand-accent">
                    <Gauge size={24} />
                  </div>
                  <span className="text-xs text-slate-500 uppercase">0-60 MPH</span>
                  <span className="text-sm font-bold text-white">{car.specs.acceleration}</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Details & Booking */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div>
              <div className="flex items-center gap-2 text-brand-accent mb-2">
                <Star size={16} className="fill-brand-accent" />
                <span className="text-sm font-bold uppercase tracking-widest">Premium Selection</span>
              </div>
              <h1 className="text-5xl font-display font-bold text-white mb-2">{car.name}</h1>
              <p className="text-2xl text-slate-400 font-display">{car.brand}</p>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-display font-bold text-brand-accent">${car.pricePerDay}</span>
              <span className="text-slate-500 uppercase text-sm tracking-widest">/ Per Day</span>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white">Premium Features</h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {car.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-slate-300 bg-white/5 p-3 rounded-xl border border-white/5">
                    <CheckCircle2 size={18} className="text-brand-accent shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card p-8 space-y-6">
              <div className="flex items-center justify-between pb-6 border-b border-white/5">
                <div className="flex items-center gap-3">
                  <Shield className="text-green-500" size={24} />
                  <div>
                    <div className="text-sm font-bold text-white">Full Insurance Included</div>
                    <div className="text-xs text-slate-500">No hidden costs</div>
                  </div>
                </div>
                <div className="text-green-500 font-bold text-sm">FREE</div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400">
                    <Calendar size={20} />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs text-slate-500 uppercase">Rental Period</div>
                    <div className="text-sm text-white font-medium">Select dates in next step</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400">
                    <CreditCard size={20} />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs text-slate-500 uppercase">Payment Method</div>
                    <div className="text-sm text-white font-medium">Credit Card / Crypto / Apple Pay</div>
                  </div>
                </div>
              </div>

              <button className="w-full bg-brand-accent hover:bg-brand-accent/90 text-brand-deep font-bold py-5 rounded-2xl flex items-center justify-center gap-3 transition-all blue-glow-hover text-lg">
                Book This {car.name}
              </button>
              
              <p className="text-center text-xs text-slate-500">
                By clicking "Book Now", you agree to our terms of service and rental policy.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
