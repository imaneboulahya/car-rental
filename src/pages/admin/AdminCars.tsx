import React, { useState, useEffect } from 'react';
import { CARS } from '../../types';
import { Plus, Edit3, Trash2, Users, Fuel, GaugeCircle, X, UploadCloud } from 'lucide-react';

const AdminCars = () => {
  // 1. Initialize State
  const [cars, setCars] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingCar, setEditingCar] = useState<any>(null);

  // 2. Fetch Cars from API
  const fetchCars = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8080/api/cars');
      const data = await response.json();
      if (response.ok) setCars(data);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  // 3. Add Handler
  const handleAddCar = async (newCar: any) => {
    try {
      const response = await fetch('http://127.0.0.1:8080/api/cars', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCar)
      });
      if (response.ok) {
        await fetchCars(); // Refresh list
        setIsAddModalOpen(false);
      }
    } catch (error) {
      alert("Failed to add car");
    }
  };

  // 4. Edit Handler
  const handleEditCar = async (updatedCar: any) => {
    try {
      const response = await fetch(`http://127.0.0.1:8080/api/cars/${updatedCar.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedCar)
      });
      if (response.ok) {
        await fetchCars(); // Refresh list
        setEditingCar(null);
      }
    } catch (error) {
      alert("Failed to update car");
    }
  };

  // 5. Delete Handler
  const handleDeleteCar = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this asset?")) {
      try {
        const response = await fetch(`http://127.0.0.1:8080/api/cars/${id}`, {
          method: 'DELETE'
        });
        if (response.ok) {
          await fetchCars(); // Refresh list
        }
      } catch (error) {
        alert("Failed to delete car");
      }
    }
  };

  const handleResetFleet = () => {
    if (window.confirm('This action is disabled when using the database. Add/Delete cars individually.')) {
      // Logic for reset could be a 're-seed' API calls if requested
    }
  };

  return (
    <div className="animate-in fade-in duration-700 relative">

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 sm:mb-12">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Vehicle Management</h1>
          <p className="text-slate-500 text-sm mt-1">Real-time status of your luxury fleet.</p>
        </div>
        <div className="flex w-full sm:w-auto gap-3">
          <button
            onClick={handleResetFleet}
            className="flex-1 sm:flex-none px-4 py-3 rounded-2xl font-bold text-sm transition-all text-slate-400 bg-slate-800/50 hover:bg-slate-800 hover:text-white"
          >
            Reset
          </button>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex-[2] sm:flex-none bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-2xl font-bold text-sm transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)] flex items-center justify-center gap-2 active:scale-95"
          >
            <Plus size={18} /> Add New Asset
          </button>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 sm:mb-10">
        <DarkStatCard label="Total Fleet" value={cars.length} trend="Live Tracking" />
        <DarkStatCard label="Live Rentals" value={cars.filter((c: any) => c.status === 'Rented').length} color="orange" />
        <DarkStatCard label="Available" value={cars.filter((c: any) => c.status === 'Available').length} color="green" />
      </div>

      {/* Cars Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        {cars.map((car: any) => {
          // Graceful fallback values to prevent errors
          const displayPrice = car.pricePerDay || parseFloat((car.price || '0').toString().replace(/[^0-9.]/g, ''));
          const displaySeats = car.specs?.seats || car.seats || '4';
          const displayFuel = car.specs?.fuel || car.engine || 'Petrol';
          const displayTrans = car.specs?.transmission || car.trans || 'Auto';

          return (
            <div key={car.id} className="bg-[#151921] border border-slate-800/50 rounded-[2rem] overflow-hidden hover:border-slate-700 transition-all group shadow-2xl flex flex-col sm:flex-row">

              {/* Image Container */}
              <div className="relative w-full sm:w-48 h-56 sm:h-auto overflow-hidden shrink-0 bg-slate-900">
                <img 
                  src={car.image.startsWith('http') || car.image.startsWith('data:') ? car.image : `http://127.0.0.1:8080${car.image}`} 
                  className="absolute inset-0 w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-500" 
                  alt={car.name} 
                />
                <div className="absolute top-4 left-4">
                  <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-md border ${car.status === 'Available' ? 'bg-emerald-500/20 border-emerald-500/30 text-emerald-400' : 'bg-orange-500/20 border-orange-500/30 text-orange-400'
                    } text-[10px] font-black uppercase tracking-widest`}>
                    <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${car.status === 'Available' ? 'bg-emerald-400' : 'bg-orange-400'}`} />
                    {car.status || 'Available'}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 p-5 sm:p-6 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-4 sm:mb-0">
                    <div className="pr-4">
                      <span className="text-blue-500 text-[10px] font-black uppercase tracking-widest mb-1 block">{car.brand || 'Luxury'}</span>
                      <h3 className="text-lg sm:text-xl font-bold text-white leading-tight">{car.name}</h3>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-lg sm:text-xl font-black text-white">{displayPrice} DH</p>
                      <p className="text-[9px] sm:text-[10px] text-slate-500 uppercase">Per Day</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 sm:gap-4 mt-4">
                    <Spec icon={<Users size={12} />} value={displaySeats} />
                    <Spec icon={<Fuel size={12} />} value={displayFuel} />
                    <Spec icon={<GaugeCircle size={12} />} value={displayTrans} />
                  </div>
                </div>

                {/* --- ACTION BUTTONS UPDATED HERE --- */}
                <div className="flex justify-end gap-4 mt-6 pt-4 border-t border-slate-800/50">
                  <button
                    onClick={() => setEditingCar(car)}
                    className="text-slate-500 hover:text-blue-400 transition-colors bg-slate-800/30 p-2 rounded-lg border border-slate-700/50 hover:border-blue-500/30"
                  >
                    <Edit3 size={16} />
                  </button>
                  <button
                    onClick={() => handleDeleteCar(car.id)}
                    className="text-slate-500 hover:text-rose-400 transition-colors bg-slate-800/30 p-2 rounded-lg border border-slate-700/50 hover:border-rose-500/30"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* Render Add Modal */}
      {isAddModalOpen && (
        <CarFormModal
          onClose={() => setIsAddModalOpen(false)}
          onSubmit={handleAddCar}
        />
      )}

      {/* Render Edit Modal (passes initialData down) */}
      {editingCar && (
        <CarFormModal
          initialData={editingCar}
          onClose={() => setEditingCar(null)}
          onSubmit={handleEditCar}
        />
      )}
    </div>
  );
};

// --- SMART FORM MODAL (Handles both Add and Edit) ---
const CarFormModal = ({ onClose, onSubmit, initialData }: { onClose: () => void, onSubmit: (car: any) => void, initialData?: any }) => {

  // If initialData exists (Edit mode), populate the form. Otherwise (Add mode), leave it empty.
  const [formData, setFormData] = useState(() => {
    if (initialData) {
      return {
        brand: initialData.brand || '',
        name: initialData.name || '',
        type: initialData.type || 'Sports',
        pricePerDay: initialData.pricePerDay || parseFloat((initialData.price || '0').toString().replace(/[^0-9.]/g, '')),
        image: initialData.image || '',
        seats: initialData.specs?.seats || initialData.seats || '2',
        fuel: initialData.specs?.fuel || initialData.engine || 'Petrol',
        transmission: initialData.specs?.transmission || initialData.trans || 'Automatic',
        acceleration: initialData.specs?.acceleration || '0-100 in 3.0s'
      };
    }
    return {
      brand: '', name: '', type: 'Sports', pricePerDay: '', image: '',
      seats: '2', fuel: 'Petrol', transmission: 'Automatic', acceleration: '0-100 in 3.0s'
    };
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => { setFormData({ ...formData, image: reader.result as string }); };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const submittedCar = {
      // If editing, keep the old ID. If adding, generate a new one.
      id: initialData ? initialData.id : Math.random().toString(36).substr(2, 9),
      brand: formData.brand,
      name: formData.name,
      type: formData.type,
      pricePerDay: Number(formData.pricePerDay),
      image: formData.image || 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&q=80',
      status: initialData ? initialData.status : 'Available', // Preserve rented status if editing
      specs: {
        seats: formData.seats,
        fuel: formData.fuel,
        transmission: formData.transmission,
        acceleration: formData.acceleration
      }
    };

    onSubmit(submittedCar);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#0B0E14]/80 backdrop-blur-sm animate-in fade-in">
      <div className="bg-[#151921] border border-slate-800 rounded-[2rem] shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto [&::-webkit-scrollbar]:hidden">

        <div className="sticky top-0 bg-[#151921]/90 backdrop-blur-xl border-b border-slate-800/50 px-6 py-5 flex justify-between items-center z-10">
          <div>
            <h2 className="text-xl font-black text-white">{initialData ? 'Update Asset' : 'Add New Asset'}</h2>
            <p className="text-xs text-slate-500 mt-1">
              {initialData ? 'Modify the details of this vehicle.' : 'Register a new vehicle to your fleet.'}
            </p>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl transition-all">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-8">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Vehicle Photography</p>
            <label className="relative flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-slate-700 hover:border-blue-500 hover:bg-blue-500/5 rounded-[1.5rem] cursor-pointer transition-all overflow-hidden group">
              {formData.image ? (
                <>
                  <img src={formData.image} alt="Preview" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-30 transition-opacity" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Edit3 size={32} className="text-white mb-2" />
                    <span className="text-sm font-bold text-white">Change Image</span>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <UploadCloud size={32} className="text-slate-500 mb-3 group-hover:text-blue-400 transition-colors" />
                  <p className="text-sm font-bold text-slate-300"><span className="text-blue-500">Click to upload</span> or drag and drop</p>
                  <p className="text-xs text-slate-500 mt-1">High-res PNG, JPG or WEBP (MAX. 5MB)</p>
                </div>
              )}
              <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 border-b border-slate-800 pb-2">Primary Info</p>
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">Brand</label>
                <input required type="text" placeholder="e.g. Ferrari" className="w-full bg-[#0B0E14] border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-sm" value={formData.brand} onChange={(e) => setFormData({ ...formData, brand: e.target.value })} />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">Model Name</label>
                <input required type="text" placeholder="e.g. 911 GT3 RS" className="w-full bg-[#0B0E14] border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-sm" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Category</label>
                  <select className="w-full bg-[#0B0E14] border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-all text-sm appearance-none" value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })}>
                    <option>Sports</option><option>Luxury</option><option>SUV</option><option>Compact SUV</option><option>Luxury Sedan</option><option>Luxury SUV</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Price / Day (DH)</label>
                  <input required type="number" placeholder="1500" className="w-full bg-[#0B0E14] border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-all text-sm" value={formData.pricePerDay} onChange={(e) => setFormData({ ...formData, pricePerDay: e.target.value })} />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 border-b border-slate-800 pb-2">Technical Specs</p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Seats</label>
                  <input required type="text" placeholder="2" className="w-full bg-[#0B0E14] border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-all text-sm" value={formData.seats} onChange={(e) => setFormData({ ...formData, seats: e.target.value })} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Fuel Type</label>
                  <input required type="text" placeholder="e.g. Petrol" className="w-full bg-[#0B0E14] border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-all text-sm" value={formData.fuel} onChange={(e) => setFormData({ ...formData, fuel: e.target.value })} />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">Transmission</label>
                <input required type="text" placeholder="e.g. Automatic" className="w-full bg-[#0B0E14] border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-all text-sm" value={formData.transmission} onChange={(e) => setFormData({ ...formData, transmission: e.target.value })} />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">Acceleration</label>
                <input required type="text" placeholder="e.g. 0-100 in 3.2s" className="w-full bg-[#0B0E14] border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-all text-sm" value={formData.acceleration} onChange={(e) => setFormData({ ...formData, acceleration: e.target.value })} />
              </div>
            </div>
          </div>

          <div className="mt-10 flex gap-4">
            <button type="button" onClick={onClose} className="flex-1 px-6 py-4 rounded-xl font-bold text-slate-400 bg-slate-800/50 hover:bg-slate-800 hover:text-white transition-all">Cancel</button>
            <button type="submit" className="flex-[2] bg-blue-600 hover:bg-blue-500 text-white px-6 py-4 rounded-xl font-bold transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)]">
              {initialData ? 'Save Changes' : 'Confirm & Add Asset'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ... Sub-components remain the same ...
const DarkStatCard = ({ label, value, trend, color }: any) => (
  <div className="bg-[#151921] border border-slate-800/50 p-5 sm:p-6 rounded-3xl relative overflow-hidden">
    <div className={`absolute top-0 left-0 w-1 h-full ${color === 'green' ? 'bg-emerald-500' : color === 'orange' ? 'bg-orange-500' : 'bg-blue-500'} opacity-50`} />
    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{label}</p>
    <div className="flex flex-col sm:flex-row sm:items-end gap-1 sm:gap-3">
      <p className="text-2xl sm:text-3xl font-black text-white">{value}</p>
      {trend && <span className="text-[10px] text-emerald-400 sm:mb-1 font-bold">{trend}</span>}
    </div>
  </div>
);

const Spec = ({ icon, value }: any) => (
  <div className="flex items-center gap-1.5 text-slate-400 text-[10px] sm:text-xs font-medium bg-slate-800/30 px-2 py-1 rounded-lg border border-slate-700/50 truncate max-w-[120px]">
    {icon} <span className="truncate">{value}</span>
  </div>
);

export default AdminCars;