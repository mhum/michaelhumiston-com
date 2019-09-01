import loadProjects from '../lib/projects';

export default (ctx) => {
  ctx.body = loadProjects();
};
