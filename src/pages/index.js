import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import SEO from 'components/SEO/SEO';
import Filters from 'components/Filters/Filters';
import Card from 'components/Card/Card';
import SkeletonCard from 'components/Card/SkeletonCard';
import EmptyState from 'components/EmptyState/EmptyState';
import InfiniteScroll from 'react-infinite-scroll-component';
import useCountries from 'hooks/useCountries';

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

const CardWrapper = styled.div`
  position: relative;
  width: 100%;
  min-height: 380px;
`;

const CardInnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const IndexPage = ({
  data: {
    allCountries: { nodes },
  },
}) => {
  const {
    isLoading,
    selectedRegion,
    countriesToShow,
    allCountries,
    regions,
    handleScroll,
    handleSelect,
    handleInputChange,
  } = useCountries(nodes);

  return (
    <>
      <SEO title="Home | World countries" />
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
        <InfiniteScroll
          dataLength={countriesToShow.length}
          next={handleScroll}
          hasMore={allCountries.length >= countriesToShow.length}
        >
          <Content>
            {countriesToShow.map(
              ({ name, capital, flag, region, population }) => (
                <CardWrapper key={name}>
                  <CardInnerWrapper>
                    <SkeletonCard visible={isLoading} />
                  </CardInnerWrapper>
                  <CardInnerWrapper>
                    <Card
                      visible={!isLoading}
                      countryName={name}
                      capital={capital}
                      flag={flag}
                      region={region}
                      population={population}
                    />
                  </CardInnerWrapper>
                </CardWrapper>
              )
            )}
          </Content>
        </InfiniteScroll>
      )}
    </>
  );
};

IndexPage.propTypes = {
  data: PropTypes.shape({
    allCountries: PropTypes.objectOf(PropTypes.array),
  }).isRequired,
};

export const query = graphql`
query allCountries {
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
`;

export default IndexPage;
