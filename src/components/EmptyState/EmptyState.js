import React, { useContext } from 'react';
import styled from 'styled-components';
import emptyStateImg from 'assets/images/emptyState.png';
import { ThemeContext } from 'contexts/ThemeContext';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  opacity: 0.7;
  text-align: center;
  padding: 0 20px;
`;

const Image = styled.img`
  margin: 0 auto;
  width: 100%;
  max-width: 250px;
  filter: ${({ white }) => (white ? 'invert(1)' : 'invert(0)')};
  ${({ theme }) => theme.mq.s} {
    max-width: 550px;
  }
`;

const Title = styled.h1`
  margin: 40px 0 0;
  font-size: ${({ theme }) => theme.fontSize.lg};
  ${({ theme }) => theme.mq.s} {
    font-size: ${({ theme }) => theme.fontSize.xl};
  }
`;

const EmptyState = () => {
  const { isDarkTheme } = useContext(ThemeContext);
  return (
    <Wrapper>
      <Image
        white={isDarkTheme ? 1 : 0}
        src={emptyStateImg}
        alt="No countries"
      />
      <Title>No countries found...</Title>
    </Wrapper>
  );
};

export default EmptyState;
