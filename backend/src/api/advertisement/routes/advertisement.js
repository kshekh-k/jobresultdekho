'use strict';

module.exports = {
  routes: [
    // Public slug lookup — used by frontend DynamicAd component
    {
      method: 'GET',
      path: '/advertisements/slug/:slug',
      handler: 'advertisement.findBySlug',
      config: { auth: false },
    },
    // Analytics — impression + click tracking (fire-and-forget from frontend)
    {
      method: 'POST',
      path: '/advertisements/slug/:slug/impression',
      handler: 'advertisement.trackImpression',
      config: { auth: false },
    },
    {
      method: 'POST',
      path: '/advertisements/slug/:slug/click',
      handler: 'advertisement.trackClick',
      config: { auth: false },
    },
    // Standard CRUD (admin panel uses these via content manager)
    {
      method: 'GET',
      path: '/advertisements',
      handler: 'advertisement.find',
      config: { auth: false },
    },
    {
      method: 'GET',
      path: '/advertisements/:id',
      handler: 'advertisement.findOne',
      config: { auth: false },
    },
    {
      method: 'POST',
      path: '/advertisements',
      handler: 'advertisement.create',
      config: {},
    },
    {
      method: 'PUT',
      path: '/advertisements/:id',
      handler: 'advertisement.update',
      config: {},
    },
    {
      method: 'DELETE',
      path: '/advertisements/:id',
      handler: 'advertisement.delete',
      config: {},
    },
  ],
};
