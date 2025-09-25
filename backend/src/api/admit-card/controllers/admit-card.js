'use strict';

/**
 * admit-card controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::admit-card.admit-card', ({strapi}) => ({
    async findOne(ctx) {
        const { slug } = ctx.params;

        const job = await strapi.db.query('api::admit-card.admit-card').findOne({
            where: { slug },
            select: ['id','title','slug','description','content'],
            populate: {
                category: {
                    select: ['id','title','slug']
                }
            }
        });

        if (!job) return ctx.notFound('Admit Card not found');
        return job;
    }
}));
