module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/answer-keys/:slug',
      handler: 'answer-key.findOne',
      config: { auth: false }
    }
  ]
};