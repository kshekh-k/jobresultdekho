module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/admissions/latest',
      handler: 'admission.findLatest',
      config: { auth: false }
    },
    {
      method: 'GET',
      path: '/admissions/:slug',
      handler: 'admission.findOne',
      config: { auth: false }
    }
  ]
};