import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Car, User, LogOut, CalendarCheck, ChevronDown, Menu, X, Settings, Clock } from 'lucide-react';

export default function ClientNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('luxe-theme') || 'midnight');

  const location = useLocation();
  const navigate = useNavigate();

  // Get actual user data from localStorage
  const [client, setClient] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : { username: "Guest", email: "" };
  });

  // 1. Handle Scroll Glassmorphism
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 2. Handle Theme Persistence
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('luxe-theme', theme);
  }, [theme]);

  // 3. Smart Navigation Logic
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setIsMobileMenuOpen(false);

    if (href.startsWith('#')) {
      e.preventDefault();
      const id = href.replace('#', '');

      if (location.pathname === '/') {
        const element = document.getElementById(id);
        element?.scrollIntoView({ behavior: 'smooth' });
      } else {
        navigate(`/${href}`);
      }
    }
  };

  // Actual Logout Logic
  const handleLogout = () => {
    localStorage.removeItem('user');
    console.log("Logged out successfully");
    window.location.href = '/';
  };

  const navLinks = [
    { name: 'Home', href: '#top' },
    { name: 'Fleet', href: '/fleet' },
    { name: 'Services', href: '#services' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${isScrolled
            ? 'bg-[var(--bg-nav)] backdrop-blur-xl border-b border-[var(--border)] py-3 shadow-xl'
            : 'bg-transparent py-6'
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

          {/* LOGO */}
          <Link to="/" className="flex items-center z-[110]" onClick={() => setIsMobileMenuOpen(false)}>
            <div className="h-10 md:h-12 w-auto flex items-center justify-center overflow-hidden transition-all duration-500">
              <img
                src="../../asset/logo.jpeg"
                alt="LuxeDrive Logo"
                className="h-full w-auto object-contain"
              />
            </div>
          </Link>

          {/* DESKTOP NAVIGATION */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => {
              const isHash = link.href.startsWith('#');
              return (
                <Link
                  key={link.name}
                  to={isHash ? "/" + link.href : link.href}
                  onClick={(e) => isHash && handleNavClick(e as any, link.href)}
                  className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-blue-500 transition-all duration-300 group-hover:w-full" />
                </Link>
              );
            })}
          </div>

          {/* DESKTOP ACTIONS */}
          <div className="hidden lg:flex items-center gap-6">
            <div
              className="relative py-3"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <button className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300 ${isHovered ? 'bg-blue-600 text-white border-blue-600' : 'border-[var(--border)] text-[var(--text-muted)]'
                }`}>
                <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black ${isHovered ? 'bg-white text-blue-600' : 'bg-blue-600/20 text-blue-500'}`}>
                  {client.username.charAt(0).toUpperCase()}
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest">{client.username}</span>
                <ChevronDown size={14} className={`transition-transform duration-300 ${isHovered ? 'rotate-180' : ''}`} />
              </button>

              <div className={`absolute right-0 top-full pt-1 w-64 transition-all duration-300 origin-top-right z-50 ${isHovered ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto' : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
                }`}>
                <div className="bg-[var(--bg-dropdown)] border border-[var(--border)] rounded-2xl overflow-hidden shadow-2xl p-2 backdrop-blur-3xl">
                  <div className="px-4 py-3 mb-2 border-b border-[var(--border)]">
                    <p className="text-xs font-bold text-[var(--text-main)]">{client.username}</p>
                    <p className="text-[10px] text-[var(--text-muted)] truncate">{client.email}</p>
                  </div>

                  <Link to="/profile" className="flex items-center gap-3 px-4 py-3 text-sm text-[var(--text-muted)] hover:bg-blue-600/10 hover:text-blue-500 rounded-xl transition-all">
                    <Settings size={16} />
                    <span className="font-bold text-[var(--text-main)]">My Profile</span>
                  </Link>

                  {/* RESERVATION HISTORY TOGGLE */}
                  <Link to="/history" className="flex items-center gap-3 px-4 py-3 text-sm text-[var(--text-muted)] hover:bg-blue-600/10 hover:text-blue-500 rounded-xl transition-all">
                    <Clock size={16} />
                    <span className="font-bold text-[var(--text-main)]">My History</span>
                  </Link>

                  <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-sm text-rose-500 hover:bg-rose-500/10 rounded-xl transition-all text-left">
                    <LogOut size={16} />
                    <span className="font-bold">Sign Out</span>
                  </button>
                </div>
              </div>
            </div>

            <Link
              to="/fleet"
              className="bg-blue-600 text-white px-8 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20"
            >
              Book Now
            </Link>
          </div>

          <button className="lg:hidden text-[var(--text-main)] z-[110]" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <div className={`fixed inset-0 z-[90] bg-[var(--bg-nav)] backdrop-blur-3xl transition-transform duration-700 lg:hidden flex flex-col justify-center px-10 overflow-y-auto ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
        <div className="flex flex-col gap-6 mt-16">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-blue-600/20 border border-blue-500/30 rounded-xl flex items-center justify-center text-blue-500 font-black text-xl">
              {client.username.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="text-sm font-bold text-[var(--text-muted)] uppercase tracking-widest">Welcome back,</p>
              <p className="text-2xl font-black text-[var(--text-main)]">{client.username}</p>
            </div>
          </div>

          <hr className="border-[var(--border)] mb-2" />

          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href.startsWith('#') ? "/" + link.href : link.href}
              onClick={(e) => link.href.startsWith('#') && handleNavClick(e as any, link.href)}
              className="text-4xl font-black text-[var(--text-main)] hover:text-blue-500 transition-colors"
            >
              {link.name}
            </Link>
          ))}

          <hr className="border-[var(--border)] my-4" />

          <div className="flex flex-col gap-4">
            <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 text-xl font-bold text-[var(--text-muted)] hover:text-blue-500 transition-colors">
              <Settings size={20} /> My Profile
            </Link>
            <Link to="/history" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 text-xl font-bold text-[var(--text-muted)] hover:text-blue-500 transition-colors">
              <Clock size={20} /> My History
            </Link>
            <button onClick={handleLogout} className="flex items-center gap-3 text-xl font-bold text-rose-500 hover:text-rose-400 transition-colors text-left">
              <LogOut size={20} /> Sign Out
            </button>
          </div>
        </div>
      </div>
    </>
  );
}