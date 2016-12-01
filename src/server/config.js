const Env = require('node-env-file');
const Path = require('path');

Env(Path.join(__dirname, './.env'));

const config = {};

config.contact = {};
config.web = {};

config.contact.user_name = process.env.CONTACT_EMAIL || 'username';
config.contact.password = process.env.CONTACT_PASS || 'password';
config.contact.subject = process.env.CONTACT_SUBJ || 'Contact Submission - Michael Humiston';
config.contact.to = process.env.CONTACT_TO || 'email';
config.contact.captcha = process.env.CONTACT_CAPTCHA || 'XXXXXX';

config.web.host = process.env.HOST || 'localhost';
config.web.port = process.env.PORT || '3000';

module.exports = config;
