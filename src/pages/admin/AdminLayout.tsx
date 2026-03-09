import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, Car, CalendarCheck, LogOut } from 'lucide-react';
import AdminCars from './AdminCars';
import AdminReservations from './AdminReservations';

const AdminLayout = () => {
  const [activeTab, setActiveTab] = useState<'cars' | 'reservations'>('cars');
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-[#0B0E14] text-slate-200 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0B0E14] border-r border-slate-800/50 p-6 flex flex-col">
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.5)]">
             <Car size={18} className="text-white" />
          </div>
          <h2 className="text-xl font-black tracking-tight text-white">LUX<span className="text-blue-500">DRIVE</span></h2>
        </div>

        <nav className="flex-1 space-y-1">
          <SidebarLink 
            icon={<LayoutDashboard size={18}/>} 
            label="Fleet Overview" 
            active={activeTab === 'cars'} 
            onClick={() => setActiveTab('cars')} 
          />
          <SidebarLink 
            icon={<CalendarCheck size={18}/>} 
            label="Reservations" 
            active={activeTab === 'reservations'} 
            onClick={() => setActiveTab('reservations')} 
          />
        </nav>

        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-rose-400 transition-all mt-auto group"
        >
          <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-bold uppercase tracking-widest">Exit to Site</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8 lg:p-12">
        {activeTab === 'cars' ? <AdminCars /> : <AdminReservations />}
      </main>
    </div>
  );
};

const SidebarLink = ({ icon, label, active, onClick }: any) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
      active 
      ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20 shadow-[0_0_20px_rgba(59,130,246,0.1)]' 
      : 'text-slate-500 hover:bg-slate-800/50 hover:text-slate-300'
    }`}
  >
    {icon}
    <span className="text-sm font-bold">{label}</span>
  </button>
);

export default AdminLayout;