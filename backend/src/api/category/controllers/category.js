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

    // 1. Fetch category basic info
    const category = await strapi.db.query("api::category.category").findOne({
      where: { slug },
      select: ["id", "title", "slug", "description"],
      populate: {
        parent: { select: ["id", "title", "slug"] },
        children: { select: ["id", "title", "slug"] },
      },
    });

    if (!category) return ctx.notFound("Category not found");
    const categoryId = category.id;

    // 2. Helper for each listing type
    const fetchStageRecords = async (stage) => {
      return await strapi.db.query("api::job.job").findMany({
        where: {
          stage,
          category: categoryId,
        },
        orderBy: [{ last_date: "asc" }],
        select: ["id", "title", "slug", "last_date", "stage"],
        populate: {
          department: { select: ["title", "slug"] },
        },
      });
    };

    // 3. Return NEW immutable object (important!)
    return {
      ...category,
      jobs:        await fetchStageRecords("jobs"),
      results:     await fetchStageRecords("results"),
      admit_cards: await fetchStageRecords("admit-cards"),
      answer_keys: await fetchStageRecords("answer-keys"),
      syllabus:    await fetchStageRecords("syllabus"),
      admissions:  await fetchStageRecords("admissions"),
    };
  },

}));
