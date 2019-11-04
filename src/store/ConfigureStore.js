import {combineReducers, applyMiddleware, createStore, compose} from 'redux';
import thunk from 'redux-thunk';

import authReducer from './reducers/authReducer';
import homeReducer from './reducers/homeReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  home: homeReducer,
});

let composeEnhancers = compose;

if (__DEV__) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const configureStore = () => {
  return createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
};

export default configureStore;
