import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Edit2, Trash2, Loader } from 'lucide-react';
import axios from 'axios';
import { Project } from '../../types/portfolio';
import ProjectForm from '../../components/admin/ProjectForm';

function ProjectManager() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data: projects, isLoading, error } = useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const response = await axios.get('/api/projects/');
      return response.data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await axios.delete(`/api/projects/${id}/`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });

  const handleAddProject = () => {
    setSelectedProject(null);
    setIsFormOpen(true);
  };

  const handleEditProject = (project: Project) => {
    setSelectedProject(project);
    setIsFormOpen(true);
  };

  const handleDeleteProject = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await deleteMutation.mutateAsync(id);
      } catch (error) {
        console.error('Error deleting project:', error);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
        <div className="container-custom py-8">
          <div className="flex items-center justify-center">
            <Loader size={24} className="animate-spin text-accent" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
        <div className="container-custom py-8">
          <div className="bg-error/10 border border-error/30 text-error rounded-lg p-4">
            Error loading projects. Please try again later.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="container-custom py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-primary dark:text-primary-dark">
            Project Manager
          </h1>
          <button 
            className="btn btn-primary flex items-center"
            onClick={handleAddProject}
          >
            <Plus size={20} className="mr-2" />
            Add New Project
          </button>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700">
                <th className="p-4 text-left text-sm font-medium text-secondary dark:text-secondary-dark">Title</th>
                <th className="p-4 text-left text-sm font-medium text-secondary dark:text-secondary-dark">Category</th>
                <th className="p-4 text-left text-sm font-medium text-secondary dark:text-secondary-dark">Featured</th>
                <th className="p-4 text-left text-sm font-medium text-secondary dark:text-secondary-dark">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects?.map((project: Project) => (
                <tr key={project.id} className="border-b border-gray-200 dark:border-gray-700">
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      {project.thumbnail && (
                        <img
                          src={project.thumbnail}
                          alt={project.title}
                          className="w-12 h-12 object-cover rounded-lg"
                        />
                      )}
                      <span className="text-primary dark:text-primary-dark">{project.title}</span>
                    </div>
                  </td>
                  <td className="p-4 text-primary dark:text-primary-dark">
                    {project.category_details?.name || 'Uncategorized'}
                  </td>
                  <td className="p-4">
                    <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                      project.featured 
                        ? 'bg-accent/10 text-accent' 
                        : 'bg-gray-100 dark:bg-gray-700 text-secondary dark:text-secondary-dark'
                    }`}>
                      {project.featured ? 'Featured' : 'Regular'}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => handleEditProject(project)}
                        className="text-accent hover:text-accent/80 p-1"
                        title="Edit project"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => handleDeleteProject(project.id)}
                        className="text-error hover:text-error/80 p-1"
                        title="Delete project"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {projects?.length === 0 && (
          <div className="text-center py-8">
            <p className="text-secondary dark:text-secondary-dark">
              No projects found. Add your first project to get started.
            </p>
          </div>
        )}

        {isFormOpen && (
          <ProjectForm
            project={selectedProject}
            onClose={() => setIsFormOpen(false)}
          />
        )}
      </div>
    </div>
  );
}

export default ProjectManager;