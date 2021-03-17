import React from 'react';
import styled from 'styled-components';
import Layout from 'layouts/Layout';
import PropTypes from 'prop-types';
import { graphql, Link } from 'gatsby';
import backIcon from 'icons/back.svg';
import useTheme from 'hooks/useTheme';
import slugify from 'slugify';

const InnerWrapper = styled.div`
  padding: 15px 0;
  max-width: 360px;
`;

const LinkWrapper = styled.div`
  margin: 25px 0;
  ${({ theme }) => theme.mq.md} {
    margin: 40px 0;
  }
  ${({ theme }) => theme.mq.lg} {
    margin: 55px 0;
  }
`;

const LinkInnerWrapper = styled.div`
  max-width: 120px;
`;

const StyledLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: ${({ theme }) => theme.element};
  line-height: 2rem;
  padding: 10px 20px;
  border-radius: 4px;
  color: ${({ theme }) => theme.text};
  text-decoration: none;
  transition: 0.3s;
  box-shadow: 0 0 20px -10px rgba(0, 0, 0, 0.25);
  border: 2px solid transparent;
  &:hover {
    border-color: ${({ theme }) => theme.blue};
  }
`;

const Icon = styled.i`
  display: block;
  width: 18px;
  height: 18px;
  background: url(${backIcon}) no-repeat center;
  background-size: 100%;
  margin-right: 10px;
  filter: ${({ isWhite }) => (isWhite ? 'invert(1)' : 'invert(0)')};
`;

const Content = styled.main`
  display: flex;
  flex-direction: column;
  ${({ theme }) => theme.mq.lg} {
    flex-direction: row;
    align-items: center;
  }
`;

const InnerContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 55%;
  padding: 30px 0 0 0;
  ${({ theme }) => theme.mq.lg} {
    padding: 0 0 0 60px;
  }
`;

const Description = styled.div`
  display: flex;
  flex-direction: column;
  & div:first-child {
    margin-right: 40px;
  }
  ${({ theme }) => theme.mq.md} {
    flex-direction: row;
  }
`;

const ImageWrapper = styled.div`
flex-basis: 45%;
  overflow: hidden;
  border-radius: 4px;
  box-shadow: 0 0 20px -10px rgba(0, 0, 0, 0.25);
`;

const Image = styled.img`
display: block;
  width: 100%;
  height: 100%;
`;

const Title = styled.h3`
  margin: 15px 0;
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-family: ${({ theme }) => theme.fonts.subFont};
  font-weight: ${({ theme }) => theme.bold};
  ${({ theme }) => theme.mq.lg} {
    font-size: ${({ theme }) => theme.fontSize.xl};
  }
`;

const Detail = styled.div`
display: flex;
  margin-bottom: 12px;
  line-height: 20px;
  font-weight: ${({ theme }) => theme.semiBold};
  font-family: ${({ theme }) => theme.fonts.subFont};
`;

const Value = styled.span`
margin-left: 5px;
  font-weight: ${({ theme }) => theme.light};
`;

const Heading = styled.h2`
  font-size: ${({ theme }) => theme.fontSize.lg};
`;

const StyledInnerWrapper = styled(InnerWrapper)`
  max-width: 100%;
`;

const Borders = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 20px 0;
  & > * {
    margin: 10px 10px 0 0;
  }
`;

const DetailedLayout = ({
  data: {
    country: {
      nodes: [country],
    },
    borderCountries: { nodes: borders },
  },
}) => {
  const { isDarkTheme } = useTheme();
  const {
    name,
    capital,
    flag,
    region,
    population,
    nativeName,
    subregion,
    topLevelDomain,
    currencies,
    languages,
  } = country;

  const displayValues = (values, key = null, lowerCase = false) => {
    const stringifiedValues = values.reduce((prev, next) => {
      const comma = prev.length ? ', ' : '';
      return key ? prev + comma + next[key] : prev + comma + next;
    }, '');

    if (lowerCase) return stringifiedValues.toLowerCase();
    return stringifiedValues;
  };

  return (
    <Layout>
      <LinkWrapper>
        <LinkInnerWrapper>
          <StyledLink to="/">
            <Icon isWhite={isDarkTheme} />
            Back
          </StyledLink>
        </LinkInnerWrapper>
      </LinkWrapper>
      <Content>
        <ImageWrapper>
          <Image src={flag} />
        </ImageWrapper>
        <InnerContent>
          <Title>{name}</Title>
          <Description>
            <InnerWrapper>
              {nativeName && (
                <Detail>
                  Native Name: <Value>{nativeName}</Value>
                </Detail>
              )}
              <Detail>
                Population:{' '}
                <Value>
                  {population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}
                </Value>
              </Detail>
              {region && (
                <Detail>
                  Region: <Value>{region}</Value>
                </Detail>
              )}
              {subregion && (
                <Detail>
                  Sub Region: <Value>{subregion}</Value>
                </Detail>
              )}
              {capital && (
                <Detail>
                  Capital: <Value>{capital}</Value>
                </Detail>
              )}
            </InnerWrapper>
            <InnerWrapper>
              {topLevelDomain[0] !== '' && (
                <Detail>
                  Top Level Domain:{' '}
                  <Value>{displayValues(topLevelDomain, null, true)}</Value>
                </Detail>
              )}
              {currencies.length !== 0 && (
                <Detail>
                  Currencies: <Value>{displayValues(currencies, 'name')}</Value>
                </Detail>
              )}
              {languages.length !== 0 && (
                <Detail>
                  Languages: <Value>{displayValues(languages, 'name')}</Value>
                </Detail>
              )}
            </InnerWrapper>
          </Description>
          <StyledInnerWrapper>
            <Heading>Border Countries:</Heading>
            <Borders>
              {borders.length === 0 && `${name} doesn't have any neighbours`}
              {borders.map(({ id, name: borderName }) => (
                <StyledLink
                  to={`/${slugify(borderName, { lower: true })}`}
                  key={id}
                >
                  {borderName}
                </StyledLink>
              ))}
            </Borders>
          </StyledInnerWrapper>
        </InnerContent>
      </Content>
    </Layout>
  );
};

DetailedLayout.propTypes = {
  data: PropTypes.shape({
    country: {
      nodes: [],
    },
    borderCountries: {
      nodes: [],
    },
  }).isRequired,
};

export const query = graphql`
query oneCountry($id: String!, $borders: [String]!) {
  country: allInternalCountries(filter: { id: { eq: $id } }) {
      nodes {
        borders
        id
        name
        capital
        flag
        region
        population
        nativeName
        subregion
        topLevelDomain
        currencies {
          name
        }
        languages {
          name
        }
      }
    }
    borderCountries: allInternalCountries(
      filter: { alpha3Code: { in: $borders } }
    ) {
      nodes {
        id
        name
      }
    }
  }
`;

export default DetailedLayout;