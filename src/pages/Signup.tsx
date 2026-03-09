import React from 'react';
import { Link } from 'react-router-dom';
import { User, Mail, Lock, ShieldCheck, ArrowRight } from 'lucide-react';

export default function Signup() {
  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4 md:p-0">
      <div className="max-w-5xl w-full grid md:grid-cols-2 bg-[#0f172a] rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/5">
        
        {/* LEFT SIDE: VISUAL */}
        <div className="relative hidden md:block order-last">
          <img 
            src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=1200" 
            alt="Luxury Interior" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent" />
          <div className="absolute bottom-12 left-12 right-12">
            <h2 className="text-4xl font-display font-black text-white leading-tight mb-4">
              JOIN THE <br /> <span className="text-blue-500">ELITE.</span>
            </h2>
            <p className="text-slate-300 font-light">Unlock exclusive access to the world's most prestigious fleet.</p>
          </div>
        </div>

        {/* RIGHT SIDE: FORM */}
        <div className="p-8 md:p-16 flex flex-col justify-center">
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-white mb-2">Register</h1>
            <p className="text-slate-400 text-sm">Start your premium driving experience today.</p>
          </div>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-2 gap-4">
               <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1">First Name</label>
                <input type="text" className="w-full bg-[#1e293b] border border-white/5 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500/50" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1">Last Name</label>
                <input type="text" className="w-full bg-[#1e293b] border border-white/5 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500/50" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                <input type="email" className="w-full bg-[#1e293b] border border-white/5 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-blue-500/50" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                <input type="password" placeholder="Min. 8 characters" className="w-full bg-[#1e293b] border border-white/5 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-blue-500/50" />
              </div>
            </div>

            <div className="flex items-start gap-3 py-2">
              <input type="checkbox" className="mt-1 accent-blue-600" id="terms" />
              <label htmlFor="terms" className="text-[11px] text-slate-400 leading-tight">
                I agree to the <span className="text-blue-500">Terms of Service</span> and <span className="text-blue-500">Privacy Policy</span>.
              </label>
            </div>

            <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-2xl transition-all flex items-center justify-center gap-2 group shadow-lg shadow-blue-600/20 mt-4">
              Create Account
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-400">
            Already a member? {' '}
            <Link to="/login" className="text-blue-500 font-bold hover:underline">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}