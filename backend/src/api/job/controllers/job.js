'use strict';

/**
 * job controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::job.job', ({strapi}) => ({
    async findLatest(ctx) {
        try {
            const jobs = await strapi.db.query('api::job.job').findMany({
                where: { publishedAt: { $notNull: true } },
                orderBy: { createdAt: 'desc' },
                limit: 10,
                select: ['id', 'title', 'last_date', 'reference_url', 'slug'],
                populate: {
                    department: {
                        select: ['title', 'slug']
                    },
                    category: {
                        select: ['title', 'slug'],
                    },
                },
            });

            return jobs;
        } catch (err) {
            strapi.log.error("❌ Error fetching jobs: " + err.message);
            ctx.throw(500, "Unable to fetch jobs");
        }
    },

    async findOne(ctx) {
        const { slug } = ctx.params;

        const job = await strapi.db.query('api::job.job').findOne({
            where: { slug },
            select: ['id','title','slug','description','content','last_date','reference_url'],
            populate: {
                department: {
                    select: ['title', 'slug']
                },
                category: {
                    select: ['id','title','slug']
                },
                important_links: {
                    select: ['label', 'url']
                }
            }
        });

        if (!job) return ctx.notFound('Job not found');
        return job;
    }
}));
