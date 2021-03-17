import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import slugify from 'slugify';

const Wrapper = styled(Link)`
  display: block;
  width: 100%;
  max-width: 320px;
  height: 100%;
  border-radius: 8px;
  overflow: hidden;
  background-color: ${({ theme }) => theme.element};
  transition: 0.3s;
  box-shadow: 0 0 20px -10px rgba(0, 0, 0, 0.25);
  border: 2px solid transparent;
  color: ${({ theme }) => theme.text};
  text-decoration: none;
  opacity: ${({ visible }) => (visible ? '1' : '0')};
  visibility: ${({ visible }) => (visible ? 'visible' : 'hidden')};
  &:hover {
    border-color: ${({ theme }) => theme.blue};
  }
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 200px;
`;

const Image = styled.img`
  display: block;
  width: 100%;
  height: 100%;
`;

const Content = styled.div`
  padding: 30px 20px;
`;

const Title = styled.h3`
  margin-bottom: 20px;
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: ${({ theme }) => theme.semiBold};
`;

const Detail = styled.div`
  display: flex;
  margin-bottom: 5px;
`;

const Value = styled.span`
  margin-left: 5px;
  text-transform: capitalize;
  font-weight: ${({ theme }) => theme.light};
`;

const Card = ({
  isVisible,
  countryName,
  population,
  region,
  capital,
  flag,
}) => {
  const slugifiedName = slugify(countryName, {
    lower: true,
  });
  return (
    <Wrapper visible={isVisible.toString()} to={`/${slugifiedName}`}>
      <ImageWrapper>
        <Image src={flag} alt={countryName} />
      </ImageWrapper>
      <Content>
        <Title>{countryName}</Title>
        <Detail>
          Population:
          <Value>
            {population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}
          </Value>
        </Detail>
        {region && (
          <Detail>
            Region:<Value>{region}</Value>
          </Detail>
        )}
        {capital && (
          <Detail>
            Capital:<Value>{capital}</Value>
          </Detail>
        )}
      </Content>
    </Wrapper>
  );
};

Card.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  countryName: PropTypes.string.isRequired,
  population: PropTypes.number.isRequired,
  region: PropTypes.string.isRequired,
  capital: PropTypes.string.isRequired,
  flag: PropTypes.string.isRequired,
};

export default Card;