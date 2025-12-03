'use strict';

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::job.job', ({ strapi }) => ({

  async searchJobs(query) {
    const { q, page = 1, pageSize = 20 } = query;

    // Sanitize pagination
    const safePage = Math.max(1, Number(page));
    const safePageSize = Math.min(50, Number(pageSize)); // enforce max 50

    // Build filters
    const filters = q
      ? {
          $or: [
            { title: { $containsi: q } },
          ],
        }
      : {};

    // Strapi v4: use findMany + count
    const start = (safePage - 1) * safePageSize;

    const [results, total] = await Promise.all([
      strapi.entityService.findMany('api::job.job', {
        filters,
        sort: { createdAt: 'desc' },
        start,
        limit: safePageSize,
        fields: ['title', 'slug', 'last_date', 'reference_url'],
        populate: {
          department: { fields: ['title'] }
        },
      }),
      strapi.entityService.count('api::job.job', { filters }),
    ]);

    return {
      data: results,
      meta: {
        pagination: {
          page: safePage,
          pageSize: safePageSize,
          pageCount: Math.ceil(total / safePageSize),
          total,
        },
      },
    };
  },
}));
