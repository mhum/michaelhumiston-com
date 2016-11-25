function submitContact(request, reply) {
  reply('test');
}

module.exports = [
    { method: 'POST', path: '/contact', handler: submitContact }
];
