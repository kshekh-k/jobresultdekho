module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/jobs/:slug',
      handler: 'job.findOne',
      config: { auth: false }
    }
  ]
};