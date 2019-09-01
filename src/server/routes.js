import Router from 'koa-router';

import contact from './middleware/contact';
import render from './middleware/render';
import projects from './middleware/projects';

const reactRoutes = [
  '/',
  '/about',
  '/projects',
  '/projects/:projectName',
  '/contact'
];

const router = new Router();

router.post('/api/contact', contact);
router.get('/api/projects', projects);

reactRoutes.forEach((route) => {
  router.get(route, render);
});

export default router;
