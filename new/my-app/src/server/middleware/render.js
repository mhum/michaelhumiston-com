import fs from 'fs';
import path from 'path';

import escapeStringRegexp from 'escape-string-regexp';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';

import Root from '../../client/components/Root';

export default ctx => {
  const publicPath = path.join(__dirname, '/public');

  return new Promise(resolve => {
    fs.readFile(`${publicPath}/app.html`, 'utf8', (err, html) => {
      if (err) {
        ctx.status = 500;
      }
  
      const context = {};
      const htmlContent = ReactDOMServer.renderToString(
        <StaticRouter location={ctx.url} context={context}>
          <Root />
      </StaticRouter>
      );
      const htmlReplacements = {
        HTML_CONTENT: htmlContent,
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
