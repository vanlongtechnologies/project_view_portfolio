import axios from 'axios';
import { Project, ProjectCategory, ProjectTag } from '../types/portfolio';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Cache for projects
let projectsCache: Project[] | null = null;
let categoriesCache: ProjectCategory[] | null = null;

export const getProjects = async (): Promise<Project[]> => {
  // Return cached data if available
  if (projectsCache) {
    return projectsCache;
  }

  const response = await api.get('/projects/');
  projectsCache = response.data;
  return response.data;
};

export const getCategories = async (): Promise<ProjectCategory[]> => {
  // Return cached data if available
  if (categoriesCache) {
    return categoriesCache;
  }

  const response = await api.get('/categories/');
  categoriesCache = response.data;
  return response.data;
};

export const getTags = async (): Promise<ProjectTag[]> => {
  const response = await api.get('/tags/');
  return response.data;
};

export const createProject = async (data: FormData): Promise<Project> => {
  const response = await api.post('/projects/', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  // Clear cache after creating new project
  projectsCache = null;
  return response.data;
};

export const updateProject = async (id: number, data: FormData): Promise<Project> => {
  const response = await api.patch(`/projects/${id}/`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  // Clear cache after updating project
  projectsCache = null;
  return response.data;
};

export const deleteProject = async (id: number): Promise<void> => {
  await api.delete(`/projects/${id}/`);
  // Clear cache after deleting project
  projectsCache = null;
};

export const createCategory = async (data: Partial<ProjectCategory>): Promise<ProjectCategory> => {
  const response = await api.post('/categories/', data);
  // Clear cache after creating new category
  categoriesCache = null;
  return response.data;
};

export const updateCategory = async (id: number, data: Partial<ProjectCategory>): Promise<ProjectCategory> => {
  const response = await api.patch(`/categories/${id}/`, data);
  // Clear cache after updating category
  categoriesCache = null;
  return response.data;
};

export const deleteCategory = async (id: number): Promise<void> => {
  await api.delete(`/categories/${id}/`);
  // Clear cache after deleting category
  categoriesCache = null;
};

export const createTag = async (data: Partial<ProjectTag>): Promise<ProjectTag> => {
  const response = await api.post('/tags/', data);
  return response.data;
};

export const updateTag = async (id: number, data: Partial<ProjectTag>): Promise<ProjectTag> => {
  const response = await api.patch(`/tags/${id}/`, data);
  return response.data;
};

export const deleteTag = async (id: number): Promise<void> => {
  await api.delete(`/tags/${id}/`);
};
