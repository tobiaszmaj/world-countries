import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import GlobalStyle from 'theme/GlobalStyle';
import Navbar from 'components/Navbar/Navbar';
import ReturnToTop from 'components/ReturnToTop/ReturnToTop';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeProvider from 'contexts/ThemeContext';
import FiltersProvider from 'contexts/FiltersContext/FiltersContext';
import usePathname from 'hooks/usePathname';

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

const Layout = ({ children }) => {
  const pathname = usePathname();

  return (
    <ThemeProvider>
      <FiltersProvider>
        <GlobalStyle />
        <Navbar />
        <Wrapper>
          <AnimatePresence>
            <motion.div
              key={pathname}
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
      </FiltersProvider>
    </ThemeProvider>
  );
};

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Layout;
