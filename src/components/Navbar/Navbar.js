// import React, { useContext } from 'react';
// import { Link } from 'gatsby';
// import styled from 'styled-components';
// import moonIcon from 'icons/moon.svg';
// import { ThemeContext } from 'contexts/ThemeContext';

// const Wrapper = styled.nav`
//   position: fixed;
//   top: 0;
//   left: 0;
//   right: 0;
//   height: 60px;
//   display: flex;
//   align-items: center;
//   background-color: ${({ theme }) => theme.element};
//   box-shadow: 0 3px 10px -8px rgba(0, 0, 0, 0.4);
//   transition: 0.3s opacity, 0.3s visibility;
//   z-index: 20;
//   ${({ theme }) => theme.mq.xs} {
//     height: 80px;
//   }
// `;

// const InnerWrapper = styled.div`
//   width: 100%;
//   max-width: 1440px;
//   margin: 0 auto;
//   padding: 0 10px;
//   display: flex;
//   justify-content: space-between;
//   ${({ theme }) => theme.mq.md} {
//     padding: 0 20px;
//   }
// `;

// const TitleWrapper = styled(Link)`
//   display: flex;
//   align-items: center;
//   color: ${({ theme }) => theme.text};
//   text-decoration: none;
// `;

// const Title = styled.h1`
//   font-size: ${({ theme }) => theme.fontSize.m};
//   font-weight: ${({ theme }) => theme.bold};
//   font-family: ${({ theme }) => theme.fonts.subFont};
//   ${({ theme }) => theme.mq.xs} {
//     font-size: ${({ theme }) => theme.fontSize.xl};
//   }
// `;

// const DarkModeButton = styled.button`
//   display: flex;
//   align-items: center;
//   padding: 8px 10px;
//   border-radius: 8px;
//   transition: 0.3s;
//   background-color: transparent;
//   border: 2px solid;
//   border-color: transparent;
//   color: ${({ theme }) => theme.text};
//   cursor: pointer;
//   &:hover {
//     border-color: ${({ theme }) => theme.blue};
//   }
//   ${({ theme }) => theme.mq.xs} {
//     padding: 8px 20px;
//   }
// `;

// const Icon = styled.i`
//   display: block;
//   width: 20px;
//   height: 20px;
//   background: url(${moonIcon}) no-repeat center;
//   background-size: 100%;
//   transition: 0.3s;
//   filter: ${({ isWhite }) => (isWhite ? 'invert(1)' : 'invert(0)')};
// `;

// const Name = styled.h3`
//   font-size: ${({ theme }) => theme.fontSize.s};
//   font-weight: ${({ theme }) => theme.semiBold};
//   font-family: ${({ theme }) => theme.fonts.mainFont};
//   margin-left: 8px;
//   ${({ theme }) => theme.mq.xs} {
//     font-size: ${({ theme }) => theme.fontSize.m};
//   }
// `;

// const Navbar = () => {
//   const { isDarkTheme, toggleTheme } = useContext(ThemeContext);
//   return <div />;
// };
// //   return (
// //     <Wrapper>
// //       <InnerWrapper>
// //         <TitleWrapper to="/">
// // "/">
// // ar;

// export default Navbar;
