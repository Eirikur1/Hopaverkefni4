# Project 4 - Connecting to the World

A React + TypeScript web application that connects to external APIs to provide enhanced functionality and user experience.

## 📋 Project Overview

This project is part of the Web Development course at Vefskóli and demonstrates the integration of multiple technologies to create a modern, responsive web application.

### Team Members

- [Add team member names here]

## 🎯 Project Goals

- Create a user-centered web application using Design Sprint methodology
- Implement React with TypeScript for type-safe development
- Connect to external APIs to extend application functionality
- Follow mobile-first responsive design principles
- Ensure accessibility for all users
- Maintain high code quality through peer reviews and documentation

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn package manager
- Git

### Installation

1. Clone the repository:

```bash
git clone [repository-url]
cd Hopaverkefni3
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🛠️ Tech Stack

### Core Technologies

- **React 19** - UI library for building component-based interfaces
- **TypeScript** - Type-safe JavaScript for better developer experience
- **Vite** - Fast build tool and development server

### Styling

- **Tailwind CSS** - Utility-first CSS framework for rapid UI development
- Mobile-first approach for responsive design

### Code Quality

- **ESLint** - Code linting and formatting
- **TypeScript ESLint** - TypeScript-specific linting rules

## 📁 Project Structure

```
Hopaverkefni3/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/          # Page components
│   ├── hooks/          # Custom React hooks
│   ├── services/       # API service functions
│   ├── types/          # TypeScript type definitions
│   ├── utils/          # Utility functions
│   ├── App.tsx         # Main application component
│   ├── main.tsx        # Application entry point
│   └── index.css       # Global styles
├── public/             # Static assets
├── .gitignore
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## 🎨 Design Process

### Design Sprint

Our team followed the Design Sprint methodology based on the Double Diamond approach:

1. **Discover** - Problem identification and user research
2. **Define** - Analysis and problem statement
3. **Develop** - Ideation and prototyping
4. **Deliver** - Testing and implementation

### Design Deliverables

- User personas and empathy maps
- User flow diagrams
- Low-fidelity wireframes
- Style guide (colors, typography, components, icons)
- High-fidelity prototype in Figma

## 🔌 API Integration

### APIs Used

[Document the APIs your team uses here]

Example:

```typescript
// Example API service
export const fetchData = async (): Promise<DataType> => {
  const response = await fetch("https://api.example.com/data");
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  return response.json();
};
```

## 📱 Mobile-First Approach

This project follows mobile-first design principles:

- Base styles target mobile devices
- Media queries progressively enhance for larger screens
- Touch-friendly interactive elements
- Optimized performance for mobile networks

Example:

```css
/* Mobile first - base styles */
.container {
  padding: 1rem;
}

/* Tablet and up */
@media (min-width: 768px) {
  .container {
    padding: 2rem;
  }
}

/* Desktop and up */
@media (min-width: 1024px) {
  .container {
    padding: 3rem;
  }
}
```

## ♿ Accessibility

We prioritize accessibility to ensure our application is usable by everyone:

- Semantic HTML elements
- ARIA labels where needed
- Keyboard navigation support
- Sufficient color contrast
- Screen reader compatibility
- Focus indicators for interactive elements

## 🔀 Git Workflow

We follow a **Git Flow** branching strategy for organized development. See [GIT_WORKFLOW.md](./GIT_WORKFLOW.md) for complete documentation.

### Branching Strategy

- `main` - Production-ready code
- `develop` - Integration branch for features
- `feature/*` - Individual feature branches
  - `feature/update-card-description-size` ✓ (merged)
  - `feature/add-team-information` (in progress)
  - `feature/accessibility-improvements` (in progress)
- `bugfix/*` - Bug fix branches

### Quick Workflow

```bash
# Start a new feature
git checkout develop
git checkout -b feature/your-feature-name

# Make changes and commit
git add .
git commit -m "feat: your feature description"

# Push and create Pull Request
git push -u origin feature/your-feature-name
```

### Commit Convention

We follow conventional commits:

```
feat: add user authentication
fix: resolve API timeout issue
docs: update README with API documentation
style: reduce product card description font size
refactor: simplify data fetching logic
test: add tests for user service
```

### Code Review Process

1. Create a feature branch from `develop`
2. Make your changes and commit
3. Push branch and create a Pull Request
4. Request review from at least one team member
5. Address feedback and merge when approved

**View Branches**: `git branch -a`  
**View Graph**: `git log --oneline --graph --all`

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## 🧪 Testing

[Add testing information when implemented]

## 🚀 Deployment

[Add deployment instructions and live URL]

**Live Demo:** [Add URL here]

## 📚 Documentation

### Component Documentation

Each component should include:

- Purpose and usage description
- Props interface with TypeScript types
- Usage examples
- Any important notes

Example:

```typescript
/**
 * Button component with multiple variants
 *
 * @param {ButtonProps} props - Component props
 * @param {string} props.variant - Button style variant (primary, secondary, danger)
 * @param {() => void} props.onClick - Click handler function
 * @param {ReactNode} props.children - Button content
 *
 * @example
 * <Button variant="primary" onClick={handleClick}>
 *   Click me
 * </Button>
 */
```

## 👥 Team Organization

### Work Management

- Daily stand-up meetings
- Task tracking with [GitHub Projects/Trello/etc.]
- Sprint planning and retrospectives

### Task to Feature Workflow

1. Break down features into tasks
2. Assign tasks to team members
3. Create feature branches
4. Develop and test
5. Code review
6. Merge to develop
7. Deploy to production

## 📖 Learning Resources

- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Vite Documentation](https://vite.dev)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is created for educational purposes as part of the Web Development course.

## 🙏 Acknowledgments

- Web Development instructors at Vefskóli
- Guest industry professionals
- All team members for their contributions

## 📞 Contact

[Add contact information or links]

---

**Project Start Date:** [Add date]  
**Presentation Date:** December 2-5, 2025
