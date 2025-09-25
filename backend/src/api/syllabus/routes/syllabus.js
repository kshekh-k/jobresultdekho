module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/syllabus/:slug',
      handler: 'syllabus.findOne',
      config: { auth: false }
    }
  ]
};