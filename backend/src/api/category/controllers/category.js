'use strict';

/**
 * category controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::category.category', ({ strapi }) => ({
  async findWithChildren(ctx) {
    // Get all categories
    const categories = await strapi.entityService.findMany('api::category.category', {
      populate: {
        children: {
          populate: '*',
        },
        parent: true
      },
    });

    // Return only root categories (those without parents)
    const rootCategories = categories.filter(category => !category.parent);

    return rootCategories;
  }
}));