'use strict';

/**
 * Admission controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::admission.admission', ({strapi}) => ({
    async findOne(ctx) {
        const { slug } = ctx.params;

        const job = await strapi.db.query('api::admission.admission').findOne({
            where: { slug },
            select: ['id','title','slug','description','content'],
            populate: {
                category: {
                    select: ['id','title','slug']
                }
            }
        });

        if (!job) return ctx.notFound('Admission not found');
        return job;
    }
}));
