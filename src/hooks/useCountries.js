import { useEffect, useReducer } from 'react';
import slugify from 'slugify';

const COUNTRIES_PER_SCROLL = 16;

const useCountries = nodes => {
    const [countries, dispatch] = useReducer(
        (state, action) => {
            switch (action.type) {
                case 'ALL_COUNTRIES':
                    return {
                        ...state,
                        allCountries: action.payload,
                    };
                case 'SELECTED_REGION':
                    return {
                        ...state,
                        selectedRegion: action.payload,
                    };
                case 'QUERY':
                    return {
                        ...state,
                        query: action.payload,
                    };
                case 'COUNTRIES_TO_SHOW':
                    return {
                        ...state,
                        countriesToShow: action.payload,
                    };
                case 'TOGGLE_LOADING':
                    return {
                        ...state,
                        isLoading: action.payload,
                    };
                default:
                    return state;
            }
        },
        {
            isLoading: false,
            allCountries: nodes,
            countriesToShow: nodes.slice(0, COUNTRIES_PER_SCROLL),
            selectedRegion: '',
            query: '',
        }
    );

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

        dispatch({ type: 'ALL_COUNTRIES', payload: filteredCountries });
        dispatch({
            type: 'COUNTRIES_TO_SHOW',
            payload: filteredCountries.slice(0, COUNTRIES_PER_SCROLL),
        });
    }, [countries.query, countries.selectedRegion]);

    const handleInputChange = query => {
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

    const allRegions = nodes
        .map(({ region }) => region)
        .filter(region => region)
        .sort();

    const regions = ['All', ...[...new Set(allRegions)]];

    const {
        selectedRegion,
        countriesToShow,
        allCountries,
        isLoading,
    } = countries;

    return {
        isLoading,
        selectedRegion,
        countriesToShow,
        allCountries,
        regions,
        handleScroll,
        handleSelect,
        handleInputChange,
    };
};

export default useCountries;