'use strict';

/**
 * answer-key controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::answer-key.answer-key', ({strapi}) => ({
    async findOne(ctx) {
        const { slug } = ctx.params;

        const job = await strapi.db.query('api::answer-key.answer-key').findOne({
            where: { slug },
            select: ['id','title','slug','description','content'],
            populate: {
                category: {
                    select: ['id','title','slug']
                }
            }
        });

        if (!job) return ctx.notFound('Answer Key not found');
        return job;
    }
}));
