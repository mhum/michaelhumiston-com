import React from 'react';
import ReactDOM from 'react-dom';

import { connectRouter, routerMiddleware, ConnectedRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux';
import {
  createStore, combineReducers, applyMiddleware, compose
} from 'redux';
import thunkMiddleware from 'redux-thunk';

import './styles/styles.scss';

import App from './components/App';
import reducers from './redux/reducers';

// eslint-disable-next-line no-underscore-dangle
const preloadedState = window.__PRELOADED_STATE__;
// eslint-disable-next-line no-underscore-dangle
delete window.__PRELOADED_STATE__;

const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  reducers
});

const history = createBrowserHistory();

const store = createStore(
  createRootReducer(history),
  preloadedState,
  compose(
    applyMiddleware(
      routerMiddleware(history),
      thunkMiddleware,
    ),
  ),
);

ReactDOM.hydrate(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App history={history} />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
