import React from 'react';
import { render } from '@testing-library/react-native';
import App from '../App';

it('renders the PatchPoint title', () => {
  const { getByText } = render(<App />);
  expect(getByText('PatchPoint')).toBeTruthy();
});
