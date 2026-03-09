import React from 'react';
import { CARS } from '../../types';
import { Plus, Edit3, Trash2, Users, Fuel, GaugeCircle } from 'lucide-react';

const AdminCars = () => {
  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight">Vehicle Management</h1>
          <p className="text-slate-500 text-sm mt-1">Real-time status of your luxury fleet.</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-2xl font-bold text-sm transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)] flex items-center gap-2">
          <Plus size={18} /> Add New Asset
        </button>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <DarkStatCard label="Total Fleet" value={CARS.length} trend="+2 this month" />
        <DarkStatCard label="Live Rentals" value={CARS.filter(c => c.status === 'Rented').length} color="orange" />
        <DarkStatCard label="Available" value={CARS.filter(c => c.status === 'Available').length} color="green" />
      </div>

      {/* Cars Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {CARS.map((car) => (
          <div key={car.id} className="bg-[#151921] border border-slate-800/50 rounded-[2rem] overflow-hidden hover:border-slate-700 transition-all group shadow-2xl">
            <div className="flex flex-col sm:flex-row">
              {/* Image */}
              <div className="relative w-full sm:w-48 h-48 sm:h-auto overflow-hidden">
                <img src={car.image} className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-500" />
                <div className="absolute top-4 left-4">
                  <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-md border ${
                    car.status === 'Available' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-orange-500/10 border-orange-500/20 text-orange-400'
                  } text-[10px] font-black uppercase tracking-widest`}>
                    <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${car.status === 'Available' ? 'bg-emerald-400' : 'bg-orange-400'}`} />
                    {car.status}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 p-6 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-blue-500 text-[10px] font-black uppercase tracking-widest mb-1 block">{car.brand}</span>
                      <h3 className="text-xl font-bold text-white">{car.name}</h3>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-black text-white">{car.pricePerDay} DH</p>
                      <p className="text-[10px] text-slate-500 uppercase">Per Day</p>
                    </div>
                  </div>

                  <div className="flex gap-4 mt-4">
                    <Spec icon={<Users size={12}/>} value={car.specs.seats} />
                    <Spec icon={<Fuel size={12}/>} value={car.specs.fuel} />
                    <Spec icon={<GaugeCircle size={12}/>} value={car.specs.transmission} />
                  </div>
                </div>

                <div className="flex justify-between items-center mt-6 pt-4 border-t border-slate-800/50">
                   <button className="text-slate-500 hover:text-blue-400 transition-colors"><Edit3 size={16}/></button>
                   <button className="text-slate-500 hover:text-rose-400 transition-colors"><Trash2 size={16}/></button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const DarkStatCard = ({ label, value, trend, color }: any) => (
  <div className="bg-[#151921] border border-slate-800/50 p-6 rounded-3xl relative overflow-hidden">
    <div className={`absolute top-0 left-0 w-1 h-full ${color === 'green' ? 'bg-emerald-500' : color === 'orange' ? 'bg-orange-500' : 'bg-blue-500'} opacity-50`} />
    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{label}</p>
    <div className="flex items-end gap-3">
      <p className="text-3xl font-black text-white">{value}</p>
      {trend && <span className="text-[10px] text-emerald-400 mb-1 font-bold">{trend}</span>}
    </div>
  </div>
);

const Spec = ({ icon, value }: any) => (
  <div className="flex items-center gap-1.5 text-slate-400 text-xs font-medium bg-slate-800/30 px-2 py-1 rounded-lg border border-slate-700/50">
    {icon} <span>{value}</span>
  </div>
);

export default AdminCars;