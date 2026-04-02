import React, { useState, useEffect } from 'react';
import { Reservation } from '../../types';
import { Check, X, Mail, Calendar, CreditCard, ChevronRight, ArrowUpRight } from 'lucide-react';

const AdminReservations = () => {
  const [bookings, setBookings] = useState<Reservation[]>([]);

  // 1. Fetch all reservations from the database
  const loadAllBookings = () => {
    fetch('http://127.0.0.1:8080/api/reservations')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setBookings(data);
        }
      })
      .catch(err => console.error("Error loading admin bookings:", err));
  };

  useEffect(() => {
    loadAllBookings();
  }, []);

  // 2. Update reservation status in the database
  const updateStatus = (id: string, newStatus: 'Confirmed' | 'Cancelled') => {
    fetch(`http://127.0.0.1:8080/api/reservations/${id}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus })
    })
    .then(res => {
      if (res.ok) {
        setBookings(prev => prev.map(b => b.id === id ? { ...b, status: newStatus } : b));
      }
    })
    .catch(err => console.error("Error updating status:", err));
  };

  return (
    <div className="animate-in fade-in duration-700">
      
      {/* HEADER */}
      <div className="mb-8 sm:mb-10">
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Booking <span className="text-blue-500">Orders</span></h1>
        <p className="text-slate-500 text-sm mt-1 font-medium">Manage and authorize incoming rental requests.</p>
      </div>

      {/* STATS OVERVIEW */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-8">
        <MiniStat label="Pending" value={bookings.filter(b => b.status === 'Pending').length} color="orange" />
        <MiniStat label="Completed" value={bookings.filter(b => b.status === 'Confirmed').length} color="green" />
        <MiniStat label="Invoiced" value={`${bookings.reduce((a, c) => a + c.totalPrice, 0)} DH`} color="blue" />
        <MiniStat label="Total" value={bookings.length} color="default" />
      </div>

      {/* --- DESKTOP VIEW: Premium Table (Hidden on Mobile) --- */}
      <div className="hidden lg:block bg-[#151921] border border-slate-800/50 rounded-[2rem] overflow-hidden shadow-2xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-800/50 bg-slate-900/20">
              <th className="p-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">Client Asset</th>
              <th className="p-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">Vehicle ID</th>
              <th className="p-6 text-[10px] font-black text-slate-500 uppercase tracking-widest text-center">Duration</th>
              <th className="p-6 text-[10px] font-black text-slate-500 uppercase tracking-widest text-center">Status</th>
              <th className="p-6 text-[10px] font-black text-slate-500 uppercase tracking-widest text-right">Operations</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/30">
            {bookings.map((res) => (
              <tr key={res.id} className="group hover:bg-slate-800/20 transition-all duration-300">
                <td className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-blue-400 font-bold shadow-inner">
                      {res.clientName.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-white leading-tight">{res.clientName}</p>
                      <p className="text-[10px] text-slate-500 flex items-center gap-1 mt-1 font-medium">
                        <Mail size={10} /> {res.clientEmail}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="p-6">
                  <p className="font-bold text-slate-200 leading-tight">{res.carName}</p>
                  <p className="text-[10px] text-blue-500 font-black flex items-center gap-1 mt-1">
                    <CreditCard size={10} /> {res.totalPrice} DH
                  </p>
                </td>
                <td className="p-6 text-center">
                  <div className="inline-flex items-center gap-2 bg-slate-800/50 px-3 py-1.5 rounded-lg border border-slate-700/50 text-xs font-bold text-slate-400">
                    <Calendar size={12} className="text-blue-500" />
                    {res.startDate} <ChevronRight size={10} /> {res.endDate}
                  </div>
                </td>
                <td className="p-6 text-center">
                  <StatusBadge status={res.status} />
                </td>
                <td className="p-6">
                  <ActionButtons res={res} updateStatus={updateStatus} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* --- MOBILE VIEW: Responsive Cards (Hidden on Desktop) --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:hidden gap-4">
        {bookings.map((res) => (
          <div key={res.id} className="bg-[#151921] border border-slate-800/50 rounded-3xl p-5 shadow-xl relative overflow-hidden">
            <div className="flex justify-between items-start mb-4">
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-blue-400 font-bold shadow-inner shrink-0">
                    {res.clientName.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-white text-sm">{res.clientName}</p>
                    <p className="text-[10px] text-slate-500 font-medium truncate">{res.clientEmail}</p>
                  </div>
               </div>
               <StatusBadge status={res.status} />
            </div>

            <div className="bg-slate-900/50 rounded-xl p-3 mb-4 border border-slate-800/50">
              <p className="font-bold text-slate-200 text-sm mb-1">{res.carName}</p>
              <div className="flex items-center justify-between text-[11px] font-bold">
                <span className="text-slate-400 flex items-center gap-1">
                  <Calendar size={12} className="text-blue-500" /> {res.startDate}
                </span>
                <ChevronRight size={12} className="text-slate-600" />
                <span className="text-slate-400">{res.endDate}</span>
              </div>
            </div>

            <div className="flex items-center justify-between mt-4">
              <p className="text-lg font-black text-white flex items-center gap-1.5">
                 {res.totalPrice} <span className="text-[10px] text-blue-500 uppercase">DH</span>
              </p>
              <ActionButtons res={res} updateStatus={updateStatus} />
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

// Reusable Sub-Components for clean code
const StatusBadge = ({ status }: { status: string }) => (
  <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-widest border ${
    status === 'Confirmed' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 
    status === 'Pending' ? 'bg-orange-500/10 border-orange-500/20 text-orange-400 animate-pulse' : 
    'bg-rose-500/10 border-rose-500/20 text-rose-400'
  }`}>
    <div className={`w-1.5 h-1.5 rounded-full ${status === 'Confirmed' ? 'bg-emerald-400' : 'bg-orange-400'}`} />
    {status}
  </span>
);

const ActionButtons = ({ res, updateStatus }: { res: Reservation, updateStatus: any }) => (
  <div className="flex justify-end gap-2">
    {res.status === 'Pending' ? (
      <>
        <button onClick={() => updateStatus(res.id, 'Confirmed')} className="bg-blue-600 hover:bg-blue-500 text-white p-2 rounded-xl transition-all active:scale-90">
          <Check size={16} strokeWidth={3} />
        </button>
        <button onClick={() => updateStatus(res.id, 'Cancelled')} className="bg-slate-800 hover:bg-rose-500 text-slate-400 hover:text-white p-2 rounded-xl border border-slate-700 transition-all active:scale-90">
          <X size={16} strokeWidth={3} />
        </button>
      </>
    ) : (
      <div className="text-slate-600 p-2"><ArrowUpRight size={16} /></div>
    )}
  </div>
);

const MiniStat = ({ label, value, color }: { label: string, value: string | number, color: string }) => {
  const themes: Record<string, string> = {
    orange: "border-orange-500/20 text-orange-400",
    green: "border-emerald-500/20 text-emerald-400",
    blue: "border-blue-500/20 text-blue-400",
    default: "border-slate-700 text-slate-400",
  };
  return (
    <div className={`p-3 sm:p-4 bg-[#151921] border ${themes[color] || themes.default} rounded-2xl`}>
      <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] opacity-50 mb-1 truncate">{label}</p>
      <p className="text-lg sm:text-xl font-black text-white">{value}</p>
    </div>
  );
};

export default AdminReservations;