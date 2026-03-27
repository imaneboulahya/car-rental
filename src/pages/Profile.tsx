import React, { useState, useEffect, useRef } from 'react';
import { User, Mail, ShieldCheck, Camera, Save, Edit3, Loader2, Lock } from 'lucide-react';

export default function Profile() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState({ type: '', text: '' });
  const [user, setUser] = useState({ id: 0, username: "Guest", email: "", image_url: "" });

  useEffect(() => {
    const saved = localStorage.getItem('user');
    if (saved) setUser(JSON.parse(saved));
  }, []);

  const handleSave = async () => {
    if (!user.id) return;
    setLoading(true);
    try {
      const res = await fetch(`http://127.0.0.1:8080/api/users/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: user.username, email: user.email }),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('user', JSON.stringify(data));
        setUser(data);
        setStatusMsg({ type: 'success', text: 'Changes registered!' });
        setIsEditing(false);
      }
    } catch (err) { console.error(err); }
    setLoading(false);
    setTimeout(() => setStatusMsg({ type: '', text: '' }), 3000);
  };

  const handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user.id) return;
    const formData = new FormData();
    formData.append('avatar', file);
    try {
      const res = await fetch(`http://127.0.0.1:8080/api/users/${user.id}/avatar`, {
        method: 'POST',
        body: formData,
      });
      const updated = await res.json();
      if (res.ok) {
        setUser(updated);
        localStorage.setItem('user', JSON.stringify(updated));
        setStatusMsg({ type: 'success', text: 'Photo updated!' });
      }
    } catch (err) { console.error(err); }
  };

  return (
    <div className="min-h-screen bg-[#020617] pt-32 pb-20 px-6 text-white">
      <div className="max-w-4xl mx-auto">
        
        {/* PROFILE HEADER (RESTORED) */}
        <div className="bg-[#0f172a] rounded-[2.5rem] p-8 border border-white/5 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 blur-[100px] -mr-32 -mt-32" />
          
          <div className="relative z-10">
            <div className="w-32 h-32 bg-blue-600 rounded-3xl flex items-center justify-center overflow-hidden border-4 border-white/5 shadow-2xl shadow-blue-600/20">
              {user.image_url ? (
                <img src={user.image_url} className="w-full h-full object-cover" alt="Profile" />
              ) : (
                <span className="text-4xl font-black">{user.username.charAt(0).toUpperCase()}</span>
              )}
            </div>
            <input type="file" className="hidden" ref={fileInputRef} onChange={handleImage} accept="image/*" />
            <button onClick={() => fileInputRef.current?.click()} className="absolute -bottom-2 -right-2 bg-white text-slate-900 p-2 rounded-xl shadow-lg hover:scale-110 transition-transform cursor-pointer">
              <Camera size={18} />
            </button>
          </div>

          <div className="flex-1 text-center md:text-left z-10">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                <h1 className="text-3xl font-bold uppercase tracking-tight">{user.username}</h1>
                <span className="bg-blue-600/20 text-blue-400 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border border-blue-500/30">
                  Premium Member
                </span>
            </div>
            <p className="text-slate-400 flex items-center justify-center md:justify-start gap-2">
              <Mail size={16} className="text-blue-500" /> {user.email}
            </p>
          </div>

          <button onClick={() => isEditing ? handleSave() : setIsEditing(true)} className="bg-blue-600 px-8 py-4 rounded-2xl font-bold z-10 hover:bg-blue-700 transition-all flex items-center gap-2">
            {loading ? <Loader2 className="animate-spin" /> : isEditing ? <Save size={20} /> : <Edit3 size={20} />}
            {isEditing ? "Save Changes" : "Edit Profile"}
          </button>
        </div>

        {/* INFO GRID (RESTORED) */}
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <div className="bg-[#0f172a] rounded-[2.5rem] p-8 border border-white/5">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-3"><User className="text-blue-500" /> Personal Information</h2>
            <div className="space-y-4">
              <input value={user.username} disabled={!isEditing} onChange={e => setUser({...user, username: e.target.value})} className="w-full bg-[#1e293b] border border-white/5 rounded-xl p-4 outline-none focus:ring-2 focus:ring-blue-500/50 disabled:opacity-40" />
              <input value={user.email} disabled={!isEditing} onChange={e => setUser({...user, email: e.target.value})} className="w-full bg-[#1e293b] border border-white/5 rounded-xl p-4 outline-none focus:ring-2 focus:ring-blue-500/50 disabled:opacity-40" />
            </div>
          </div>

          <div className="bg-[#0f172a] rounded-[2.5rem] p-8 border border-white/5">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-3"><ShieldCheck className="text-emerald-500" /> Security Status</h2>
            <div className="space-y-4">
               <div className="p-5 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl flex items-center justify-between">
                  <div>
                    <div className="text-sm font-bold text-emerald-500">Identity Verified</div>
                    <div className="text-[10px] text-emerald-500/60 uppercase tracking-widest mt-1 font-bold">LuxeDrive Tier 1</div>
                  </div>
                  <ShieldCheck size={24} className="text-emerald-500" />
               </div>
               <button className="w-full py-4 bg-white/5 hover:bg-white/10 text-white rounded-2xl flex items-center justify-center gap-2 border border-white/5 transition-all text-sm font-bold mt-4">
                 <Lock size={16} /> Update Password
               </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}