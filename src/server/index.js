import path from 'path';

import Koa from 'koa';
import bodyParser from 'koa-body-parser';
import serve from 'koa-static';

import router from './routes';

const publicPath = path.join(__dirname, '/public');
const app = new Koa();

app.use(serve(publicPath, { hidden: true }));
app.use(bodyParser());
app.use(router.routes());

export default app;
