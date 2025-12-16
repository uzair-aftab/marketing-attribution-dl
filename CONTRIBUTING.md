# Contributing to Marketing Attribution DL

Thank you for your interest in contributing to this project! This document outlines the workflow for making enhancements and maintaining the codebase.

## Development Workflow

### For New Enhancements

1. **Create an Issue** (optional but recommended)
   - Document the enhancement you plan to implement
   - Use the issue template in `.github/ISSUE_TEMPLATE/`

2. **Create a Feature Branch**
   ```bash
   git checkout main
   git pull origin main
   git checkout -b feature/your-enhancement-name
   ```

3. **Make Your Changes**
   - Write clean, documented code
   - Follow existing code style and patterns
   - Test your changes thoroughly

4. **Update Documentation**
   - Update `CHANGELOG.md` under `[Unreleased]` section
   - Update `README.md` if adding new features
   - Add comments to complex code sections

5. **Commit Your Changes**
   ```bash
   git add .
   git commit -m "feat: Brief description of enhancement"
   ```

   **Commit Message Convention:**
   - `feat:` - New feature
   - `fix:` - Bug fix
   - `docs:` - Documentation only
   - `refactor:` - Code refactoring
   - `perf:` - Performance improvement
   - `test:` - Adding tests

6. **Push and Create Pull Request**
   ```bash
   git push origin feature/your-enhancement-name
   ```
   - Create a PR on GitHub
   - Link to related issues
   - Describe your changes

7. **Merge and Release**
   - After review, merge to main
   - Update version in CHANGELOG
   - Create a GitHub release with tag

## Code Style Guidelines

### Python/Notebooks
- Follow PEP 8 style guide
- Use descriptive variable names
- Add docstrings to functions
- Keep cells focused and well-documented

### JavaScript (Webapp)
- Use consistent indentation (2 spaces)
- Add comments for complex logic
- Keep functions small and focused

## Project Structure

```
marketing-attribution-dl/
├── notebooks/          # Jupyter notebooks (numbered sequentially)
├── webapp/             # Interactive dashboard
├── data/               # Data files (raw excluded from git)
├── results/            # Output figures and metrics
├── .github/            # GitHub templates
├── CHANGELOG.md        # Version history
└── README.md           # Project documentation
```

## Questions?

If you have questions about the codebase or want to discuss an enhancement before implementing it, feel free to open an issue for discussion.
