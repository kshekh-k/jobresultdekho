'use strict';

/**
 * result controller
 */

const { createCoreController } = require('@strapi/strapi').factories;
const findLatestByStage = require("../../../utils/findLatestByStage");

module.exports = createCoreController('api::result.result', ({strapi}) => ({
    async findLatest(ctx) {
        try {
            const stage = ctx.params.stage || "Result";
            const results = await findLatestByStage(stage);
            return results;
        } catch (err) {
            strapi.log.error("❌ Error fetching results: " + err.message);
            ctx.throw(500, "Unable to fetch results");
        }
    },

    async findOne(ctx) {
        const { slug } = ctx.params;

        const result = await strapi.db.query('api::result.result').findOne({
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

        if (!result) return ctx.notFound('Result not found');
        return result;
    }
}));
