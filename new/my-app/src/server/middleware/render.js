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
  '/contact': PAGE_DESCRIPTIONS.contact,
  '/projects': PAGE_DESCRIPTIONS.projects,
}

const pageTitleMapping = {
  '/': PAGE_TITLES.home,
  '/about': PAGE_TITLES.about,
  '/contact': PAGE_TITLES.contact,
  '/projects': PAGE_TITLES.projects,
}

function getPageDescription(url, project) {
  if (project) {
    return project.description;
  }

  return pageDescriptionMapping[url];
}

function getPageTitle(url, project) {
  if (project) {
    return project.name;
  }

  return pageTitleMapping[url];
}

function getPageInfo(ctx, projects) {
  let project;

  if (ctx.params.projectName) {
    project = projects.find(project => project.shortName === ctx.params.projectName);
  }

  return {
    description: getPageDescription(ctx.url, project),
    title: getPageTitle(ctx.url, project),
  }
}

function getInitialState(ctx) {
  const projects = loadProjects().projects;
  const pageInfo = getPageInfo(ctx, projects);

  return {
    reducers: {
      pageDescription: {
        description: pageInfo.description
      },
      pageTitle: {
        title: pageInfo.title
      },
      projects: {
        list: projects
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
        return resolve()
      }

      const history = createMemoryHistory({
        initialEntries: [ctx.url]
      });

      const initialState = getInitialState(ctx);

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
        DESCRIPTION: initialState.reducers.pageDescription.description,
        TITLE: initialState.reducers.pageTitle.title === 'Home' ? 'Michael Humiston' : `Michael Humiston | ${initialState.reducers.pageTitle.title}`,
      };

      Object.keys(htmlReplacements).forEach(key => {
        const value = htmlReplacements[key];
        html = html.replace(
          new RegExp('__' + escapeStringRegexp(key) + '__', 'g'),
          value
        );
      });
      ctx.body = html;

      return resolve();
    });
  });
};
