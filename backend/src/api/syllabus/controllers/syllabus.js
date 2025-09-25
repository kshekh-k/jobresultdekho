'use strict';

/**
 * Syllabus controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::syllabus.syllabus', ({strapi}) => ({
    async findOne(ctx) {
        const { slug } = ctx.params;

        const job = await strapi.db.query('api::syllabus.syllabus').findOne({
            where: { slug },
            select: ['id','title','slug','description','content'],
            populate: {
                category: {
                    select: ['id','title','slug']
                }
            }
        });

        if (!job) return ctx.notFound('Syllabus not found');
        return job;
    }
}));
