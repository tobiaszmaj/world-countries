/* eslint-disable react/prop-types */
import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { baseTheme, lightTheme } from '../src/theme/mainTheme';

const AllTheProviders = ({ children }) => {
  return (
    <ThemeProvider theme={{ ...baseTheme, ...lightTheme }}>
      {children}
    </ThemeProvider>
  );
};

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
