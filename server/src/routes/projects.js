const Config = require('../config');

module.exports = [
  { method: 'GET', path: `${Config.web.uri}/projects`, handler: { file: './views/projects.json' } }
];
