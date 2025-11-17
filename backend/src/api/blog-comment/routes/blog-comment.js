module.exports = {
  routes: [
    {
      method: "POST",
      path: "/blog-comments",
      handler: "blog-comment.create",
    },
    {
      method: "GET",
      path: "/blog-comments/:postId",
      handler: "blog-comment.findForPost",
    }
  ],
};
