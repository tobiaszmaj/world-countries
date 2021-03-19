import React from 'react';
import Dropdown from 'components/Filters/Dropdown';
import { render } from 'tests/test-utils';

describe('Dropdown', () => {
  it('renders select properly', () => {
    const { getByText } = render(<Dropdown />);
    const select = getByText(/filter by region/i);

    expect(select).toBeInTheDocument();
  });

  it('renders dropdown properly', () => {
    const { container } = render(<Dropdown />);
    const dropdown = container.querySelector('ul');

    expect(dropdown).toBeInTheDocument();
  });

  it('displays "All" as first option in dropdown', () => {
    const { container } = render(<Dropdown />);
    const firstOption = container.querySelector('li');

    expect(firstOption).toHaveTextContent('All');
  });

  it('Renders every region passed to dropdown', () => {
    const { getByText } = render(<Dropdown />);
    const firstRegion = getByText(/someregion1/);
    const secondRegion = getByText(/someregion2/);
    const thirdRegion = getByText(/someregion3/);

    expect(firstRegion).toBeInTheDocument();
    expect(secondRegion).toBeInTheDocument();
    expect(thirdRegion).toBeInTheDocument();
  });
});
