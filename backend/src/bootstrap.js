'use strict';

const seedCategories = require('./seed/seed-categories');

module.exports = async ({ strapi }) => {
  // Bootstrap phase
  if (process.env.NODE_ENV === 'development') {
    // Run seeds in development mode
    await seedCategories.seed({ strapi });
  }
};