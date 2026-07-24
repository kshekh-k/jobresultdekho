'use strict';

// Only content types with an actual image field can post a photo;
// everything else falls back to a text-only message.
const IMAGE_FIELDS = {
  'api::job.job': 'banner_image',
  'api::blog.blog': 'cover_image',
};

const HAS_DEPARTMENT = new Set([
  'api::job.job',
  'api::result.result',
  'api::admit-card.admit-card',
  'api::answer-key.answer-key',
  'api::admission.admission',
  'api::syllabus.syllabus',
]);

function toAbsoluteUrl(url) {
  if (!url) return null;
  return url.startsWith('http') ? url : `${strapi.config.get('server.url')}${url}`;
}

// The document service publish result doesn't populate relations/media, so
// image + department are fetched in one extra query, done inline (not
// deferred) since the publish transaction is gone by the next tick.
async function resolvePostMedia(uid, entry) {
  const imageField = IMAGE_FIELDS[uid];
  const needsDepartment = HAS_DEPARTMENT.has(uid);

  if (!imageField && !needsDepartment) {
    return { imageUrl: null, departmentName: null };
  }

  const populate = [imageField, needsDepartment && 'department'].filter(Boolean);
  const populated = await strapi.documents(uid).findOne({ documentId: entry.documentId, populate });

  return {
    imageUrl: imageField ? toAbsoluteUrl(populated?.[imageField]?.url) : null,
    departmentName: needsDepartment ? populated?.department?.title || null : null,
  };
}

module.exports = { resolvePostMedia };
