import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders digitalocean docs', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/DigitalOcean Docs/i);
  expect(linkElement).toBeInTheDocument();
});
