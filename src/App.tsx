import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

// Layout Components
import Navbar from './components/Navbar';
import NavClients from './components/NavClients'; 
import Footer from './components/Footer';

// Pages
import Home from './pages/Home'; 
import Fleet from './pages/Fleet'; 
import CarDetails from './pages/CarDetails';
import AdminLayout from './pages/admin/AdminLayout';
import Login from './pages/Login'; 
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import History from './pages/History';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import About from './pages/About';
/**
 * ScrollToTop Component
 * Resets the scroll position to the top of the page on every navigation.
 */
function ScrollToTop() {
  const { pathname } = useLocation();
  
  React.useLayoutEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant' as ScrollBehavior,
    });
    
    if (document.documentElement) {
      document.documentElement.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant' as ScrollBehavior
      });
    }

    const timeout = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);

    return () => clearTimeout(timeout);
  }, [pathname]);

  return null;
}

/**
 * LayoutWrapper Component
 * Manages which Navbar and Footer to show based on the current URL and login status.
 */
const LayoutWrapper = ({ children, user }: { children: React.ReactNode, user: any }) => {
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith('/admin');

  return (
    <>
      {/* Show NavClients if user is logged in, else show guest Navbar (unless in Admin) */}
      {!isAdminPath && (user ? <NavClients /> : <Navbar />)}
      
      <main className={!isAdminPath ? "min-h-screen" : ""}>
        {children}
      </main>

      {/* Footer is hidden on Admin pages */}
      {!isAdminPath && <Footer />}
    </>
  );
};

export default function App() {
  // Initialize user state from localStorage to maintain session on refresh
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    try {
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (error) {
      console.error("Error parsing user from localStorage", error);
      return null;
    }
  });

  return (
    <Router>
      <ScrollToTop />
      <LayoutWrapper user={user}>
        <Routes>
          {/* Main Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/fleet" element={<Fleet />} /> 
          <Route path="/car/:id" element={<CarDetails />} />
          {/* 2. Add this new route */}
          <Route path="/about" element={<About />} />
          {/* Authentication */}
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* Legal Pages */}
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          
          {/* User Specific */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/history" element={<History />} />
          
          {/* Admin Dashboard */}
          <Route path="/admin/*" element={<AdminLayout />} />
          
          {/* Catch-all: Redirect to Home */}
          <Route path="*" element={<Home />} />
        </Routes>
      </LayoutWrapper>
    </Router>
  );
}