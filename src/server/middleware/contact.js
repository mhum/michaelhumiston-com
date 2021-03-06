import submitContact from '../lib/contact';

export default async (ctx) => {
  try {
    ctx.body = await submitContact(ctx.request.body);
  } catch (err) {
    ctx.status = err.output.payload.statusCode;
    ctx.body = err.output.payload.message;
  }
};
