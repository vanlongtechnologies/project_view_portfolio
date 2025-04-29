import { useState } from 'react';
import { X, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { Project } from '../types/portfolio';

interface ProjectImage {
  id: number;
  image: string;
  order: number;
}

interface ProjectModalProps {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
}

function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!isOpen) return null;

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) =>
      prev === 0 ? project.images.length - 1 : prev - 1
    );
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) =>
      prev === project.images.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75"
      onClick={onClose}
    >
      <div
        className="relative bg-white dark:bg-gray-900 rounded-xl overflow-hidden max-w-4xl w-full max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          className="absolute top-4 right-4 z-10 p-2 bg-white/80 dark:bg-gray-900/80 rounded-full text-primary dark:text-primary-dark hover:bg-white hover:dark:bg-gray-800 transition-colors"
          onClick={onClose}
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {/* Image gallery */}
        <div className="relative h-[50vh] bg-gray-100 dark:bg-gray-800">
          <img
            src={project.images[currentImageIndex].image}
            alt={`${project.title} - image ${currentImageIndex + 1}`}
            className="w-full h-full object-contain"
          />

          {project.images.length > 1 && (
            <>
              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 dark:bg-gray-900/80 rounded-full text-primary dark:text-primary-dark hover:bg-white hover:dark:bg-gray-800 transition-colors"
                onClick={handlePrevImage}
                aria-label="Previous image"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 dark:bg-gray-900/80 rounded-full text-primary dark:text-primary-dark hover:bg-white hover:dark:bg-gray-800 transition-colors"
                onClick={handleNextImage}
                aria-label="Next image"
              >
                <ChevronRight size={20} />
              </button>
              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                {project.images.map((image: ProjectImage, index: number) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentImageIndex(index);
                    }}
                    className={`w-2.5 h-2.5 rounded-full transition-colors ${
                      currentImageIndex === index
                        ? 'bg-accent'
                        : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Project details */}
        <div className="p-6 overflow-y-auto">
          <div className="flex flex-wrap items-start justify-between mb-4">
            <h3 className="text-2xl font-bold text-primary dark:text-primary-dark">
              {project.title}
            </h3>
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-accent hover:text-accent/80 ml-auto"
              >
                <span className="mr-1">View Project</span>
                <ExternalLink size={16} />
              </a>
            )}
          </div>

          <div className="mb-6">
            <h4 className="text-sm font-semibold text-secondary dark:text-secondary-dark mb-2">
              Category
            </h4>
            <p className="text-primary dark:text-primary-dark">
              {getCategoryLabel(project.category_details?.slug || '')}
            </p>
          </div>

          <div className="mb-6">
            <h4 className="text-sm font-semibold text-secondary dark:text-secondary-dark mb-2">
              Description
            </h4>
            <p className="text-primary dark:text-primary-dark">
              {project.description}
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-secondary dark:text-secondary-dark mb-2">
              Tools Used
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.tools.map((tool: string, index: number) => (
                <span
                  key={index}
                  className="inline-block bg-gray-100 dark:bg-gray-800 text-primary dark:text-primary-dark px-3 py-1 rounded-full text-sm"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function getCategoryLabel(category: string): string {
  switch (category) {
    case 'ui':
      return 'UI/UX Design';
    case 'illustration':
      return 'Illustration';
    case 'vector':
      return 'Vector Art';
    case 'motion':
      return 'Motion Design';
    default:
      return category;
  }
}

export default ProjectModal;