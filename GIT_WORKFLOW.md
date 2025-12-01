# Git Workflow & Branching Strategy

## Overview

This project follows a **Git Flow** branching strategy to manage development and demonstrate professional version control practices.

## Branch Structure

### Main Branches

- **`main`** - Production-ready code. Only stable, tested code gets merged here.
- **`develop`** - Integration branch where features come together. All feature branches are created from and merged back into develop.

### Supporting Branches

- **`feature/*`** - For developing new features or improvements
- **`bugfix/*`** - For fixing bugs
- **`hotfix/*`** - For urgent fixes needed in production

## Current Branches

```
main                                  (production)
  └── develop                        (integration)
       ├── feature/update-card-description-size
       ├── feature/add-team-information
       └── feature/accessibility-improvements
```

## Workflow Process

### 1. Starting a New Feature

```bash
# Make sure you're on develop and it's up to date
git checkout develop
git pull origin develop

# Create a new feature branch
git checkout -b feature/your-feature-name
```

### 2. Working on the Feature

```bash
# Make your changes
# Stage and commit regularly
git add .
git commit -m "feat: add your feature description"

# Push your feature branch
git push -u origin feature/your-feature-name
```

### 3. Creating a Pull Request

1. Go to GitHub repository
2. Click "Pull Requests" → "New Pull Request"
3. Set base branch to `develop`
4. Set compare branch to your `feature/your-feature-name`
5. Add description of your changes
6. Request review from team members
7. Wait for approval

### 4. Code Review Process

**Reviewer checklist:**
- [ ] Code follows project conventions
- [ ] No TypeScript errors
- [ ] Changes match the feature requirements
- [ ] No unnecessary console.logs
- [ ] Code is readable and well-commented
- [ ] Mobile responsiveness maintained
- [ ] No breaking changes

### 5. Merging

Once approved:
```bash
# Switch to develop
git checkout develop

# Merge with --no-ff to preserve feature branch history
git merge feature/your-feature-name --no-ff

# Push to remote
git push origin develop
```

### 6. Deploying to Production

When develop is stable and ready:
```bash
# Switch to main
git checkout main

# Merge develop into main
git merge develop --no-ff

# Tag the release
git tag -a v1.0.0 -m "Release version 1.0.0"

# Push main and tags
git push origin main --tags
```

## Commit Message Convention

We follow **Conventional Commits** for clear, meaningful commit messages:

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation changes
- **style**: Code style changes (formatting, no code change)
- **refactor**: Code refactoring
- **test**: Adding or updating tests
- **chore**: Maintenance tasks

### Examples

```bash
# Feature
git commit -m "feat: add search by ingredients functionality"

# Bug fix
git commit -m "fix: resolve API timeout issue on mobile"

# Style
git commit -m "style: reduce product card description font size to 12px"

# Documentation
git commit -m "docs: update README with deployment instructions"

# Refactor
git commit -m "refactor: simplify API error handling logic"
```

## Example Feature Development Flow

### Completed Example: Card Description Size Update

1. **Branch Created**: `feature/update-card-description-size`
   ```bash
   git checkout -b feature/update-card-description-size
   ```

2. **Changes Made**: Updated ProductCard.tsx description from 14px to 12px

3. **Committed**:
   ```bash
   git commit -m "style: reduce product card description font size to 12px"
   ```

4. **Merged to Develop**:
   ```bash
   git checkout develop
   git merge feature/update-card-description-size --no-ff
   ```

5. **Branch Preserved**: Feature branch kept for history

## Viewing Branch History

### See all branches
```bash
git branch -a
```

### Visual branch graph
```bash
git log --oneline --graph --all --decorate
```

### Commits on a specific branch
```bash
git log feature/your-feature-name --oneline
```

## Code Review Guidelines

### For Authors

- Keep PRs small and focused (one feature per PR)
- Write clear PR descriptions
- Self-review your code before requesting review
- Respond to feedback promptly
- Update your branch if develop has moved forward

### For Reviewers

- Review within 24 hours when possible
- Be constructive and respectful
- Ask questions if something is unclear
- Test the changes locally if needed
- Approve only when satisfied

## Best Practices

✅ **Do:**
- Commit often with meaningful messages
- Pull from develop before starting new work
- Keep feature branches short-lived (1-3 days max)
- Delete feature branches after merging (optional)
- Use descriptive branch names
- Test your changes before pushing

❌ **Don't:**
- Commit directly to `main`
- Force push to shared branches
- Include unrelated changes in one commit
- Use vague commit messages like "fixed stuff"
- Leave branches unmerged for weeks

## Branch Naming Conventions

### Features
```
feature/add-user-authentication
feature/implement-dark-mode
feature/recipe-filtering
```

### Bug Fixes
```
bugfix/fix-mobile-layout
bugfix/api-error-handling
```

### Documentation
```
docs/update-readme
docs/add-api-documentation
```

## For Presentation

When demonstrating Git workflow in your presentation, show:

1. **Branch Structure** - Run `git branch -a` to show all branches
2. **Visual Graph** - Run `git log --oneline --graph --all` 
3. **Commit History** - Show meaningful commit messages
4. **GitHub Interface** - Show how PRs and code reviews work
5. **Merge Commits** - Explain how features get integrated

### Presentation Commands

```bash
# Show all branches
git branch -a

# Show beautiful graph
git log --oneline --graph --all --decorate -20

# Show specific feature development
git log feature/update-card-description-size --oneline

# Show commits by team member
git log --author="YourName" --oneline

# Show recent activity
git log --since="2 weeks ago" --oneline --all
```

## Team Collaboration

### Daily Workflow

1. **Morning**: Pull latest changes
   ```bash
   git checkout develop
   git pull origin develop
   ```

2. **During Work**: Commit frequently
   ```bash
   git add .
   git commit -m "feat: partial implementation of feature"
   git push origin your-feature-branch
   ```

3. **End of Day**: Push your work
   ```bash
   git push origin your-feature-branch
   ```

4. **When Done**: Create Pull Request and notify team

### Handling Conflicts

If you get merge conflicts:

1. **Pull latest develop**
   ```bash
   git checkout develop
   git pull origin develop
   ```

2. **Merge develop into your feature branch**
   ```bash
   git checkout your-feature-branch
   git merge develop
   ```

3. **Resolve conflicts** in your editor

4. **Complete the merge**
   ```bash
   git add .
   git commit -m "merge: resolve conflicts with develop"
   git push origin your-feature-branch
   ```

## Resources

- [Git Flow Cheatsheet](https://danielkummer.github.io/git-flow-cheatsheet/)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [GitHub Flow Guide](https://guides.github.com/introduction/flow/)
- [Git Branching Model](https://nvie.com/posts/a-successful-git-branching-model/)

---

**Last Updated**: December 1, 2025  
**Team**: [Your Team Name]

