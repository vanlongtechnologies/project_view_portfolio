import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Moon, Sun, User, LogOut } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';

function Header() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated, user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const location = useLocation();

  const isScrolled = scrollPosition > 50;
  const isAdmin = location.pathname.startsWith('/admin');

  useEffect(() => {
    const handleScroll = () => setScrollPosition(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const navLinks = isAdmin
    ? [
        { name: 'Dashboard', href: '/admin' },
        { name: 'Projects', href: '/admin/projects' },
        { name: 'Categories', href: '/admin/categories' },
        { name: 'Tags', href: '/admin/tags' },
        { name: 'View Site', href: '/' },
      ]
    : [
        { name: 'Home', href: '#home' },
        { name: 'Portfolio', href: '#portfolio' },
        { name: 'About', href: '#about' },
        { name: 'Contact', href: '#contact' },
      ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);
  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    setIsMenuOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-sm' : 'bg-white dark:bg-gray-800'
    }`}>
      <div className="container-custom flex items-center justify-between py-4">
        {/* Left: Logo */}
        <Link to="/" className="text-xl font-bold text-primary dark:text-primary-dark">
          Portfolio
        </Link>

        {/* Center: Desktop nav links */}
        <nav className="hidden md:flex space-x-6">
          {navLinks.map((link) =>
            link.href.startsWith('/') ? (
              <Link
                key={link.name}
                to={link.href}
                className="text-primary dark:text-primary-dark hover:text-accent dark:hover:text-accent transition-colors"
              >
                {link.name}
              </Link>
            ) : (
              <a
                key={link.name}
                href={link.href}
                className="text-primary dark:text-primary-dark hover:text-accent dark:hover:text-accent transition-colors"
              >
                {link.name}
              </a>
            )
          )}
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center space-x-4">
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-primary dark:text-primary-dark"
            aria-label="Toggle dark mode"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* User menu */}
          {isAuthenticated && (
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center space-x-2 text-primary dark:text-primary-dark hover:text-accent dark:hover:text-accent"
              >
                <User size={20} />
                <span className="hidden md:inline">{user?.email}</span>
              </button>
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2">
                  {!isAdmin && (
                    <Link
                      to="/admin"
                      className="block px-4 py-2 text-primary dark:text-primary-dark hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      Admin Dashboard
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-2 text-primary dark:text-primary-dark hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <LogOut size={16} className="mr-2" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Mobile hamburger */}
          <button
            onClick={toggleMenu}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-primary dark:text-primary-dark md:hidden"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 z-40 bg-white dark:bg-gray-800">
          <nav className="container-custom py-8">
            <ul className="flex flex-col space-y-6">
              {navLinks.map((link) => (
                <li key={link.name}>
                  {link.href.startsWith('/') ? (
                    <Link
                      to={link.href}
                      className="text-xl text-primary dark:text-primary-dark hover:text-accent dark:hover:text-accent transition-colors block"
                      onClick={closeMenu}
                    >
                      {link.name}
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      className="text-xl text-primary dark:text-primary-dark hover:text-accent dark:hover:text-accent transition-colors block"
                      onClick={closeMenu}
                    >
                      {link.name}
                    </a>
                  )}
                </li>
              ))}
              {isAuthenticated && (
                <>
                  <li>
                    <span className="block text-primary dark:text-primary-dark">
                      Logged in as: {user?.email}
                    </span>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="text-xl text-error hover:text-error/80 transition-colors block"
                    >
                      Logout
                    </button>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Header;
