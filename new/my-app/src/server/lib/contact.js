import Boom from '@hapi/boom';
import Joi from '@hapi/joi';
import Fetch from 'node-fetch';
import Nodemailer from 'nodemailer';

import Config from '../config';

const user = Config.contact.user_name;
const pass = Config.contact.password;
  
function validateForm(payload) {
  const schema = Joi.object().keys({
    captcha: Joi.string().required(),
    email: Joi.string().email().required(),
    message: Joi.string().min(1).required(),
    name: Joi.string().min(1).required()
  });

  const result = schema.validate(payload);
  if (result.error) {
    throw Boom.badRequest(result.error.details[0].message);
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
  throw Boom.badImplementation('Captcha validation failed');
}

async function sendEmail(payload) {
  const transporter = Nodemailer.createTransport(`smtps://${user}:${pass}@smtp.gmail.com`);

  try {
    const info = await transporter.sendMail({
      from: `"Contact" <${user}>`,
      replyTo: payload.email,
      to: Config.contact.to,
      subject: Config.contact.subject,
      html: `<p>Name: ${payload.name}</p>
      <p>Email: ${payload.email}</p>
      <p>Message: ${payload.message}</p>`
    });

    console.log(`Message sent: ${info.response}`);
    return 'success';
  } catch (err) {
    console.log(err);
    throw Boom.badImplementation('Error sending message');
  }
}

export const submitContact = async (payload) => {
  validateForm(payload);
  await validateCaptcha(payload.captcha);
  return await sendEmail(payload);
}