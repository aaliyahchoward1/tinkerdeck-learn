# Contributing to TinkerDeck Learn

Thank you for your interest in contributing! We welcome contributions from everyone - whether you're an experienced Arduino developer, an educator, or just an enthusiast who wants to help.

## Ways to Contribute

### 🎓 Create New Lessons
- Design lessons on topics not yet covered
- Create intermediate and advanced lessons
- Add special topics (IoT, robotics, home automation, etc.)

### ✏️ Improve Existing Lessons
- Clarify explanations
- Fix typos and grammar
- Add better diagrams
- Improve code comments
- Add more troubleshooting solutions

### 🐛 Report Issues
- Found a mistake in a lesson?
- Code doesn't compile?
- Wiring diagram unclear?
- Let us know!

### 📚 Translate Lessons
- Help make these lessons available in other languages
- Maintain the quality and spirit of the original content

## Getting Started

### 1. Fork and Clone
```bash
git clone https://github.com/aaliyahchoward1/tinkerdeck-learn.git
cd tinkerdeck-learn
```

### 2. Create a Branch
```bash
git checkout -b feature/your-lesson-name
# or for fixes:
git checkout -b fix/issue-description
```

### 3. Make Your Changes
- Create new lesson directories following the template
- See [LESSON_TEMPLATE.md](LESSON_TEMPLATE.md) for structure
- Follow existing lesson format for consistency

### 4. Test Everything
- Build the project yourself
- Verify all code compiles and works
- Test troubleshooting solutions
- Check wiring diagrams for accuracy

### 5. Commit and Push
```bash
git add .
git commit -m "Add lesson XX: descriptive title"
git push origin feature/your-lesson-name
```

### 6. Submit a Pull Request
- Describe what you added or changed
- Explain why this contribution is valuable
- Link any related issues

## Lesson Content Standards

### Quality Checklist
- [ ] Lesson has clear learning objectives
- [ ] Code is tested and working
- [ ] Wiring diagram is accurate and clear
- [ ] Parts list is complete
- [ ] Troubleshooting covers common issues
- [ ] Writing is clear and beginner-friendly
- [ ] No typos or grammatical errors
- [ ] Follows existing lesson format

### Code Standards
- [ ] Compiles without errors or warnings
- [ ] Uses meaningful variable names
- [ ] Includes helpful comments
- [ ] Follows Arduino coding conventions
- [ ] Works on Arduino Uno
- [ ] Includes a complete example

### Documentation Standards
- [ ] Uses clear, simple language
- [ ] Explains concepts before code
- [ ] Includes examples and diagrams
- [ ] Anticipates common questions
- [ ] Provides realistic difficulty estimates

## Pull Request Process

1. **Describe your changes clearly** - What lesson did you add/improve?
2. **Explain why** - Why is this contribution valuable?
3. **Link issues** - Reference any issues your PR addresses
4. **Be patient** - We review PRs carefully to maintain quality
5. **Respond to feedback** - Be open to suggestions and improvements

## Naming Conventions

### Lessons
- Format: `XX-lesson-slug`
- Example: `05-motion-sensor`
- Use lowercase and hyphens
- Number sequentially

### Commits
- Be descriptive: `"Add lesson 05: motion sensor"`
- Not: `"added stuff"`

### Branches
- Feature: `feature/lesson-name`
- Fix: `fix/issue-description`
- Example: `feature/05-motion-sensor`

## Code of Conduct

We're committed to providing a welcoming environment. Please:
- Be respectful and inclusive
- Assume good intentions
- Provide constructive feedback
- Celebrate each other's contributions

## Questions or Need Help?

- Check [LESSON_TEMPLATE.md](LESSON_TEMPLATE.md) for detailed guidelines
- Look at [lessons/01-blink/](lessons/01-blink/) for a complete example
- Open an issue to ask questions
- Comment on relevant pull requests

## Recognition

Contributors will be recognized in:
- Git commit history
- CONTRIBUTORS.md (coming soon)
- Project README

## License

By contributing, you agree that your contributions will be licensed under the same MIT License as the project.

---

**Thank you for helping make Arduino learning accessible to everyone! 🙏**
