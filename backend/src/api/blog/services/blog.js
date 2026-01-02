"use strict";

module.exports = {
  async find(query) {
    return await strapi.db.query("api::blog.blog").findMany({
      where: { publishedAt: { $notNull: true } },
      orderBy: [{ publishedAt: "desc" }],
      select: ["id", "title", "slug", "short_description", "publishedAt"],
      populate: {
        cover_image: true,
        category: true,
      },
    });
  },

  async findLatest(limit = 5) {
    return await strapi.db.query("api::blog.blog").findMany({
      where: { publishedAt: { $notNull: true } },
      orderBy: [{ publishedAt: "desc" }],
      limit,
      select: ["id", "title", "slug", "publishedAt"],
      populate: {
        cover_image: true,
        category: true,
      },
    });
  },

  async findOneBySlug(slug) {
    const blog = await strapi.db.query("api::blog.blog").findOne({
      where: { slug, publishedAt: { $notNull: true } },
      populate: {
        cover_image: true,
        category: true,
        SEO: {
          select: ['title', 'tags', 'description']
        },
        comments: {
          where: { is_approved: true },
          orderBy: [{ createdAt: "asc" }],
          populate: {
            replies: {
              where: { is_approved: true },
            },
          },
        }
      },
    });

    if (!blog) return null;
    return blog;
  },
};
