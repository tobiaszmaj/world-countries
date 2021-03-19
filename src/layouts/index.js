import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useStaticQuery, graphql } from 'gatsby';
import GlobalStyle from 'theme/GlobalStyle';
import Navbar from 'components/Navbar/Navbar';
import ReturnToTop from 'components/ReturnToTop/ReturnToTop';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeProvider from 'contexts/ThemeContext';
import FiltersProvider from 'contexts/FiltersContext/FiltersContext';
import useMedia from 'hooks/useMedia';

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
  },
  enter: {
    opacity: 1,
    transition: {
      duration: 0.3,
      delay: 0.3,
      when: 'beforeChildren',
    },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.3 },
  },
};

const withTranslateX = {
  initial: {
    ...variants.initial,
    x: -50,
  },
  enter: {
    ...variants.enter,
    x: 0,
  },
  exit: {
    ...variants.exit,
    x: 50,
  },
};

const Layout = ({ children, location }) => {
  const matches = useMedia('(min-width: 768px)');
  const data = useStaticQuery(graphql`
    {
      allCountries(filter: { name: { ne: null } }) {
        nodes {
          name
          capital
          flag
          region
          population
        }
      }
    }
  `);

  return (
    <ThemeProvider>
      <FiltersProvider nodes={data.allCountries.nodes}>
        <GlobalStyle />
        <Navbar />
        <Wrapper>
          <AnimatePresence>
            <motion.div
              key={location.pathname}
              variants={matches ? withTranslateX : variants}
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
  location: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.object])
  ).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Layout;
