import React from 'react';
import { render } from '@testing-library/react';
import TodoForm from '../components/Todo/TodoForm';

test('renders TodoForm component without errors', () => {
  const mockGetItem = jest.fn();

  render(<TodoForm getItem={mockGetItem} />);
});
