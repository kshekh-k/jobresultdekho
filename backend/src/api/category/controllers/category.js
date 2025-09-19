'use strict';

/**
 * category controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::category.category', ({ strapi }) => ({
  async tree(ctx) {
    // Get all categories
    const categories = await strapi.entityService.findMany('api::category.category', {
      populate: {
        children: {
          populate: '*',
        },
        parent: true
      },
      sort: { order: 'asc' }
    });

    // Return only root categories (those without parents)
    const rootCategories = categories.filter(category => !category.parent);

    return rootCategories;
  },

  async findOne(ctx) {
    const { slug } = ctx.params;

    const category = await strapi.db.query('api::category.category').findOne({
      where: { slug },
      populate: {
        children: { populate: '*' },
        parent: true
      }
    });

    if (!category) return ctx.notFound('Category not found');
    return category;
  },

}));