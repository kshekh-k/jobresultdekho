'use strict';

/**
 * answer-key controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::answer-key.answer-key', ({strapi}) => ({
    async findLatest(ctx) {
        try {
            const answerKeys = await strapi.db.query('api::answer-key.answer-key').findMany({
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

            return answerKeys;
        } catch (err) {
            strapi.log.error("❌ Error fetching answer keys: " + err.message);
            ctx.throw(500, "Unable to fetch answer keys");
        }
    },

    async findOne(ctx) {
        const { slug } = ctx.params;

        const answerKey = await strapi.db.query('api::answer-key.answer-key').findOne({
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

        if (!answerKey) return ctx.notFound('Answer Key not found');
        return answerKey;
    }
}));
