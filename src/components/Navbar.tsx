import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { User, LogIn, UserPlus, ChevronDown, Menu, X, LayoutDashboard } from 'lucide-react';
import logoPic from '../../asset/logo.jpeg'; // Ensure this path is correct based on your folder structure
// If your logo is in src/assets, uncomment the line below:
// import logoImg from '../asset/logo.png';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('luxe-theme') || 'midnight');
  
  const location = useLocation();
  const navigate = useNavigate();

  // 1. Handle Scroll Glassmorphism & Height
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
  const handleNavClick = (e, href) => {
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

  const navLinks = [
    { name: 'Home', href: '#top' },
    { name: 'Fleet', href: '/fleet' },
    { name: 'Services', href: '#services' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          isScrolled 
            ? 'bg-[var(--bg-nav)] backdrop-blur-xl border-b border-[var(--border)] py-2 shadow-xl' 
            : 'bg-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          
          {/* LOGO */}
          <Link to="/" className="flex items-center z-[110]" onClick={() => setIsMobileMenuOpen(false)}>
            <div className="h-10 md:h-12 w-auto flex items-center justify-center overflow-hidden transition-all duration-500">
              <img 
                src={logoPic}
                alt="LuxeDrive Logo" 
                className="h-full w-auto object-contain"
              />
            </div>
          </Link>

          {/* DESKTOP NAVIGATION */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => {
              const isHash = link.href.startsWith('#');

              if (isHash) {
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors relative group"
                  >
                    {link.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-blue-500 transition-all duration-300 group-hover:w-full" />
                  </a>
                );
              }

              return (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
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
      <div className={`fixed inset-0 z-[90] bg-[var(--bg-nav)] backdrop-blur-3xl transition-transform duration-700 lg:hidden flex flex-col justify-center px-10 overflow-y-auto ${
        isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex flex-col gap-6 mt-16">
          {navLinks.map((link) => {
             const isHash = link.href.startsWith('#');
             
             if (isHash) {
               return (
                 <a
                   key={link.name}
                   href={link.href}
                   onClick={(e) => handleNavClick(e, link.href)}
                   className="text-4xl font-black text-[var(--text-main)] hover:text-blue-500 transition-colors"
                 >
                   {link.name}
                 </a>
               );
             }

             return (
               <Link
                 key={link.name}
                 to={link.href}
                 onClick={(e) => handleNavClick(e, link.href)}
                 className="text-4xl font-black text-[var(--text-main)] hover:text-blue-500 transition-colors"
               >
                 {link.name}
               </Link>
             );
          })}

          <hr className="border-[var(--border)] my-4" />

          <div className="flex flex-col gap-4">
            <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 text-xl font-bold text-[var(--text-muted)] hover:text-blue-500 transition-colors">
              <LogIn size={20} /> Sign In
            </Link>
            <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 text-xl font-bold text-[var(--text-muted)] hover:text-blue-500 transition-colors">
              <UserPlus size={20} /> Register
            </Link>
            
          </div>

          <div className="flex flex-col gap-4 mt-4 mb-10">
            <Link 
              to="/fleet"
              onClick={() => setIsMobileMenuOpen(false)}
              className="bg-blue-600 text-white px-8 py-4 rounded-full text-center text-sm font-bold uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20"
            >
              Book Now
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}