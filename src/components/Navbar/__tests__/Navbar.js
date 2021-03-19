import React from 'react';
import Navbar from 'components/Navbar/Navbar';
import { render } from 'tests/test-utils';

describe('Search input', () => {
  it('renders properly', () => {
    const { container } = render(<Navbar />);
    const navbar = container.querySelector('nav');

    expect(navbar).toBeInTheDocument();
  });

  it('displays title', () => {
    const { getByText } = render(<Navbar />);
    const title = getByText('Where in the world?');

    expect(title).toBeInTheDocument();
  });

  it('displays dark mode button', () => {
    const { container } = render(<Navbar />);
    const button = container.querySelector('button');

    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(/dark mode/i);
  });
});
