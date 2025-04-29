import { useTheme } from '../contexts/ThemeContext';

function Footer() {
  const { theme } = useTheme();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 dark:bg-gray-800 py-8">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0">
            <a href="#home" className="text-xl font-bold text-primary dark:text-primary-dark">
              DesignFolio
            </a>
            <p className="text-sm text-secondary dark:text-secondary-dark mt-1">
              UI/UX Design · Illustration · Vector Art · Motion Design
            </p>
          </div>
          
          <div className="text-center md:text-right">
            <p className="text-sm text-secondary dark:text-secondary-dark">
              © {year} DesignFolio. All rights reserved.
            </p>
            <p className="text-xs text-secondary/70 dark:text-secondary-dark/70 mt-1">
              Crafted with care and attention to detail
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;