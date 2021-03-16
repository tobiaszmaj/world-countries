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
  grid-template-columns: repeat(1, 1fr);
  justify-items: center;
  gap: 20px;
  ${({ theme }) => theme.mq.s} {
    grid-template-columns: repeat(2, 1fr);
  }
  ${({ theme }) => theme.mq.md} {
    grid-template-columns: repeat(3, 1fr);
  }
  ${({ theme }) => theme.mq.lg} {
    gap: 40px;
  }
  ${({ theme }) => theme.mq.xl} {
    gap: 50px;
    grid-template-columns: repeat(4, 1fr);
  }
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
        {nodes.map(({ id, name, capital, flag, region, population }) => (
          <Card
            id={id}
            key={id}
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
    allInternalCountries(limit: 24) {
      nodes {
        id
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
