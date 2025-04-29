import { Outlet } from 'react-router-dom';
import { ThemeProvider } from '../contexts/ThemeContext';
import Header from './Header';
import Footer from './Footer';
import { useState, useEffect } from 'react';

function Layout() {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <ThemeProvider>
      <div className="min-h-screen font-sans antialiased">
        <Header scrollPosition={scrollPosition} />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default Layout;