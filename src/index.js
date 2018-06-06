import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import Reducer from './reducers';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

const store = createStore(Reducer, applyMiddleware(thunk));

ReactDOM.render(<Provider store = {store}><App /></Provider>, document.getElementById('root'));
