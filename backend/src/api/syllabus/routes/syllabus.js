module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/syllabus/latest',
      handler: 'syllabus.findLatest',
      config: { auth: false }
    },
    {
      method: 'GET',
      path: '/syllabus/:slug',
      handler: 'syllabus.findOne',
      config: { auth: false }
    }
  ]
};