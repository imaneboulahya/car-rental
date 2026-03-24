import React, { useState, useEffect } from 'react';
import { User, Mail, ShieldCheck, MapPin, Camera } from 'lucide-react';

export default function Profile() {
  // Get the logged-in user's data
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : { username: "Guest", email: "" };
  });

  return (
    <div className="min-h-screen bg-[#020617] pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        
        {/* Profile Header */}
        <div className="bg-[#0f172a] rounded-[2.5rem] border border-white/5 p-8 md:p-12 mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 blur-[100px] -mr-32 -mt-32" />
          
          <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
            {/* Avatar Circle */}
            <div className="relative group">
              <div className="w-32 h-32 bg-blue-600 rounded-3xl flex items-center justify-center text-4xl font-black text-white shadow-2xl shadow-blue-600/20">
                {user.username.charAt(0).toUpperCase()}
              </div>
              <button className="absolute -bottom-2 -right-2 bg-white text-slate-900 p-2 rounded-xl shadow-lg hover:scale-110 transition-transform">
                <Camera size={18} />
              </button>
            </div>

            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                <h1 className="text-3xl font-bold text-white">{user.username}</h1>
                <span className="bg-blue-600/20 text-blue-400 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border border-blue-500/30">
                  Premium Member
                </span>
              </div>
              <p className="text-slate-400 flex items-center justify-center md:justify-start gap-2">
                <Mail size={16} /> {user.email}
              </p>
            </div>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Account Details */}
          <div className="bg-[#0f172a] rounded-[2rem] border border-white/5 p-8">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <User className="text-blue-500" size={20} /> Personal Information
            </h2>
            <div className="space-y-6">
              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-2">Display Name</label>
                <input 
                  type="text" 
                  value={user.username} 
                  disabled 
                  className="w-full bg-[#1e293b] border border-white/5 rounded-xl py-3 px-4 text-slate-300 cursor-not-allowed"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-2">Email Address</label>
                <input 
                  type="text" 
                  value={user.email} 
                  disabled 
                  className="w-full bg-[#1e293b] border border-white/5 rounded-xl py-3 px-4 text-slate-300 cursor-not-allowed"
                />
              </div>
            </div>
          </div>

          {/* Verification & Security */}
          <div className="bg-[#0f172a] rounded-[2rem] border border-white/5 p-8">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <ShieldCheck className="text-emerald-500" size={20} /> Security Status
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl">
                <div>
                  <p className="text-sm font-bold text-emerald-500">Identity Verified</p>
                  <p className="text-[10px] text-emerald-500/70">Driving license approved</p>
                </div>
                <ShieldCheck className="text-emerald-500" />
              </div>
              <button className="w-full py-4 bg-[#1e293b] hover:bg-[#2d3a4f] text-white text-sm font-bold rounded-2xl transition-all border border-white/5">
                Change Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}