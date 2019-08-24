import fs from 'fs';
import path from 'path';

import escapeStringRegexp from 'escape-string-regexp';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

import App from '../../App';

export default ctx => {
  const publicPath = path.join(__dirname, '/public');

  return new Promise(resolve => {
    fs.readFile(`${publicPath}/app.html`, 'utf8', (err, html) => {
      if (err) {
        ctx.status = 500;
      }
  
      const htmlContent = ReactDOMServer.renderToString(<App />);
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
