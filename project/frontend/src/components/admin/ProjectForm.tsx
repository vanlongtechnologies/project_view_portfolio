import { useState } from 'react';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { X, Upload, Loader } from 'lucide-react';
import axios from 'axios';
import { Project, ProjectCategory, ProjectTag } from '../../types/portfolio';

interface ProjectFormProps {
  project?: Project | null;
  onClose: () => void;
}

function ProjectForm({ project, onClose }: ProjectFormProps) {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    title: project?.title || '',
    description: project?.description || '',
    category: project?.category || '',
    featured: project?.featured || false,
    tools: project?.tools || [],
    link: project?.link || '',
    tags: project?.tags?.map(tag => tag.id) || [],
  });
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [images, setImages] = useState<File[]>([]);
  const [thumbnailPreview, setThumbnailPreview] = useState(project?.thumbnail || '');
  const [imagesPreviews, setImagesPreviews] = useState<string[]>(project?.images?.map(img => img.image) || []);
  const [toolsInput, setToolsInput] = useState(project?.tools?.join(', ') || '');

  const { data: categories } = useQuery<ProjectCategory[]>({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await axios.get('/api/categories/');
      return response.data;
    },
  });

  const { data: tags } = useQuery<ProjectTag[]>({
    queryKey: ['tags'],
    queryFn: async () => {
      const response = await axios.get('/api/tags/');
      return response.data;
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: FormData) => {
      if (project) {
        await axios.patch(`/api/projects/${project.id}/`, data, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      } else {
        await axios.post('/api/projects/', data, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      onClose();
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('category', formData.category.toString());
    data.append('featured', formData.featured.toString());
    data.append('tools', JSON.stringify(formData.tools));
    if (formData.link) {
      data.append('link', formData.link);
    }
    
    // Handle tags
    formData.tags.forEach(tagId => {
      data.append('tags', tagId.toString());
    });

    // Handle thumbnail
    if (thumbnail) {
      data.append('thumbnail', thumbnail);
    }
    
    // Handle images
    images.forEach(image => {
      data.append('images', image);
    });

    try {
      await mutation.mutateAsync(data);
    } catch (error: any) {
      console.error('Error saving project:', error);
      if (error.response?.data) {
        console.error('Validation errors:', error.response.data);
      }
    }
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnail(file);
      setThumbnailPreview(URL.createObjectURL(file));
    }
  };

  const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setImages(prev => [...prev, ...files]);
    const previews = files.map(file => URL.createObjectURL(file));
    setImagesPreviews(prev => [...prev, ...previews]);
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
    setImagesPreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleToolsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setToolsInput(value);
    const tools = value.split(',').map(tool => tool.trim()).filter(tool => tool);
    setFormData(prev => ({ ...prev, tools }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-primary dark:text-primary-dark">
              {project ? 'Edit Project' : 'Add New Project'}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
            >
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-secondary dark:text-secondary-dark mb-1">
                Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="w-full p-2 rounded-lg border border-gray-200 dark:border-gray-700"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary dark:text-secondary-dark mb-1">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
                className="w-full p-2 rounded-lg border border-gray-200 dark:border-gray-700"
                rows={4}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-secondary dark:text-secondary-dark mb-1">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={e => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full p-2 rounded-lg border border-gray-200 dark:border-gray-700"
                  required
                >
                  <option value="">Select a category</option>
                  {categories?.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary dark:text-secondary-dark mb-1">
                  Tools (comma-separated)
                </label>
                <input
                  type="text"
                  value={toolsInput}
                  onChange={handleToolsChange}
                  className="w-full p-2 rounded-lg border border-gray-200 dark:border-gray-700"
                  placeholder="React, TypeScript, Tailwind"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary dark:text-secondary-dark mb-1">
                Tags
              </label>
              <div className="flex flex-wrap gap-2">
                {tags?.map(tag => (
                  <label key={tag.id} className="inline-flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.tags.includes(tag.id)}
                      onChange={e => {
                        const checked = e.target.checked;
                        setFormData(prev => ({
                          ...prev,
                          tags: checked
                            ? [...prev.tags, tag.id]
                            : prev.tags.filter(id => id !== tag.id),
                        }));
                      }}
                      className="mr-2"
                    />
                    {tag.name}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary dark:text-secondary-dark mb-1">
                Project Link (optional)
              </label>
              <input
                type="url"
                value={formData.link}
                onChange={e => setFormData(prev => ({ ...prev, link: e.target.value }))}
                className="w-full p-2 rounded-lg border border-gray-200 dark:border-gray-700"
                placeholder="https://..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary dark:text-secondary-dark mb-1">
                Thumbnail
              </label>
              <div className="flex items-center space-x-4">
                {thumbnailPreview && (
                  <div className="relative">
                    <img
                      src={thumbnailPreview}
                      alt="Thumbnail preview"
                      className="w-24 h-24 object-cover rounded-lg border border-gray-200 dark:border-gray-700"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setThumbnail(null);
                        setThumbnailPreview('');
                      }}
                      className="absolute -top-2 -right-2 p-1 bg-white dark:bg-gray-800 rounded-full text-error hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700"
                    >
                      <X size={16} />
                    </button>
                  </div>
                )}
                <label className="flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-accent dark:hover:border-accent transition-colors">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload size={24} className="mb-2 text-gray-400 dark:text-gray-500" />
                    <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Click to upload</span>
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      PNG, JPG or WEBP
                    </p>
                  </div>
                  <input
                    type="file"
                    onChange={handleThumbnailChange}
                    accept="image/*"
                    className="hidden"
                    required={!project}
                  />
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary dark:text-secondary-dark mb-1">
                Project Images
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-4">
                {imagesPreviews.map((preview, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={preview}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg border border-gray-200 dark:border-gray-700"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 p-1.5 bg-white/90 dark:bg-gray-800/90 rounded-full text-error hover:bg-white dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-700 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
                <label className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-accent dark:hover:border-accent transition-colors">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload size={24} className="mb-2 text-gray-400 dark:text-gray-500" />
                    <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Add images</span>
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Multiple files
                    </p>
                  </div>
                  <input
                    type="file"
                    onChange={handleImagesChange}
                    accept="image/*"
                    multiple
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={e => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                className="mr-2"
                id="featured"
              />
              <label htmlFor="featured" className="text-sm text-secondary dark:text-secondary-dark">
                Feature this project
              </label>
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={onClose}
                className="btn btn-outline"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={mutation.isPending}
                className="btn btn-primary"
              >
                {mutation.isPending ? (
                  <>
                    <Loader size={20} className="mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  'Save Project'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProjectForm;