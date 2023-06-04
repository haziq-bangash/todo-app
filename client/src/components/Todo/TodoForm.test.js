import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TodoForm from './TodoForm';

describe('TodoForm component', () => {
  test('renders TodoForm component', () => {
    render(<TodoForm getItem={() => {}} />);
    const inputElement = screen.getByPlaceholderText('Be Amazing!');
    expect(inputElement).toBeInTheDocument();
  });

  test('calls getItem function with correct item object when form is submitted', () => {
    const getItemMock = jest.fn();
    render(<TodoForm getItem={getItemMock} />);
    const inputElement = screen.getByPlaceholderText('Be Amazing!');
    const addButton = screen.getByText('Add');

    fireEvent.change(inputElement, { target: { value: 'Task 1' } });
    fireEvent.click(addButton);

    expect(getItemMock).toHaveBeenCalledTimes(1);
    expect(getItemMock).toHaveBeenCalledWith({ task: 'Task 1', completed: false });
  });

  test('focuses on the input element if it is empty', () => {
    render(<TodoForm getItem={() => {}} />);
    const inputElement = screen.getByPlaceholderText('Be Amazing!');

    fireEvent.click(screen.getByText('Add'));

    expect(inputElement).toHaveFocus();
  });

  test('clears the input element value after form submission', () => {
    render(<TodoForm getItem={() => {}} />);
    const inputElement = screen.getByPlaceholderText('Be Amazing!');
    const addButton = screen.getByText('Add');

    fireEvent.change(inputElement, { target: { value: 'Task 1' } });
    fireEvent.click(addButton);

    expect(inputElement.value).toBe('');
  });
});
