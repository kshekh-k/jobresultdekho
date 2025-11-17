"use strict";

module.exports = {
  async find(ctx) {
    try {
      return await strapi.service("api::blog.blog").find(ctx.query);
    } catch (err) {
      ctx.throw(500, "Unable to fetch blogs");
    }
  },

  async findLatest(ctx) {
    try {
      return await strapi.service("api::blog.blog").findLatest();
    } catch (err) {
      ctx.throw(500, "Unable to fetch latest blogs");
    }
  },

  async findOne(ctx) {
    try {
      const { slug } = ctx.params;

      return await strapi.service("api::blog.blog").findOneBySlug(slug);
    } catch (err) {
      ctx.throw(500, "Unable to fetch blog details");
    }
  },
};
