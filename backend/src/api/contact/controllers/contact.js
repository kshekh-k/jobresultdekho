'use strict';

module.exports = {
  async create(ctx) {
    const { recaptchaToken, ...payload } = ctx.request.body;

    if (!recaptchaToken) return ctx.badRequest('Missing reCAPTCHA token');

    const result = await strapi
      .service('api::contact.contact')
      .verifyRecaptcha(recaptchaToken);

    if (!result.success || (typeof result.score === 'number' && result.score < 0.5)) {
      return ctx.badRequest('Failed reCAPTCHA validation');
    }

    if (!payload.email || !payload.message) {
      return ctx.badRequest('Missing required fields');
    }

    const entry = await strapi
      .service('api::contact.contact')
      .createTicket(payload, result.score ?? 0);
      
    ctx.body = entry;
  },

  async reply(ctx) {
    const { id } = ctx.params;
    const { reply_message } = ctx.request.body;

    if (!reply_message) return ctx.badRequest('Missing reply_message');

    const updated = await strapi
      .service('api::contact.contact')
      .replyTicket(Number(id), reply_message);

    ctx.body = updated;
  },

  async close(ctx) {
    const { id } = ctx.params;

    const updated = await strapi
      .service('api::contact.contact')
      .closeTicket(Number(id));

    ctx.body = updated;
  },
};
