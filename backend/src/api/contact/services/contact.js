'use strict';

module.exports = () => ({
  async verifyRecaptcha(token) {
    const secret = process.env.RECAPTCHA_SECRET;
    if (!secret) throw new Error('Missing RECAPTCHA_SECRET');

    const body = new URLSearchParams({
      secret,
      response: token,
    });

    const res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
    });

    if (!res.ok) {
      const text = await res.text().catch(() => '');
      throw new Error(`reCAPTCHA verify failed (${res.status}): ${text}`);
    }

    return res.json(); // { success, score, action, ... }
  },

  async createTicket(data, recaptchaScore) {
    console.log('Creating contact ticket with reCAPTCHA score:', data);
    return strapi.db.query('api::contact.contact').create({
      data: {
        ...data,
        recaptcha_score: recaptchaScore,
      },
    });
  },

  async replyTicket(id, reply_message) {
    return strapi.db.query('api::contact.contact').update({
      where: { id },
      data: {
        reply_message,
        status: 'replied',
        replied_at: new Date(),
      },
    });
  },

  async closeTicket(id) {
    return strapi.db.query('api::contact.contact').update({
      where: { id },
      data: {
        status: 'closed',
        closed_at: new Date(),
      },
    });
  },
});
