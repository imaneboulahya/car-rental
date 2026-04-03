import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LayoutDashboard, Car, CalendarCheck, LogOut, Menu, X } from 'lucide-react';
import AdminCars from './AdminCars';
import AdminReservations from './AdminReservations';
import logoPic from '../../../asset/logo.jpeg';

const AdminLayout = () => {
  const [activeTab, setActiveTab] = useState<'cars' | 'reservations'>('cars');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleTabSwitch = (tab: 'cars' | 'reservations') => {
    setActiveTab(tab);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#0B0E14] text-slate-200 font-sans flex flex-col">
      
      {/* Top Navigation (Replaces Sidebar) */}
      <header className="sticky top-0 z-50 bg-[#0B0E14]/90 backdrop-blur-xl border-b border-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo area */}
            <Link to="/" className="flex items-center gap-4">
              <div className="h-12 w-auto flex items-center">
                <img 
                  src={logoPic} 
                  alt="LuxeDrive Logo" 
                  className="h-full w-auto object-contain"
                />
              </div>
              <div className="flex items-center">
                <span className="px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.25em] text-blue-400 border border-blue-500/20 rounded-lg bg-blue-500/5 backdrop-blur-md">
                  ADMIN <span className="text-slate-500 opacity-50 ml-1.5">PANEL</span>
                </span>
              </div>
            </Link>

            {/* Desktop Tabs */}
            <nav className="hidden md:flex items-center gap-2 bg-[#151921] p-1.5 rounded-2xl border border-slate-800/50">
              <TabButton 
                icon={<LayoutDashboard size={16}/>} 
                label="Fleet Overview" 
                active={activeTab === 'cars'} 
                onClick={() => handleTabSwitch('cars')} 
              />
              <TabButton 
                icon={<CalendarCheck size={16}/>} 
                label="Reservations" 
                active={activeTab === 'reservations'} 
                onClick={() => handleTabSwitch('reservations')} 
              />
            </nav>

            {/* Desktop Exit Button */}
            <div className="hidden md:block">
              <button 
                onClick={() => navigate('/')}
                className="flex items-center gap-2 px-4 py-2.5 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl transition-all group"
              >
                <LogOut size={16} className="group-hover:-translate-x-1 transition-transform" />
                <span className="text-xs font-bold uppercase tracking-widest">Exit Site</span>
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden p-2 text-slate-400 hover:text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-slate-800/50 bg-[#151921] px-4 py-4 space-y-2">
            <MobileTabButton 
              icon={<LayoutDashboard size={18}/>} 
              label="Fleet Overview" 
              active={activeTab === 'cars'} 
              onClick={() => handleTabSwitch('cars')} 
            />
            <MobileTabButton 
              icon={<CalendarCheck size={18}/>} 
              label="Reservations" 
              active={activeTab === 'reservations'} 
              onClick={() => handleTabSwitch('reservations')} 
            />
            <div className="h-px w-full bg-slate-800/50 my-4" />
            <button 
              onClick={() => navigate('/')}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 text-rose-400 bg-rose-500/10 rounded-xl transition-all"
            >
              <LogOut size={18} />
              <span className="text-sm font-bold uppercase tracking-widest">Exit to Site</span>
            </button>
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        {activeTab === 'cars' ? <AdminCars /> : <AdminReservations />}
      </main>
    </div>
  );
};

// Sub-components for clean code
const TabButton = ({ icon, label, active, onClick }: any) => (
  <button 
    onClick={onClick}
    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all duration-300 ${
      active 
      ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20 shadow-[0_0_20px_rgba(59,130,246,0.1)]' 
      : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/50 border border-transparent'
    }`}
  >
    {icon}
    <span className="text-xs font-bold tracking-wide">{label}</span>
  </button>
);

const MobileTabButton = ({ icon, label, active, onClick }: any) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 ${
      active 
      ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20' 
      : 'text-slate-500 hover:bg-slate-800/50 hover:text-slate-300'
    }`}
  >
    {icon}
    <span className="text-sm font-bold">{label}</span>
  </button>
);

export default AdminLayout;