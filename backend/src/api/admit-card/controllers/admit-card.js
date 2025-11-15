'use strict';

/**
 * admit-card controller
 */

const { createCoreController } = require('@strapi/strapi').factories;
const findLatestByStage = require("../../../utils/findLatestByStage");

module.exports = createCoreController('api::admit-card.admit-card', ({strapi}) => ({
    async findLatest(ctx) {
        try {
            const stage = ctx.params.stage || "Admit Card";
            const admitCards = await findLatestByStage(stage);
            return admitCards;
        } catch (err) {
            strapi.log.error("❌ Error fetching admit cards: " + err.message);
            ctx.throw(500, "Unable to fetch admit cards");
        }
    },

    async findOne(ctx) {
        const { slug } = ctx.params;

        const admitCard = await strapi.db.query('api::admit-card.admit-card').findOne({
            where: { slug },
            select: ['id','title','slug','description','content','last_date','reference_url'],
            populate: {
                category: {
                    select: ['id','title','slug']
                },
                department: {
                    select: ['title', 'slug']
                },
                important_links: {
                    select: ['label', 'url']
                },
                FAQs: {
                    select: ['question', 'answer']
                }
            }
        });

        if (!admitCard) return ctx.notFound('Admit card not found');
        return admitCard;
    }
}));
