import React from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeProvider } from 'styled-components';
import GlobalStyle from 'theme/GlobalStyle';
import useTheme from 'hooks/useTheme';

const Wrapper = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: 1440px;
`;

const Layout = ({ children }) => {
  const { theme } = useTheme();
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Wrapper>{children}</Wrapper>
    </ThemeProvider>
  );
};

Layout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Layout;
