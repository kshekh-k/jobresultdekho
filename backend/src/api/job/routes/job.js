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
      path: '/jobs/high-alert',
      handler: 'job.findHighAlertPosts',
      config: { auth: false }
    },
    {
      method: 'GET',
      path: '/jobs/latest',
      handler: 'job.findLatest',
      config: { auth: false }
    },
    // 🔍 search must be BEFORE the dynamic :slug route
    {
      method: 'GET',
      path: '/jobs/search',
      handler: 'job.search',
      config: { auth: false },
    },
    {
      method: 'GET',
      path: '/jobs/:slug',
      handler: 'job.findOne',
      config: { auth: false }
    },
    {
      method: 'GET',
      path: '/jobs',
      handler: 'job.find',
      config: { auth: false }
    }
  ]
};
