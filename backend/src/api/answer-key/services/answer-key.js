'use strict';

/**
 * answer-key service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::answer-key.answer-key');
