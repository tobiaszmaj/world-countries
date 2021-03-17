export const initialState = {
    isLoading: false,
    allCountries: [],
    countriesToShow: [],
    allRegions: [],
    selectedRegion: '',
    query: '',
};

export const rootReducer = (state, action) => {
    switch (action.type) {
        case 'ALL_COUNTRIES':
            return {
                ...state,
                allCountries: action.payload,
            };
        case 'SET_REGIONS':
            return {
                ...state,
                allRegions: action.payload,
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
};