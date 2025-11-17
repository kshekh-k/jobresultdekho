"use strict";

module.exports = {
  async create(ctx) {
    try {
      const { name, email, comment, post, parent } = ctx.request.body.data;

      const newComment = await strapi.service("api::blog-comment.blog-comment").create({
        name,
        email,
        comment,
        post,
        parent: parent || null,
        is_approved: false
      });

      return {
        message: "Comment submitted and awaiting approval",
        data: newComment
      };
    } catch (err) {
      ctx.throw(500, "Unable to submit comment");
    }
  },

  async findForPost(ctx) {
    try {
      const { postId } = ctx.params;

      return await strapi.service("api::blog-comment.blog-comment").findForPost(postId);
    } catch (err) {
      ctx.throw(500, "Unable to fetch comments");
    }
  },
};
