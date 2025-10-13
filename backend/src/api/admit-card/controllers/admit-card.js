'use strict';

/**
 * admit-card controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::admit-card.admit-card', ({strapi}) => ({
    async findLatest(ctx) {
        try {
            const admitCards = await strapi.db.query('api::admit-card.admit-card').findMany({
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

            return admitCards;
        } catch (err) {
            strapi.log.error("❌ Error fetching admissions: " + err.message);
            ctx.throw(500, "Unable to fetch admissions");
        }
    },

    async findOne(ctx) {
        const { slug } = ctx.params;

        const admitCard = await strapi.db.query('api::admit-card.admit-card').findOne({
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

        if (!admitCard) return ctx.notFound('Admit card not found');
        return admitCard;
    }
}));
