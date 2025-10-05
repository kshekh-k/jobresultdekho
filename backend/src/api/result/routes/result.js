module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/results/latest',
      handler: 'result.findLatest',
      config: { auth: false }
    },
    {
      method: 'GET',
      path: '/results/:slug',
      handler: 'result.findOne',
      config: { auth: false }
    }
  ]
};