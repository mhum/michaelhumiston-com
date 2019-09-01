const config = {};
config.contact = {};

config.contact.user_name = process.env.REACT_APP_CONTACT_EMAIL || 'username';
config.contact.password = process.env.REACT_APP_CONTACT_PASS || 'password';
config.contact.subject = process.env.REACT_APP_CONTACT_SUBJ || 'Contact Submission - Michael Humiston';
config.contact.to = process.env.REACT_APP_CONTACT_TO || 'email';
config.contact.captcha = process.env.REACT_APP_CONTACT_CAPTCHA || 'XXXXXX';

export { config as default };
