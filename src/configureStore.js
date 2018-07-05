import Reducer from './reducers';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const url_api = 'http://127.0.0.1:3001';

export default function configureStore(initialState = {}) {
  const store = createStore(Reducer, initialState, applyMiddleware(thunk.withExtraArgument(url_api)));
  return store;
}