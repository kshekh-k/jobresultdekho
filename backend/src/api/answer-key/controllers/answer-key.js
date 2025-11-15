'use strict';

/**
 * answer-key controller
 */

const { createCoreController } = require('@strapi/strapi').factories;
const findLatestByStage = require("../../../utils/findLatestByStage");

module.exports = createCoreController('api::answer-key.answer-key', ({strapi}) => ({
    async findLatest(ctx) {
        try {
            const stage = ctx.params.stage || "Answer Key";
            const answerKeys = await findLatestByStage(stage);
            return answerKeys;
        } catch (err) {
            strapi.log.error("❌ Error fetching answer keys: " + err.message);
            ctx.throw(500, "Unable to fetch answer keys");
        }
    },

    async findOne(ctx) {
        const { slug } = ctx.params;

        const answerKey = await strapi.db.query('api::answer-key.answer-key').findOne({
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

        if (!answerKey) return ctx.notFound('Answer Key not found');
        return answerKey;
    }
}));
