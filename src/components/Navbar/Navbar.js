import React from 'react';
import styled from 'styled-components';
import moonIcon from 'icons/moon.svg';
import useTheme from 'hooks/useTheme';

const Wrapper = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 80px;
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.element};
  box-shadow: 0 3px 10px -8px rgba(0, 0, 0, 0.4);
  transition: 0.3s;
`;

const InnerWrapper = styled.div`
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 10px;
  display: flex;
  justify-content: space-between;
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: ${({ theme }) => theme.bold};
  font-family: ${({ theme }) => theme.fonts.subFont};
`;

const DarkModeButton = styled.button`
  display: flex;
  align-items: center;
  padding: 8px 20px;
  border-radius: 8px;
  transition: 0.3s;
  background-color: transparent;
  border: 2px solid;
  border-color: transparent;
  color: ${({ theme }) => theme.text};
  cursor: pointer;
  &:hover {
    border-color: ${({ theme }) => theme.text};
  }
`;

const Icon = styled.i`
  display: block;
  width: 20px;
  height: 20px;
  background: url(${moonIcon}) no-repeat center;
  background-size: 100%;
  margin-right: 10px;
  transition: 0.3s;
  filter: ${({ isWhite }) => (isWhite ? 'invert(1)' : 'invert(0)')};
`;

const Name = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.m};
  font-weight: ${({ theme }) => theme.semiBold};
  font-family: ${({ theme }) => theme.fonts.mainFont};
`;

const Navbar = () => {
    const { isDarkTheme, toggleTheme } = useTheme();
    return (
        <Wrapper>
            <InnerWrapper>
                <TitleWrapper>
                    <Title>World countries</Title>
                </TitleWrapper>
                <DarkModeButton onClick={toggleTheme}>
                    <Icon isWhite={isDarkTheme} />
                    <Name>Dark Mode</Name>
                </DarkModeButton>
            </InnerWrapper>
        </Wrapper>
    );
};

export default Navbar;