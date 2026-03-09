import React, { useState } from 'react';
import { Reservation } from '../../types';
import { 
  Check, 
  X, 
  Clock, 
  Mail, 
  User, 
  Calendar, 
  CreditCard, 
  ChevronRight,
  ArrowUpRight
} from 'lucide-react';

const AdminReservations = () => {
  const [bookings, setBookings] = useState<Reservation[]>([
    {
      id: 'RES-001',
      carId: '2',
      carName: 'Porsche 911 Carrera',
      clientName: 'Ayoub Designer',
      clientEmail: 'ayoub@example.com',
      startDate: '2026-03-12',
      endDate: '2026-03-15',
      totalPrice: 1350,
      status: 'Pending',
      createdAt: '2026-03-08'
    }
  ]);

  const updateStatus = (id: string, newStatus: 'Confirmed' | 'Cancelled') => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status: newStatus } : b));
  };

  return (
    <div className="max-w-7xl mx-auto animate-in fade-in duration-700">
      {/* --- HEADER --- */}
      <div className="mb-10">
        <h1 className="text-3xl font-black text-white tracking-tight">Booking <span className="text-blue-500">Orders</span></h1>
        <p className="text-slate-500 text-sm mt-1 font-medium">Manage and authorize incoming rental requests.</p>
      </div>

      {/* --- STATS OVERVIEW --- */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <MiniStat label="Pending" value={bookings.filter(b => b.status === 'Pending').length} color="orange" />
        <MiniStat label="Completed" value={bookings.filter(b => b.status === 'Confirmed').length} color="green" />
        <MiniStat label="Invoiced" value={`${bookings.reduce((a, c) => a + c.totalPrice, 0)} DH`} color="blue" />
        <MiniStat label="Total Volume" value={bookings.length} color="default" />
      </div>

      {/* --- DATA TABLE CONTAINER --- */}
      <div className="bg-[#151921] border border-slate-800/50 rounded-[2rem] overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
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
                  {/* CLIENT */}
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

                  {/* VEHICLE */}
                  <td className="p-6">
                    <p className="font-bold text-slate-200 leading-tight">{res.carName}</p>
                    <p className="text-[10px] text-blue-500 font-black flex items-center gap-1 mt-1">
                      <CreditCard size={10} /> {res.totalPrice} DH
                    </p>
                  </td>

                  {/* DATES */}
                  <td className="p-6 text-center">
                    <div className="inline-flex items-center gap-2 bg-slate-800/50 px-3 py-1.5 rounded-lg border border-slate-700/50 text-xs font-bold text-slate-400">
                      <Calendar size={12} className="text-blue-500" />
                      {res.startDate} <ChevronRight size={10} /> {res.endDate}
                    </div>
                  </td>

                  {/* STATUS */}
                  <td className="p-6 text-center">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                      res.status === 'Confirmed' 
                      ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' 
                      : res.status === 'Pending' 
                      ? 'bg-orange-500/10 border-orange-500/20 text-orange-400 animate-pulse' 
                      : 'bg-rose-500/10 border-rose-500/20 text-rose-400'
                    }`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${res.status === 'Confirmed' ? 'bg-emerald-400' : 'bg-orange-400'}`} />
                      {res.status}
                    </span>
                  </td>

                  {/* ACTIONS */}
                  <td className="p-6">
                    <div className="flex justify-end gap-2">
                      {res.status === 'Pending' ? (
                        <>
                          <button 
                            onClick={() => updateStatus(res.id, 'Confirmed')}
                            className="bg-blue-600 hover:bg-blue-500 text-white p-2.5 rounded-xl transition-all shadow-[0_0_15px_rgba(59,130,246,0.3)] active:scale-90"
                          >
                            <Check size={16} strokeWidth={3} />
                          </button>
                          <button 
                            onClick={() => updateStatus(res.id, 'Cancelled')}
                            className="bg-slate-800 hover:bg-rose-500 text-slate-400 hover:text-white p-2.5 rounded-xl border border-slate-700 transition-all active:scale-90"
                          >
                            <X size={16} strokeWidth={3} />
                          </button>
                        </>
                      ) : (
                        <div className="text-slate-600 p-2.5">
                          <ArrowUpRight size={18} />
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Internal Dark MiniStat Component
const MiniStat = ({ label, value, color }: { label: string, value: string | number, color: string }) => {
  const themes: Record<string, string> = {
    orange: "border-orange-500/20 text-orange-400",
    green: "border-emerald-500/20 text-emerald-400",
    blue: "border-blue-500/20 text-blue-400",
    default: "border-slate-700 text-slate-400",
  };
  return (
    <div className={`p-4 bg-[#151921] border ${themes[color] || themes.default} rounded-2xl`}>
      <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-50 mb-1">{label}</p>
      <p className="text-xl font-black text-white">{value}</p>
    </div>
  );
};

export default AdminReservations;