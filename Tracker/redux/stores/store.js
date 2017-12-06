import { applyMiddleware, createStore } from 'redux';
// import createLogger from 'redux-logger';
import ReduxThunk from 'redux-thunk';
import rootReducer from '../reducers';

const middleware = [ReduxThunk];

const Store = createStore(rootReducer, {}, applyMiddleware(...middleware));
export default Store;