/**
 * Date utility functions for todo application
 */

/**
 * Determines if a todo item is overdue
 * @param {Object} todo - The todo item object
 * @param {string} todo.dueDate - ISO date string (YYYY-MM-DD)
 * @param {boolean} todo.completed - Whether the todo is completed
 * @returns {boolean} True if todo is overdue, false otherwise
 */
export function isOverdue(todo) {
  // If todo is completed, it's never overdue
  if (todo.completed) {
    return false;
  }

  // If there's no due date, it's not overdue
  if (!todo.dueDate) {
    return false;
  }

  // Parse the due date and normalize to midnight
  const dueDate = new Date(todo.dueDate);

  // Check if date is invalid
  if (isNaN(dueDate.getTime())) {
    return false;
  }

  // Normalize due date to midnight (start of day)
  dueDate.setHours(0, 0, 0, 0);

  // Get today's date normalized to midnight
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Overdue if due date is strictly before today
  return dueDate < today;
}
