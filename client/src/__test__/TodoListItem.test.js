import React from 'react';
import { render } from '@testing-library/react';
import TodoListItem from '../components/Todo/TodoListItem';

test('renders TodoListItem component without errors', () => {
  const mockProps = {
    message: { task: 'Sample Task', completed: false },
    index: 0,
    deleteItem: jest.fn(),
    onSaveChanges: jest.fn(),
    onCheckboxChange: jest.fn(),
  };

  render(<TodoListItem {...mockProps} />);
});
