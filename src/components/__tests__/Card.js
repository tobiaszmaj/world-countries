import React from 'react';
import { render, waitForElement } from '@testing-library/react';
import ThemeProvider from '../../contexts/ThemeContext';
import Card from '../Card/Card';

const renderComponent = ({
  countryName,
  visible,
  region,
  capital,
  flag,
  population,
}) =>
  render(
    <ThemeProvider>
      <Card
        visible={visible}
        region={region}
        countryName={countryName}
        capital={capital}
        flag={flag}
        population={population}
      />
    </ThemeProvider>
  );

describe('Card', () => {
  it('renders greeting', async () => {
    const { getByText } = renderComponent({
      visible: true,
      region: 'Europe',
      countryName: 'Poland',
      capital: 'Warsaw',
      flag: 'flag',
      population: 123,
    });

    await waitForElement(() => getByText(/population/i));
  });
});
