import http from 'http';

import app from './server';

const server = http.createServer(app.callback()).listen(
  `${process.env.PORT || 3000}`,
  `${process.env.HOST || '127.0.0.1'}`
);

if (module.hot) {
  module.hot.accept('./server', () => {
    server.removeAllListeners('request', server);
    server.on('request', app.callback());
  });
}

server.on('listening', () => {
  console.log(`Server running on: http://${server.address().address}:${server.address().port}`);
});
