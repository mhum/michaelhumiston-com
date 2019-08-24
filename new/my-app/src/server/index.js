import path from 'path';

import Koa from 'koa';
import serve from 'koa-static'

import router from './routes'

const publicPath = path.join(__dirname, '/public');
const app = new Koa();

app.use(serve(publicPath));
app.use(router.routes())

export default app;
