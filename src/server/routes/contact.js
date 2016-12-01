const Boom = require('boom');
const Fetch = require('node-fetch');
const Nodemailer = require('nodemailer');

const Config = require('../config');

const user = Config.contact.user_name;
const pass = Config.contact.password;

function sendEmail(payload) {
  // create reusable transporter object using the default SMTP transport
  const transporter = Nodemailer.createTransport(`smtps://${user}:${pass}@smtp.gmail.com`);

  // setup e-mail data
  const mailOptions = {
    from: `"Contact" <${user}>`,
    replyTo: payload.email,
    to: Config.contact.to,
    subject: Config.contact.subject,
    html: `<p>Name: ${payload.name}</p>
    <p>Email: ${payload.email}</p>
    <p>Message: ${payload.message}</p>`
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return Promise.reject(Boom.badRequest('Error sending message'));
    }

    console.log(`Message sent: ${info.response}`);
    return Promise.resolve('success');
  });
}

function validateCaptcha(captcha) {
  const secret = Config.contact.captcha;
  return Fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${captcha}`, {
    method: 'POST'
  })
  .then(resp => resp.json())
  .then((resp) => {
    if (resp.success) {
      return Promise.resolve(resp);
    }
    return Promise.reject(Boom.badRequest(resp['error-codes'][0]));
  })
  .catch(resp => Promise.reject(Boom.badRequest(resp)));
}

function submitContact(request, reply) {
  const payload = JSON.parse(request.payload);

  validateCaptcha(payload.captcha)
  .then(() => sendEmail(payload))
  .then(resp => reply(resp))
  .catch(resp => reply(resp));
}

module.exports = [
    { method: 'POST', path: '/contact', handler: submitContact }
];
