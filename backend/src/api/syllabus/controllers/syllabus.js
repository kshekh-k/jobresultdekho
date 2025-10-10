'use strict';

/**
 * Syllabus controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::syllabus.syllabus', ({strapi}) => ({
    async findLatest(ctx) {
        try {
            const syllabus = await strapi.db.query('api::syllabus.syllabus').findMany({
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

            return syllabus;
        } catch (err) {
            strapi.log.error("❌ Error fetching syllabus: " + err.message);
            ctx.throw(500, "Unable to fetch syllabus");
        }
    },

    async findOne(ctx) {
        const { slug } = ctx.params;

        const syllabus = await strapi.db.query('api::syllabus.syllabus').findOne({
            where: { slug },
            select: ['id','title','slug','reference_url','description','content'],
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

        if (!syllabus) return ctx.notFound('Syllabus not found');
        return syllabus;
    }
}));
