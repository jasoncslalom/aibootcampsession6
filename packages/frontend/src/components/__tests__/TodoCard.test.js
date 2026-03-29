import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TodoCard from '../TodoCard';

describe('TodoCard Component', () => {
  const mockTodo = {
    id: 1,
    title: 'Test Todo',
    dueDate: '2027-12-25', // Updated to future date to avoid overdue indicator in tests
    completed: 0,
    createdAt: '2025-11-01T00:00:00Z'
  };

  const mockHandlers = {
    onToggle: jest.fn(),
    onEdit: jest.fn(),
    onDelete: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render todo title and due date', () => {
    render(<TodoCard todo={mockTodo} {...mockHandlers} isLoading={false} />);
    
    expect(screen.getByText('Test Todo')).toBeInTheDocument();
    expect(screen.getByText(/December 24, 2027/)).toBeInTheDocument(); // UTC date converts to Dec 24 in local time
  });

  it('should render unchecked checkbox when todo is incomplete', () => {
    render(<TodoCard todo={mockTodo} {...mockHandlers} isLoading={false} />);
    
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();
  });

  it('should render checked checkbox when todo is complete', () => {
    const completedTodo = { ...mockTodo, completed: 1 };
    render(<TodoCard todo={completedTodo} {...mockHandlers} isLoading={false} />);
    
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
  });

  it('should call onToggle when checkbox is clicked', () => {
    render(<TodoCard todo={mockTodo} {...mockHandlers} isLoading={false} />);
    
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    
    expect(mockHandlers.onToggle).toHaveBeenCalledWith(mockTodo.id);
  });

  it('should show edit button', () => {
    render(<TodoCard todo={mockTodo} {...mockHandlers} isLoading={false} />);
    
    const editButton = screen.getByLabelText(/Edit/);
    expect(editButton).toBeInTheDocument();
  });

  it('should show delete button', () => {
    render(<TodoCard todo={mockTodo} {...mockHandlers} isLoading={false} />);
    
    const deleteButton = screen.getByLabelText(/Delete/);
    expect(deleteButton).toBeInTheDocument();
  });

  it('should call onDelete when delete button is clicked and confirmed', () => {
    window.confirm = jest.fn(() => true);
    render(<TodoCard todo={mockTodo} {...mockHandlers} isLoading={false} />);
    
    const deleteButton = screen.getByLabelText(/Delete/);
    fireEvent.click(deleteButton);
    
    expect(mockHandlers.onDelete).toHaveBeenCalledWith(mockTodo.id);
  });

  it('should enter edit mode when edit button is clicked', () => {
    render(<TodoCard todo={mockTodo} {...mockHandlers} isLoading={false} />);
    
    const editButton = screen.getByLabelText(/Edit/);
    fireEvent.click(editButton);
    
    expect(screen.getByDisplayValue('Test Todo')).toBeInTheDocument();
  });

  it('should apply completed class when todo is completed', () => {
    const completedTodo = { ...mockTodo, completed: 1 };
    const { container } = render(<TodoCard todo={completedTodo} {...mockHandlers} isLoading={false} />);
    
    const card = container.querySelector('.todo-card');
    expect(card).toHaveClass('completed');
  });

  it('should not render due date when dueDate is null', () => {
    const todoNoDate = { ...mockTodo, dueDate: null };
    render(<TodoCard todo={todoNoDate} {...mockHandlers} isLoading={false} />);

    expect(screen.queryByText(/Due:/)).not.toBeInTheDocument();
  });

  // T019: Integration test - Past Due appears for overdue todo
  it('should display "Past Due" indicator for incomplete todo with past due date', () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const pastDate = yesterday.toISOString().split('T')[0];

    const overdueTodo = { ...mockTodo, dueDate: pastDate, completed: 0 };
    render(<TodoCard todo={overdueTodo} {...mockHandlers} isLoading={false} />);

    expect(screen.getByText('Past Due')).toBeInTheDocument();
  });

  // T020: Integration test - Past Due hidden for completed todo
  it('should NOT display "Past Due" indicator for completed todo with past due date', () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const pastDate = yesterday.toISOString().split('T')[0];

    const completedOverdueTodo = { ...mockTodo, dueDate: pastDate, completed: 1 };
    render(<TodoCard todo={completedOverdueTodo} {...mockHandlers} isLoading={false} />);

    expect(screen.queryByText('Past Due')).not.toBeInTheDocument();
  });

  // T021: Integration test - Past Due hidden for today's date
  it('should NOT display "Past Due" indicator for todo due today', () => {
    const today = new Date().toISOString().split('T')[0];

    const todayTodo = { ...mockTodo, dueDate: today, completed: 0 };
    render(<TodoCard todo={todayTodo} {...mockHandlers} isLoading={false} />);

    expect(screen.queryByText('Past Due')).not.toBeInTheDocument();
  });

  // T022: Integration test - Past Due hidden for future date
  it('should NOT display "Past Due" indicator for todo with future due date', () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const futureDate = tomorrow.toISOString().split('T')[0];

    const futureTodo = { ...mockTodo, dueDate: futureDate, completed: 0 };
    render(<TodoCard todo={futureTodo} {...mockHandlers} isLoading={false} />);

    expect(screen.queryByText('Past Due')).not.toBeInTheDocument();
  });

  // T023: Integration test - Past Due hidden when no due date
  it('should NOT display "Past Due" indicator when todo has no due date', () => {
    const noDateTodo = { ...mockTodo, dueDate: null, completed: 0 };
    render(<TodoCard todo={noDateTodo} {...mockHandlers} isLoading={false} />);

    expect(screen.queryByText('Past Due')).not.toBeInTheDocument();
  });

  // T026: Integration test - overdue-date class applied when overdue
  it('should apply overdue-date class to due date text for incomplete overdue todo', () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const pastDate = yesterday.toISOString().split('T')[0];

    const overdueTodo = { ...mockTodo, dueDate: pastDate, completed: 0 };
    const { container } = render(<TodoCard todo={overdueTodo} {...mockHandlers} isLoading={false} />);

    const dueDateElement = container.querySelector('.todo-due-date');
    expect(dueDateElement).toHaveClass('overdue-date');
  });

  // T027: Integration test - overdue-date class NOT applied when not overdue
  it('should NOT apply overdue-date class to due date text for non-overdue todo', () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const futureDate = tomorrow.toISOString().split('T')[0];

    const futureTodo = { ...mockTodo, dueDate: futureDate, completed: 0 };
    const { container } = render(<TodoCard todo={futureTodo} {...mockHandlers} isLoading={false} />);

    const dueDateElement = container.querySelector('.todo-due-date');
    expect(dueDateElement).not.toHaveClass('overdue-date');
  });
});
