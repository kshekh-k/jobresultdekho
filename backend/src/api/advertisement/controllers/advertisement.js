'use strict';

const { createCoreController } = require('@strapi/strapi').factories;

// Maps the frontend adSlug prop → the Location enum value stored in the DB.
// Admin just picks a location from the dropdown; slug auto-generates from title.
const SLUG_TO_LOCATION = {
  'home-top-ad':    'Home - Top Banner',
  'home-mid-ad':    'Home - Mid Section',
  'list-mid-ad-1':  'Article List - After 4th Item',
  'list-mid-ad-2':  'Article List - After 16th Item',
  'sidebar-ad':     'Sidebar - Top',
  'article-mid-ad': 'Article Page - Mid Content',
};

function buildWhere(slug) {
  const location = SLUG_TO_LOCATION[slug];
  // Primary: find by location label (what admin selects)
  // Fallback: find by raw slug field (backwards compat if slug was set manually)
  return location ? { location } : { slug };
}

module.exports = createCoreController('api::advertisement.advertisement', ({ strapi }) => ({

  async findBySlug(ctx) {
    const { slug } = ctx.params;
    let entry = await strapi.db.query('api::advertisement.advertisement').findOne({
      where: { ...buildWhere(slug), isActive: true },
      populate: { singleImage: true, desktopImage: true, mobileImage: true },
    });
    // If not found by location, try by raw slug as fallback
    if (!entry && SLUG_TO_LOCATION[slug]) {
      entry = await strapi.db.query('api::advertisement.advertisement').findOne({
        where: { slug, isActive: true },
        populate: { singleImage: true, desktopImage: true, mobileImage: true },
      });
    }
    if (!entry) return ctx.notFound('Advertisement not found');
    return { data: entry };
  },

  async trackImpression(ctx) {
    const { slug } = ctx.params;
    const entry = await strapi.db.query('api::advertisement.advertisement').findOne({
      where: buildWhere(slug),
      select: ['id', 'impressions'],
    });
    if (!entry) return ctx.notFound();
    await strapi.db.query('api::advertisement.advertisement').update({
      where: { id: entry.id },
      data: { impressions: (entry.impressions || 0) + 1 },
    });
    return ctx.send({ ok: true });
  },

  async trackClick(ctx) {
    const { slug } = ctx.params;
    const entry = await strapi.db.query('api::advertisement.advertisement').findOne({
      where: buildWhere(slug),
      select: ['id', 'clicks'],
    });
    if (!entry) return ctx.notFound();
    await strapi.db.query('api::advertisement.advertisement').update({
      where: { id: entry.id },
      data: { clicks: (entry.clicks || 0) + 1 },
    });
    return ctx.send({ ok: true });
  },
}));
