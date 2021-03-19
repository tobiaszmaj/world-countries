import React, { useState, useRef, useContext } from 'react';
import styled from 'styled-components';
import dropIcon from 'assets/icons/arrow-down.svg';
import { ThemeContext } from 'contexts/ThemeContext';
import useOutsideClick from 'hooks/useOutsideClick';
import { FiltersContext } from 'contexts/FiltersContext/FiltersContext';

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 250px;
  z-index: 10;
`;

const Select = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 25px;
  box-shadow: 0 0 20px -10px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  transition: border-color 0.3s;
  background-color: ${({ theme }) => theme.element};
  cursor: pointer;
  border: 2px solid;
  border-color: ${({ isActive, theme }) =>
    isActive ? theme.blue : 'transparent'};
`;

const Name = styled.span`
  font-size: ${({ theme }) => theme.fontSize.s};
`;

const Icon = styled.i`
  display: block;
  width: 15px;
  height: 15px;
  background: url(${dropIcon}) no-repeat center;
  background-size: 100%;
  filter: ${({ isWhite }) => (isWhite ? 'invert(1)' : 'invert(0)')};
`;

const Options = styled.ul`
  position: absolute;
  top: 65px;
  width: 100%;
  padding: 12px 0;
  background-color: ${({ theme }) => theme.element};
  font-size: ${({ theme }) => theme.fontSize.s};
  border-radius: 8px;
  box-shadow: 0 0 20px -10px rgba(0, 0, 0, 0.25);
  transition: 0.3s opacity, 0.3s visibility;
  opacity: ${({ isVisible }) => (isVisible ? '1' : '0')};
  visibility: ${({ isVisible }) => (isVisible ? 'visible' : 'hidden')};
`;

const Option = styled.li`
  padding: 10px 25px;
  cursor: pointer;
  transition: 0.3s;
  color: ${({ theme, isActive }) => (isActive ? theme.blue : theme.text)};
  &:hover {
    color: ${({ theme }) => theme.blue};
  }
`;

const Dropdown = () => {
  const [areOptionsVisible, setOptionsVisibility] = useState(false);

  const { allRegions, handleSelect, selectedRegion } = useContext(
    FiltersContext
  );
  const { isDarkTheme } = useContext(ThemeContext);
  const selectRef = useRef(null);
  const optionsRef = useRef(null);

  const toggleOptionsVisibility = () => {
    setOptionsVisibility(!areOptionsVisible);
  };

  useOutsideClick(optionsRef, setOptionsVisibility, selectRef);

  const handleOptionPick = region => {
    setOptionsVisibility(false);
    handleSelect(region);
  };

  return (
    <Wrapper>
      <Select
        isActive={areOptionsVisible}
        ref={selectRef}
        onClick={toggleOptionsVisibility}
      >
        <Name>{selectedRegion || 'Filter by region'}</Name>
        <Icon isWhite={isDarkTheme} />
      </Select>
      <Options ref={optionsRef} isVisible={areOptionsVisible}>
        {allRegions.map(region => (
          <Option
            key={region}
            isActive={
              selectedRegion === region ||
              (selectedRegion === '' && region === 'All')
            }
            onClick={() => handleOptionPick(region)}
          >
            {region}
          </Option>
        ))}
      </Options>
    </Wrapper>
  );
};

export default Dropdown;
