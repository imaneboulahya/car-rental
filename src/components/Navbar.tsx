import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Car, User, LogIn, UserPlus, ChevronDown, Menu, X, Sun, Moon, LayoutDashboard } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('luxe-theme') || 'midnight');
  
  const location = useLocation();
  const navigate = useNavigate();

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

  const toggleTheme = () => {
    setTheme(prev => (prev === 'midnight' ? 'showroom' : 'midnight'));
  };

  // 3. Smart Navigation Logic
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const id = href.replace('#', '');
      
      if (location.pathname === '/') {
        // If on Home, just scroll
        const element = document.getElementById(id);
        element?.scrollIntoView({ behavior: 'smooth' });
      } else {
        // If on another page, go home first, then scroll
        navigate(`/${href}`);
      }
      setIsMobileMenuOpen(false);
    }
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
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          isScrolled 
            ? 'bg-[var(--bg-nav)] backdrop-blur-xl border-b border-[var(--border)] py-3 shadow-xl' 
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          
          {/* LOGO */}
          <Link to="/" className="flex items-center gap-3 z-[110]">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20">
              <Car className="text-white" size={22} />
            </div>
            <span className={`text-xl md:text-2xl font-black tracking-tighter transition-colors ${
              isScrolled || theme === 'showroom' ? 'text-[var(--text-main)]' : 'text-white'
            }`}>
              LUXE<span className="text-blue-500">DRIVE</span>
            </span>
          </Link>

          {/* DESKTOP NAVIGATION */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => {
              const isHash = link.href.startsWith('#');
              return isHash ? (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-blue-500 transition-all duration-300 group-hover:w-full" />
                </a>
              ) : (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-blue-500 transition-all duration-300 group-hover:w-full" />
                </Link>
              );
            })}
          </div>

          {/* ACTIONS */}
          <div className="hidden lg:flex items-center gap-6">
            
           
            {/* ACCOUNT DROPDOWN */}
            <div 
              className="relative py-3"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <button className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300 ${
                isHovered ? 'bg-blue-600 text-white border-blue-600' : 'border-[var(--border)] text-[var(--text-muted)]'
              }`}>
                <User size={18} />
                <span className="text-[10px] font-bold uppercase tracking-widest">Account</span>
                <ChevronDown size={14} className={`transition-transform duration-300 ${isHovered ? 'rotate-180' : ''}`} />
              </button>

              <div className={`absolute right-0 top-full pt-1 w-64 transition-all duration-300 origin-top-right z-50 ${
                isHovered ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto' : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
              }`}>
                <div className="bg-[var(--bg-dropdown)] border border-[var(--border)] rounded-2xl overflow-hidden shadow-2xl p-2 backdrop-blur-3xl">
                  <Link to="/login" className="flex items-center gap-3 px-4 py-3 text-sm text-[var(--text-muted)] hover:bg-blue-600/10 hover:text-blue-500 rounded-xl transition-all">
                    <LogIn size={16} />
                    <span className="font-bold text-[var(--text-main)]">Sign In</span>
                  </Link>
                  <Link to="/signup" className="flex items-center gap-3 px-4 py-3 text-sm text-[var(--text-muted)] hover:bg-blue-600/10 hover:text-blue-500 rounded-xl transition-all">
                    <UserPlus size={16} />
                    <span className="font-bold text-[var(--text-main)]">Register</span>
                  </Link>
                  <Link to="/admin" className="flex items-center gap-3 px-4 py-3 text-sm text-[var(--text-muted)] hover:bg-blue-600/10 hover:text-blue-500 rounded-xl transition-all">
                    <LayoutDashboard size={16} />
                    <span className="font-bold text-[var(--text-main)]">Admin Dashboard</span>
                  </Link>
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

          {/* MOBILE TOGGLE */}
          <button className="lg:hidden text-[var(--text-main)] z-[110]" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <div className={`fixed inset-0 z-[90] bg-[var(--bg-nav)] backdrop-blur-3xl transition-transform duration-700 lg:hidden flex flex-col justify-center px-10 ${
        isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex flex-col gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-5xl font-black text-[var(--text-main)] hover:text-blue-500 transition-colors"
            >
              {link.name}
            </a>
          ))}
          <button onClick={toggleTheme} className="text-left text-blue-500 font-bold uppercase tracking-widest text-sm mt-4">
            Switch to {theme === 'midnight' ? 'Showroom' : 'Midnight'}
          </button>
        </div>
      </div>
    </>
  );
}