'use strict';

const TRACKED_UIDS = require('../../../utils/trackedContentTypes');
const { sendWhatsappMessage, sendWhatsappImage } = require('../../../utils/whapi');
const { formatWhatsappPost } = require('../../../utils/formatWhatsappPost');
const { resolvePostMedia } = require('../../../utils/postMedia');

module.exports = {
  async trigger(ctx) {
    if (ctx.request.header['x-webhook-secret'] !== process.env.ADMIN_JWT_SECRET) {
      return ctx.unauthorized('Invalid secret');
    }

    const { id } = ctx.params;

    let uid;
    let entry;
    for (const candidate of TRACKED_UIDS) {
      entry = await strapi.documents(candidate).findOne({ documentId: id }).catch(() => null);
      if (entry) {
        uid = candidate;
        break;
      }
    }

    if (!entry) return ctx.notFound('No matching entry found for this id');

    try {
      const { imageUrl, departmentName } = await resolvePostMedia(uid, entry);
      const text = formatWhatsappPost(uid, entry, departmentName);
      const data = imageUrl ? await sendWhatsappImage(imageUrl, text) : await sendWhatsappMessage(text);
      ctx.body = { ok: true, uid, documentId: id, data };
    } catch (err) {
      strapi.log.error(`WhatsApp manual trigger failed: ${err.message}`);
      ctx.throw(502, 'WhatsApp send failed');
    }
  },
};
