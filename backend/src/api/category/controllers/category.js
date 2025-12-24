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
  
    // 2. Generic helper for fetching records from any content type
    const fetchRecords = async (contentType, extraWhere = {}, extraSelect = []) => {
      return await strapi.db.query(contentType).findMany({
        where: {
          category: { slug: slug },
          publishedAt: { $notNull: true },
          ...extraWhere,
        },
        orderBy: [{ last_date: "asc" }],
        select: ["id", "title", "slug", "last_date", "reference_url", ...extraSelect],
        populate: {
          department: { select: ["title", "slug"] },
        },
      });
    };

    // 3. Return NEW immutable object
    return {
      ...category,
      jobs:        await fetchRecords("api::job.job", { stage: "Job" }),
      admit_cards: await fetchRecords("api::job.job", { stage: "Admit Card" }),
      results:     await fetchRecords("api::job.job", { stage: "Result" }),
      answer_keys: await fetchRecords("api::job.job", { stage: "Answer Key" }),
      waiting_list: await fetchRecords("api::job.job", { stage: "Waiting List" }),
      archive_jobs: await fetchRecords("api::job.job", { stage: "Archive Job" }),

      // admissions and syllabus are separate content types
      admissions:  await fetchRecords("api::admission.admission"),
      syllabus:    await fetchRecords("api::syllabus.syllabus"),
    };
  },


}));
