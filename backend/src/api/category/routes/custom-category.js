'use strict';

/**
 * Custom category routes
 */

module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/categories/tree',
      handler: 'category.findWithChildren',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};