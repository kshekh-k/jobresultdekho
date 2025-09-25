module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/results/:slug',
      handler: 'result.findOne',
      config: { auth: false }
    }
  ]
};