import fs from 'fs';
import path from 'path';

import escapeStringRegexp from 'escape-string-regexp';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Provider } from 'react-redux'
import { StaticRouter } from 'react-router-dom';
import { createStore, combineReducers } from 'redux';

import Root from '../../client/components/Root';
import reducers from '../../client/redux/reducers'

export default ctx => {
  const publicPath = path.join(__dirname, '/public');

  return new Promise(resolve => {
    fs.readFile(`${publicPath}/app.html`, 'utf8', (err, html) => {
      if (err) {
        ctx.status = 500;
      }
  
      const store = createStore(
        combineReducers({
          reducers,
          //routing: routerReducer
        }),
        //applyMiddleware(thunkMiddleware)
      );
      const context = {};
      const htmlContent = ReactDOMServer.renderToString(
        <Provider store={store}>
          <StaticRouter location={ctx.url} context={context}>
            <Root/>
        </StaticRouter>
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
