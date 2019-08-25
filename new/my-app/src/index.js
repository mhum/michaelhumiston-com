import http from 'http';

import app from './server';

const server = http.createServer(app.callback()).listen(`${process.env.PORT || 3000}`);

if (module.hot) {
    module.hot.accept('./server', () => {
        server.removeAllListeners('request', server);
        server.on('request', app.callback())
    });
}

console.log(`Server running on: http://localhost:${process.env.PORT || 3000}`);
