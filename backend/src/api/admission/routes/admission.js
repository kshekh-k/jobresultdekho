module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/admissions/:slug',
      handler: 'admission.findOne',
      config: { auth: false }
    }
  ]
};