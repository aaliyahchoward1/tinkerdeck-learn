#!/usr/bin/env python3
"""
Lesson validation script for tinkerdeck-learn.
Checks that all lessons follow the correct structure and format.
"""

import os
import json
import sys
from pathlib import Path

# Color codes for terminal output
class Colors:
    GREEN = '\033[92m'
    YELLOW = '\033[93m'
    RED = '\033[91m'
    RESET = '\033[0m'
    BOLD = '\033[1m'

def check_lesson(lesson_path):
    """Validate a single lesson directory."""
    errors = []
    warnings = []

    lesson_name = lesson_path.name

    # Check required files
    required_files = {
        'lesson.yaml': 'Lesson metadata',
        'lesson.md': 'Lesson content',
        'troubleshooting.md': 'Troubleshooting guide',
    }

    for filename, description in required_files.items():
        filepath = lesson_path / filename
        if not filepath.exists():
            errors.append(f"Missing {description}: {filename}")

    # Check required directories
    required_dirs = {
        'code': 'Code directory with Arduino sketches',
        'wiring': 'Wiring directory with diagrams and parts list',
    }

    for dirname, description in required_dirs.items():
        dirpath = lesson_path / dirname
        if not dirpath.exists():
            errors.append(f"Missing directory: {dirname} ({description})")
        elif not dirpath.is_dir():
            errors.append(f"{dirname} exists but is not a directory")

    # Check code directory has .ino files
    code_dir = lesson_path / 'code'
    if code_dir.exists():
        ino_files = list(code_dir.glob('*.ino'))
        if not ino_files:
            warnings.append("No .ino files found in code/ directory")

    # Check wiring directory contents
    wiring_dir = lesson_path / 'wiring'
    if wiring_dir.exists():
        if not (wiring_dir / 'parts.json').exists():
            errors.append("Missing wiring/parts.json")
        if not (wiring_dir / 'diagram.md').exists():
            errors.append("Missing wiring/diagram.md")

        # Validate parts.json
        parts_json = wiring_dir / 'parts.json'
        if parts_json.exists():
            try:
                with open(parts_json) as f:
                    parts_data = json.load(f)
                if 'components' not in parts_data:
                    errors.append("parts.json missing 'components' key")
            except json.JSONDecodeError as e:
                errors.append(f"parts.json is not valid JSON: {e}")

    # Validate lesson.yaml format
    yaml_file = lesson_path / 'lesson.yaml'
    if yaml_file.exists():
        try:
            import yaml
            with open(yaml_file) as f:
                lesson_data = yaml.safe_load(f)

            required_fields = ['id', 'title', 'difficulty', 'objectives', 'materials']
            for field in required_fields:
                if field not in lesson_data:
                    errors.append(f"lesson.yaml missing required field: {field}")

            # Check difficulty level
            valid_difficulties = ['Beginner', 'Intermediate', 'Advanced']
            if 'difficulty' in lesson_data and lesson_data['difficulty'] not in valid_difficulties:
                warnings.append(f"Unusual difficulty level: {lesson_data['difficulty']}")

        except Exception as e:
            errors.append(f"Error reading lesson.yaml: {e}")

    return errors, warnings


def main():
    """Main validation function."""
    lessons_dir = Path('lessons')

    if not lessons_dir.exists():
        print(f"{Colors.RED}Error: lessons/ directory not found{Colors.RESET}")
        sys.exit(1)

    # Find all lesson directories
    lesson_dirs = sorted([d for d in lessons_dir.iterdir() if d.is_dir() and d.name[0].isdigit()])

    if not lesson_dirs:
        print(f"{Colors.YELLOW}No lessons found{Colors.RESET}")
        return 0

    total_errors = 0
    total_warnings = 0

    print(f"{Colors.BOLD}Checking {len(lesson_dirs)} lessons...{Colors.RESET}\n")

    for lesson_path in lesson_dirs:
        errors, warnings = check_lesson(lesson_path)

        if errors or warnings:
            print(f"{Colors.BOLD}{lesson_path.name}{Colors.RESET}")

            for error in errors:
                print(f"  {Colors.RED}✗ {error}{Colors.RESET}")
                total_errors += 1

            for warning in warnings:
                print(f"  {Colors.YELLOW}⚠ {warning}{Colors.RESET}")
                total_warnings += 1

            print()
        else:
            print(f"{Colors.GREEN}✓{Colors.RESET} {lesson_path.name}")

    # Summary
    print(f"\n{Colors.BOLD}Summary:{Colors.RESET}")
    if total_errors == 0 and total_warnings == 0:
        print(f"{Colors.GREEN}All lessons valid!{Colors.RESET}")
        return 0
    else:
        if total_errors > 0:
            print(f"{Colors.RED}{total_errors} errors{Colors.RESET}")
        if total_warnings > 0:
            print(f"{Colors.YELLOW}{total_warnings} warnings{Colors.RESET}")

        return 1 if total_errors > 0 else 0


if __name__ == '__main__':
    sys.exit(main())
