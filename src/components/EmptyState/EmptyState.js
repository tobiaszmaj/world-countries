import React from 'react';
import styled from 'styled-components';
import emptyStateImg from 'images/emptyState.png';

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

const Background = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: 400px;
  height: 200px;
  background: url(${emptyStateImg}) no-repeat center;
  background-size: 100%;
  ${({ theme }) => theme.mq.smallTablet} {
    height: 270px;
  }
`;

const Title = styled.h1`
  margin: 20px 0 0;
  font-size: ${({ theme }) => theme.fontSize.xl};
`;

const EmptyState = () => (
    <Wrapper>
        <Background />
        <Title>No countries found...</Title>
    </Wrapper>
);

export default EmptyState;