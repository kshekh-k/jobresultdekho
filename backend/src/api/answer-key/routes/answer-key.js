module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/answer-keys/latest',
      handler: 'answer-key.findLatest',
      config: { auth: false }
    },
    {
      method: 'GET',
      path: '/answer-keys/:slug',
      handler: 'answer-key.findOne',
      config: { auth: false }
    }
  ]
};