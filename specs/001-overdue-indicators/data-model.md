# Data Model: Support for Overdue Todo Items

**Feature**: 001-overdue-indicators
**Date**: 2026-03-28
**Phase**: 1 - Design & Contracts

## Overview

This feature does not introduce new entities or modify the existing data model. The overdue status is a **derived field** calculated client-side from existing `Todo` entity attributes.

## Entities

### Todo (Existing - No Changes)

The existing Todo entity remains unchanged. Overdue status is computed, not stored.

**Attributes**:
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | String | Yes | Unique identifier |
| `title` | String | Yes | Todo item title (max 255 chars) |
| `dueDate` | String (ISO 8601) | No | Optional due date in format `YYYY-MM-DD` |
| `completed` | Boolean | Yes | Completion status (true/false) |
| `createdAt` | String (ISO 8601) | Yes | Timestamp when todo was created |

**No Schema Changes Required**: The feature works with the existing data model.

---

## Derived Fields

### isOverdue (Computed)

**Type**: Boolean
**Computed From**: `dueDate`, `completed`, current date
**Calculation**: See `utils/dateUtils.js` in implementation

**Logic**:
```
isOverdue = (dueDate exists) AND (completed is false) AND (dueDate < today)

Where:
  - today = current date at 00:00:00 (midnight) in user's local timezone
  - dueDate = parsed date from dueDate string at 00:00:00 (midnight)
  - Comparison is strictly less than (< not <=)
```

**Truth Table**:
| dueDate | completed | today's date | isOverdue | Reason |
|---------|-----------|--------------|-----------|--------|
| null | false | any | false | No due date set |
| 2026-03-01 | false | 2026-03-28 | **true** | Past due and incomplete |
| 2026-03-01 | true | 2026-03-28 | false | Past due but completed |
| 2026-03-28 | false | 2026-03-28 | false | Due today (not past due) |
| 2026-03-30 | false | 2026-03-28 | false | Future due date |

**Recalculation Triggers**:
- Page load/refresh
- Todo `dueDate` updated
- Todo `completed` status changes
- Component re-render

**Not Triggered By** (per clarification):
- Real-time clock changes (no automatic midnight updates)
- Requires manual page refresh to detect new day

---

## Data Flow

```
Backend (Express.js)
  │
  │ REST API
  │ GET /api/todos
  │
  ▼
Frontend (React)
  │
  │ Receives: Todo[] with { id, title, dueDate, completed, createdAt }
  │
  ▼
TodoCard Component
  │
  │ Calculates: isOverdue = isOverdue(todo.dueDate, todo.completed)
  │
  ▼
Conditional Rendering
  │
  ├─ if (isOverdue) → Render "Past Due" indicator with danger styling
  └─ if (!isOverdue) → Render only due date (no indicator)
```

**Key Points**:
- No backend changes
- No database changes
- No API changes
- Pure frontend derivation
- Stateless calculation (no caching needed)

---

## Validation Rules

### Input Validation (Existing)
- `dueDate` must be valid ISO 8601 date string (if provided)
- `completed` must be boolean
- Handled by existing backend validation

### Derived Field Validation
- Invalid `dueDate` strings → treated as no due date (returns false)
- Missing `dueDate` → returns false
- Malformed dates → graceful fallback (returns false)

---

## State Management

**No State Changes Required**:
- Overdue status is not stored in React state
- Recalculated on every render (acceptable performance per research)
- No Redux/Context updates needed
- No local storage involvement

**Rendering**:
```javascript
function TodoCard({ todo }) {
  const overdue = isOverdue(todo.dueDate, todo.completed);

  return (
    <div className="todo-card">
      <span className="due-date">{todo.dueDate}</span>
      {overdue && <span className="overdue-indicator">Past Due</span>}
    </div>
  );
}
```

---

## Data Integrity

**Consistency**:
- Derived field always consistent with source data (dueDate, completed)
- No stale data issues (recalculated each render)
- No synchronization problems (no stored state)

**Race Conditions**:
- None (client-side only, synchronous calculation)

**Data Migration**:
- None required (no schema changes)

---

## Performance Implications

**Memory**:
- No additional data stored
- No memory overhead

**Computation**:
- O(1) per todo item
- ~0.03ms per calculation
- Total for 100 todos: ~3ms
- Well within 200ms requirement ✅

**Network**:
- No additional API calls
- No payload size increase

---

## Testing Considerations

### Unit Tests (dateUtils.test.js)
- Test all truth table scenarios
- Test edge cases (null, undefined, invalid dates)
- Test timezone handling
- Test midnight boundary conditions

### Integration Tests (TodoCard.test.js)
- Test indicator appears for overdue incomplete todos
- Test indicator hidden for completed todos
- Test indicator hidden for future/today dates
- Test indicator hidden when no due date

---

## Summary

| Aspect | Impact |
|--------|--------|
| New Entities | None |
| Modified Entities | None |
| Derived Fields | `isOverdue` (boolean) |
| Backend Changes | None |
| Database Changes | None |
| API Changes | None |
| State Management | None |
| Performance | Negligible (<3ms for 100 items) |

This is a **pure presentation layer feature** with zero data model changes.
