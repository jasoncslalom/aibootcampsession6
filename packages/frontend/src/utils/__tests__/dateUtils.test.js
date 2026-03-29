/**
 * Tests for date utility functions
 */

import { isOverdue } from '../dateUtils';

describe('isOverdue', () => {
  // T008: Returns true for past incomplete todos
  test('returns true for incomplete todo with past due date', () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const pastDate = yesterday.toISOString().split('T')[0]; // YYYY-MM-DD

    const todo = {
      dueDate: pastDate,
      completed: false
    };

    expect(isOverdue(todo)).toBe(true);
  });

  // T009: Returns false for past completed todos
  test('returns false for completed todo with past due date', () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const pastDate = yesterday.toISOString().split('T')[0];

    const todo = {
      dueDate: pastDate,
      completed: true
    };

    expect(isOverdue(todo)).toBe(false);
  });

  // T010: Returns false for today's date
  test('returns false for todo due today', () => {
    const today = new Date().toISOString().split('T')[0];

    const todo = {
      dueDate: today,
      completed: false
    };

    expect(isOverdue(todo)).toBe(false);
  });

  // T011: Returns false for future date
  test('returns false for todo with future due date', () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const futureDate = tomorrow.toISOString().split('T')[0];

    const todo = {
      dueDate: futureDate,
      completed: false
    };

    expect(isOverdue(todo)).toBe(false);
  });

  // T012: Returns false for null due date
  test('returns false for todo without due date', () => {
    const todo = {
      dueDate: null,
      completed: false
    };

    expect(isOverdue(todo)).toBe(false);
  });

  // T013: Returns false for invalid date string
  test('returns false for invalid date string', () => {
    const todo = {
      dueDate: 'invalid-date',
      completed: false
    };

    expect(isOverdue(todo)).toBe(false);
  });
});
