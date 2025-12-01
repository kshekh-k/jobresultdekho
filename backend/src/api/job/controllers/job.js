'use strict';

/**
 * job controller
 */

const { createCoreController } = require('@strapi/strapi').factories;
const findLatestByStage = require("../../../utils/findLatestByStage");

module.exports = createCoreController('api::job.job', ({strapi}) => ({
    
    async findHotPosts(ctx) {
        try {
            const jobs = await strapi.db.query('api::job.job').findMany({
                where: { 
                    publishedAt: { $notNull: true },
                    hot_post: true,
                },
                orderBy: { updatedAt: 'desc' },
                limit: 6,
                select: ['title', 'total_posts', 'slug']                
            });

            return jobs;
        } catch (err) {
            strapi.log.error("❌ Error fetching hot posts: " + err.message);
            ctx.throw(500, "Unable to fetch hot posts");
        }
    },

    async findHighAlertPosts(ctx) {
        try {
            const jobs = await strapi.db.query('api::job.job').findMany({
                where: { 
                    publishedAt: { $notNull: true },
                    high_alert: true,
                },
                orderBy: { updatedAt: 'desc' },
                limit: 20,
                select: ['title', 'total_posts', 'slug']                
            });

            return jobs;
        } catch (err) {
            strapi.log.error("❌ Error fetching high alert posts: " + err.message);
            ctx.throw(500, "Unable to fetch high alert posts");
        }
    },

    async findLatest(ctx) {
        try {
            const stage = ctx.params.stage || "Job";
            const jobs = await findLatestByStage(stage);
            return jobs;
        } catch (err) {
            strapi.log.error("❌ Error fetching latest jobs: " + err.message);
            ctx.throw(500, "Unable to fetch latest jobs");
        }
    },

    async findOne(ctx) {
        const { slug } = ctx.params;

        const job = await strapi.db.query('api::job.job').findOne({
            where: { slug },
            select: [
                'title','slug','short_description','content','last_date',
                'reference_url','total_posts','stage',
            ],
            populate: {
                category: {
                    select: ['id','title','slug']
                },
                department: {
                    select: ['title', 'slug']
                },
                banner_image: true,
                important_dates: {
                    select: [
                        'vacancy_notification_date', 'apply_online_start_date', 'apply_online_end_date',
                        'fee_payment_last_date', 'correction_date', 'admit_card', 'exam_date', 'result_date'
                    ]
                },
                application_fee: {
                    select: [
                        'general_obc_ews', 'sc_st_pwd', 'female_transgender',
                        'online_payment', 'offline_payment'
                    ]
                },
                eligiblity_criterea: {
                    select: [
                        'title', 'content'
                    ]
                },
                job_disclaimer : {
                    select: ['title', 'content']
                },
                important_links: {
                    select: ['label', 'url']
                },
                FAQs: {
                    select: ['question', 'answer']
                },
                SEO: {
                    select: ['title', 'tags', 'description']
                }
            }
        });

        if (!job) return ctx.notFound('Job not found');
        return job;
    }
}));
