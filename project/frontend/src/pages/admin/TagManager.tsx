import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Edit2, Trash2, Loader, X } from 'lucide-react';
import axios from 'axios';
import { ProjectTag } from '../../types/portfolio';

function TagManager() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedTag, setSelectedTag] = useState<ProjectTag | null>(null);
  const [formData, setFormData] = useState({
    name: '',
  });

  const queryClient = useQueryClient();

  const { data: tags, isLoading } = useQuery({
    queryKey: ['tags'],
    queryFn: async () => {
      const response = await axios.get('/api/tags/');
      return response.data;
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      await axios.post('/api/tags/', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tags'] });
      setIsFormOpen(false);
      setFormData({ name: '' });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: typeof formData }) => {
      await axios.patch(`/api/tags/${id}/`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tags'] });
      setIsFormOpen(false);
      setSelectedTag(null);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await axios.delete(`/api/tags/${id}/`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tags'] });
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (selectedTag) {
        await updateMutation.mutateAsync({ id: selectedTag.id, data: formData });
      } else {
        await createMutation.mutateAsync(formData);
      }
    } catch (error) {
      console.error('Error saving tag:', error);
    }
  };

  const handleEdit = (tag: ProjectTag) => {
    setSelectedTag(tag);
    setFormData({ name: tag.name });
    setIsFormOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this tag?')) {
      try {
        await deleteMutation.mutateAsync(id);
      } catch (error) {
        console.error('Error deleting tag:', error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="container-custom py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-primary dark:text-primary-dark">
            Tag Manager
          </h1>
          <button
            className="btn btn-primary flex items-center"
            onClick={() => {
              setSelectedTag(null);
              setFormData({ name: '' });
              setIsFormOpen(true);
            }}
          >
            <Plus size={20} className="mr-2" />
            Add Tag
          </button>
        </div>

        {isLoading ? (
          <div className="flex justify-center">
            <Loader className="w-8 h-8 animate-spin text-accent" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {tags?.map((tag: ProjectTag) => (
              <div
                key={tag.id}
                className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm flex items-center justify-between"
              >
                <h3 className="text-lg font-semibold text-primary dark:text-primary-dark">
                  {tag.name}
                </h3>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(tag)}
                    className="p-2 text-accent hover:bg-accent/10 rounded-full"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(tag.id)}
                    className="p-2 text-error hover:bg-error/10 rounded-full"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {isFormOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-md">
              <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-semibold text-primary dark:text-primary-dark">
                  {selectedTag ? 'Edit Tag' : 'Add Tag'}
                </h2>
                <button
                  onClick={() => setIsFormOpen(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
                >
                  <X size={20} />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="p-4">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-secondary dark:text-secondary-dark mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ name: e.target.value })}
                    className="w-full p-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-primary dark:text-primary-dark"
                    required
                  />
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setIsFormOpen(false)}
                    className="btn btn-outline"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={createMutation.isPending || updateMutation.isPending}
                  >
                    {createMutation.isPending || updateMutation.isPending ? (
                      <Loader size={20} className="animate-spin" />
                    ) : (
                      'Save'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TagManager;