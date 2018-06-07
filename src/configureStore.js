import Reducer from './reducers';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

export default function configureStore(initialState = {}) {
  const store = createStore(Reducer, initialState, applyMiddleware(thunk));
  return store;
}