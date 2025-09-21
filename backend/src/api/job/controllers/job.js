'use strict';

/**
 * job controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::job.job', ({strapi}) => ({
    async findOne(ctx) {
        const { slug } = ctx.params;

        const job = await strapi.db.query('api::job.job').findOne({
            where: { slug },
            select: ['id','title','slug','description','content'],
            populate: {
                category: {
                    select: ['id','title','slug']
                }
            }
        });

        if (!job) return ctx.notFound('Job not found');
        return job;
    }
}));
