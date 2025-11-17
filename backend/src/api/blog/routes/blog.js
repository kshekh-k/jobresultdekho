module.exports = {
  routes: [
    {
      method: "GET",
      path: "/blogs",
      handler: "blog.find",
    },
    {
      method: "GET",
      path: "/blogs/latest",
      handler: "blog.findLatest",
    },
    {
      method: "GET",
      path: "/blogs/:slug",
      handler: "blog.findOne",
    }
  ],
};
