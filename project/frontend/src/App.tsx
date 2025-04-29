import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/HomePage';
import AdminDashboard from './pages/admin/Dashboard';
import ProjectManager from './pages/admin/ProjectManager';
import CategoryManager from './pages/admin/CategoryManager';
import TagManager from './pages/admin/TagManager';
import Login from './pages/LoginPage';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 30, // 30 minutes
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <Router future={{ v7_relativeSplatPath: true }}>
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/admin/login" element={<Login />} />
                  <Route path="/admin" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
                  <Route path="/admin/projects" element={<PrivateRoute><ProjectManager /></PrivateRoute>} />
                  <Route path="/admin/categories" element={<PrivateRoute><CategoryManager /></PrivateRoute>} />
                  <Route path="/admin/tags" element={<PrivateRoute><TagManager /></PrivateRoute>} />
                </Routes>
              </main>
              <Footer />
            </div>
            <Toaster position="top-right" />
          </Router>
        </AuthProvider>
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;