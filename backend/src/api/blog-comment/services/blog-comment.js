"use strict";

module.exports = {
  async create(data) {
    return await strapi.db.query("api::blog-comment.blog-comment").create({
      data,
    });
  },

  async findForPost(postId) {
    return await strapi.db.query("api::blog-comment.blog-comment").findMany({
      where: {
        post: postId,
        is_approved: true,
        parent: { $null: true }
      },
      orderBy: [{ createdAt: "asc" }],
      populate: {
        replies: {
          where: { is_approved: true }
        }
      },
    });
  },
};
