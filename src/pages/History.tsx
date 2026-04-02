import React, { useEffect, useState } from 'react';
import { Clock, Calendar, ChevronRight, Car, MapPin, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function History() {
  const [bookings, setBookings] = useState([]);

  // 1. Fetch Reservations from Backend
  const loadBookings = () => {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    if (!user || !user.email) return;

    fetch('http://127.0.0.1:8080/api/reservations')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          // Filter by user email on the client side
          const myBookings = data.filter((book: any) => book.clientEmail === user.email);
          
          // Re-map backend fields to match UI expectations
          const formattedBookings = myBookings.map((b: any) => ({
            id: b.id,
            carName: b.carName,
            clientEmail: b.clientEmail,
            dateRange: `${b.startDate} to ${b.endDate}`,
            price: `${b.totalPrice}dh`,
            status: b.status,
            // Fallback image if not in DB (UI will handle missing images)
            image: b.image || "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=800"
          }));

          setBookings(formattedBookings);
        }
      })
      .catch(err => {
        console.error("Failed to load bookings:", err);
        // Fallback to localStorage if API fails
        const allBookings = JSON.parse(localStorage.getItem('luxedrive_bookings') || '[]');
        setBookings(allBookings.filter((book: any) => book.userEmail === user.email));
      });
  };

  useEffect(() => {
    loadBookings();
  }, []);

  // 2. Cancellation Logic
  const handleCancel = (bookingId: string, carName: string) => {
    const confirmCancel = window.confirm(`Are you sure you want to cancel your reservation for the ${carName}?`);
    
    if (confirmCancel) {
      // 1. Delete from Backend Database
      fetch(`http://127.0.0.1:8080/api/reservations/${bookingId}`, {
        method: 'DELETE',
      })
      .then(async (response) => {
        const data = await response.json();
        if (response.ok) {
          // 2. Also update localStorage for consistency
          const allBookings = JSON.parse(localStorage.getItem('luxedrive_bookings') || '[]');
          const updatedAllBookings = allBookings.filter((book: any) => book.id !== bookingId);
          localStorage.setItem('luxedrive_bookings', JSON.stringify(updatedAllBookings));
          
          alert("Your reservation has been canceled.");
          loadBookings(); // Refresh the list from the database
        } else {
          alert(`Error: ${data.error || "Could not cancel reservation."}`);
        }
      })
      .catch(err => {
        console.error("Cancellation error:", err);
        alert("Server error: Could not reach the database.");
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] pt-32 pb-20 px-6 text-white font-sans">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold flex items-center gap-4">
            <div className="p-3 bg-blue-600/20 rounded-2xl border border-blue-500/30">
              <Clock className="text-[#00d2ff]" size={28} />
            </div>
            My <span className="text-[#00d2ff] italic">Journey</span> History
          </h1>
          <p className="text-slate-400 mt-4 max-w-lg text-sm uppercase tracking-widest font-semibold opacity-70">
            View and manage your elite vehicle reservations
          </p>
        </div>

        {bookings.length > 0 ? (
          <div className="grid gap-6">
            {bookings.map((book: any) => (
              <div 
                key={book.id} 
                className="group bg-[#0f172a] border border-white/5 rounded-[2.5rem] p-4 md:p-6 flex flex-col md:flex-row items-center gap-8 hover:border-[#00d2ff]/30 transition-all duration-500 shadow-2xl relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 blur-[60px] -mr-16 -mt-16 group-hover:bg-blue-600/10 transition-colors" />
                
                <div className="w-full md:w-56 h-36 bg-slate-800 rounded-[1.5rem] overflow-hidden relative">
                  <img src={book.image} alt={book.carName} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/80 to-transparent" />
                </div>

                <div className="flex-1 w-full text-center md:text-left">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-[#00d2ff] transition-colors">
                        {book.carName}
                      </h3>
                      <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 mt-2 text-slate-400">
                        <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider">
                          <Calendar size={14} className="text-blue-500" /> {book.dateRange}
                        </span>
                        <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider">
                          <MapPin size={14} className="text-blue-500" /> Premium Delivery
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col items-center md:items-end gap-2">
                      <div className="px-4 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400">{book.status}</span>
                      </div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-black text-white">{book.price}</span>
                        <span className="text-slate-500 text-[10px] uppercase font-bold tracking-widest">Total</span>
                      </div>
                      
                      {/* --- CANCEL BUTTON --- */}
                      <button 
                        onClick={() => handleCancel(book.id, book.carName)}
                        className="mt-2 flex items-center gap-2 text-rose-500 hover:text-rose-400 transition-colors text-[10px] font-bold uppercase tracking-widest group/btn"
                      >
                        <Trash2 size={14} className="group-hover/btn:animate-pulse" />
                        Cancel Booking
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-24 text-center bg-[#0f172a] rounded-[3rem] border border-white/5 border-dashed relative overflow-hidden">
            <div className="absolute inset-0 bg-blue-600/5 blur-[120px]" />
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mb-6 border border-white/10">
                <Car className="text-slate-600" size={40} />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">No active journeys found</h2>
              <p className="text-slate-400 mb-8 max-w-xs mx-auto text-sm">Your luxury driving history is empty. Time to get behind the wheel.</p>
              <Link to="/fleet" className="bg-[#00d2ff] text-[#020617] px-10 py-4 rounded-full font-black text-xs uppercase tracking-[0.2em] hover:scale-105 transition-transform shadow-[0_0_30px_rgba(0,210,255,0.3)]">
                Explore the Fleet
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}