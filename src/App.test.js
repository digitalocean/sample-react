import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders david vandal', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/david vandal/i);
  expect(linkElement).toBeInTheDocument();
});
