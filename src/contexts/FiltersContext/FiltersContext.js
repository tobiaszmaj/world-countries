import React, { useEffect, useReducer, createContext } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { rootReducer, initialState } from 'contexts/FiltersContext/reducer';
import PropTypes from 'prop-types';
import slugify from 'slugify';

const COUNTRIES_PER_SCROLL = 16;

export const FiltersContext = createContext();

const FiltersProvider = ({ children }) => {
    const [countries, dispatch] = useReducer(rootReducer, initialState);

    const data = useStaticQuery(graphql`
    query allCountries {
      allCountries(filter: { name: { ne: null } }) {
        nodes {
          name
          capital
          flag
          region
          population
        }
      }
    }
  `);

    const {
        allCountries: { nodes },
    } = data;

    useEffect(() => {
        const allRegions = nodes
            .map(({ region }) => region)
            .filter(region => region)
            .sort();
        const regions = ['All', ...[...new Set(allRegions)]];

        dispatch({ type: 'SET_REGIONS', payload: regions });
    }, []);

    useEffect(() => {
        const showLoading = () => {
            dispatch({ type: 'TOGGLE_LOADING', payload: true });
        };
        const hideLoading = () => {
            dispatch({ type: 'TOGGLE_LOADING', payload: false });
        };

        showLoading();
        const timeoutId = setTimeout(hideLoading, 1000);

        return () => clearTimeout(timeoutId);
    }, [countries.query, countries.selectedRegion]);

    useEffect(() => {
        const { query, selectedRegion } = countries;

        const filteredCountries = nodes.filter(({ name, region }) => {
            const selectFilters =
                selectedRegion === 'All' || selectedRegion === ''
                    ? true
                    : region === selectedRegion;
            const queryFilters = slugify(name, {
                replacement: ' ',
                lower: true,
            }).includes(query);

            const newCountries = queryFilters && selectFilters;
            return newCountries;
        });

        const timeoutID = setTimeout(() => {
            dispatch({ type: 'ALL_COUNTRIES', payload: filteredCountries });
            dispatch({
                type: 'COUNTRIES_TO_SHOW',
                payload: filteredCountries.slice(0, COUNTRIES_PER_SCROLL),
            });
        }, 150);

        return () => clearTimeout(timeoutID);
    }, [countries.query, countries.selectedRegion]);

    const handleInput = query => {
        const slugifiedQuery = slugify(query, {
            replacement: ' ',
            lower: true,
        });
        dispatch({ type: 'QUERY', payload: slugifiedQuery });
    };

    const handleSelect = selectedRegion => {
        dispatch({ type: 'SELECTED_REGION', payload: selectedRegion });
    };

    const handleScroll = () => {
        const { countriesToShow, allCountries } = countries;
        const start = countriesToShow.length;
        const end = countriesToShow.length + COUNTRIES_PER_SCROLL;

        dispatch({
            type: 'COUNTRIES_TO_SHOW',
            payload: [...countriesToShow, ...allCountries.slice(start, end)],
        });
    };

    const filters = {
        isLoading: countries.isLoading,
        selectedRegion: countries.selectedRegion,
        countriesToShow: countries.countriesToShow,
        allCountries: countries.allCountries,
        allRegions: countries.allRegions,
        handleScroll,
        handleSelect,
        handleInput,
    };

    return (
        <FiltersContext.Provider value={filters}>
            {children}
        </FiltersContext.Provider>
    );
};

FiltersProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]).isRequired,
};

export default FiltersProvider;