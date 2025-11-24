# Contributing Guide

Thank you for contributing to this project! This guide will help you get started.

## 🌿 Git Workflow

### Branching Strategy

We use a feature branch workflow:

- `main` - Production-ready code, always deployable
- `develop` - Integration branch for features
- `feature/feature-name` - New features
- `bugfix/bug-description` - Bug fixes
- `hotfix/issue-description` - Urgent production fixes

### Creating a New Feature

1. **Pull latest changes from develop:**

   ```bash
   git checkout develop
   git pull origin develop
   ```

2. **Create a new feature branch:**

   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes and commit regularly:**

   ```bash
   git add .
   git commit -m "feat: add user authentication"
   ```

4. **Push your branch:**

   ```bash
   git push origin feature/your-feature-name
   ```

5. **Create a Pull Request on GitHub**

### Commit Message Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, semicolons, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

**Examples:**

```
feat: add user profile page
fix: resolve API timeout issue
docs: update README with deployment steps
style: format code with prettier
refactor: simplify data fetching logic
test: add tests for authentication service
chore: update dependencies
```

## 🔍 Code Review Process

1. Create a Pull Request with a clear description
2. Request review from at least one team member
3. Address all feedback and comments
4. Ensure all checks pass (linting, tests, etc.)
5. Merge only after approval

### What to Look for in Code Reviews

- Code follows project conventions
- TypeScript types are properly defined
- Components are accessible
- Mobile-first responsive design
- Code is well-documented
- No console errors
- Meaningful variable and function names

## 📝 Code Standards

### TypeScript

- Always define types for props, state, and API responses
- Avoid using `any` type
- Use interfaces for object shapes
- Export types from `src/types/index.ts`

### React Components

- Use functional components with hooks
- Keep components small and focused
- Extract reusable logic into custom hooks
- Use proper prop types with TypeScript

### Styling

- Use Tailwind utility classes
- Follow mobile-first approach
- Ensure accessibility (ARIA labels, semantic HTML)
- Maintain consistent spacing and sizing

### File Naming

- Components: PascalCase (`UserProfile.tsx`)
- Utilities/Services: camelCase (`api.ts`, `helpers.ts`)
- Types: Use descriptive names (`User`, `ApiResponse`)

## 🧪 Testing

[Add testing guidelines when implemented]

## 📦 Before Submitting a PR

- [ ] Code follows the style guidelines
- [ ] All TypeScript types are properly defined
- [ ] Components are accessible
- [ ] Mobile-responsive design is implemented
- [ ] Code is commented and documented
- [ ] No console errors or warnings
- [ ] Commit messages follow convention
- [ ] Branch is up to date with develop

## 🆘 Getting Help

- Ask questions in team meetings or stand-ups
- Use GitHub discussions for longer conversations
- Refer to the README for setup and structure
- Check the project documentation

## 📚 Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Conventional Commits](https://www.conventionalcommits.org/)

---

Happy coding! 🚀




