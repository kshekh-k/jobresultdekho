'use strict';

/**
 * result controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::result.result', ({strapi}) => ({
    async findLatest(ctx) {
        try {
            const results = await strapi.db.query('api::result.result').findMany({
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

            return results;
        } catch (err) {
            strapi.log.error("❌ Error fetching result: " + err.message);
            ctx.throw(500, "Unable to fetch result");
        }
    },

    async findOne(ctx) {
        const { slug } = ctx.params;

        const result = await strapi.db.query('api::result.result').findOne({
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

        if (!result) return ctx.notFound('Result not found');
        return result;
    }
}));
