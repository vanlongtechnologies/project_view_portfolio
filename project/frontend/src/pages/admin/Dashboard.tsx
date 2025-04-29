import { useAuth } from '../../contexts/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Plus, Grid, Star, Tag } from 'lucide-react';
import axios from 'axios';
import { Project } from '../../api/portfolio';

function Dashboard() {
  const { user } = useAuth();

  const { data: stats } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: async () => {
      const response = await axios.get('/api/projects/');
      const projects = response.data;
      return {
        total: projects.length,
        featured: projects.filter((p: Project) => p.featured).length,
      };
    },
  });

  const quickActions = [
    {
      title: 'Add New Project',
      icon: <Plus className="w-6 h-6" />,
      link: '/admin/projects',
      description: 'Create a new project entry',
    },
    {
      title: 'Manage Projects',
      icon: <Grid className="w-6 h-6" />,
      link: '/admin/projects',
      description: 'View and edit existing projects',
    },
    {
      title: 'Featured Projects',
      icon: <Star className="w-6 h-6" />,
      link: '/admin/projects',
      description: 'Manage featured projects',
    },
    {
      title: 'Project Tags',
      icon: <Tag className="w-6 h-6" />,
      link: '/admin/projects',
      description: 'Manage project categories and tags',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="container-custom py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-primary dark:text-primary-dark mb-2">
              Welcome back!
            </h1>
            <p className="text-secondary dark:text-secondary-dark">
              Logged in as: {user?.username}
            </p>
          </div>
          <Link to="/admin/projects" className="btn btn-primary mt-4 md:mt-0">
            Add New Project
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-primary dark:text-primary-dark mb-2">
              Total Projects
            </h3>
            <p className="text-3xl font-bold text-accent">
              {stats?.total || 0}
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-primary dark:text-primary-dark mb-2">
              Featured Projects
            </h3>
            <p className="text-3xl font-bold text-accent">
              {stats?.featured || 0}
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-primary dark:text-primary-dark mb-6">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickActions.map((action, index) => (
            <Link
              key={index}
              to={action.link}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow group"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-accent/10 text-accent mb-4 group-hover:bg-accent group-hover:text-white transition-colors">
                {action.icon}
              </div>
              <h3 className="text-lg font-semibold text-primary dark:text-primary-dark mb-2">
                {action.title}
              </h3>
              <p className="text-secondary dark:text-secondary-dark text-sm">
                {action.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;