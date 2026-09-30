'use strict';

/**
 * Admission controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::admission.admission', ({ strapi }) => ({
    async findLatest(ctx) {
        try {
            const admissions = await strapi.db.query('api::admission.admission').findMany({
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

            return admissions;
        } catch (err) {
            strapi.log.error("❌ Error fetching admissions: " + err.message);
            ctx.throw(500, "Unable to fetch admissions");
        }
    },

    async findOne(ctx) {
        const { slug } = ctx.params;

        const admission = await strapi.db.query('api::admission.admission').findOne({
            where: { slug },
            select: ['id', 'title', 'slug', 'description', 'content', 'content_md', 'last_date', 'reference_url'],
            populate: {
                department: {
                    select: ['title', 'slug']
                },
                category: {
                    select: ['id', 'title', 'slug']
                },
                important_links: {
                    select: ['label', 'url', 'Link_message_require', 'Link_message', 'Need_PDF_upload'],
                    populate: {
                        Upload_PDF: true
                    }
                },
                Upload_PDF: true,
            }
        });

        if (!admission) return ctx.notFound('Admission not found');
        return admission;
    }
}));
