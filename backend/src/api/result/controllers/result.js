'use strict';

/**
 * Result controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::result.result', ({strapi}) => ({
    async findOne(ctx) {
        const { slug } = ctx.params;

        const job = await strapi.db.query('api::result.result').findOne({
            where: { slug },
            select: ['id','title','slug','description','content'],
            populate: {
                category: {
                    select: ['id','title','slug']
                }
            }
        });

        if (!job) return ctx.notFound('Result not found');
        return job;
    }
}));
