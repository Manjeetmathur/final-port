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
  phone?: string
  location: string
  github?: string
  linkedin?: string
  instagram?: string
  twitter?: string
  website?: string
  resume?: string
}

export const personalInfo: PersonalInfo = {
  name: 'Manjeet Kumar',
  title: 'Full Stack Developer',
  bio: "I'm a passionate Full Stack Developer with experience in building dynamic web applications. I specialize in JavaScript, React, Node.js, and love creating user-friendly, responsive designs with a focus on performance and scalability.",
  email: 'manjeetkumar62054@gmail.com',
  phone: '+91 6287773228',
  location: 'India',
  github: 'https://github.com/Manjeetmathur',
  linkedin: 'https://linkedin.com/in/manjeet-kumar4',
  instagram: 'https://instagram.com/mathur__manjeet',
  resume: '/Manjeet_Full_stack_Dev_Resume.pdf',
}

export const experiences: Experience[] = [
  {
    id: 'exp-1',
    company: 'Codestam Technology',
    role: 'SDE-1',
    duration: 'November 2025 - Present',
    description: 'Working as a Software Development Engineer-1, building scalable web applications and contributing to production-level projects.',
    responsibilities: [
      'Designing and developing scalable web applications using Next.js and modern frameworks',
      'Implementing robust backend services and APIs',
      'Collaborating with cross-functional teams on feature development',
      'Code reviews and maintaining code quality standards',
      'Optimizing application performance and user experience',
    ],
    techStack: ['Next.js', 'Firebase', 'React', 'JavaScript', 'TypeScript', 'Node.js'],
    achievements: [
      'Contributing to production-level web applications',
      'Delivering high-quality features on time',
    ],
  },
  {
    id: 'exp-2',
    company: 'Codestam Technology',
    role: 'Web Developer Intern',
    duration: 'August 2025 - October 2025',
    description: 'Worked on Next.js and Firebase to build modern web applications.',
    responsibilities: [
      'Developing web applications using Next.js framework',
      'Implementing Firebase for backend services and authentication',
      'Building responsive and user-friendly interfaces',
      'Collaborating with team members on project development',
    ],
    techStack: ['Next.js', 'Firebase', 'React', 'JavaScript', 'TypeScript'],
    achievements: [
      'Contributing to production-level web applications',
      'Gaining hands-on experience with modern web technologies',
    ],
  },
  {
    id: 'exp-3',
    company: 'Sarala Birla University',
    role: 'BCA Student',
    duration: '2023 - 2026',
    description: 'Pursuing Bachelor of Computer Applications with focus on full-stack web development and software engineering. CGPA: 9.5',
    responsibilities: [
      'Learning core computer science concepts and programming fundamentals',
      'Building real-world projects using MERN stack',
      'Practicing Data Structures and Algorithms',
      'Developing problem-solving skills through coding challenges',
    ],
    techStack: ['C', 'C++', 'JavaScript', 'React', 'Node.js', 'MongoDB', 'Python', 'SQL'],
    achievements: [
      'Maintaining CGPA of 9.5',
      'Developed multiple full-stack projects',
      'Continuously learning and implementing modern web technologies',
    ],
  },
]

export const projects: Project[] = [
  {
    id: 'proj-1',
    name: 'YourPort',
    description: 'A full-stack web app where users can register, log in, and create customizable portfolios',
    longDescription: 'Built a full-stack web application that allows users to register, log in, and create customizable portfolios. Features include user authentication, profile management, and dynamic portfolio customization.',
    techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'JavaScript', 'HTML', 'CSS'],
    features: [
      'User registration and authentication',
      'Profile management',
      'Customizable portfolio templates',
      'Dynamic content management',
      'Responsive design',
    ],
  },
  {
    id: 'proj-2',
    name: 'Order Your Lovely Needs (Ukart)',
    description: 'A full-featured eCommerce platform supporting shopping, cart, and secure checkout',
    longDescription: 'Developed and launched Ukart, a full-featured eCommerce platform supporting shopping, cart functionality, and secure checkout. Built with modern web technologies for optimal performance and user experience.',
    techStack: ['React', 'Node.js', 'MongoDB', 'Express', 'JavaScript'],
    features: [
      'Product catalog and search',
      'Shopping cart functionality',
      'Secure checkout process',
      'User account management',
      'Order tracking',
    ],
  },
  {
    id: 'proj-3',
    name: 'Order Your Favorite Gifts and Artwork (Ukart)',
    description: 'A full-featured eCommerce platform for gifts and artwork',
    longDescription: 'Developed and launched Ukart, a full-featured eCommerce platform supporting shopping, cart functionality, and secure checkout for gifts and artwork.',
    techStack: ['React', 'Node.js', 'MongoDB', 'Express', 'JavaScript'],
    features: [
      'Product catalog for gifts and artwork',
      'Shopping cart functionality',
      'Secure checkout process',
      'User account management',
      'Order tracking',
    ],
  },
  {
    id: 'proj-4',
    name: 'Event Money Manager',
    description: 'Easily manage and track contributions (chanda/donations) from devotees for various puja events',
    longDescription: 'A web application designed to easily manage and track contributions (chanda/donations) from devotees for various puja events. Features include contribution tracking, event management, and reporting.',
    techStack: ['React', 'Node.js', 'MongoDB', 'Express', 'JavaScript'],
    features: [
      'Event creation and management',
      'Contribution tracking',
      'Donor management',
      'Financial reporting',
      'User-friendly interface',
    ],
  },
  {
    id: 'proj-5',
    name: 'Study Hub & Store',
    description: 'A platform for managing study materials and educational resources',
    longDescription: 'A comprehensive platform for managing study materials and educational resources. Features include material organization, resource sharing, and study tracking.',
    techStack: ['React', 'Node.js', 'MongoDB', 'Express', 'JavaScript'],
    features: [
      'Study material organization',
      'Resource sharing',
      'Study progress tracking',
      'User accounts',
      'Search and filter functionality',
    ],
  },
]

export const skills: Skill[] = [
  // Programming Languages
  { name: 'JavaScript', category: 'Frontend', proficiency: 'Expert' },
  { name: 'Python', category: 'Backend', proficiency: 'Advanced' },
  { name: 'C', category: 'Other', proficiency: 'Intermediate' },
  { name: 'C++', category: 'Other', proficiency: 'Intermediate' },
  
  // Frontend
  { name: 'HTML', category: 'Frontend', proficiency: 'Expert' },
  { name: 'CSS', category: 'Frontend', proficiency: 'Expert' },
  { name: 'React', category: 'Frontend', proficiency: 'Expert' },
  { name: 'Next.js', category: 'Frontend', proficiency: 'Advanced' },
  
  // Backend
  { name: 'Node.js', category: 'Backend', proficiency: 'Advanced' },
  { name: 'Express.js', category: 'Backend', proficiency: 'Advanced' },
  { name: 'FastAPI', category: 'Backend', proficiency: 'Intermediate' },
  
  // Databases
  { name: 'MongoDB', category: 'Backend', proficiency: 'Advanced' },
  { name: 'MySQL', category: 'Backend', proficiency: 'Advanced' },
  { name: 'Database Design', category: 'Backend', proficiency: 'Advanced' },
  
  // Tools & Services
  { name: 'Firebase', category: 'Tools', proficiency: 'Advanced' },
  { name: 'Git', category: 'Tools', proficiency: 'Advanced' },
  
  // Computer Science Fundamentals
  { name: 'Data Structures & Algorithms', category: 'Other', proficiency: 'Advanced' },
]

