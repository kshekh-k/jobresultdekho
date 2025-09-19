'use strict';

/**
 * category controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

async function buildCategoryTree(categoryId) {
  const category = await strapi.db.query('api::category.category').findOne({
    where: { id: categoryId },
    populate: { children: true, parent: true },
  });

  if (category?.children?.length) {
    category.children = await Promise.all(
      category.children.map(child => buildCategoryTree(child.id))
    );
  }

  return category;
}

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
      parent: true,
        children: {
          populate: {
            children: true
          }
        }
      }
    });

    if (!category) return ctx.notFound('Category not found');
    return category;
  },

}));