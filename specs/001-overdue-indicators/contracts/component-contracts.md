# Component Contracts: Support for Overdue Todo Items

**Feature**: 001-overdue-indicators
**Date**: 2026-03-28
**Phase**: 1 - Design & Contracts

## Overview

This document defines the interface contracts for components and utilities modified or created for the overdue indicators feature.

## 1. dateUtils.js - Utility Module

### Function: `isOverdue(dueDateString, completed)`

**Purpose**: Determines if a todo item is overdue based on its due date and completion status.

**Signature**:
```javascript
/**
 * Determines if a todo is overdue
 * @param {string|null|undefined} dueDateString - ISO 8601 date string (YYYY-MM-DD)
 * @param {boolean} completed - Whether the todo is completed
 * @returns {boolean} true if incomplete and due date is before today, false otherwise
 */
function isOverdue(dueDateString, completed)
```

**Input Contract**:
| Parameter | Type | Required | Valid Values | Default Behavior |
|-----------|------|----------|--------------|------------------|
| `dueDateString` | string \| null \| undefined | Yes | ISO 8601 date (YYYY-MM-DD) or null/undefined | null/undefined → returns false |
| `completed` | boolean | Yes | true or false | N/A (must be provided) |

**Output Contract**:
| Return Value | Condition |
|--------------|-----------|
| `true` | `dueDateString` is valid date AND `completed` is false AND date < today |
| `false` | `dueDateString` is null/undefined/invalid OR `completed` is true OR date >= today |

**Behavior Guarantees**:
- Pure function (no side effects)
- Deterministic (same inputs → same output)
- Synchronous (no async operations)
- Timezone-aware (uses browser's local timezone)
- Gracefully handles invalid inputs (returns false, never throws)

**Examples**:
```javascript
// Today is 2026-03-28

isOverdue('2026-03-01', false) // → true (past & incomplete)
isOverdue('2026-03-01', true)  // → false (past but completed)
isOverdue('2026-03-28', false) // → false (today, not past)
isOverdue('2026-04-01', false) // → false (future date)
isOverdue(null, false)         // → false (no due date)
isOverdue(undefined, false)    // → false (no due date)
isOverdue('invalid', false)    // → false (invalid date)
```

**Edge Cases**:
- Empty string `''` → treated as invalid, returns false
- Malformed dates `'2026-13-45'` → treated as invalid, returns false
- Non-date strings `'hello'` → treated as invalid, returns false
- Dates with time components `'2026-03-01T14:30:00Z'` → time ignored, compared at day level

---

## 2. TodoCard Component (Modified)

### Component: `<TodoCard />`

**Purpose**: Display a single todo item with overdue indicator when applicable.

**Props Contract**:
```javascript
PropTypes: {
  todo: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    dueDate: PropTypes.string, // ISO 8601 or null/undefined
    completed: PropTypes.bool.isRequired,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
  onToggle: PropTypes.func, // Optional callback
  onEdit: PropTypes.func,   // Optional callback
  onDelete: PropTypes.func, // Optional callback
}
```

**Input Expectations**:
- `todo.dueDate` can be null, undefined, or valid ISO 8601 date string
- `todo.completed` must be boolean (true/false)
- Component must work with existing TodoCard interface (no breaking changes)

**Rendering Contract**:

| Condition | Rendered Output |
|-----------|----------------|
| `isOverdue()` returns true | Shows "Past Due" text next to due date, applies `.overdue-indicator` class |
| `isOverdue()` returns false | Shows only due date, no "Past Due" text |
| No due date (null/undefined) | Shows no due date section, no "Past Due" text |
| Priority 1 implementation | "Past Due" text in bold, danger color |
| Priority 2 implementation | Due date text also in danger color |

**CSS Classes Applied**:
- `.overdue-indicator` - Applied to "Past Due" span
- `.overdue-date` - Applied to due date text when overdue (Priority 2)
- Classes follow existing TodoCard CSS conventions

**Accessibility Contract**:
- "Past Due" text is readable by screen readers
- Color contrast meets WCAG AA (4.5:1 minimum)
- No color-only indicators (text label always present)
- Semantic HTML (use `<span>` for indicator)

**Example Rendering**:
```javascript
// Overdue incomplete todo (Priority 1)
<div className="todo-card">
  <span className="due-date">
    2026-03-01
    <span className="overdue-indicator">Past Due</span>
  </span>
</div>

// Overdue incomplete todo (Priority 2)
<div className="todo-card">
  <span className="due-date overdue-date">
    2026-03-01
    <span className="overdue-indicator">Past Due</span>
  </span>
</div>

// Completed overdue todo
<div className="todo-card">
  <span className="due-date">2026-03-01</span>
  {/* No "Past Due" indicator */}
</div>

// Future due date
<div className="todo-card">
  <span className="due-date">2026-04-01</span>
  {/* No "Past Due" indicator */}
</div>
```

---

## 3. CSS Styling Contract

### Class: `.overdue-indicator`

**Applied To**: Span containing "Past Due" text

**Required Styles**:
```css
.overdue-indicator {
  color: var(--color-danger);      /* #c62828 light, #ef5350 dark */
  font-weight: 700;                 /* Bold */
  font-size: 12px;                  /* Caption size */
  margin-left: 8px;                 /* xs spacing */
}
```

**Must Respect**:
- Design system color variables
- 8px spacing grid (margin-left: 8px)
- Typography hierarchy (12px caption)

### Class: `.overdue-date` (Priority 2)

**Applied To**: Due date span when todo is overdue

**Required Styles**:
```css
.overdue-date {
  color: var(--color-danger);      /* Matches indicator color */
}
```

**Dark Mode**:
- Must use CSS custom properties for theme switching
- Must maintain WCAG AA contrast in both modes

---

## 4. Testing Contract

### Unit Tests (dateUtils.test.js)

**Must Test**:
- All truth table scenarios (past/future/today × complete/incomplete)
- Null and undefined inputs
- Invalid date strings
- Edge case: midnight boundary (yesterday → today transition)
- Edge case: leap years, end of month dates

**Coverage Requirement**: 100% for utility function

### Integration Tests (TodoCard.test.js)

**Must Test**:
- "Past Due" indicator appears for overdue incomplete todos
- "Past Due" indicator hidden for completed todos (even if past due)
- "Past Due" indicator hidden for todos due today
- "Past Due" indicator hidden for future todos
- "Past Due" indicator hidden when no due date
- Priority 2: due date receives `.overdue-date` class

**Coverage Requirement**: 100% for new overdue indicator rendering logic

---

## 5. Non-Functional Contracts

### Performance

**Guaranteed**:
- Overdue calculation completes in <200ms per spec
- Typical: <0.03ms per todo item
- No blocking operations
- No network calls

**Constraints**:
- Must not cause TodoCard re-render loops
- Must not impact todo list load time

### Accessibility

**Guaranteed**:
- WCAG AA compliance (4.5:1 contrast minimum)
- Text label present (not color-only)
- Screen reader accessible
- Works with keyboard navigation
- No color-blind user issues (text label primary indicator)

### Browser Compatibility

**Supported Browsers**:
- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)

**Guaranteed**:
- Date comparison works in all supported browsers
- CSS custom properties supported (all modern browsers)
- No polyfills required

---

## 6. Backwards Compatibility

**Breaking Changes**: None

**Component Interface Changes**: None to public API

**TodoCard Props**: No changes (all additions are internal)

**Existing Tests**: Should continue to pass (new tests are additive)

**Migration Required**: None (feature addition only)

---

## Summary

| Contract Type | Component/Module | Breaking Changes | New Exports |
|---------------|------------------|------------------|-------------|
| Utility Function | `dateUtils.js` | None | `isOverdue()` |
| React Component | `TodoCard` | None | None (internal only) |
| CSS Classes | `TodoCard.css` | None | `.overdue-indicator`, `.overdue-date` |
| Testing | `dateUtils.test.js`, `TodoCard.test.js` | None | New test files |

**Contract Stability**: All contracts are additions only. No existing interfaces are modified or removed.
