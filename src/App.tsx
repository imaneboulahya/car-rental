import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home'; 
import Fleet from './pages/Fleet'; 
import CarDetails from './pages/CarDetails';
import { ThemeProvider } from './context/ThemeContext';
import AdminLayout from './pages/admin/AdminLayout';
import Login from './pages/Login'; 
import Signup from './pages/Signup';

// --- Scroll Restoration ---
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// --- NEW: Layout Wrapper to hide Navbar/Footer on Admin ---
const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith('/admin');

  return (
    <>
      {/* Only show Navbar if we are NOT in the admin section */}
      {!isAdminPath && <Navbar />}
      
      <main className={!isAdminPath ? "min-h-screen" : ""}>
        {children}
      </main>

      {/* Only show Footer if we are NOT in the admin section */}
      {!isAdminPath && <Footer />}
    </>
  );
};

export default function App() {
  return (
    
      <Router>
        <ScrollToTop />
        
        {/* Wrap everything in the LayoutWrapper */}
        <LayoutWrapper>
          <Routes>
            {/* Main Pages */}
            <Route path="/" element={<Home />} />
            <Route path="/fleet" element={<Fleet />} /> 
            
            {/* Authentication Pages */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Dynamic Car Details */}
            <Route path="/car/:id" element={<CarDetails />} />

            {/* Admin Dashboard Route */}
            <Route path="/admin/*" element={<AdminLayout />} />
            
            {/* 404 Catch-all */}
            <Route path="*" element={<Home />} />
          </Routes>
        </LayoutWrapper>
      </Router>
    
  );
}