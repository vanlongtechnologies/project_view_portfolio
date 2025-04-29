export interface ProjectCategory {
  id: number;
  name: string;
  slug: string;
  description: string;
  order: number;
}

export interface ProjectTag {
  id: number;
  name: string;
  slug: string;
}

export interface Project {
  id: number;
  title: string;
  category: number;
  category_details: ProjectCategory;
  description: string;
  thumbnail: string;
  images: { id: number; image: string; order: number }[];
  tags: ProjectTag[];
  tools: string[];
  link?: string;
  featured: boolean;
  created_at: string;
} 