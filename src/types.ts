import rangePic from '../asset/range.avif';
import trocPic from '../asset/troc.jpeg';
import benzPic from '../asset/benz.jpeg';
import tucsonPic from '../asset/tucson.jpeg';
import golfPic from '../asset/golf.jpg';
import clioPic from '../asset/clio.jpg';
import logoPic from '../asset/logo.jpeg'; // Ensure this path is correct based on your folder structure
// --- INTERFACES ---

export interface Car {
  id: string;
  name: string;
  brand: string;
  type: 'Luxury' | 'Sport' | 'SUV' | 'Electric' | 'Performance';
  pricePerDay: number;
  image: string;
  specs: {
    transmission: string;
    fuel: string;
    seats: number;
    acceleration?: string;
  };
  features: string[];
  // Admin Specific Fields
  status: 'Available' | 'Rented' | 'Maintenance';
  nextAvailableDate?: string; // Point #2: Shown when status is 'Rented'
}

export interface Reservation {
  id: string;
  carId: string;
  carName: string;
  clientName: string;
  clientEmail: string;
  startDate: string;
  endDate: string;
  totalPrice: number;
  status: 'Pending' | 'Confirmed' | 'Cancelled'; // Point #3 & #4
  createdAt: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  avatar: string;
}

// --- MOCK DATA ---

export const CARS: Car[] = [
  {
    id: '1',
    name: 'Range Rover SV',
    brand: 'Land Rover',
    type: 'Sport',
    pricePerDay: 250,
    image: rangePic,
    status: 'Available',
    specs: {
      transmission: 'Automatic',
      fuel: 'Electric',
      seats: 5,
      acceleration: '1.99s 0-60'
    },
    features: ['Autopilot', 'Ludicrous Mode', 'Premium Audio']
  },
  {
    id: '2',
    name: 'Volkswagen T-Roc',
    brand: 'Volkswagen',
    type: 'Sport',
    pricePerDay: 450,
    image: trocPic,
    status: 'Rented',
    nextAvailableDate: '2026-03-15',
    specs: {
      transmission: 'PDK',
      fuel: 'Gasoline',
      seats: 2,
      acceleration: '3.2s 0-60'
    },
    features: ['Sport Chrono', 'PASM', 'Bose Sound']
  },
  {
    id: '3',
    name: 'G-Wagon G63',
    brand: 'Mercedes',
    type: 'SUV',
    pricePerDay: 600,
    image: benzPic,
    status: 'Available',
    specs: {
      transmission: 'Automatic',
      fuel: 'Gasoline',
      seats: 5,
      acceleration: '4.5s 0-60'
    },
    features: ['V8 Biturbo', 'Luxury Interior', 'Off-road Mode']
  },
  {
    id: '4',
    name: 'Hundai Tucson N Line',
    brand: 'Hundai',
    type: 'Luxury',
    pricePerDay: 1200,
    image: tucsonPic,
    status: 'Available',
    specs: {
      transmission: 'Automatic',
      fuel: 'Gasoline',
      seats: 4,
      acceleration: '5.1s 0-60'
    },
    features: ['Starlight Headliner', 'Whisper Quiet', 'Bespoke Audio']
  },
  {
    id: '5',
    name: 'golf 8r',
    brand: 'Volkswagen',
    type: 'Sport',
    pricePerDay: 400,
    image: golfPic,
    status: 'Maintenance',
    specs: {
      transmission: 'Automatic',
      fuel: 'diesel',
      seats: 4,
      acceleration: '2.6s 0-60'
    },
    features: ['Performance Battery Plus', 'Sport Sound', 'Panoramic Roof']
  },
  {
    id: '6',
    name: 'Range Rover SV',
    brand: 'Land Rover',
    type: 'SUV',
    pricePerDay: 550,
    image: 'https://images.unsplash.com/photo-1606611013016-969c19ba27bb?auto=format&fit=crop&q=80&w=800',
    status: 'Available',
    specs: {
      transmission: 'Automatic',
      fuel: 'Hybrid',
      seats: 5,
      acceleration: '5.5s 0-60'
    },
    features: ['Executive Seating', 'Terrain Response 2', 'Meridian Signature']
  }
];