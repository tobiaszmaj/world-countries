import React from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeProvider } from 'styled-components';
import GlobalStyle from 'theme/GlobalStyle';
import Navbar from 'components/Navbar/Navbar';
import ReturnToTop from 'components/ReturnToTop/ReturnToTop';
import { motion, AnimatePresence } from 'framer-motion';
import useTheme from 'hooks/useTheme';

const Wrapper = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: 1440px;
  padding: 60px 20px 30px;
  ${({ theme }) => theme.mq.xs} {
    padding: 80px 20px 40px;
  }
`;

const variants = {
  initial: {
    opacity: 0,
    x: -50,
  },
  enter: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
      delay: 0.3,
      when: 'beforeChildren',
    },
  },
  exit: {
    opacity: 0,
    x: 50,
    transition: { duration: 0.3 },
  },
};

const Layout = ({ children, location }) => {
  const { theme } = useTheme();

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Navbar />
      <Wrapper>
        <AnimatePresence>
          <motion.div
            key={location.pathname}
            variants={variants}
            initial="initial"
            animate="enter"
            exit="exit"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </Wrapper>
      <ReturnToTop />
    </ThemeProvider>
  );
};

Layout.propTypes = {
  location: PropTypes.objectOf(PropTypes.string).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Layout;
