const Boom = require('boom');
const Nodemailer = require('nodemailer');

const Config = require('../config');

const user = Config.contact.user_name;
const pass = Config.contact.password;

function submitContact(request, reply) {
  const payload = request.payload;

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
      reply(Boom.badRequest('Error sending message'));
      return console.log(error);
    }
    reply('success');
    return console.log(`Message sent: ${info.response}`);
  });
}

module.exports = [
    { method: 'POST', path: '/contact', handler: submitContact }
];
