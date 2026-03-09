import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock, ArrowRight, Chrome } from 'lucide-react';

export default function Login() {
  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4 md:p-0">
      <div className="max-w-5xl w-full grid md:grid-cols-2 bg-[#0f172a] rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/5">
        
        {/* LEFT SIDE: VISUAL */}
        <div className="relative hidden md:block">
          <img 
            src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1200" 
            alt="Luxury Car" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/20 to-transparent" />
          <div className="absolute bottom-12 left-12 right-12">
            <h2 className="text-4xl font-display font-black text-white leading-tight mb-4">
              WELCOME <br /> <span className="text-blue-500">BACK.</span>
            </h2>
            <p className="text-slate-300 font-light">The engine is warm. Your next journey is just a sign-in away.</p>
          </div>
        </div>

        {/* RIGHT SIDE: FORM */}
        <div className="p-8 md:p-16 flex flex-col justify-center">
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-white mb-2">Login</h1>
            <p className="text-slate-400 text-sm">Enter your credentials to access your fleet.</p>
          </div>

          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors" size={18} />
                <input 
                  type="email" 
                  placeholder="name@company.com"
                  className="w-full bg-[#1e293b] border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50 transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Password</label>
                <Link to="#" className="text-[10px] uppercase tracking-widest text-blue-500 hover:text-white transition-colors">Forgot?</Link>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors" size={18} />
                <input 
                  type="password" 
                  placeholder="••••••••"
                  className="w-full bg-[#1e293b] border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50 transition-all"
                />
              </div>
            </div>

            <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-2xl transition-all flex items-center justify-center gap-2 group shadow-lg shadow-blue-600/20">
              Sign In
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="mt-8">
            <div className="relative flex items-center justify-center mb-8">
              <div className="border-t border-white/5 w-full"></div>
              <span className="bg-[#0f172a] px-4 text-xs text-slate-500 uppercase tracking-widest">Or continue with</span>
              <div className="border-t border-white/5 w-full"></div>
            </div>

            <button className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white py-3 rounded-2xl transition-all flex items-center justify-center gap-3">
              <Chrome size={18} />
              <span className="text-sm font-semibold">Google Account</span>
            </button>
          </div>

          <p className="mt-10 text-center text-sm text-slate-400">
            Don't have an account? {' '}
            <Link to="/signup" className="text-blue-500 font-bold hover:underline">Register now</Link>
          </p>
        </div>
      </div>
    </div>
  );
}