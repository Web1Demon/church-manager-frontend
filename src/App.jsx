import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import axios from 'axios'
import Index from './pages/Index'
import Settings from './pages/Settings'
import NotFound from './pages/NotFound'

// Mobile Blocker Component
const MobileBlocker = () => {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#fef2f2',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '16px'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        padding: '32px',
        maxWidth: '400px',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>📱</div>
        <h1 style={{ 
          fontSize: '24px', 
          fontWeight: 'bold', 
          color: '#dc2626', 
          marginBottom: '16px',
          margin: '0 0 16px 0'
        }}>
          Mobile Access Restricted
        </h1>
        <p style={{ 
          color: '#6b7280', 
          marginBottom: '24px',
          lineHeight: '1.5'
        }}>
          This website is only accessible from desktop devices. 
          Please visit us from a computer or laptop.
        </p>
        <div style={{ 
          fontSize: '12px', 
          color: '#9ca3af'
        }}>
          Screen width detected: {window.innerWidth}px
        </div>
      </div>
    </div>
  );
};

function App() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      const userAgent = navigator.userAgent;
      const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
      const isMobileDevice = mobileRegex.test(userAgent) || window.innerWidth <= 768;
      setIsMobile(isMobileDevice);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  useEffect(() => {
    // Only make API call if not mobile
    if (!isMobile) {
      axios.get(import.meta.env.VITE_APP_BACKEND_API_URL, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(res => console.log('Success:', res.data))
      .catch(err => console.error('Error:', err))
    }
  }, [isMobile])

  // Show mobile blocker if mobile device detected
  if (isMobile) {
    return <MobileBlocker />;
  }

  // Show normal app for desktop
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App