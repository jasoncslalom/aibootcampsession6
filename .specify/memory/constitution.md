<!--
Sync Impact Report (v1.0.0 → Created)
===============================================
Version Change: Initial → 1.0.0
Created Principles:
  - I. Code Quality & Architecture
  - II. Testing Standards (NON-NEGOTIABLE)
  - III. Design System Adherence
  - IV. Feature Scope Discipline
  - V. Development Workflow

Added Sections:
  - Core Principles (5 principles)
  - Technology Stack Constraints
  - Quality Gates
  - Governance

Templates Status:
  ✅ .specify/templates/plan-template.md - No updates needed
  ✅ .specify/templates/spec-template.md - No updates needed
  ✅ .specify/templates/tasks-template.md - No updates needed
  ✅ .specify/templates/commands/*.md - No updates needed

Follow-up TODOs: None
-->

# Todo App Copilot Bootcamp Constitution

## Core Principles

### I. Code Quality & Architecture

**All code MUST adhere to established quality standards:**
- **DRY (Don't Repeat Yourself)**: Extract common code into shared functions, utilities, or components. No code duplication across the codebase.
- **KISS (Keep It Simple)**: Prefer simple, straightforward implementations. Avoid premature optimization and overly complex patterns.
- **SOLID Principles**: Single Responsibility per module/component, proper dependency injection, interface segregation, and appropriate abstractions.
- **Consistent Naming**: Use `camelCase` for variables/functions, `PascalCase` for React components/classes, `UPPER_SNAKE_CASE` for constants.
- **Import Organization**: External libraries first, internal modules second, styles last. Separate groups with blank lines.
- **ESLint Compliance**: All code must pass linting without errors or warnings. Address linting issues before committing.

**Rationale**: Consistent code quality standards reduce technical debt, improve maintainability, and enable team members to understand and modify code efficiently.

### II. Testing Standards (NON-NEGOTIABLE)

**Testing is mandatory for all features and follows Test-Driven Development principles:**
- **80%+ Code Coverage**: Minimum coverage target across all packages. Critical user workflows require 100% coverage.
- **Test-First Approach**: Write tests before or alongside implementation. Follow Red-Green-Refactor cycle.
- **Test Types Required**:
  - Unit tests for individual components, functions, and modules
  - Integration tests for component interactions and API communication
  - Focus on behavior, not implementation details
- **Test Isolation**: Tests must be independent, use fixtures/mocks, clean up after themselves.
- **Descriptive Test Names**: Test names must clearly indicate what is being tested using Arrange-Act-Assert pattern.
- **Pre-Commit Requirement**: All tests must pass before committing. Run `npm test` locally before creating pull requests.

**Rationale**: High test coverage and TDD discipline ensure code reliability, catch bugs early, and provide living documentation of system behavior.

### III. Design System Adherence

**All UI implementations MUST follow the established design system:**
- **Color Palette**: Use defined colors for light/dark modes. Primary: Halloween orange (`#ff6b35`/`#ff8c42`), Secondary: deep blue/purple (`#004e89`/`#9d4edd`).
- **Typography**: System fonts with defined hierarchy. Heading: 28px bold, Body: 16px regular, Caption: 12px regular.
- **Spacing System**: 8px grid system. xs=8px, sm=16px, md=24px, lg=32px, xl=48px.
- **Material Design Principles**: Cards with subtle shadows, 4-8px border radius, clear elevation hierarchy.
- **Responsive Layout**: Single column, max-width 600px, proper margins (16px mobile, 32px desktop).
- **Accessibility Standards**: WCAG AA compliance. All interactive elements keyboard accessible, proper color contrast, visible focus indicators, semantic HTML.
- **Dark Mode Support**: Full support with proper color palette switching and localStorage persistence.

**Rationale**: Consistent design system creates a cohesive user experience, improves development velocity through reusable patterns, and ensures accessibility compliance.

### IV. Feature Scope Discipline

**Feature development MUST respect defined scope boundaries:**
- **Core Features Only**: Todo CRUD operations (Create, Read, Update status, Edit details, Delete with confirmation).
- **Single-User Focus**: No authentication, authorization, or multi-user features.
- **Explicitly Out of Scope**:
  - User authentication/authorization
  - Multi-user support or collaboration
  - Priority levels, categories, or tags
  - Recurring todos, reminders, notifications
  - Undo/redo, bulk operations
  - Advanced filtering or search
  - Mobile-specific optimization
- **Simplicity Over Features**: When in doubt, build the simpler solution. Avoid scope creep.
- **Backend Persistence**: All changes persist via Express.js REST API immediately.

**Rationale**: Clear scope boundaries prevent feature creep, maintain simplicity, and ensure the project remains a focused learning tool for the bootcamp.

### V. Development Workflow

**All development follows structured workflow practices:**
- **Monorepo Structure**: Use npm workspaces. Changes in `packages/frontend/` and `packages/backend/` must maintain independence.
- **Git Practices**:
  - Atomic commits: one logical change per commit
  - Clear commit messages explaining the "why"
  - Feature branches (e.g., `feature/todo-editing`)
  - Pull requests for all changes with code review
  - Commit message format: `type: description` (e.g., `feat: add edit todo functionality`)
- **Error Handling**: Try-catch blocks around operations that can fail. Meaningful error messages for users. Log errors appropriately.
- **Code Review Checklist**:
  - Naming conventions followed
  - Imports organized correctly
  - No linting errors/warnings
  - Code is DRY and has single responsibility
  - Error handling implemented
  - Tests written and passing
  - No console.log in production code

**Rationale**: Structured workflow ensures code quality through review, maintains clean git history for learning purposes, and establishes professional development practices.

## Technology Stack Constraints

**Required Technologies:**
- **Frontend**: React, React DOM, CSS, Jest for testing
- **Backend**: Node.js (v16+), Express.js, Jest for testing
- **Package Management**: npm (v7+), npm workspaces for monorepo
- **Linting**: ESLint with project configuration

**Technology Boundaries:**
- No additional frameworks or libraries without explicit justification
- No database schema changes beyond basic todo storage
- Maintain separation between frontend and backend packages
- Use REST API for frontend-backend communication

## Quality Gates

**Pre-Commit Gates:**
1. All ESLint errors and warnings resolved
2. All tests passing (`npm test`)
3. Code formatted and follows style guidelines
4. No unused imports or variables

**Pre-PR Gates:**
1. Feature branch created from main
2. All pre-commit gates passed
3. Tests written for new functionality
4. Code coverage meets 80% threshold
5. Manual testing completed
6. Self-review conducted using code review checklist

**Pre-Merge Gates:**
1. Code review approved by peer or instructor
2. All PR comments addressed
3. CI/CD checks passing (if configured)
4. No merge conflicts with main branch

## Governance

**This constitution supersedes all other development practices and serves as the authoritative source for project standards.**

**Amendment Process:**
- Constitution changes require documentation of rationale and impact
- Version increments follow semantic versioning:
  - MAJOR: Backward incompatible governance/principle removals or redefinitions
  - MINOR: New principle/section added or materially expanded guidance
  - PATCH: Clarifications, wording, typo fixes, non-semantic refinements
- All amendments require sync impact report and template propagation

**Compliance:**
- All code reviews must verify compliance with constitution principles
- Deviations require explicit justification and must be documented
- When in conflict, constitution principles take precedence over external guidelines

**Living Document:**
- This constitution evolves with the project
- Team members can propose amendments through standard PR process
- Regular reviews during bootcamp sessions

**Version**: 1.0.0 | **Ratified**: 2026-03-28 | **Last Amended**: 2026-03-28
