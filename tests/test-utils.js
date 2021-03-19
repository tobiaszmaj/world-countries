/* eslint-disable react/prop-types */
import React from 'react';
import { render } from '@testing-library/react';
import ThemeProvider from 'contexts/ThemeContext';
import FiltersProvider from 'contexts/FiltersContext/FiltersContext';

const countries = [
  {
    name: 'somecountry1',
    capital: 'somecapital1',
    flag: 'someflag1.svg',
    region: 'someregion1',
    population: 123456789,
  },
  {
    name: 'somecountry2',
    capital: 'somecapital2',
    flag: 'someflag2.svg',
    region: 'someregion2',
    population: 123456789,
  },
  {
    name: 'somecountry3',
    capital: 'somecapital3',
    flag: 'someflag3.svg',
    region: 'someregion3',
    population: 123456789,
  },
];

const AllTheProviders = ({ children }) => {
  return (
    <FiltersProvider nodes={countries}>
      <ThemeProvider>{children}</ThemeProvider>
    </FiltersProvider>
  );
};

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
