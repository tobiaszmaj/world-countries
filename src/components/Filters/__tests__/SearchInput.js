import React from 'react';
import { render } from '../../../../tests/test-utils';
import SearchInput from '../SearchInput';

describe('Search input', () => {
  it('renders properly', () => {
    const { getByPlaceholderText } = render(<SearchInput />);
    const input = getByPlaceholderText(/search for a country/i);

    expect(input).toBeInTheDocument();
  });
});
