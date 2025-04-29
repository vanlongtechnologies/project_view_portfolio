import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        <h1 className="text-9xl font-bold text-accent mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-primary dark:text-primary-dark mb-4">
          Page Not Found
        </h2>
        <p className="text-secondary dark:text-secondary-dark mb-8">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="btn btn-outline flex items-center justify-center"
          >
            <ArrowLeft size={18} className="mr-2" />
            Go Back
          </button>
          <button
            onClick={() => navigate('/')}
            className="btn btn-primary flex items-center justify-center"
          >
            <Home size={18} className="mr-2" />
            Return Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default NotFound;