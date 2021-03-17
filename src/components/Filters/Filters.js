import React from 'react';
import styled from 'styled-components';
import SearchInput from './SearchInput';
import Dropdown from './Dropdown';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  ${({ theme }) => theme.mq.s} {
    flex-direction: row;
  }
`;

const SearchWrapper = styled.div`
  width: 100%;
  margin: 0 0 20px 0;
  ${({ theme }) => theme.mq.s} {
    max-width: 320px;
    margin: 0 20px 0 0;
  }
`;

const Filters = () => (
  <Wrapper>
    <SearchWrapper>
      <SearchInput />
    </SearchWrapper>
    <Dropdown />
  </Wrapper>
);

export default Filters;