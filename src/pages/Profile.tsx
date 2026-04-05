import React, { useState, useEffect, useRef } from 'react';
import { User, Mail, ShieldCheck, Camera, Save, Edit3, Loader2, Lock, X, CheckCircle2, AlertCircle } from 'lucide-react';

export default function Profile() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [statusMsg, setStatusMsg] = useState({ type: '', text: '' });
  const [user, setUser] = useState({ id: 0, username: "Guest", email: "", image_url: "" });

  const [pwdData, setPwdData] = useState({ current: '', new: '', confirm: '' });
  const [pwdLoading, setPwdLoading] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('user');
    if (saved) setUser(JSON.parse(saved));
  }, []);

  const showStatus = (type: string, text: string) => {
    setStatusMsg({ type, text });
    setTimeout(() => setStatusMsg({ type: '', text: '' }), 4000);
  };

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
        showStatus('success', 'Profile updated successfully!');
        setIsEditing(false);
      } else {
        showStatus('error', data.error || 'Failed to update profile');
      }
    } catch (err) { 
      showStatus('error', 'Server error. Please try again.');
    }
    setLoading(false);
  };

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (pwdData.new !== pwdData.confirm) {
      showStatus('error', 'New passwords do not match');
      return;
    }
    setPwdLoading(true);
    try {
      const res = await fetch(`http://127.0.0.1:8080/api/users/${user.id}/password`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPassword: pwdData.current,
          newPassword: pwdData.new
        }),
      });
      const data = await res.json();
      if (res.ok) {
        showStatus('success', 'Password changed successfully!');
        setIsPasswordModalOpen(false);
        setPwdData({ current: '', new: '', confirm: '' });
      } else {
        showStatus('error', data.error || 'Failed to change password');
      }
    } catch (err) {
      showStatus('error', 'Server error. Please try again.');
    }
    setPwdLoading(false);
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
        showStatus('success', 'Profile photo updated!');
      }
    } catch (err) { 
        showStatus('error', 'Failed to upload photo');
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] pt-32 pb-20 px-6 text-white font-sans relative">
      
      {/* GLOBAL NOTIFICATION BOX */}
      {statusMsg.text && (
        <div className={`fixed top-24 left-1/2 -translate-x-1/2 z-50 px-6 py-4 rounded-2xl border shadow-2xl flex items-center gap-3 animate-in slide-in-from-top-4 duration-300 ${
          statusMsg.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-rose-500/10 border-rose-500/20 text-rose-400'
        }`}>
          {statusMsg.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
          <span className="text-sm font-bold">{statusMsg.text}</span>
        </div>
      )}

      <div className="max-w-4xl mx-auto">
        <div className="bg-[#0f172a] rounded-[2.5rem] p-8 border border-white/5 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 blur-[100px] -mr-32 -mt-32" />
          
          <div className="relative z-10">
            <div className="w-32 h-32 bg-blue-600 rounded-3xl flex items-center justify-center overflow-hidden border-4 border-white/5 shadow-2xl shadow-blue-600/20 group relative">
              {user.image_url ? (
                <img src={user.image_url} className="w-full h-full object-cover" alt="Profile" />
              ) : (
                <span className="text-4xl font-black">{user.username.charAt(0).toUpperCase()}</span>
              )}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                <Camera size={24} className="text-white" />
              </div>
            </div>
            <input type="file" className="hidden" ref={fileInputRef} onChange={handleImage} accept="image/*" />
            <button onClick={() => fileInputRef.current?.click()} className="absolute -bottom-2 -right-2 bg-[#00d2ff] text-slate-900 p-2.5 rounded-xl shadow-lg hover:scale-110 active:scale-95 transition-all cursor-pointer">
              <Camera size={16} />
            </button>
          </div>

          <div className="flex-1 text-center md:text-left z-10">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                <h1 className="text-3xl font-bold uppercase tracking-tight">{user.username}</h1>
                <span className="bg-blue-600/20 text-[#00d2ff] text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border border-blue-500/30">
                  Premium Member
                </span>
            </div>
            <p className="text-slate-400 mt-1 flex items-center justify-center md:justify-start gap-2 text-sm font-medium">
              <Mail size={16} className="text-blue-500" /> {user.email}
            </p>
          </div>

          <button onClick={() => isEditing ? handleSave() : setIsEditing(true)} className="bg-[#00d2ff] text-slate-900 px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest z-10 hover:brightness-110 active:scale-95 transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(0,210,255,0.3)]">
            {loading ? <Loader2 size={18} className="animate-spin" /> : isEditing ? <Save size={18} /> : <Edit3 size={18} />}
            {isEditing ? "Save Changes" : "Edit Profile"}
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <div className="bg-[#0f172a] rounded-[2.5rem] p-8 border border-white/5">
            <h2 className="text-lg font-bold mb-6 flex items-center gap-3"><User size={20} className="text-blue-500" /> Personal Information</h2>
            <div className="space-y-5">
              <div>
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 block">Username</label>
                <input value={user.username} disabled={!isEditing} onChange={e => setUser({...user, username: e.target.value})} className="w-full bg-[#1e293b]/50 border border-white/5 rounded-xl px-4 py-3.5 outline-none focus:ring-2 focus:ring-[#00d2ff]/50 disabled:opacity-40 transition-all text-sm font-medium" />
              </div>
              <div>
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 block">Email Address</label>
                <input value={user.email} disabled={!isEditing} onChange={e => setUser({...user, email: e.target.value})} className="w-full bg-[#1e293b]/50 border border-white/5 rounded-xl px-4 py-3.5 outline-none focus:ring-2 focus:ring-[#00d2ff]/50 disabled:opacity-40 transition-all text-sm font-medium" />
              </div>
            </div>
          </div>

          <div className="bg-[#0f172a] rounded-[2.5rem] p-8 border border-white/5">
            <h2 className="text-lg font-bold mb-6 flex items-center gap-3"><ShieldCheck size={20} className="text-emerald-500" /> Security Status</h2>
            <div className="space-y-4">
               <div className="p-5 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl flex items-center justify-between">
                  <div>
                    <div className="text-sm font-bold text-emerald-500">Identity Verified</div>
                    <div className="text-[10px] text-emerald-500/60 uppercase tracking-widest mt-1 font-bold">LuxeDrive Tier 1</div>
                  </div>
                  <ShieldCheck size={24} className="text-emerald-500" />
               </div>
               <button onClick={() => setIsPasswordModalOpen(true)} className="w-full py-4 bg-white/5 hover:bg-white/10 text-white rounded-2xl flex items-center justify-center gap-2 border border-white/5 transition-all text-sm font-bold mt-4 active:scale-95">
                 <Lock size={16} className="text-blue-500" /> Update Password
               </button>
            </div>
          </div>
        </div>
      </div>

      {/* PASSWORD UPDATE MODAL */}
      {isPasswordModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#0f172a] border border-white/10 w-full max-w-md rounded-[2.5rem] overflow-hidden shadow-2xl relative animate-in zoom-in-95 duration-200">
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">Change Password</h3>
                <button onClick={() => setIsPasswordModalOpen(false)} className="p-2 hover:bg-white/5 rounded-full transition-colors">
                  <X size={20} className="text-slate-400" />
                </button>
              </div>

              <form onSubmit={handlePasswordUpdate} className="space-y-4">
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Current Password</label>
                  <input required type="password" value={pwdData.current} onChange={e => setPwdData({...pwdData, current: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 outline-none focus:border-[#00d2ff] transition-all text-sm" placeholder="••••••••" />
                </div>
                <div className="pt-2 border-t border-white/5" />
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">New Password</label>
                  <input required type="password" value={pwdData.new} onChange={e => setPwdData({...pwdData, new: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 outline-none focus:border-[#00d2ff] transition-all text-sm" placeholder="••••••••" />
                </div>
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Confirm New Password</label>
                  <input required type="password" value={pwdData.confirm} onChange={e => setPwdData({...pwdData, confirm: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 outline-none focus:border-[#00d2ff] transition-all text-sm" placeholder="••••••••" />
                </div>

                <button type="submit" disabled={pwdLoading} className="w-full py-4 bg-[#00d2ff] text-slate-900 rounded-xl font-black text-xs uppercase tracking-widest mt-6 flex justify-center items-center gap-3 hover:brightness-110 active:scale-95 transition-all disabled:opacity-50">
                  {pwdLoading ? <Loader2 size={18} className="animate-spin" /> : "Update Security"}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}