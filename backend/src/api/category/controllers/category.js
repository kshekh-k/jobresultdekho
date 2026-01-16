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

    // 2. Separate helpers for different content types
    const fetchJobs = async (extraWhere = {}) => {
      return await strapi.db.query("api::job.job").findMany({
        where: {
          category: { slug: slug },
          publishedAt: { $notNull: true },
          ...extraWhere,
        },
        orderBy: [{ createdAt: "desc" }],
        select: ["id", "title", "slug", "last_date", "reference_url", "Link_not_available", "Start_date", "Apply_date_Start_message"],
        populate: {
          department: { select: ["title", "slug"] },
        },
      });
    };

    const fetchOtherRecords = async (contentType) => {
      return await strapi.db.query(contentType).findMany({
        where: {
          category: { slug: slug },
          publishedAt: { $notNull: true },
        },
        orderBy: [{ createdAt: "desc" }],
        select: ["id", "title", "slug", "last_date", "reference_url"],
        populate: {
          department: { select: ["title", "slug"] },
        },
      });
    };

    // 3. Return NEW immutable object
    return {
      ...category,
      jobs: await fetchJobs({ stage: "Job" }),
      admit_cards: await fetchJobs({ stage: "Admit Card" }),
      results: await fetchJobs({ stage: "Result" }),
      answer_keys: await fetchJobs({ stage: "Answer Key" }),
      waiting_list: await fetchJobs({ stage: "Waiting List" }),
      archive_jobs: await fetchJobs({ stage: "Archive Job" }),

      // admissions and syllabus are separate content types
      admissions: await fetchOtherRecords("api::admission.admission"),
      syllabus: await fetchOtherRecords("api::syllabus.syllabus"),
    };
  },


}));
