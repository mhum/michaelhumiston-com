const config = {};
config.contact = {};

config.contact.userName = process.env.REACT_APP_CONTACT_EMAIL || 'username';
config.contact.clientID = process.env.REACT_APP_CONTACT_CLIENT_ID || 'client_id';
config.contact.clientKey = process.env.REACT_APP_CONTACT_CLIENT_KEY || 'secret_key';
config.contact.subject = process.env.REACT_APP_CONTACT_SUBJ || 'Contact Submission - Michael Humiston';
config.contact.to = process.env.REACT_APP_CONTACT_TO || 'email';
config.contact.captcha = process.env.REACT_APP_CONTACT_CAPTCHA || 'XXXXXX';

export { config as default };
