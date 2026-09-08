# How to Create a Lesson

This guide explains the structure and format for creating lessons in tinkerdeck-learn.

## Directory Structure

Each lesson should follow this structure:

```
lessons/XX-lesson-name/
├── lesson.yaml           # Metadata and lesson info
├── lesson.md             # Main lesson content
├── code/
│   └── main-sketch.ino   # Arduino code file(s)
├── wiring/
│   ├── diagram.md        # Wiring diagram (text or description)
│   └── parts.json        # Bill of materials
└── troubleshooting.md    # Common problems and solutions
```

## Lesson Files Explained

### 1. lesson.yaml
Metadata file defining lesson properties. Use this template:

```yaml
id: "XX-lesson-name"
title: "Lesson Title: Catchy Subtitle"
difficulty: "Beginner|Intermediate|Advanced"
duration_minutes: 30
objectives:
  - Learning objective 1
  - Learning objective 2
skills:
  - Skill 1
  - Skill 2
prerequisites:
  - "Previous lesson ID (if any)"
materials:
  - Component 1
  - Component 2
concepts:
  - Core concept 1
  - Core concept 2
tags:
  - tag1
  - tag2
description: "One sentence describing what the student will build"
```

### 2. lesson.md
The main lesson content. Structure:

```markdown
# Lesson X: Title

## Introduction
Brief hook and relevance

## What You'll Learn
- Bullet point learning outcomes

## Concepts
Explain the theory before practice

## Step-by-Step Instructions
Detailed, numbered instructions

## The Code Explained
Line-by-line breakdown

## Challenges
Optional harder tasks

## Tips & Tricks
Useful hints

## Key Takeaways
Summary of main points
```

**Best Practices:**
- Use clear, beginner-friendly language
- Include code examples with syntax highlighting
- Add diagrams using markdown if possible
- Keep sections short and scannable
- Include "why" not just "how"

### 3. code/*.ino
Arduino sketch files:

- Use `/*.../*/` for header comment explaining the sketch
- Add inline comments for non-obvious lines
- Use meaningful variable names
- Keep code clean and readable
- Include working example code

**Example:**
```cpp
/*
  Lesson Title
  Brief description of what this sketch does.
*/

const int PIN_NAME = 13;

void setup() {
  // Initialize here
  pinMode(PIN_NAME, OUTPUT);
}

void loop() {
  // Main program logic
  digitalWrite(PIN_NAME, HIGH);
  delay(1000);
}
```

### 4. wiring/parts.json
Bill of materials in JSON format:

```json
{
  "components": [
    {
      "id": "component-id",
      "name": "Component Name",
      "quantity": 1,
      "description": "What it does",
      "specifications": {
        "key": "value"
      }
    }
  ],
  "cost_estimate": {
    "currency": "USD",
    "total": 50,
    "notes": "Optional notes"
  }
}
```

### 5. wiring/diagram.md
Circuit diagram using text art or description:

```markdown
# Circuit Diagram

## Text Diagram
ASCII art representation

## Pin Connections
Table of which component connects to which Arduino pin

## Step-by-Step Wiring
Detailed instructions for building the circuit

## Safety Notes
Important warnings or tips
```

### 6. troubleshooting.md
Common problems and solutions:

```markdown
# Troubleshooting Guide

## Problem: Something doesn't work

### Possible Causes & Solutions:
1. Cause 1
   - Solution

2. Cause 2
   - Solution

## Success Checklist
✓ Item 1
✓ Item 2
```

## Lesson Naming Convention

Use this naming format:
- `XX-lesson-slug` where XX is the lesson number (01, 02, etc.)
- Use lowercase and hyphens
- Examples: `01-blink`, `02-button-input`, `03-temperature-sensor`

## Difficulty Levels

- **Beginner**: No prior knowledge required, basic Arduino concepts
- **Intermediate**: Requires 1-2 prior lessons, introduces new components/concepts
- **Advanced**: Requires several prior lessons, complex interactions or physics

## Content Guidelines

### Keep It Short
- Each lesson should take 15-45 minutes
- Focus on one main concept or project
- Save advanced topics for follow-up lessons

### Make It Hands-On
- Start with working code students can run
- Then explain how it works
- Include challenges for learning extensions

### Test Your Content
- Actually build the project yourself
- Test all troubleshooting solutions
- Get feedback from someone unfamiliar with Arduino

### Write for Beginners
- Avoid jargon without explanation
- Explain "why" not just "how"
- Include diagrams and examples
- Anticipate common confusion points

## Checklist Before Publishing

- [ ] All files created and in correct directories
- [ ] lesson.yaml is valid (can use yamllint)
- [ ] Code compiles and works on Arduino Uno
- [ ] Wiring diagram is clear and accurate
- [ ] Parts list includes all materials needed
- [ ] Troubleshooting covers common issues
- [ ] Links work (if any)
- [ ] No typos or grammatical errors
- [ ] Formatting is consistent with other lessons

## Examples

See `lessons/01-blink/` for a complete example lesson.

## Questions?

Check existing lessons for patterns and examples!
