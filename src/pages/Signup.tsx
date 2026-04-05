import React, { useState } from 'react'; // Added useState
import { Link, useNavigate } from 'react-router-dom'; // Added useNavigate
import { Mail, Lock, ArrowRight } from 'lucide-react';

export default function Signup() {
  // 1. Create states to hold input values
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // 2. Handle the submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    
    // Combine names for your backend 'username' field, or just use email
    const userData = {
      username: `${formData.firstName}_${formData.lastName}`,
      email: formData.email,
      password: formData.password
    };

    try {
      const response = await fetch('http://127.0.0.1:8080/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        navigate('/login'); // Redirect to login page
      } else {
        setError(data.error || "Registration failed");
      }
    } catch (err) {
      setError("Could not connect to the backend server. Is Flask running?");
    } finally {
      setLoading(false);
    }
  };

  // 3. Update state when user types
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4 md:p-0">
      <div className="max-w-5xl w-full grid md:grid-cols-2 bg-[#0f172a] rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/5">
        
        {/* LEFT SIDE VISUAL (Omitted for brevity, keep your original code) */}

        <div className="p-8 md:p-16 flex flex-col justify-center">
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-white mb-2">Register</h1>
            <p className="text-slate-400 text-sm">Start your premium driving experience today.</p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
               <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1">First Name</label>
                <input 
                  name="firstName"
                  onChange={handleChange}
                  type="text" 
                  required
                  className="w-full bg-[#1e293b] border border-white/5 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500/50" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1">Last Name</label>
                <input 
                  name="lastName"
                  onChange={handleChange}
                  type="text" 
                  required
                  className="w-full bg-[#1e293b] border border-white/5 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500/50" 
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                <input 
                  name="email"
                  onChange={handleChange}
                  type="email" 
                  required
                  className="w-full bg-[#1e293b] border border-white/5 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-blue-500/50" 
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                <input 
                  name="password"
                  onChange={handleChange}
                  type="password" 
                  required
                  className="w-full bg-[#1e293b] border border-white/5 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-blue-500/50" 
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-500 px-4 py-3 rounded-xl text-sm mb-4 flex items-center gap-3 animate-shake">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                {error}
              </div>
            )}

            <button 
              type="submit" 
              disabled={loading}
              className={`w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-2xl transition-all flex items-center justify-center gap-2 group shadow-lg shadow-blue-600/20 mt-4 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
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