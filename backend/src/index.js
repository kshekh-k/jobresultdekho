'use strict';

const bootstrap = require('./bootstrap');
const { sendTelegramMessage, sendTelegramPhoto } = require('./utils/telegram');
const { formatTelegramPost } = require('./utils/formatTelegramPost');
const { sendWhatsappMessage, sendWhatsappImage } = require('./utils/whapi');
const { formatWhatsappPost } = require('./utils/formatWhatsappPost');
const { resolvePostMedia } = require('./utils/postMedia');
const TRACKED_UIDS = require('./utils/trackedContentTypes');

async function notifyTelegram(text, imageUrl) {
  if (imageUrl) {
    try {
      return await sendTelegramPhoto(imageUrl, text);
    } catch (err) {
      strapi.log.error(`Telegram photo send failed, falling back to text: ${err.message}`);
    }
  }
  return sendTelegramMessage(text);
}

async function notifyWhatsapp(text, imageUrl) {
  if (imageUrl) {
    try {
      return await sendWhatsappImage(imageUrl, text);
    } catch (err) {
      strapi.log.error(`WhatsApp image send failed, falling back to text: ${err.message}`);
    }
  }
  return sendWhatsappMessage(text);
}

module.exports = {
  register({ strapi }) {
    strapi.documents.use(async (context, next) => {
      const result = await next();

      if (context.action !== 'publish' || !TRACKED_UIDS.includes(context.uid)) {
        return result;
      }

      const entry = Array.isArray(result) ? result[0] : result?.entries ? result.entries[0] : result;
      if (!entry?.publishedAt) return result;

      // Resolved inline (not deferred) — the document service's DB transaction
      // is gone by the next tick, so this lookup can't happen inside a .then().
      const { imageUrl, departmentName } = await resolvePostMedia(context.uid, entry).catch((err) => {
        strapi.log.error(`Post media resolve failed: ${err.message}`);
        return { imageUrl: null, departmentName: null };
      });

      const telegramText = formatTelegramPost(context.uid, entry, departmentName);
      notifyTelegram(telegramText, imageUrl).catch((err) => {
        strapi.log.error(`Telegram notify failed: ${err.message}`);
      });

      const whatsappText = formatWhatsappPost(context.uid, entry, departmentName);
      notifyWhatsapp(whatsappText, imageUrl).catch((err) => {
        strapi.log.error(`WhatsApp notify failed: ${err.message}`);
      });

      return result;
    });
  },

  bootstrap,
};
