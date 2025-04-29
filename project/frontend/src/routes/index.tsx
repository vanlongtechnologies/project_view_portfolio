import { Routes, Route } from 'react-router-dom';
import Layout from '../components/Layout';
import PrivateRoute from '../components/PrivateRoute';
import HomePage from '../pages/HomePage';
import PortfolioPage from '../pages/PortfolioPage';
import AboutPage from '../pages/AboutPage';
import ContactPage from '../pages/ContactPage';
import LoginPage from '../pages/LoginPage';
import AdminDashboard from '../pages/admin/Dashboard';
import ProjectManager from '../pages/admin/ProjectManager';
import NotFound from '../pages/NotFound';
import CategoryManager from '../pages/admin/CategoryManager';
import TagManager from '../pages/admin/TagManager';
function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        
        {/* Admin Routes */}
        <Route path="/admin" element={<PrivateRoute />}>
          <Route index element={<AdminDashboard />} />
          <Route path="projects" element={<ProjectManager />} />
          <Route path="categories" element={<CategoryManager />} />
          <Route path="tags" element={<TagManager />} />
        </Route>

        {/* 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;