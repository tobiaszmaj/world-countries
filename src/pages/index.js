import React, { useState } from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import SEO from 'components/SEO/SEO';
import Layout from 'layouts/Layout';
import Filters from 'components/Filters/Filters';
import PropTypes from 'prop-types';
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

  const applyFilters = (key, value) => {
    const { query, selectedRegion } = countries;

    const filtered = nodes.filter(({ name, region }) => {
      let selectFilters = true;
      let queryFilters = true;
      if (key === 'query') {
        selectFilters =
          selectedRegion === 'All' || selectedRegion === ''
            ? true
            : region === selectedRegion;
        queryFilters = name.toLowerCase().includes(value.toLowerCase());
      }
      if (key === 'selectedRegion') {
        selectFilters = value === 'All' ? true : value === region;
        queryFilters = name.toLowerCase().includes(query.toLowerCase());
      }
      const newCountries = queryFilters && selectFilters;
      return newCountries;
    });

    setCountries({
      ...countries,
      [key]: value,
      allCountries: filtered,
      countriesToShow: filtered.slice(0, COUNTRIES_PER_SCROLL),
    });
  };

  const handleInputChange = e => {
    applyFilters('query', e.target.value);
  };

  const handleSelect = selectedRegion => {
    applyFilters('selectedRegion', selectedRegion);
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
              ({ id, name, capital, flag, region, population }) => (
                <Card
                  key={id}
                  id={id}
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
