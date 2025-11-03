module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/jobs/hot-posts',
      handler: 'job.findHotPosts',
      config: { auth: false }
    },
    {
      method: 'GET',
      path: '/jobs/latest',
      handler: 'job.findLatest',
      config: { auth: false }
    },
    {
      method: 'GET',
      path: '/jobs/:slug',
      handler: 'job.findOne',
      config: { auth: false }
    }
  ]
};