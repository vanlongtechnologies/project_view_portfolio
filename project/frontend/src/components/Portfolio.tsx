import { useState, useEffect, useRef } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getProjects, getCategories } from '../api/portfolio';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';
import ProjectCardSkeleton from './ProjectCardSkeleton';
import { Project } from '../types/portfolio';

function Portfolio() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [animatedItems, setAnimatedItems] = useState<number[]>([]);
  const prevFilteredProjects = useRef<Project[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();

  // Prefetch data when component mounts
  useEffect(() => {
    queryClient.prefetchQuery({
      queryKey: ['projects'],
      queryFn: getProjects,
    });
    queryClient.prefetchQuery({
      queryKey: ['categories'],
      queryFn: getCategories,
    });
  }, [queryClient]);

  const { data: projects, isLoading: projectsLoading, error: projectsError } = useQuery({
    queryKey: ['projects'],
    queryFn: getProjects,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const { data: categories, isLoading: categoriesLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const filteredProjects = projects?.filter(project => 
    activeFilter === 'all' || project.category_details?.slug === activeFilter
  ) || [];

  useEffect(() => {
    const hasChanged = filteredProjects.length !== prevFilteredProjects.current.length ||
      filteredProjects.some((project, index) => project.id !== prevFilteredProjects.current[index]?.id);

    if (hasChanged) {
      setAnimatedItems([]); // Reset animasi sebelumnya

      const timer = setTimeout(() => {
        filteredProjects.forEach((_, index) => {
          setTimeout(() => {
            setAnimatedItems(prev => [...prev, index]); // Tambahkan indeks proyek setelah waktu tertentu
          }, index * 100); // Setiap index ada delay 100ms
        });
      }, 100); // Setelah 100ms reset baru animasi dimulai

      prevFilteredProjects.current = filteredProjects;

      return () => clearTimeout(timer); // Pastikan timer dibersihkan
    }
  }, [filteredProjects]); // Bergantung pada perubahan filteredProjects

  const openModal = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'unset';
  };

  const renderSkeletons = () => (
    <section id="portfolio" className="section py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container-custom">
        <h2 className="section-title text-center">Portfolio</h2>
        <p className="section-subtitle text-center">
          Explore my latest projects across development and design
        </p>
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12">
          <div className="h-8 w-24 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
          <div className="h-8 w-24 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
          <div className="h-8 w-24 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
        </div>
        <div className="gallery-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-12 mb-12 mx-10">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="opacity-100">
              <ProjectCardSkeleton />
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  // Show skeletons if data is loading
  if (projectsLoading || categoriesLoading) {
    return renderSkeletons();
  }

  if (projectsError) {
    return (
      <section id="portfolio" ref={sectionRef} className="section py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container-custom">
          <div className="bg-error/10 border border-error/30 text-error rounded-lg p-4">
            Error loading projects. Please try again later.
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="portfolio" ref={sectionRef} className="section py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container-custom">
        <h2 className="section-title text-center text-primary dark:text-primary-dark">Portfolio</h2>
        <p className="section-subtitle text-center text-secondary dark:text-secondary-dark">
          Explore my latest projects across development and design
        </p>

        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12">
          <button
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              activeFilter === 'all'
                ? 'bg-accent text-white'
                : 'bg-white dark:bg-gray-800 text-secondary dark:text-secondary-dark hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
            onClick={() => setActiveFilter('all')}
          >
            All Works
          </button>
          {categories?.map((category) => (
            <button
              key={category.id}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeFilter === category.slug
                  ? 'bg-accent text-white'
                  : 'bg-white dark:bg-gray-800 text-secondary dark:text-secondary-dark hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
              onClick={() => setActiveFilter(category.slug)}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className="gallery-grid">
          {filteredProjects.map((project, index) => (
            <div 
              key={project.id}
              className={`transition-fade-in duration-500`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <ProjectCard project={project} onClick={() => openModal(project)} />
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-16">
            <p className="text-xl text-secondary dark:text-secondary-dark">
              No projects found in this category.
            </p>
          </div>
        )}
      </div>

      {isModalOpen && selectedProject && (
        <ProjectModal
          project={selectedProject}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      )}
    </section>
  );
}

export default Portfolio;