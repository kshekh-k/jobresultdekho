'use strict';

/**
 * page controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::page.page', ({strapi}) => ({
    async findOne(ctx) {
        const { slug } = ctx.params;

        const page = await strapi.db.query('api::page.page').findOne({
            where: { slug },
            select: ['id','title','slug','description','content'],
            populate: {
                categories: {
                    select: ['id','title','slug']
                }
            }
        });

        if (!page) return ctx.notFound('Page not found');
        return page;
    }
}));
