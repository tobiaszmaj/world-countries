import React, { useState, useEffect } from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import slugify from 'slugify';
import SEO from 'components/SEO/SEO';
import Layout from 'layouts/Layout';
import Filters from 'components/Filters/Filters';
import Card from 'components/Card/Card';
import EmptyState from 'components/EmptyState/EmptyState';
import InfiniteScroll from 'react-infinite-scroll-component';

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

const COUNTRIES_PER_SCROLL = 16;

const IndexPage = ({
  data: {
    allInternalCountries: { nodes },
  },
}) => {
  const [countries, setCountries] = useState({
    allCountries: nodes,
    countriesToShow: nodes.slice(0, COUNTRIES_PER_SCROLL),
    selectedRegion: '',
    query: '',
  });

  useEffect(() => {
    const { query, selectedRegion } = countries;
    const filteredCountries = nodes.filter(({ name, region }) => {
      const selectFilters =
        selectedRegion === 'All' || selectedRegion === ''
          ? true
          : region === selectedRegion;
      const queryFilters = slugify(name, {
        replacement: ' ',
        lower: true,
      }).includes(query);

      const newCountries = queryFilters && selectFilters;
      return newCountries;
    });

    setCountries({
      ...countries,
      allCountries: filteredCountries,
      countriesToShow: filteredCountries.slice(0, COUNTRIES_PER_SCROLL),
    });
  }, [countries.query, countries.selectedRegion]);

  const handleInputChange = e => {
    const query = e.target.value;
    const slugifiedQuery = slugify(query, {
      replacement: ' ',
      lower: true,
    });
    setCountries({
      ...countries,
      query: slugifiedQuery,
    });
  };

  const handleSelect = selectedRegion => {
    setCountries({
      ...countries,
      selectedRegion,
    });
  };

  const handleScroll = () => {
    const { countriesToShow, allCountries } = countries;
    const start = countriesToShow.length;
    const end = countriesToShow.length + COUNTRIES_PER_SCROLL;

    setCountries({
      ...countries,
      countriesToShow: [...countriesToShow, ...allCountries.slice(start, end)],
    });
  };

  const allRegions = nodes
    .map(({ region }) => region)
    .filter(region => region)
    .sort();
  const regions = ['All', ...[...new Set(allRegions)]];

  const { selectedRegion, countriesToShow, allCountries } = countries;

  return (
    <InfiniteScroll
      dataLength={countriesToShow.length}
      next={handleScroll}
      hasMore={allCountries.length >= countriesToShow.length}
    >
      <Layout>
        <SEO title="Home" />
        <FiltersWrapper>
          <Filters
            selectedRegion={selectedRegion}
            regions={regions}
            handleSelect={handleSelect}
            handleInput={handleInputChange}
          />
        </FiltersWrapper>
        {countriesToShow.length === 0 ? (
          <EmptyState />
        ) : (
          <Content>
            {countriesToShow.map(
              ({ name, capital, flag, region, population }) => (
                <Card
                  key={name}
                  countryName={name}
                  capital={capital}
                  flag={flag}
                  region={region}
                  population={population}
                />
              )
            )}
          </Content>
        )}
      </Layout>
    </InfiniteScroll>
  );
};

IndexPage.propTypes = {
  data: PropTypes.shape({
    allInternalCountries: PropTypes.objectOf(PropTypes.array),
  }).isRequired,
};

export const query = graphql`
query allCountries {
  allInternalCountries(filter: { name: { ne: null } }) {
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
