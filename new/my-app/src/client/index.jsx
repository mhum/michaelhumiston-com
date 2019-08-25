import React from 'react';
import ReactDOM from 'react-dom';

import { connectRouter, routerMiddleware, ConnectedRouter } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
//import thunkMiddleware from 'redux-thunk';

import './styles/styles.scss';

import Root from '../client/components/Root';
import reducers from '../client/redux/reducers';

const preloadedState = window.__PRELOADED_STATE__;
delete window.__PRELOADED_STATE__;

const createRootReducer = (history) => combineReducers({
    router: connectRouter(history),
    reducers,
});

export const history = createBrowserHistory();

const store = createStore(
    createRootReducer(history),
    preloadedState,
    compose(
        applyMiddleware(
            routerMiddleware(history),
            //thunkMiddleware,
        ),
    ),
  );

ReactDOM.hydrate(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Root/>
        </ConnectedRouter>
    </Provider>, 
    document.getElementById('root')
);
