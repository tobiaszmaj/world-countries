import React from 'react';
import PropTypes from 'prop-types';
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

const Filters = ({ handleInput, handleSelect, regions, selectedRegion }) => (
  <Wrapper>
    <SearchWrapper>
      <SearchInput handleInput={handleInput} />
    </SearchWrapper>
    <Dropdown
      selectedRegion={selectedRegion}
      regions={regions}
      handleSelect={handleSelect}
    />
  </Wrapper>
);

Filters.propTypes = {
  selectedRegion: PropTypes.string.isRequired,
  regions: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleInput: PropTypes.func.isRequired,
  handleSelect: PropTypes.func.isRequired,
};

export default Filters;