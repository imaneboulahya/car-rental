import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, ArrowRight } from 'lucide-react';

// Added setUser prop
export default function Login({ setUser }: { setUser: (user: any) => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://127.0.0.1:8080/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // 1. Save to LocalStorage for persistence
        localStorage.setItem('user', JSON.stringify(data.user));
        
        // 2. Update App state to swap Navbar to NavClients
        setUser(data.user);

        const cleanEmail = email.trim().toLowerCase();
        if (cleanEmail === "admin@example.com" && password === "admin1234") {
          navigate('/admin'); 
        } else {
          navigate('/');
        }
      } else {
        alert("Login failed: " + data.error);
      }
    } catch (error) {
      alert("Cannot connect to server. Check if Flask is running.");
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-[#0f172a] p-10 rounded-[2.5rem] border border-white/5 shadow-2xl">
        <h1 className="text-3xl font-bold text-white mb-6">Sign In</h1>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#1e293b] border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-blue-500"
                placeholder="admin@example.com"
                required
              />
            </div>
          </div>
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#1e293b] border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-blue-500"
                placeholder="••••••••"
                required
              />
            </div>
          </div>
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-2xl transition-all flex items-center justify-center gap-2">
            Login <ArrowRight size={18} />
          </button>
        </form>
        <p className="mt-8 text-center text-slate-400 text-sm">
          New here? <Link to="/signup" className="text-blue-500 font-bold">Create Account</Link>
        </p>
      </div>
    </div>
  );
}