import React from 'react';
import styled from 'styled-components';
import emptyStateImg from 'icons/emptyState.svg';

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
  ${({ theme }) => theme.mq.md} {
    max-width: 350px;
  }
`;

const Title = styled.h1`
  margin: 20px 0 0;
  font-size: ${({ theme }) => theme.fontSize.lg};
  ${({ theme }) => theme.mq.md} {
    font-size: ${({ theme }) => theme.fontSize.xl};
  }
`;

const EmptyState = () => (
  <Wrapper>
    <Image src={emptyStateImg} alt="No countries" />
    <Title>No countries found...</Title>
  </Wrapper>
);

export default EmptyState;