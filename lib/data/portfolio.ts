export interface Experience {
  id: string
  company: string
  role: string
  duration: string
  description: string
  responsibilities: string[]
  techStack: string[]
  achievements?: string[]
}

export interface Project {
  id: string
  name: string
  description: string
  longDescription: string
  techStack: string[]
  githubUrl?: string
  liveUrl?: string
  imageUrl?: string
  features: string[]
}

export interface Skill {
  name: string
  category: 'Frontend' | 'Backend' | 'Tools' | 'Other'
  proficiency: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'
}

export interface PersonalInfo {
  name: string
  title: string
  bio: string
  email: string
  location: string
  github?: string
  linkedin?: string
  twitter?: string
  website?: string
}

export const personalInfo: PersonalInfo = {
  name: 'Manjeet Kumar',
  title: 'Full Stack Web Developer',
  bio: 'BCA student from Sarala Birla University with a passion for full-stack web development and real-world problem-solving. Currently learning and building with modern web technologies.',
  email: 'manjeet@example.com', // Update with your actual email
  location: 'India',
  github: 'https://github.com/manjeet', // Update with your actual GitHub
  linkedin: 'https://linkedin.com/in/manjeet', // Update with your actual LinkedIn
}

export const experiences: Experience[] = [
  {
    id: 'exp-1',
    company: 'Sarala Birla University',
    role: 'BCA Student',
    duration: 'Present',
    description: 'Pursuing Bachelor of Computer Applications with focus on full-stack web development and software engineering.',
    responsibilities: [
      'Learning core computer science concepts and programming fundamentals',
      'Building real-world projects using MERN stack',
      'Practicing Data Structures and Algorithms',
      'Developing problem-solving skills through coding challenges',
    ],
    techStack: ['C', 'C++', 'JavaScript', 'React', 'Node.js', 'MongoDB', 'Python', 'SQL'],
    achievements: [
      'Developed Portfolio Generator Website using MERN stack',
      'Continuously learning and implementing modern web technologies',
    ],
  },
  // Add more experiences as you gain them
]

export const projects: Project[] = [
  {
    id: 'proj-1',
    name: 'Portfolio Generator Website',
    description: 'A full-stack MERN application for generating personalized portfolio websites',
    longDescription: 'A comprehensive portfolio generator built with the MERN stack (MongoDB, Express, React, Node.js) that allows users to create and customize their professional portfolio websites with ease. Features include dynamic content management, template selection, and real-time preview.',
    techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'JavaScript', 'HTML', 'CSS'],
    githubUrl: 'https://github.com/manjeet/portfolio-generator', // Update with your actual GitHub URL
    liveUrl: 'https://portfolio-generator-demo.vercel.app', // Update with your actual live URL
    features: [
      'User authentication and profile management',
      'Dynamic portfolio template selection',
      'Real-time preview of portfolio changes',
      'Export and deploy functionality',
      'Responsive design for all devices',
    ],
  },
  // Add more projects as you build them
]

export const skills: Skill[] = [
  // Programming Languages
  { name: 'C', category: 'Other', proficiency: 'Intermediate' },
  { name: 'C++', category: 'Other', proficiency: 'Intermediate' },
  { name: 'Python', category: 'Backend', proficiency: 'Intermediate' },
  { name: 'JavaScript', category: 'Frontend', proficiency: 'Advanced' },
  
  // Frontend
  { name: 'HTML', category: 'Frontend', proficiency: 'Advanced' },
  { name: 'CSS', category: 'Frontend', proficiency: 'Advanced' },
  { name: 'React', category: 'Frontend', proficiency: 'Advanced' },
  
  // Backend
  { name: 'Node.js', category: 'Backend', proficiency: 'Intermediate' },
  { name: 'Express', category: 'Backend', proficiency: 'Intermediate' },
  
  // Databases
  { name: 'MongoDB', category: 'Backend', proficiency: 'Intermediate' },
  { name: 'SQL', category: 'Backend', proficiency: 'Intermediate' },
  { name: 'DBMS', category: 'Backend', proficiency: 'Intermediate' },
  
  // Computer Science Fundamentals
  { name: 'Data Structures & Algorithms', category: 'Other', proficiency: 'Intermediate' },
  { name: 'Operating Systems', category: 'Other', proficiency: 'Intermediate' },
  
  // Tools
  { name: 'Git', category: 'Tools', proficiency: 'Intermediate' },
]

