import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TodoListItem from './TodoListItem';

describe('TodoListItem component', () => {
  const mockItem = {
    task: 'Task 1',
    completed: false
  };
  const mockIndex = 0;
  const mockDeleteItem = jest.fn();
  const mockOnSaveChanges = jest.fn();
  const mockOnCheckboxChange = jest.fn();

  test('renders TodoListItem component', () => {
    render(
      <TodoListItem
        message={mockItem}
        index={mockIndex}
        deleteItem={mockDeleteItem}
        onSaveChanges={mockOnSaveChanges}
        onCheckboxChange={mockOnCheckboxChange}
      />
    );
    const taskElement = screen.getByText('Task 1');
    expect(taskElement).toBeInTheDocument();
  });

  test('toggles edit mode when edit button is clicked', () => {
    render(
      <TodoListItem
        message={mockItem}
        index={mockIndex}
        deleteItem={mockDeleteItem}
        onSaveChanges={mockOnSaveChanges}
        onCheckboxChange={mockOnCheckboxChange}
      />
    );
    const editButton = screen.getByText('Edit');

    fireEvent.click(editButton);

    const inputElement = screen.getByDisplayValue('Task 1');
    expect(inputElement).toBeInTheDocument();
  });

  test('calls onSaveChanges function with updated message when save button is clicked', () => {
    render(
      <TodoListItem
        message={mockItem}
        index={mockIndex}
        deleteItem={mockDeleteItem}
        onSaveChanges={mockOnSaveChanges}
        onCheckboxChange={mockOnCheckboxChange}
      />
    );
    const editButton = screen.getByText('Edit');

    fireEvent.click(editButton);

    const inputElement = screen.getByDisplayValue('Task 1');
    fireEvent.change(inputElement, { target: { value: 'Task 1 Updated' } });

    const saveButton = screen.getByText('Save');
    fireEvent.click(saveButton);

    expect(mockOnSaveChanges).toHaveBeenCalledTimes(1);
    expect(mockOnSaveChanges).toHaveBeenCalledWith(mockIndex, 'Task 1 Updated');
  });

  test('calls toggleEditMode function when Escape key is pressed', () => {
    render(
      <TodoListItem
        message={mockItem}
        index={mockIndex}
        deleteItem={mockDeleteItem}
        onSaveChanges={mockOnSaveChanges}
        onCheckboxChange={mockOnCheckboxChange}
      />
    );
    const editButton = screen.getByText('Edit');

    fireEvent.click(editButton);

    const inputElement = screen.getByDisplayValue('Task 1');
    fireEvent.keyDown(inputElement, { key: 'Escape', keyCode: 27 });

    expect(inputElement).not.toBeInTheDocument();
  });

  test('calls deleteItem function when delete button is clicked', () => {
    render(
      <TodoListItem
        message={mockItem}
        index={mockIndex}
        deleteItem={mockDeleteItem}
        onSaveChanges={mockOnSaveChanges}
        onCheckboxChange={mockOnCheckboxChange}
      />
    );
    const deleteButton = screen.getByText('Delete');

    fireEvent.click(deleteButton);

    expect(mockDeleteItem).toHaveBeenCalledTimes(1);
  });

  test('calls onCheckboxChange function with correct index and checked value when checkbox is changed', () => {
    render(
      <TodoListItem
        message={mockItem}
        index={mockIndex}
        deleteItem={mockDeleteItem}
        onSaveChanges={mockOnSaveChanges}
        onCheckboxChange={mockOnCheckboxChange}
      />
    );
    const checkbox = screen.getByRole('checkbox');

    fireEvent.click(checkbox);

    expect(mockOnCheckboxChange).toHaveBeenCalledTimes(1);
    expect(mockOnCheckboxChange).toHaveBeenCalledWith(mockIndex, true);
  });
});
