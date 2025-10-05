module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/admit-cards/latest',
      handler: 'admit-card.findLatest',
      config: { auth: false }
    },
    {
      method: 'GET',
      path: '/admit-cards/:slug',
      handler: 'admit-card.findOne',
      config: { auth: false }
    }
  ]
};