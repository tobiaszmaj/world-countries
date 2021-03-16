import React from 'react';
import styled from 'styled-components';
import Layout from 'layouts/Layout';
import PropTypes from 'prop-types';
import { graphql, Link } from 'gatsby';
import backIcon from 'icons/back.svg';
import useTheme from 'hooks/useTheme';

const InnerWrapper = styled.div`
  padding: 15px 0;
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
  ${({ theme }) => theme.mq.md} {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

const InnerContent = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 30px;
`;

const Description = styled.div`
  display: flex;
  flex-direction: column;
  ${({ theme }) => theme.mq.md} {
    flex-direction: row;
    justify-content: space-between;
    & div:first-child {
      margin-right: 15px;
    }
  }
  ${({ theme }) => theme.mq.lg} {
    & div:first-child {
      margin-right: 40px;
    }
  }
  ${({ theme }) => theme.mq.xl} {
    & div:first-child {
      margin-right: 60px;
    }
  }
`;

const ImageWrapper = styled.div`
  overflow: hidden;
  border-radius: 4px;
  box-shadow: 0 0 20px -10px rgba(0, 0, 0, 0.25);
  max-width: 700px;
`;

const Image = styled.img`
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
  margin-bottom: 12px;
  line-height: 20px;
`;

const Value = styled.span`
  text-transform: capitalize;
  font-weight: ${({ theme }) => theme.light};
`;

const Heading = styled.h2`
  font-size: ${({ theme }) => theme.fontSize.lg};
`;

const Borders = styled.div`
  display: flex;
  margin: 20px 0;
  & > * {
    margin-right: 10px;
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
              <Detail>
                Native Name: <Value>{nativeName}</Value>
              </Detail>
              <Detail>
                Population: <Value>{population}</Value>
              </Detail>
              <Detail>
                Region: <Value>{region}</Value>
              </Detail>
              <Detail>
                Sub Region: <Value>{subregion}</Value>
              </Detail>
              <Detail>
                Capital: <Value>{capital}</Value>
              </Detail>
            </InnerWrapper>
            <InnerWrapper>
              <Detail>
                Top Level Domain: <Value>{topLevelDomain}</Value>
              </Detail>
              <Detail>
                Currencies:{' '}
                <Value>
                  {currencies.reduce((prev, curr) => {
                    const comma = prev.length ? ', ' : '';
                    return prev + comma + curr.name;
                  }, '')}
                </Value>
              </Detail>
              <Detail>
                Languages:{' '}
                <Value>
                  {languages.reduce((prev, lang) => {
                    const comma = prev.length ? ', ' : '';
                    return prev + comma + lang.name;
                  }, '')}
                </Value>
              </Detail>
            </InnerWrapper>
          </Description>
          <InnerWrapper>
            <Heading>Border Countries:</Heading>
            <Borders>
              {borders.length === 0 && `${name} doesn't have any neighbours`}
              {borders.map(border => (
                <StyledLink to={`/${border.id}`} key={border.id}>
                  {border.name}
                </StyledLink>
              ))}
            </Borders>
          </InnerWrapper>
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
query oneCountry($id: String!, $borders: [String]) {
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