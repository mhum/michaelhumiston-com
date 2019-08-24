import http from 'http';

import app from './server';

const appCallback = app.callback();
const server = http.createServer(appCallback);

let currentApp = appCallback;

server.listen(process.env.PORT || 3000);

if (module.hot) {
  module.hot.accept('./server', () => {
      server.removeListener('request', currentApp);
      server.on('request', appCallback);
      currentApp = appCallback;
  });
}

console.log(`React SSR App is running: http://localhost:${process.env.PORT || 3000}` );
