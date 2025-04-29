export interface Project {
  id: number;
  title: string;
  category: 'ui' | 'illustration' | 'vector' | 'motion' | 'web' | 'mobile' | 'software';
  thumbnail: string;
  images: string[];
  description: string;
  tools: string[];
  link?: string;
  featured: boolean;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "E-Commearce Dashboard UI",
    category: "ui",
    thumbnail: "https://images.pexels.com/photos/4126724/pexels-photo-4126724.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    images: [
      "https://images.pexels.com/photos/4126724/pexels-photo-4126724.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/5082579/pexels-photo-5082579.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    ],
    description: "A comprehensive dashboard UI design for an e-commerce platform featuring analytics, product management, and customer insights. The design prioritizes usability with clean layouts and intuitive navigation.",
    tools: ["Figma", "Adobe Illustrator"],
    link: "https://figma.com",
    featured: true
  },
  {
    id: 2,
    title: "Botanical Illustration Series",
    category: "illustration",
    thumbnail: "https://images.pexels.com/photos/1000084/pexels-photo-1000084.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    images: [
      "https://images.pexels.com/photos/1000084/pexels-photo-1000084.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/2832382/pexels-photo-2832382.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    ],
    description: "A series of detailed botanical illustrations showcasing various exotic plants and flowers. Each illustration is meticulously crafted with attention to botanical accuracy while maintaining artistic expression.",
    tools: ["Adobe Illustrator", "Procreate"],
    featured: false
  },
  {
    id: 3,
    title: "Financial App Wireframes",
    category: "ui",
    thumbnail: "https://images.pexels.com/photos/6801642/pexels-photo-6801642.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    images: [
      "https://images.pexels.com/photos/6801642/pexels-photo-6801642.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/6804073/pexels-photo-6804073.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    ],
    description: "Wireframe designs for a personal finance management application. The designs focus on clear data visualization and intuitive user flows to help users track expenses, set budgets, and reach financial goals.",
    tools: ["Figma", "Sketch"],
    link: "https://figma.com",
    featured: true
  },
  {
    id: 4,
    title: "E-Learning Platform",
    category: "web",
    thumbnail: "https://images.pexels.com/photos/5905700/pexels-photo-5905700.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    images: [
      "https://images.pexels.com/photos/5905700/pexels-photo-5905700.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/5905558/pexels-photo-5905558.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    ],
    description: "A full-stack e-learning platform built with React and Node.js. Features include video courses, interactive quizzes, progress tracking, and a real-time discussion forum. The platform serves over 10,000 students.",
    tools: ["React", "Node.js", "PostgreSQL", "WebRTC"],
    link: "https://github.com",
    featured: true
  },
  {
    id: 5,
    title: "Inventory Management System",
    category: "software",
    thumbnail: "https://images.pexels.com/photos/7654586/pexels-photo-7654586.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    images: [
      "https://images.pexels.com/photos/7654586/pexels-photo-7654586.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/7654583/pexels-photo-7654583.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    ],
    description: "Enterprise-level inventory management system with barcode scanning, real-time stock updates, and predictive analytics for inventory forecasting. Implemented for a major retail chain.",
    tools: ["Python", "Django", "Redis", "Docker"],
    featured: true
  },
  {
    id: 6,
    title: "Fitness Tracking App",
    category: "mobile",
    thumbnail: "https://images.pexels.com/photos/4482900/pexels-photo-4482900.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    images: [
      "https://images.pexels.com/photos/4482900/pexels-photo-4482900.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/4482896/pexels-photo-4482896.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    ],
    description: "Cross-platform mobile app for fitness tracking with features like workout planning, progress monitoring, and social sharing. Built using React Native with native module integration.",
    tools: ["React Native", "TypeScript", "Firebase"],
    link: "https://github.com",
    featured: false
  },
  {
    id: 7,
    title: "Smart Home Automation",
    category: "software",
    thumbnail: "https://images.pexels.com/photos/3985163/pexels-photo-3985163.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    images: [
      "https://images.pexels.com/photos/3985163/pexels-photo-3985163.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/3985149/pexels-photo-3985149.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    ],
    description: "IoT-based home automation system with machine learning for adaptive control. Features include energy optimization, security monitoring, and voice control integration.",
    tools: ["Python", "TensorFlow", "MQTT", "Raspberry Pi"],
    featured: false
  },
  {
    id: 8,
    title: "Crypto Trading Bot",
    category: "software",
    thumbnail: "https://images.pexels.com/photos/6771900/pexels-photo-6771900.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    images: [
      "https://images.pexels.com/photos/6771900/pexels-photo-6771900.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/6771985/pexels-photo-6771985.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    ],
    description: "Automated cryptocurrency trading bot using advanced algorithms for market analysis and trade execution. Includes risk management and portfolio optimization features.",
    tools: ["Python", "pandas", "scikit-learn", "MongoDB"],
    link: "https://github.com",
    featured: true
  }
];