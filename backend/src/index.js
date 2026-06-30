'use strict';

const bootstrap = require('./bootstrap');
const { sendTelegramMessage } = require('./utils/telegram');
const { formatTelegramPost } = require('./utils/formatTelegramPost');

const TRACKED_UIDS = [
  'api::job.job',
  'api::result.result',
  'api::admit-card.admit-card',
  'api::answer-key.answer-key',
  'api::admission.admission',
  'api::syllabus.syllabus',
  'api::blog.blog',
];

module.exports = {
  register({ strapi }) {
    strapi.documents.use(async (context, next) => {
      const result = await next();

      if (context.action !== 'publish' || !TRACKED_UIDS.includes(context.uid)) {
        return result;
      }

      const entry = Array.isArray(result) ? result[0] : result;
      if (!entry?.publishedAt) return result;

      sendTelegramMessage(formatTelegramPost(context.uid, entry)).catch((err) => {
        strapi.log.error(`Telegram notify failed: ${err.message}`);
      });

      return result;
    });
  },

  bootstrap,
};
