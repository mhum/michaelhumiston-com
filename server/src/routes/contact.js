const Boom = require('boom');
const Fetch = require('node-fetch');
const Joi = require('joi');
const Nodemailer = require('nodemailer');

const Config = require('../config');

const user = Config.contact.user_name;
const pass = Config.contact.password;

async function sendEmail(payload) {
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
  try {
    const info = await transporter.sendMail(mailOptions);

    console.log(`Message sent: ${info.response}`);
    return 'success';
  } catch (err) {
    console.log(err);
    throw Error('Error sending message');
  }
}

async function validateCaptcha(captcha) {
  const secret = Config.contact.captcha;

  const request = await Fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${captcha}`, {
    method: 'POST'
  });
  const resp = await request.json();

  if (resp.success) {
    return resp;
  }
  throw Error('Captcha validation failed');
}

async function submitContact(request) {
  const { payload } = request;

  try {
    await validateCaptcha(payload.captcha);
    const result = await sendEmail(payload);

    return result;
  } catch (err) {
    return Boom.badRequest(err);
  }
}

module.exports = [
  {
    method: 'POST',
    path: `${Config.web.uri}/contact`,
    handler: submitContact,
    config: {
      validate: {
        payload: {
          captcha: Joi.string().required(),
          email: Joi.string().email().required(),
          message: Joi.string().min(1).required(),
          name: Joi.string().min(1).required()
        }
      }
    }
  }
];
