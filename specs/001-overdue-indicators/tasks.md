# Tasks: Support for Overdue Todo Items

**Input**: Design documents from `/specs/001-overdue-indicators/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Tests are INCLUDED per project constitution (Testing Standards NON-NEGOTIABLE: Test-First Approach mandatory)

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2)
- Include exact file paths in descriptions

## Path Conventions

- **Web app**: `packages/frontend/src/`, `packages/backend/src/`
- Backend: No changes required for this feature
- Frontend paths: `packages/frontend/src/components/`, `packages/frontend/src/utils/`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Verify project structure and dependencies are ready

- [ ] T001 Verify packages/frontend/src/components/TodoCard.js exists
- [ ] T002 Verify packages/frontend/src/components/TodoCard.css exists
- [ ] T003 [P] Verify Jest and @testing-library/react are in frontend dependencies
- [ ] T004 [P] Create packages/frontend/src/utils/ directory if it doesn't exist

**Checkpoint**: Project structure verified - ready for feature implementation

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core utility infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T005 [P] Create packages/frontend/src/utils/dateUtils.js with function skeleton
- [ ] T006 [P] Create packages/frontend/src/utils/__tests__/ directory
- [ ] T007 [P] Add danger color CSS variables to packages/frontend/src/App.css if not present

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Visual Overdue Indicator (Priority: P1) 🎯 MVP

**Goal**: Display "Past Due" text label in danger color (bold) next to due date for overdue incomplete todos

**Independent Test**: Create todo with past due date → verify "Past Due" indicator appears; complete the todo → verify indicator disappears

### Tests for User Story 1 (Test-First - REQUIRED) ⚠️

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [ ] T008 [P] [US1] Write unit test: isOverdue returns true for past incomplete in packages/frontend/src/utils/__tests__/dateUtils.test.js
- [ ] T009 [P] [US1] Write unit test: isOverdue returns false for past completed in packages/frontend/src/utils/__tests__/dateUtils.test.js
- [ ] T010 [P] [US1] Write unit test: isOverdue returns false for today's date in packages/frontend/src/utils/__tests__/dateUtils.test.js
- [ ] T011 [P] [US1] Write unit test: isOverdue returns false for future date in packages/frontend/src/utils/__tests__/dateUtils.test.js
- [ ] T012 [P] [US1] Write unit test: isOverdue returns false for null due date in packages/frontend/src/utils/__tests__/dateUtils.test.js
- [ ] T013 [P] [US1] Write unit test: isOverdue returns false for invalid date string in packages/frontend/src/utils/__tests__/dateUtils.test.js
- [ ] T014 [US1] Run tests to verify they fail (npm test --workspace=frontend) - expected RED state

### Implementation for User Story 1

- [ ] T015 [US1] Implement isOverdue function in packages/frontend/src/utils/dateUtils.js (normalize dates to midnight, compare with today)
- [ ] T016 [US1] Run unit tests to verify they pass (npm test --workspace=frontend) - expected GREEN state
- [ ] T017 [US1] Add "Past Due" indicator rendering logic to packages/frontend/src/components/TodoCard.js (import isOverdue, conditionally render span)
- [ ] T018 [US1] Add .overdue-indicator CSS class to packages/frontend/src/components/TodoCard.css (danger color, bold 700, 12px, 8px margin)
- [ ] T019 [P] [US1] Write integration test: Past Due appears for overdue todo in packages/frontend/src/components/__tests__/TodoCard.test.js
- [ ] T020 [P] [US1] Write integration test: Past Due hidden for completed todo in packages/frontend/src/components/__tests__/TodoCard.test.js
- [ ] T021 [P] [US1] Write integration test: Past Due hidden for today's date in packages/frontend/src/components/__tests__/TodoCard.test.js
- [ ] T022 [P] [US1] Write integration test: Past Due hidden for future date in packages/frontend/src/components/__tests__/TodoCard.test.js
- [ ] T023 [P] [US1] Write integration test: Past Due hidden when no due date in packages/frontend/src/components/__tests__/TodoCard.test.js
- [ ] T024 [US1] Run all tests to verify implementation (npm test --workspace=frontend) - expect 100% pass
- [ ] T025 [US1] Run ESLint to verify no warnings (npm run lint --workspace=frontend if configured)

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently. Users can see "Past Due" in bold danger color next to overdue todos.

---

## Phase 4: User Story 2 - Enhanced Visual Styling (Priority: P2)

**Goal**: Apply danger color to due date text itself for overdue items (enhances visual distinction beyond P1)

**Independent Test**: Create overdue todo → verify both "Past Due" label AND due date text display in danger color

### Tests for User Story 2 (Test-First - REQUIRED) ⚠️

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [ ] T026 [P] [US2] Write integration test: overdue-date class applied when overdue in packages/frontend/src/components/__tests__/TodoCard.test.js
- [ ] T027 [P] [US2] Write integration test: overdue-date class NOT applied when not overdue in packages/frontend/src/components/__tests__/TodoCard.test.js
- [ ] T028 [US2] Run tests to verify they fail (npm test --workspace=frontend) - expected RED state

### Implementation for User Story 2

- [ ] T029 [US2] Update TodoCard.js to conditionally add .overdue-date class to due date span in packages/frontend/src/components/TodoCard.js
- [ ] T030 [US2] Add .overdue-date CSS class to packages/frontend/src/components/TodoCard.css (danger color for text)
- [ ] T031 [US2] Run tests to verify they pass (npm test --workspace=frontend) - expected GREEN state
- [ ] T032 [P] [US2] Manual test in light mode: verify danger color on both label and date
- [ ] T033 [P] [US2] Manual test in dark mode: verify appropriate danger color adaptation
- [ ] T034 [US2] Run ESLint to verify no warnings (npm run lint --workspace=frontend if configured)

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently. Overdue items now have enhanced visual distinction with danger color on both indicator and date text.

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Final validation and quality checks across all user stories

- [ ] T035 [P] Run full test suite and verify 80%+ coverage (npm test --workspace=frontend -- --coverage)
- [ ] T036 [P] Manual testing checklist: Create todo with past date → see "Past Due" in red
- [ ] T037 [P] Manual testing checklist: Complete overdue todo → "Past Due" disappears
- [ ] T038 [P] Manual testing checklist: Create todo with today's date → no "Past Due"
- [ ] T039 [P] Manual testing checklist: Create todo with future date → no "Past Due"
- [ ] T040 [P] Manual testing checklist: Create todo without due date → no "Past Due"
- [ ] T041 [P] Manual testing checklist: Toggle dark mode → danger colors adapt
- [ ] T042 Verify WCAG AA contrast compliance (danger colors meet 4.5:1 ratio)
- [ ] T043 Run quickstart validation per packages/frontend/src/utils/dateUtils.js and TodoCard.js changes
- [ ] T044 Final ESLint check across all modified files (npm run lint --workspace=frontend)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3 & 4)**: Both depend on Foundational phase completion
  - US1 and US2 can proceed sequentially (P1 first, then P2)
  - US2 builds on US1 (requires US1 complete)
- **Polish (Phase 5)**: Depends on both user stories complete

### User Story Dependencies

- **User Story 1 (P1) - MVP**: Can start after Foundational (Phase 2) - No dependencies
- **User Story 2 (P2) - Enhancement**: Depends on User Story 1 complete (adds styling to existing indicator)

### Within Each User Story

- Tests MUST be written and FAIL before implementation (TDD required per constitution)
- Utility function (dateUtils.js) before component updates
- Component logic before CSS styling
- Integration tests after implementation
- Manual testing after automated tests pass

### Parallel Opportunities

- **Setup Phase**: T001-T004 all parallelizable (different files, verification only)
- **Foundational Phase**: T005-T007 all parallelizable (different files)
- **US1 Tests**: T008-T013 all parallelizable (same test file, different tests)
- **US1 Integration Tests**: T019-T023 all parallelizable (same test file, different scenarios)
- **US2 Tests**: T026-T027 parallelizable (same test file, different tests)
- **US2 Manual Tests**: T032-T033 parallelizable (independent test scenarios)
- **Polish Phase**: T035-T041 all parallelizable (independent validation tasks)

---

## Parallel Example: User Story 1 Tests

```bash
# Launch all unit tests for dateUtils together (Phase 3 - Tests):
Task T008: "Write unit test: isOverdue returns true for past incomplete"
Task T009: "Write unit test: isOverdue returns false for past completed"
Task T010: "Write unit test: isOverdue returns false for today's date"
Task T011: "Write unit test: isOverdue returns false for future date"
Task T012: "Write unit test: isOverdue returns false for null due date"
Task T013: "Write unit test: isOverdue returns false for invalid date string"

# Then sequentially: Run tests (T014), implement function (T015), verify green (T016)

# Launch all integration tests for TodoCard together (Phase 3 - Implementation):
Task T019: "Write integration test: Past Due appears for overdue todo"
Task T020: "Write integration test: Past Due hidden for completed todo"
Task T021: "Write integration test: Past Due hidden for today's date"
Task T022: "Write integration test: Past Due hidden for future date"
Task T023: "Write integration test: Past Due hidden when no due date"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (verify structure)
2. Complete Phase 2: Foundational (create utility skeleton, add CSS variables)
3. Complete Phase 3: User Story 1 (TDD: tests → implementation → validation)
4. **STOP and VALIDATE**: Test User Story 1 independently with manual testing
5. **DEMO READY**: Basic "Past Due" indicator functional

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready (~5-10 min)
2. Add User Story 1 → Test independently → Demo (MVP!) (~30-40 min with TDD)
3. Add User Story 2 → Test independently → Demo (Enhanced styling) (~15-20 min)
4. Polish phase → Final validation (~10-15 min)
5. **Total Time**: 60-85 minutes (with full TDD and testing)

### Execution Order Recommendation

**For Single Developer**:
1. Phase 1 (Setup): 5 min
2. Phase 2 (Foundational): 5 min
3. Phase 3 (US1): 40 min (TDD cycle: RED → GREEN → REFACTOR)
4. Phase 4 (US2): 20 min (TDD cycle: RED → GREEN)
5. Phase 5 (Polish): 15 min
**Total**: ~85 minutes

**For Two Developers** (less efficient due to US2 dependency on US1):
- Dev A: Phases 1-3 (US1 complete)
- Dev B: Wait for US1, then Phase 4 (US2)
- Both: Phase 5 (Polish) in parallel
**Total**: ~90 minutes (not much faster due to dependencies)

---

## Notes

- [P] tasks = different files or independent test cases, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- **TDD Required**: Verify tests fail before implementing (RED → GREEN → REFACTOR)
- Commit after logical groups (e.g., after RED state, after GREEN state, after REFACTOR)
- Stop at each checkpoint to validate story independently
- US2 depends on US1 (enhances existing indicator), so cannot run fully in parallel
- All test tasks marked [P] within a story can be written simultaneously
- Constitution requires 80%+ coverage - aim for 100% on new code

---

## Test Coverage Goals

**Per Constitution (Testing Standards - NON-NEGOTIABLE)**:

| Component | Target Coverage | Rationale |
|-----------|-----------------|-----------|
| dateUtils.js | 100% | Pure utility function, critical business logic |
| TodoCard.js (new code) | 100% | Core feature logic, user-facing |
| Overall frontend package | 80%+ | Constitutional minimum |

**Test Count**: 19 total test tasks (T008-T013: 6 unit, T014: verification, T019-T023: 5 integration, T026-T028: 3 integration)

**Validation**: Task T035 verifies coverage meets constitutional requirements
