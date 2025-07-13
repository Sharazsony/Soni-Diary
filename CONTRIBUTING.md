# Contributing to Soni Dream Diary

Thank you for your interest in contributing to Soni Dream Diary! 🎉

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/your-username/Soni-Diary.git
   cd Soni-Diary
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Set up environment variables**:
   ```bash
   cp .env.example .env.local
   # Add your MongoDB URI and other required variables
   ```

## Development Workflow

### Making Changes

1. **Create a new branch** for your feature:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** following our coding standards

3. **Test your changes**:
   ```bash
   npm run dev
   npm run build
   npm run lint
   ```

4. **Commit your changes**:
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

5. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request** on GitHub

### Commit Message Convention

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `style:` Code style changes
- `refactor:` Code refactoring
- `test:` Adding or updating tests
- `chore:` Maintenance tasks

Examples:
```
feat: add poetry search functionality
fix: resolve authentication token expiry issue
docs: update installation instructions
style: format code with prettier
```

## Code Style

- Use **TypeScript** for all new code
- Follow **ESLint** and **Prettier** configurations
- Use **Tailwind CSS** for styling
- Write **meaningful variable and function names**
- Add **JSDoc comments** for complex functions

## Project Structure

```
Soni-Diary/
├── app/                    # Next.js App Router
│   ├── api/               # API endpoints
│   ├── admin/             # Admin pages
│   └── [content]/         # Public content pages
├── components/            # Reusable UI components
│   └── ui/               # Shadcn/ui components
├── lib/                   # Utilities and configurations
├── public/               # Static assets
└── styles/               # Global styles
```

## Areas for Contribution

### 🐛 Bug Reports
- Check existing issues first
- Provide clear reproduction steps
- Include browser/OS information
- Add screenshots if applicable

### ✨ Feature Requests
- Search existing feature requests
- Provide detailed use case description
- Consider implementation complexity
- Discuss with maintainers first for large features

### 🔧 Code Contributions

#### Easy First Issues
- UI improvements
- Documentation updates
- Adding tests
- Fixing typos
- Improving error messages

#### Intermediate Issues
- New content types (e.g., music, photos)
- Search functionality
- Import/export features
- Performance optimizations

#### Advanced Issues
- Real-time collaboration
- Advanced analytics
- Mobile app development
- Third-party integrations

## Testing

### Running Tests
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run with coverage
npm run test:coverage
```

### Writing Tests
- Write unit tests for utility functions
- Add integration tests for API endpoints
- Include component tests for UI components
- Test edge cases and error scenarios

## Documentation

- Update README.md for new features
- Add JSDoc comments for functions
- Update API documentation
- Include examples in documentation

## Code Review Process

1. **Automated checks** must pass (linting, tests, build)
2. **Code review** by at least one maintainer
3. **Discussion** and feedback incorporation
4. **Approval** and merge

## Questions?

- 💬 **Discussions**: Use GitHub Discussions for questions
- 🐛 **Issues**: Report bugs via GitHub Issues
- 📧 **Email**: Contact maintainers directly

## Recognition

Contributors will be:
- Listed in our README.md
- Mentioned in release notes
- Invited to our contributors' Discord (coming soon)

Thank you for contributing to Soni Dream Diary! 🙏
