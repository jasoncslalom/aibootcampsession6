# Implementation Plan: Support for Overdue Todo Items

**Branch**: `001-overdue-indicators` | **Date**: 2026-03-28 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-overdue-indicators/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/plan-template.md` for the execution workflow.

## Summary

Add visual indicators to help users identify overdue todo items at a glance. The feature displays a "Past Due" label next to the due date for incomplete todos with past due dates, styled with danger colors from the design system. Priority 1 delivers the text indicator, while Priority 2 enhances visual distinction by applying danger color to the due date text itself. The implementation is frontend-only, using client-side date comparison without requiring backend changes.

## Technical Context

**Language/Version**: JavaScript ES6+, Node.js v16+
**Primary Dependencies**: React, React DOM, CSS for styling, Jest for testing
**Storage**: N/A (frontend-only feature using existing todo data model)
**Testing**: Jest with @testing-library/react for frontend component testing
**Target Platform**: Modern web browsers (Chrome, Firefox, Safari, Edge)
**Project Type**: Web application (React frontend + Express.js backend monorepo)
**Performance Goals**: Overdue status calculation <200ms, immediate visual feedback on status changes
**Constraints**: WCAG AA accessibility (4.5:1 contrast ratio minimum), works in both light/dark modes, no backend modifications
**Scale/Scope**: Single-user application, display-only feature (no sorting/filtering), ~100 todos max in typical usage

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### Code Quality & Architecture
- ✅ **DRY**: Overdue calculation logic will be extracted into a reusable utility function
- ✅ **KISS**: Simple date comparison logic, no complex algorithms
- ✅ **SOLID**: Single responsibility - overdue logic separate from display logic
- ✅ **Naming Conventions**: `calculateIsOverdue`, `OverdueIndicator` component, `DANGER_COLOR_LIGHT`
- ✅ **Import Organization**: External (React) → Internal (utils, components) → Styles

### Testing Standards (NON-NEGOTIABLE)
- ✅ **80%+ Coverage**: Target 100% for new overdue logic and indicator component
- ✅ **Test-First**: Tests will be written before implementation
- ✅ **Test Types**: Unit tests for overdue calculation, integration tests for visual rendering
- ✅ **AAA Pattern**: All tests follow Arrange-Act-Assert structure

### Design System Adherence
- ✅ **Color Palette**: Uses danger colors (`#c62828` light, `#ef5350` dark)
- ✅ **Typography**: 12px caption for "Past Due" text, bold font weight
- ✅ **Spacing**: Maintains 8px grid system (xs spacing between date and indicator)
- ✅ **Accessibility**: WCAG AA contrast compliance, semantic HTML, no color-only indicators
- ✅ **Dark Mode**: Full support with appropriate color switching

### Feature Scope Discipline
- ✅ **Core Features Only**: Display-only enhancement, no sorting/filtering
- ✅ **Single-User Focus**: No multi-user considerations
- ✅ **Out of Scope**: No notifications, reminders, bulk operations, or advanced features
- ✅ **Simplicity**: Straightforward visual indicator, no feature creep

### Development Workflow
- ✅ **Monorepo Structure**: Frontend-only changes, no backend modifications
- ✅ **Git Practices**: Atomic commits, feature branch workflow
- ✅ **Error Handling**: Graceful handling of missing/invalid dates
- ✅ **Code Review**: Will follow checklist before PR

**Constitution Compliance**: ✅ PASS - No violations. Feature aligns with all principles.

**Post-Phase 1 Re-Check**: ✅ PASS - Architecture and design maintain full compliance with all constitution principles. Simple, testable implementation with no additional dependencies or complexity.

## Project Structure

### Documentation (this feature)

```text
specs/001-overdue-indicators/
├── plan.md              # This file
├── spec.md              # Feature specification
├── research.md          # Phase 0 research output
├── data-model.md        # Phase 1 data model (minimal - derived field only)
├── quickstart.md        # Phase 1 quickstart guide
└── checklists/
    └── requirements.md  # Spec quality checklist
```

### Source Code (repository root)

```text
packages/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── TodoCard.js             # UPDATE: Add overdue indicator display
│   │   │   ├── TodoCard.css            # UPDATE: Add overdue styling
│   │   │   └── __tests__/
│   │   │       └── TodoCard.test.js    # UPDATE: Add overdue indicator tests
│   │   ├── utils/
│   │   │   ├── dateUtils.js            # NEW: Overdue calculation logic
│   │   │   └── __tests__/
│   │   │       └── dateUtils.test.js   # NEW: Overdue logic unit tests
│   │   └── App.css                     # UPDATE: Add danger color constants
│   └── package.json
└── backend/
    └── (no changes required)
```

**Structure Decision**: Web application structure (Option 2 from template). This is a frontend-only feature that modifies existing React components in `packages/frontend/src/components/` and adds new utility functions in `packages/frontend/src/utils/`. No backend changes are required since overdue status is calculated client-side.

## Complexity Tracking

> **No violations to track** - Feature passes all constitution checks without requiring complexity justifications.
