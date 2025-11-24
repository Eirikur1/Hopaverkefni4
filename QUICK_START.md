# 🚀 Quick Start Guide

Get your team up and running quickly!

## ✅ First Time Setup (Do This Once)

### 1. Clone and Install

```bash
# If you haven't cloned yet
git clone [your-repo-url]
cd Hopaverkefni3

# Install dependencies
npm install
```

### 2. Start Development Server

```bash
npm run dev
```

Visit `http://localhost:5173` in your browser. You should see the welcome page! 🎉

## 📁 Project Structure Overview

```
src/
├── components/       # Reusable UI components (Button, Card, etc.)
├── pages/           # Page components (HomePage, AboutPage, etc.)
├── hooks/           # Custom React hooks (useFetch, etc.)
├── services/        # API calls and external services
├── types/           # TypeScript type definitions
├── utils/           # Helper functions
├── App.tsx          # Main app component
└── main.tsx         # Entry point
```

## 🎯 First Steps for Your Team

### Step 1: Update Project Info

1. Open `package.json` and update the `name` field
2. Edit `README.md` and add your team member names
3. Create a `.env` file if you need API keys (copy from `.env.example`)

### Step 2: Create Your First Component

Create a new file `src/components/Hero.tsx`:

```typescript
export function Hero() {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-20">
      <div className="max-w-4xl mx-auto text-center px-4">
        <h1 className="text-5xl font-bold mb-4">Your Amazing Project</h1>
        <p className="text-xl">Building something awesome together!</p>
      </div>
    </div>
  );
}
```

Import and use it in `src/App.tsx`:

```typescript
import { Hero } from "./components/Hero";

function App() {
  return (
    <div>
      <Hero />
      {/* Rest of your app */}
    </div>
  );
}
```

### Step 3: Create Your First Page

Create `src/pages/HomePage.tsx`:

```typescript
import { Hero } from "../components/Hero";

export function HomePage() {
  return (
    <div>
      <Hero />
      <main className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-6">Welcome!</h2>
        <p className="text-gray-600">
          Start building your amazing application here.
        </p>
      </main>
    </div>
  );
}

export default HomePage;
```

### Step 4: Connect to an API

Use the provided `useFetch` hook:

```typescript
import { useFetch } from "../hooks/useFetch";

interface User {
  id: number;
  name: string;
  email: string;
}

export function UserList() {
  const { data, loading, error } = useFetch<User[]>(
    "https://jsonplaceholder.typicode.com/users"
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {data?.map((user) => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
}
```

## 🎨 Styling with Tailwind

### Utility Classes

```tsx
// Layout
<div className="flex justify-center items-center">

// Spacing (mobile-first)
<div className="p-4 md:p-6 lg:p-8">

// Typography
<h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">

// Colors
<div className="bg-blue-500 text-white">

// Hover states
<button className="bg-blue-500 hover:bg-blue-600">
```

### Responsive Design (Mobile-First)

```tsx
<div className="
  w-full          /* Mobile: full width */
  md:w-1/2        /* Tablet: half width */
  lg:w-1/3        /* Desktop: one-third width */
">
```

Breakpoints:

- `sm:` - 640px and up (large mobile)
- `md:` - 768px and up (tablet)
- `lg:` - 1024px and up (desktop)
- `xl:` - 1280px and up (large desktop)

## 🔀 Git Workflow

### Creating a New Feature

```bash
# 1. Make sure you're on develop and it's up to date
git checkout develop
git pull origin develop

# 2. Create a new feature branch
git checkout -b feature/my-awesome-feature

# 3. Make your changes and commit regularly
git add .
git commit -m "feat: add awesome feature"

# 4. Push your branch
git push origin feature/my-awesome-feature

# 5. Create a Pull Request on GitHub
# 6. Get it reviewed by a teammate
# 7. Merge when approved
```

### Good Commit Messages

```bash
feat: add user authentication
fix: resolve login button bug
docs: update API documentation
style: format code with prettier
refactor: simplify header component
```

## 🛠️ Useful Commands

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # Check for linting errors

# Git
git status           # Check current changes
git log --oneline    # View commit history
git branch           # List all branches
```

## 🐛 Common Issues

### Port Already in Use

If you get a port error, either:

1. Kill the process using port 5173
2. Or Vite will automatically suggest another port

### Module Not Found

```bash
# Delete node_modules and reinstall
rm -rf node_modules
npm install
```

### Tailwind Styles Not Working

Make sure `index.css` has:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## 📚 Quick Reference

### Creating New Files

**Component:**

```typescript
// src/components/MyComponent.tsx
export function MyComponent() {
  return <div>Hello!</div>;
}
```

**Type:**

```typescript
// src/types/index.ts
export interface MyType {
  id: number;
  name: string;
}
```

**API Service:**

```typescript
// src/services/myService.ts
export async function fetchMyData() {
  const response = await fetch("https://api.example.com/data");
  return response.json();
}
```

**Custom Hook:**

```typescript
// src/hooks/useMyHook.ts
import { useState } from "react";

export function useMyHook() {
  const [state, setState] = useState();
  return { state, setState };
}
```

## 🎯 Daily Workflow

1. **Morning Stand-up**: What did you do yesterday? What will you do today?
2. **Pull Latest Changes**: `git pull origin develop`
3. **Create/Continue Feature Branch**: `git checkout feature/your-feature`
4. **Code**: Build awesome features!
5. **Commit Often**: Small, frequent commits are better
6. **Push Daily**: `git push origin feature/your-feature`
7. **Code Review**: Review teammates' PRs
8. **Update Progress**: Update your task board (Trello, GitHub Projects, etc.)

## 📖 Learn More

- **React**: Check `src/App.tsx` for examples
- **TypeScript**: Look at `src/types/index.ts`
- **Tailwind**: Visit [tailwindcss.com/docs](https://tailwindcss.com/docs)
- **APIs**: See `API_EXAMPLES.md` for integration examples
- **Design**: Read `DESIGN_SPRINT.md` for the design process

## 💬 Getting Help

1. **Check documentation files** in this project
2. **Ask your teammates** during stand-ups or on Slack
3. **Read official docs** (React, TypeScript, Tailwind)
4. **Google/Stack Overflow** for specific errors
5. **Ask instructors** if you're really stuck

## 🎉 You're Ready!

Now start building something amazing! Remember:

- Commit often
- Communicate with your team
- Ask questions when stuck
- Have fun! 🚀

---

**Pro Tip**: Keep `npm run dev` running in a terminal while you code. It will auto-reload when you save files!




