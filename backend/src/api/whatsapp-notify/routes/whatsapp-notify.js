module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/send-whatsapp/:id',
      handler: 'whatsapp-notify.trigger',
      config: { auth: false },
    },
  ],
};
