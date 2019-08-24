import Router from 'koa-router';

import render from './middleware/render'

const router = new Router();

router.get('*', render);

export default router;