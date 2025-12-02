'use strict';

module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/contacts',
      handler: 'contact.create',
      config: { policies: [] },
    },
    {
      method: 'POST',
      path: '/contacts/:id/reply',
      handler: 'contact.reply',
      config: { policies: ['admin::isAuthenticatedAdmin'] },
    },
    {
      method: 'POST',
      path: '/contacts/:id/close',
      handler: 'contact.close',
      config: { policies: ['admin::isAuthenticatedAdmin'] },
    },
  ],
};
