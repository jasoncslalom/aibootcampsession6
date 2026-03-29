# Feature Specification: Support for Overdue Todo Items

**Feature Branch**: `001-overdue-indicators`
**Created**: 2026-03-28
**Status**: Draft
**Input**: User description: "Support for Overdue Todo Items - Users need a clear, visual way to identify which todos have not been completed by their due date"

## Clarifications

### Session 2026-03-28

- Q: What text should the overdue indicator display? → A: Past Due
- Q: Where should the "Past Due" indicator be positioned in the todo card? → A: Next to/after the due date display (grouped with date information)
- Q: How should the "Past Due" indicator be styled? → A: Text label in danger color with bold font weight (balanced visibility)
- Q: Which todo card elements should receive the enhanced danger color styling for overdue items (Priority 2)? → A: Apply danger color to both the "Past Due" indicator and the due date text
- Q: How should the overdue status update when the current date changes (making previously non-overdue items overdue)? → A: Requires page refresh/reload (status updates only when page loads or data refreshes)

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Visual Overdue Indicator (Priority: P1)

As a todo application user, I want to see a clear visual indicator when a todo item is overdue, so that I can immediately identify which tasks are past their due date without manually comparing dates.

**Why this priority**: This is the core feature request and provides immediate value. Users can instantly spot overdue items in their todo list, improving task prioritization and time management.

**Independent Test**: Can be fully tested by creating a todo with a past due date and verifying that it displays with an overdue indicator. Delivers immediate value by making overdue status visible at a glance.

**Acceptance Scenarios**:

1. **Given** a todo item with a due date in the past and incomplete status, **When** I view the todo list, **Then** the overdue todo displays a "Past Due" text label or badge positioned next to the due date

2. **Given** a todo item with a due date in the past, **When** I mark it as complete, **Then** the overdue indicator is no longer displayed

3. **Given** a todo item with a due date of today, **When** I view the todo list, **Then** no overdue indicator is shown (only items past today's date are overdue)

4. **Given** a todo item with no due date, **When** I view the todo list, **Then** no overdue indicator is shown

5. **Given** a todo item with a future due date, **When** I view the todo list, **Then** no overdue indicator is shown

---

### User Story 2 - Enhanced Visual Styling for Overdue Items (Priority: P2)

As a todo application user, I want overdue todo items to be visually distinct through color and styling, so that they stand out prominently in the list and catch my attention immediately.

**Why this priority**: Enhances the basic visual indicator with color coding for better visibility and quicker scanning. Complements P1 by making overdue items more noticeable.

**Independent Test**: Can be tested by creating overdue todos and verifying they display with distinctive styling (e.g., red text or warning color). Works independently as a visual enhancement layer on top of P1.

**Acceptance Scenarios**:

1. **Given** a todo item with an overdue status, **When** I view the todo list, **Then** the due date text displays in danger color (`#c62828` for light mode, `#ef5350` for dark mode) along with the "Past Due" indicator

2. **Given** multiple overdue todos in the list, **When** I scan the list, **Then** all overdue items are visually consistent and easily distinguishable from non-overdue items

3. **Given** an overdue todo in dark mode, **When** I view the list, **Then** the overdue styling adapts appropriately to maintain visibility and contrast

---

### Edge Cases

- What happens when a todo's due date transitions from today to yesterday at midnight (becomes overdue)? **Answer: The overdue status will update when the user refreshes the page or when the todo data is reloaded; no automatic real-time update occurs.**
- How does the system handle todos with due dates far in the past (e.g., months or years overdue)? **Answer: All past-due incomplete todos display the same "Past Due" indicator regardless of how long ago the due date was.**
- What happens when the system clock or timezone changes? **Answer: Overdue status is recalculated based on the browser's current date at page load/refresh.**
- How are overdue todos displayed when the list contains many items (does styling remain consistent)? **Answer: Styling remains consistent for all overdue items regardless of list size.**

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST calculate whether a todo is overdue by comparing its due date against the current date (today)
- **FR-002**: System MUST display a "Past Due" text label for incomplete todos with due dates in the past, positioned next to or after the due date display, styled with danger color and bold font weight
- **FR-003**: System MUST NOT display overdue indicators for completed todos, regardless of their due date
- **FR-004**: System MUST NOT display overdue indicators for todos without a due date
- **FR-005**: System MUST NOT consider today's date as overdue (only dates strictly before today are overdue)
- **FR-006**: System MUST apply the danger color (`#c62828` for light mode, `#ef5350` for dark mode) to the "Past Due" text label
- **FR-007**: System MUST apply danger color to the due date text for overdue items (Priority 2 enhancement - applies danger color to both the "Past Due" indicator and the due date itself)
- **FR-008**: Overdue indicators MUST be visible in both light and dark modes with appropriate color adaptation
- **FR-009**: System MUST recalculate overdue status when a todo's due date is updated
- **FR-010**: System MUST recalculate overdue status when a todo's completion status changes
- **FR-011**: System calculates overdue status based on the current date at page load or data refresh (no automatic real-time updates when the date changes)

### Key Entities

- **Todo Item**: Existing entity with attributes: id, title, dueDate (optional), completed (boolean), createdAt. The overdue status is derived from these attributes, not stored separately.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users can identify overdue todos within 2 seconds of viewing the todo list without reading individual due dates
- **SC-002**: 100% of incomplete todos with past due dates display the overdue indicator accurately
- **SC-003**: Overdue styling maintains WCAG AA contrast standards in both light and dark modes (minimum 4.5:1 contrast ratio)
- **SC-004**: Overdue status updates immediately when a todo's due date or completion status changes (within 200ms of user action)

## Assumptions

- Users' browsers/devices have accurate system clocks for date comparison
- The existing todo data model already includes `dueDate` as an optional field
- Date comparison uses the user's local timezone (browser's date) for determining "today"
- Overdue status is calculated on the frontend for immediate visual feedback without requiring backend changes
- No sorting or filtering features are added (explicitly out of scope per project guidelines)
- No notification or reminder features are added (explicitly out of scope per project guidelines)
- The overdue indicator is a visual-only enhancement that doesn't change todo ordering in the list
