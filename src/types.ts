import rangePic from '../asset/range.avif';
import seatLeonPic from '../asset/seat leon.png';
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
    pricePerDay: 1000,
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
    pricePerDay: 600,
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
    pricePerDay: 800,
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
    pricePerDay: 600,
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
    pricePerDay: 900,
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
    name: 'Seat Leon',
    brand: 'SEAT',
    type: 'Sport',
    pricePerDay: 400,
    image: seatLeonPic,
    status: 'Available',
    specs: {
      transmission: 'Automatic',
      fuel: 'Gasoline',
      seats: 5,
      acceleration: '7.5s 0-60'
    },
    features: ['Digital Cockpit', 'Full LED Headlights', 'Lane Assist']
  }
];