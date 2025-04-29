import { ExternalLink } from 'lucide-react';
import { Project } from '../types/portfolio';
import { ProjectTag } from '../types/portfolio';

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

function ProjectCard({ project, onClick }: ProjectCardProps) {
  return (
    <div
      className="card group cursor-pointer h-full overflow-hidden"
      onClick={onClick}
    >
      <div className="relative overflow-hidden">
        <img
          src={project.thumbnail}
          alt={project.title}
          className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {project.featured && (
          <div className="absolute top-4 right-4 bg-accent text-white text-xs font-semibold px-2.5 py-1.5 rounded-full">
            Featured
          </div>
        )}
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold text-primary dark:text-primary-dark mb-1">
              {project.title}
            </h3>
            <p className="text-sm text-secondary dark:text-secondary-dark mb-2">
              {project.category_details?.name || 'Uncategorized'}
            </p>
          </div>
          <span className="text-accent opacity-0 group-hover:opacity-100 transition-opacity">
            <ExternalLink size={18} />
          </span>
        </div>
        <div className="flex flex-wrap gap-2 mt-3">
          {project.tools.map((tool: string, index: number) => (
            <span
              key={index}
              className="inline-block bg-gray-100 dark:bg-gray-700 text-secondary dark:text-secondary-dark text-xs px-2.5 py-1 rounded-full"
            >
              {tool}
            </span>
          ))}
        </div>
        {project.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
            {project.tags.map((tag: ProjectTag) => (
              <span
                key={tag.id}
                className="inline-block bg-accent/10 text-accent text-xs px-2.5 py-1 rounded-full"
              >
                {tag.name}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProjectCard;