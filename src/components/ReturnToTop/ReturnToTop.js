import React, { useContext } from 'react';
import styled from 'styled-components';
import { ThemeContext } from 'contexts/ThemeContext';
import useWindowOffset from 'hooks/useWindowOffset';
import { animateScroll as scroll } from 'react-scroll';
import arrowIcon from '../../assets/icons/arrow-up.svg';

const Wrapper = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  background-color: ${({ theme }) => theme.element};
  z-index: 100;
  padding: 10px;
  border-radius: 4px;
  box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.2);
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.3s opacity, 0.3s visibility;
  opacity: ${({ isVisible }) => (isVisible ? '1' : '0')};
  visibility: ${({ isVisible }) => (isVisible ? 'visible' : 'hidden')};
  ${({ theme }) => theme.mq.lg} {
    bottom: 40px;
    right: 40px;
  }
`;

const Icon = styled.i`
  display: block;
  width: 18px;
  height: 18px;
  background: url(${arrowIcon}) no-repeat center;
  background-size: 100%;
  filter: ${({ isWhite }) => (isWhite ? 'invert(1)' : 'invert(0)')};
`;

const ReturnToTop = () => {
  const windowOffsetY = useWindowOffset();
  const { isDarkTheme } = useContext(ThemeContext);

  return (
    <Wrapper
      isVisible={windowOffsetY > 200}
      onClick={() => scroll.scrollToTop()}
    >
      <Icon isWhite={isDarkTheme} />
    </Wrapper>
  );
};

export default ReturnToTop;
