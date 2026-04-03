import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { X, ArrowRight, Shield, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Assets
import trocPic from '../../asset/troc.jpeg';
import benzPic from '../../asset/benz.jpeg';
import tucsonPic from '../../asset/tucson.jpeg';
import rangePic from '../../asset/range.avif';

const FLEET = [
  { id: 'vw-troc', name: 'Volkswagen T-Roc R-Line', year: '2023', price: '450dh', type: 'Compact SUV', engine: '2.0L TSI 4Motion', trans: '7-Speed DSG', seats: '5', image: trocPic },
  { id: 'mercedes-benz', name: 'Mercedes-Benz S-Class', year: '2023', price: '1,800dh', type: 'Luxury Sedan', engine: '3.0L I6 Turbo', trans: '9G-Tronic', seats: '5', image: benzPic },
  { id: 'hyundai-tucson', name: 'Hyundai Tucson N Line', year: '2024', price: '500dh', type: 'SUV', engine: '1.6L Hybrid', trans: '6-Speed Auto', seats: '5', image: tucsonPic },
  { id: 'range-rover', name: 'Range Rover Autobiography', year: '2023', price: '2,500dh', type: 'Luxury SUV', engine: '4.4L V8 Turbo', trans: '8-Speed Auto', seats: '5', image: rangePic }
];

export default function Fleet() {
  const [selectedCar, setSelectedCar] = useState<any>(null);
  const navigate = useNavigate();

  const [fleetData, setFleetData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://127.0.0.1:8080/api/cars')
      .then(res => res.json())
      .then(data => {
        setFleetData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch fleet:", err);
        setLoading(false);
      });
  }, []);

  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!loading && fleetData.length > 0) {
      let ctx = gsap.context(() => {
        gsap.fromTo(".reveal",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, stagger: 0.05, duration: 0.4, ease: "power2.out" }
        );
      });
      return () => ctx.revert();
    }
  }, [loading, fleetData]);

  return (
    <div className="min-h-screen bg-[#020617] text-white pt-32 pb-20 px-6 font-sans">
      <div className="max-w-7xl mx-auto mb-16 text-center reveal" style={{ opacity: 0 }}>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 text-white">
          The <span className="text-[#00d2ff] italic">Elite</span> Collection
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto font-light">
          Precision-engineered performance. Select a vehicle to view detailed specifications and availability.
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00d2ff]"></div>
        </div>
      ) : (
        <div ref={gridRef} className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.isArray(fleetData) && fleetData.map((car: any) => {
            const displayPrice = car.price || `${car.pricePerDay}dh`;
            const displayEngine = car.specs?.fuel || car.engine || 'Petrol';
            const displayTrans = car.specs?.transmission || car.trans || 'Auto';
            const displaySeats = car.specs?.seats || car.seats || '4';

            return (
              <div
                key={car.id}
                onClick={() => setSelectedCar({ ...car, displayPrice })}
                style={{ opacity: 0 }}
                className="reveal group bg-[#0f172a] border border-white/10 rounded-2xl overflow-hidden hover:border-[#00d2ff]/50 transition-all duration-300 cursor-pointer flex flex-col shadow-lg hover:-translate-y-1"
              >
                <div className="relative h-56 overflow-hidden bg-slate-800">
                <img 
                  src={car.image?.startsWith('http') || car.image?.startsWith('data:') ? car.image : `http://127.0.0.1:8080${car.image}`} 
                  alt={car.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent opacity-80" />
              </div>
                <div className="p-6 flex-1 flex flex-col z-10 -mt-2">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-[#00d2ff] transition-colors">{car.name}</h3>
                      <p className="text-xs text-slate-400 uppercase tracking-widest mt-1 font-semibold">{car.type} • {car.year || '2024'}</p>
                    </div>
                    <div className="bg-white/5 p-2 rounded-lg border border-white/10">
                      <Shield size={16} className="text-[#00d2ff]" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-4 py-4 border-t border-white/10">
                    <SpecRow label="Powertrain" value={displayEngine} />
                    <SpecRow label="Transmission" value={displayTrans} />
                    <SpecRow label="Body Type" value={car.type} />
                    <SpecRow label="Seating" value={`${displaySeats} Adults`} />
                  </div>
                  <div className="mt-auto pt-6 border-t border-white/10 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Starting at</p>
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-bold text-white">{displayPrice}</span>
                        <span className="text-slate-500 text-xs">/day</span>
                      </div>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-[#00d2ff] flex items-center justify-center text-[#020617] transition-transform duration-300 group-hover:scale-110 shadow-[0_0_15px_rgba(0,210,255,0.4)]">
                      <ArrowRight size={20} strokeWidth={3} />
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
      {selectedCar && <BookingModal car={selectedCar} onClose={() => setSelectedCar(null)} />}
    </div>
  );
}

function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-[10px] uppercase font-bold text-slate-500 tracking-tighter">{label}</span>
      <span className="text-[13px] font-medium text-slate-200 truncate">{value}</span>
    </div>
  );
}

function BookingModal({ car, onClose }: { car: any, onClose: () => void }) {
  const navigate = useNavigate();
  const [dates, setDates] = useState({ pickUp: '', dropOff: '' });

  const handleReservation = () => {
    const user = JSON.parse(localStorage.getItem('user') || 'null');

    if (!user) {
      alert("Please login to complete your reservation.");
      navigate('/login');
      return;
    }

    if (!dates.pickUp || !dates.dropOff) {
      alert("Please select your dates.");
      return;
    }

    const reservationData = {
      carName: car.name,
      clientName: user.username || user.email,
      clientEmail: user.email,
      startDate: dates.pickUp,
      endDate: dates.dropOff,
      totalPrice: car.displayPrice,
      carImage: car.image
    };

    // CALL BACKEND API TO SAVE IN DATABASE
    fetch('http://127.0.0.1:8080/api/reservations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reservationData)
    })
      .then(async (response) => {
        const data = await response.json();
        if (response.ok) {
          // ALSO KEEP IN LOCAL STORAGE FOR INSTANT UI UPDATES OR AS CACHE
          const newBooking = {
            id: data.id,
            userEmail: user.email,
            carName: car.name,
            image: car.image,
            dateRange: `${dates.pickUp} to ${dates.dropOff}`,
            price: car.displayPrice,
            status: 'Pending'
          };
          const existingHistory = JSON.parse(localStorage.getItem('luxedrive_bookings') || '[]');
          localStorage.setItem('luxedrive_bookings', JSON.stringify([newBooking, ...existingHistory]));

          alert(`Success! Your ${car.name} is reserved.`);
          onClose();
          navigate('/history');
        } else {
          alert(`Error: ${data.details || "Could not save reservation."}`);
        }
      })
      .catch(err => {
        console.error("Booking error:", err);
        alert("Backend error: Could not reach the server.");
      });
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-[#0f172a] border border-white/10 w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row animate-in fade-in zoom-in duration-200">
        <div className="md:w-1/2 relative h-64 md:h-auto">
          <img src={car.image} className="w-full h-full object-cover" alt={car.name} />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0f172a]" />
          <button onClick={onClose} className="absolute top-4 left-4 p-2 bg-black/50 text-white rounded-full hover:bg-[#00d2ff] hover:text-black transition-all">
            <X size={20} />
          </button>
        </div>
        <div className="flex-1 p-10">
          <h2 className="text-3xl font-bold text-white mb-2">{car.name}</h2>
          <p className="text-[#00d2ff] text-sm font-bold uppercase tracking-widest mb-8 flex items-center gap-2">
            <Zap size={14} /> Full Insurance Coverage Included
          </p>
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
              <label className="block text-[10px] uppercase font-bold text-slate-400 mb-2">Pick-Up</label>
              <input
                type="date"
                onChange={(e) => setDates({ ...dates, pickUp: e.target.value })}
                className="bg-transparent text-white text-sm outline-none w-full [color-scheme:dark]"
              />
            </div>
            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
              <label className="block text-[10px] uppercase font-bold text-slate-400 mb-2">Drop-Off</label>
              <input
                type="date"
                onChange={(e) => setDates({ ...dates, dropOff: e.target.value })}
                className="bg-transparent text-white text-sm outline-none w-full [color-scheme:dark]"
              />
            </div>
          </div>
          <button
            onClick={handleReservation}
            className="w-full py-4 bg-[#00d2ff] text-[#020617] rounded-xl font-black text-sm uppercase tracking-widest hover:brightness-110 hover:scale-[1.02] transition-transform duration-200 flex justify-center gap-2"
          >
            Reserve For {car.displayPrice}
          </button>
          <p className="text-center text-slate-500 text-[11px] mt-4 italic">No payment required until collection.</p>
        </div>
      </div>
    </div>
  );
}