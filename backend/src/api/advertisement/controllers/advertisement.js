'use strict';

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::advertisement.advertisement', ({ strapi }) => ({

  async findBySlug(ctx) {
    const { slug } = ctx.params;
    const entry = await strapi.db.query('api::advertisement.advertisement').findOne({
      where: { slug, isActive: true },
      populate: { singleImage: true, desktopImage: true, mobileImage: true },
    });
    if (!entry) return ctx.notFound('Advertisement not found');
    return { data: entry };
  },

  async trackImpression(ctx) {
    const { slug } = ctx.params;
    const entry = await strapi.db.query('api::advertisement.advertisement').findOne({
      where: { slug },
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
      where: { slug },
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
