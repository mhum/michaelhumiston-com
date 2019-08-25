import fs from 'fs';
import path from 'path';

import { connectRouter, routerMiddleware, ConnectedRouter } from 'connected-react-router'
import escapeStringRegexp from 'escape-string-regexp';
import { createMemoryHistory } from 'history'
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Provider } from 'react-redux'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';

import { loadProjects } from '../lib/projects';
import App from '../../client/components/App';
import reducers from '../../client/redux/reducers';
import { PAGE_DESCRIPTIONS, PAGE_TITLES } from '../../client/constants/pageInfo';

const pageDescriptionMapping = {
  '/': PAGE_DESCRIPTIONS.home,
  '/about': PAGE_DESCRIPTIONS.about,
}

const pageTitleMapping = {
  '/': PAGE_TITLES.home,
  '/about': PAGE_TITLES.about,
}

function getInitialState(url) {
  return {
    reducers: {
      pageDescription: {
        description: pageDescriptionMapping[url]
      },
      pageTitle: {
        title: pageTitleMapping[url]
      },
      projects: {
        list: loadProjects().projects
      }
    },
  };
}

export default ctx => {
  const publicPath = path.join(__dirname, '/public');

  return new Promise(resolve => {
    fs.readFile(`${publicPath}/app.html`, 'utf8', (err, html) => {
      if (err) {
        ctx.status = 500;
      }

      const history = createMemoryHistory({
        initialEntries: [ctx.url]
      });

      const initialState = getInitialState(ctx.url);

      const createRootReducer = (history) => combineReducers({
        router: connectRouter(history),
        reducers,
      });
  
      const store = createStore(
        createRootReducer(history),
        initialState,
        compose(
            applyMiddleware(
                routerMiddleware(history),
                thunkMiddleware,
            ),
        ),
      );
      const htmlContent = ReactDOMServer.renderToString(
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <App/>
        </ConnectedRouter>
      </Provider>
      );
      const preloadedState = store.getState()

      const htmlReplacements = {
        HTML_CONTENT: htmlContent,
        INITIAL_STATE: JSON.stringify(preloadedState),
      };

      Object.keys(htmlReplacements).forEach(key => {
        const value = htmlReplacements[key];
        html = html.replace(
          new RegExp('__' + escapeStringRegexp(key) + '__', 'g'),
          value
        );
      });
      ctx.body = html;
      resolve();
    });
  });
};
