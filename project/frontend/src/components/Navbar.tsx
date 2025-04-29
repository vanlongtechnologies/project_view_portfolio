import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-white dark:bg-gray-800 shadow-sm">
      <div className="container-custom py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-xl font-bold text-primary dark:text-primary-dark">
            Portfolio
          </Link>
          <div className="flex space-x-4">
            <Link to="/" className="text-secondary dark:text-secondary-dark hover:text-accent">
              Home
            </Link>
            <Link to="/about" className="text-secondary dark:text-secondary-dark hover:text-accent">
              About
            </Link>
            <Link to="/contact" className="text-secondary dark:text-secondary-dark hover:text-accent">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar; 