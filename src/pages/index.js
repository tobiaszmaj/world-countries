import React from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import SEO from 'components/SEO/SEO';
import Layout from 'layouts/Layout';
import Filters from 'components/Filters/Filters';
import PropTypes from 'prop-types';
import Card from 'components/Card/Card';

const FiltersWrapper = styled.div`
  margin: 25px 0;
  ${({ theme }) => theme.mq.md} {
    margin: 40px 0;
  }
  ${({ theme }) => theme.mq.lg} {
    margin: 55px 0;
  }
`;

const Content = styled.main`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 50px;
`;

const IndexPage = ({
  data: {
    allInternalCountries: { nodes },
  },
}) => {
  return (
    <Layout>
      <SEO title="Home" />
      <FiltersWrapper>
        <Filters />
      </FiltersWrapper>
      <Content>
        {nodes.map(({ name, capital, flag, region, population }) => (
          <Card
            countryName={name}
            capital={capital}
            flag={flag}
            region={region}
            population={population}
          />
        ))}
      </Content>
    </Layout>
  );
};

IndexPage.propTypes = {
  data: PropTypes.shape({
    allInternalCountries: PropTypes.objectOf(PropTypes.array),
  }).isRequired,
};

export const query = graphql`
  query {
    allInternalCountries(limit: 8) {
      nodes {
        name
        capital
        flag
        region
        population
      }
    }
  }
`;

export default IndexPage;
