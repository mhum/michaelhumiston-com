import Router from 'koa-router';

import render from './middleware/render'
import projects from './middleware/projects'

const router = new Router();

router.get('/favicon.ico', (ctx) => {})
router.get('/api/projects', projects);
router.get('*', render);

export default router;