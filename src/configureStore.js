import Reducer from './reducers';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const url_api = 'http://35.237.239.132:3001';

export default function configureStore(initialState = {}) {
  const store = createStore(Reducer, initialState, applyMiddleware(thunk.withExtraArgument(url_api)));
  return store;
}