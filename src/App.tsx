import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import NavClients from './components/NavClients'; // Import the new Navbar
import Footer from './components/Footer';
import Home from './pages/Home'; 
import Fleet from './pages/Fleet'; 
import CarDetails from './pages/CarDetails';
import AdminLayout from './pages/admin/AdminLayout';
import Login from './pages/Login'; 
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import History from './pages/History'; 

function ScrollToTop() {
  const { pathname } = useLocation();
  
  React.useLayoutEffect(() => {
    // Reset scroll to top instantly
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant' as ScrollBehavior, // Force instant scroll
    });
    
    // Fallback for document element
    if (document.documentElement) {
      document.documentElement.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant' as ScrollBehavior
      });
    }

    // Secondary fallback with minimal delay for dynamically rendered content
    const timeout = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);

    return () => clearTimeout(timeout);
  }, [pathname]);

  return null;
}

const LayoutWrapper = ({ children, user }: { children: React.ReactNode, user: any }) => {
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith('/admin');

  return (
    <>
      {/* If not admin: Show NavClients if user is logged in, else show guest Navbar */}
      {!isAdminPath && (user ? <NavClients /> : <Navbar />)}
      
      <main className={!isAdminPath ? "min-h-screen" : ""}>
        {children}
      </main>

      {!isAdminPath && <Footer />}
    </>
  );
};

export default function App() {
  // Initialize state from localStorage so login persists on refresh
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  return (
    <Router>
      <ScrollToTop />
      <LayoutWrapper user={user}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/fleet" element={<Fleet />} /> 
          <Route path="/profile" element={<Profile />} />
          {/* Pass setUser to Login so it can update the App state */}
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/history" element={<History />} />
          <Route path="/car/:id" element={<CarDetails />} />
          <Route path="/admin/*" element={<AdminLayout />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </LayoutWrapper>
    </Router>
  );
}