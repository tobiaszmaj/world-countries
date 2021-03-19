import React from 'react';
import SearchInput from 'components/Filters/SearchInput';
import { render, fireEvent } from 'tests/test-utils';

describe('Search input', () => {
  const { getByPlaceholderText } = render(<SearchInput />);
  const input = getByPlaceholderText(/search for a country/i);

  it('renders properly', () => {
    expect(input).toBeInTheDocument();
  });

  it('displays proper values', () => {
    fireEvent.change(input, { target: { value: 'country' } });
    expect(input.value).toBe('country');
  });
});
