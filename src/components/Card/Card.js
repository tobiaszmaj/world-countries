import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Wrapper = styled.div`
  width: 100%;
  max-width: 360px;
  border-radius: 8px;
  overflow: hidden;
  background-color: ${({ theme }) => theme.element};
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
  padding: 20px;
`;

const Title = styled.h3`
  margin: 10px 0;
  font-size: ${({ theme }) => theme.lg};
`;

const Detail = styled.div`
  margin-bottom: 5px;
`;

const Value = styled.span`
  text-transform: capitalize;
  font-weight: ${({ theme }) => theme.light};
`;

const Card = ({ countryName, population, region, capital, flag }) => (
    <Wrapper>
        <ImageWrapper>
            <Image src={flag} alt={countryName} />
        </ImageWrapper>
        <Content>
            <Title>{countryName}</Title>
            <Detail>
                Population: <Value>{population}</Value>
            </Detail>
            <Detail>
                Region: <Value>{region}</Value>
            </Detail>
            <Detail>
                Capital: <Value>{capital}</Value>
            </Detail>
        </Content>
    </Wrapper>
);

Card.propTypes = {
    countryName: PropTypes.string.isRequired,
    population: PropTypes.string.isRequired,
    region: PropTypes.string.isRequired,
    capital: PropTypes.string.isRequired,
    flag: PropTypes.string.isRequired,
};

export default Card;