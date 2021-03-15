import { SET_THEME } from 'actions';

export const initialState = {
  countries: [],
  isDark: false,
};

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_THEME:
      return {
        ...state,
        isDark: action.payload,
      };
    default:
      return state;
  }
};
