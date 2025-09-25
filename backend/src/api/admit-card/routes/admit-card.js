module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/admit-cards/:slug',
      handler: 'admit-card.findOne',
      config: { auth: false }
    }
  ]
};