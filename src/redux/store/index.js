import { createStore, applyMiddleware } from 'redux';
import { rootReducer } from 'reducer';
import thunk from 'redux-thunk';

const store = preloadedState => {
  return createStore(rootReducer, preloadedState, applyMiddleware(thunk));
};

export default store;
