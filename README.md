# Documentation-Style Portfolio

A unique portfolio website built with a documentation-style layout inspired by Next.js, React, and Tailwind CSS documentation sites.

## Features

- 📚 **Documentation-style layout** with sidebar navigation
- 🎨 **API-style presentation** of experience and projects
- 🌙 **Dark mode support** with theme persistence
- 📱 **Fully responsive** design for all devices
- ✨ **Smooth scrolling** and active section highlighting
- 🎯 **Table of Contents** for easy navigation
- 📦 **Package-style project cards** with installation instructions
- 🔍 **Search-ready structure** (can be extended)

## Tech Stack

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Shadcn UI** - Component library
- **Lucide React** - Icons

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. **Open [http://localhost:3000](http://localhost:3000)** in your browser

## Customization

### Update Your Information

Edit `lib/data/portfolio.ts` to customize:

- **Personal Info**: Name, title, bio, contact information
- **Experience**: Add your work experience
- **Projects**: Add your projects with descriptions and links
- **Skills**: Add your technical skills organized by category

### Example Data Structure

```typescript
export const personalInfo: PersonalInfo = {
  name: 'Your Name',
  title: 'Full Stack Developer',
  bio: 'Your bio here...',
  email: 'your.email@example.com',
  location: 'Your City, Country',
  github: 'https://github.com/yourusername',
  linkedin: 'https://linkedin.com/in/yourusername',
}

export const experiences: Experience[] = [
  {
    id: 'exp-1',
    company: 'Company Name',
    role: 'Your Role',
    duration: '2022 - Present',
    description: 'Job description...',
    responsibilities: ['Responsibility 1', 'Responsibility 2'],
    techStack: ['React', 'Next.js', 'TypeScript'],
  },
]
```

### Styling

The project uses Shadcn UI components with Tailwind CSS. You can customize:

- **Colors**: Edit CSS variables in `app/globals.css`
- **Components**: Modify Shadcn components in `components/ui/`
- **Layout**: Adjust layout components in `components/layout/`

## Project Structure

```
├── app/
│   ├── about/          # About page
│   ├── contact/        # Contact page
│   ├── experience/     # Experience page
│   ├── projects/       # Projects page
│   ├── skills/         # Skills page
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Home page
├── components/
│   ├── layout/         # Layout components (Sidebar, Header, TOC)
│   ├── sections/       # Section components (Hero, Cards, Forms)
│   └── ui/             # Shadcn UI components
├── lib/
│   ├── data/           # Portfolio data
│   └── utils.ts        # Utility functions
└── public/             # Static assets
```

## Features Breakdown

### Sidebar Navigation
- Fixed sidebar with navigation links
- Active section highlighting
- Mobile-responsive with sheet menu

### Pages

1. **Introduction** (`/`) - Hero section with quick start
2. **About** (`/about`) - Personal story and background
3. **Experience** (`/experience`) - Work experience in API-style cards
4. **Projects** (`/projects`) - Projects presented as npm packages
5. **Skills** (`/skills`) - Skills organized by category with tabs
6. **Contact** (`/contact`) - Contact form and social links

### Components

- **Hero**: Introduction section with copy-to-clipboard npm install
- **ExperienceCard**: API-style experience presentation
- **ProjectCard**: Package-style project cards
- **SkillCard**: Skill cards with proficiency levels
- **ContactForm**: API-style contact form
- **TableOfContents**: Auto-generated table of contents

## Build for Production

```bash
npm run build
npm start
```

## License

MIT

## Contributing

Feel free to fork and customize this portfolio for your own use!
