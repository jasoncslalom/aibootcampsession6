# Quickstart: Overdue Todo Indicators

**Feature**: 001-overdue-indicators
**For**: Developers implementing the overdue todo visual indicators
**Time to Read**: 3-5 minutes

## What We're Building

Add a "Past Due" label next to the due date of incomplete todos that are past their due date. The label appears in danger red (matching the Halloween theme), helping users quickly identify overdue items.

**Visual Example**:
```
┌─────────────────────────────────────────┐
│ [ ] Buy pumpkins                        │
│     📅 2026-03-01  Past Due             │
│                    ↑                     │
│                    New indicator         │
└─────────────────────────────────────────┘
```

---

## 🎯 Core Requirements

| Priority | What | Why |
|----------|------|-----|
| **P1** | "Past Due" text label next to date | Makes overdue status immediately visible |
| **P2** | Danger color on both label and date | Enhanced visual distinction |

**Key Rules**:
- Only show for incomplete todos (completed = false)
- Only show for past dates (before today)
- Today's date is NOT overdue
- No indicator if no due date

---

## 📁 Files You'll Modify

```
packages/frontend/src/
├── utils/
│   ├── dateUtils.js              # NEW - Add isOverdue() function
│   └── __tests__/
│       └── dateUtils.test.js     # NEW - Test the function
├── components/
│   ├── TodoCard.js               # UPDATE - Add indicator display
│   ├── TodoCard.css              # UPDATE - Add overdue styles
│   └── __tests__/
│       └── TodoCard.test.js      # UPDATE - Test indicator rendering
└── App.css                       # UPDATE - Add danger color variables (if not present)
```

---

## ⚡ Quick Implementation Guide

### Step 1: Create the Utility Function (5 min)

**File**: `packages/frontend/src/utils/dateUtils.js` (NEW)

```javascript
/**
 * Determines if a todo is overdue
 * @param {string|null} dueDateString - ISO 8601 date (YYYY-MM-DD)
 * @param {boolean} completed - Whether the todo is completed
 * @returns {boolean} true if incomplete and past due
 */
export function isOverdue(dueDateString, completed) {
  // Not overdue if completed or no due date
  if (completed || !dueDateString) {
    return false;
  }

  try {
    // Normalize to midnight for day-level comparison
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const dueDate = new Date(dueDateString);
    dueDate.setHours(0, 0, 0, 0);

    // Overdue if due date is before today
    return dueDate < today;
  } catch {
    // Invalid date → not overdue
    return false;
  }
}
```

**Why This Works**:
- Setting hours to 00:00:00 ensures we compare days, not times
- Uses browser's local timezone automatically
- Returns false for invalid inputs (graceful degradation)

---

### Step 2: Add Tests (10 min)

**File**: `packages/frontend/src/utils/__tests__/dateUtils.test.js` (NEW)

```javascript
import { isOverdue } from '../dateUtils';

describe('isOverdue', () => {
  // Mock today's date for consistent tests
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2026-03-28'));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('returns true for past date and incomplete', () => {
    expect(isOverdue('2026-03-01', false)).toBe(true);
  });

  test('returns false for past date but completed', () => {
    expect(isOverdue('2026-03-01', true)).toBe(false);
  });

  test('returns false for today (not past)', () => {
    expect(isOverdue('2026-03-28', false)).toBe(false);
  });

  test('returns false for future date', () => {
    expect(isOverdue('2026-04-01', false)).toBe(false);
  });

  test('returns false for null due date', () => {
    expect(isOverdue(null, false)).toBe(false);
  });

  test('returns false for undefined due date', () => {
    expect(isOverdue(undefined, false)).toBe(false);
  });

  test('returns false for invalid date string', () => {
    expect(isOverdue('not-a-date', false)).toBe(false);
  });
});
```

**Run Tests**: `npm test --workspace=frontend`

---

### Step 3: Update TodoCard Component (10 min)

**File**: `packages/frontend/src/components/TodoCard.js` (UPDATE)

```javascript
// Add import at top
import { isOverdue } from '../utils/dateUtils';

function TodoCard({ todo, onToggle, onEdit, onDelete }) {
  const overdue = isOverdue(todo.dueDate, todo.completed);

  return (
    <div className="todo-card">
      {/* Existing checkbox code */}
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />

      {/* Existing title code */}
      <span className="todo-title">{todo.title}</span>

      {/* UPDATE: Add overdue styling to due date */}
      {todo.dueDate && (
        <span className={`due-date ${overdue ? 'overdue-date' : ''}`}>
          {todo.dueDate}
          {overdue && <span className="overdue-indicator">Past Due</span>}
        </span>
      )}

      {/* Existing action buttons code */}
    </div>
  );
}
```

**What Changed**:
1. Import `isOverdue` utility
2. Calculate `overdue` boolean
3. Add `overdue-date` class conditionally (P2)
4. Add "Past Due" span conditionally (P1)

---

### Step 4: Add CSS Styles (5 min)

**File**: `packages/frontend/src/components/TodoCard.css` (UPDATE)

```css
/* Priority 1: Past Due indicator */
.overdue-indicator {
  color: var(--color-danger);
  font-weight: 700;
  font-size: 12px;
  margin-left: 8px;
}

/* Priority 2: Danger color on due date text */
.overdue-date {
  color: var(--color-danger);
}
```

**Color Variables** (add to `App.css` if not present):
```css
:root {
  --color-danger: #c62828; /* Light mode red */
}

[data-theme="dark"] {
  --color-danger: #ef5350; /* Dark mode red */
}
```

---

### Step 5: Add Component Tests (10 min)

**File**: `packages/frontend/src/components/__tests__/TodoCard.test.js` (UPDATE)

```javascript
import { render, screen } from '@testing-library/react';
import TodoCard from '../TodoCard';

// Mock the date utility
jest.mock('../../utils/dateUtils', () => ({
  isOverdue: jest.fn()
}));

import { isOverdue } from '../../utils/dateUtils';

describe('TodoCard - Overdue Indicators', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('displays Past Due indicator for overdue todo', () => {
    isOverdue.mockReturnValue(true);

    const overdueTodo = {
      id: '1',
      title: 'Test Todo',
      dueDate: '2026-03-01',
      completed: false
    };

    render(<TodoCard todo={overdueTodo} />);

    expect(screen.getByText('Past Due')).toBeInTheDocument();
  });

  test('does not display Past Due for non-overdue todo', () => {
    isOverdue.mockReturnValue(false);

    const futureTodo = {
      id: '1',
      title: 'Test Todo',
      dueDate: '2026-04-01',
      completed: false
    };

    render(<TodoCard todo={futureTodo} />);

    expect(screen.queryByText('Past Due')).not.toBeInTheDocument();
  });

  test('applies overdue-date class when overdue', () => {
    isOverdue.mockReturnValue(true);

    const overdueTodo = {
      id: '1',
      title: 'Test Todo',
      dueDate: '2026-03-01',
      completed: false
    };

    const { container } = render(<TodoCard todo={overdueTodo} />);

    const dueDateElement = container.querySelector('.due-date');
    expect(dueDateElement).toHaveClass('overdue-date');
  });
});
```

---

## ✅ Testing Checklist

Before creating a PR, verify:

- [ ] `npm test --workspace=frontend` passes
- [ ] Create a todo with past due date → see "Past Due" in red
- [ ] Complete the todo → "Past Due" disappears
- [ ] Create todo with today's date → no "Past Due" shown
- [ ] Create todo with future date → no "Past Due" shown
- [ ] Toggle dark mode → red color changes appropriately
- [ ] ESLint passes (no warnings)

---

## 🔍 Common Issues & Solutions

| Issue | Cause | Fix |
|-------|-------|-----|
| "Past Due" shows for today | Forgot to normalize to midnight | Use `setHours(0,0,0,0)` |
| Shows for completed todos | Missing `completed` check | Add `if (completed) return false` |
| Date comparison broken | Timezone issues | Let `Date` use browser's timezone |
| Tests fail with date | Hardcoded dates in tests | Use `jest.useFakeTimers()` |
| CSS not applying | Missing color variables | Add `--color-danger` to App.css |

---

## 📚 Key Decisions (From Research)

1. **Why no date library?** Native `Date` is sufficient, no dependencies needed
2. **Why calculate on render?** Performance is excellent (<0.03ms), no memoization needed
3. **Why text + color?** WCAG accessibility requires not relying on color alone
4. **Why no backend changes?** Client-side calculation is faster and simpler

---

## 🎨 Design System Values

| Element | Value | Rationale |
|---------|-------|-----------|
| Text | "Past Due" | Clear, concise, user-friendly |
| Color (light) | `#c62828` | Danger red from design system |
| Color (dark) | `#ef5350` | Lighter red for dark mode |
| Font weight | 700 (bold) | Added emphasis |
| Font size | 12px | Caption size (per typography) |
| Spacing | 8px margin-left | xs spacing (8px grid) |

---

## 🚀 Next Steps

After implementation:
1. Run full test suite: `npm test`
2. Manual testing in browser (light + dark mode)
3. Create commit: `git commit -m "feat: add overdue todo indicators"`
4. Push to branch: `git push origin 001-overdue-indicators`
5. Create PR referencing `specs/001-overdue-indicators/spec.md`

---

## 📖 Related Documentation

- **Full Spec**: `specs/001-overdue-indicators/spec.md`
- **Technical Plan**: `specs/001-overdue-indicators/plan.md`
- **Research**: `specs/001-overdue-indicators/research.md`
- **Data Model**: `specs/001-overdue-indicators/data-model.md`
- **Contracts**: `specs/001-overdue-indicators/contracts/component-contracts.md`
- **Constitution**: `.specify/memory/constitution.md`

---

**Estimated Implementation Time**: 40-60 minutes (including testing)

**Questions?** Refer to research.md for technical details or contracts/component-contracts.md for API specifications.
