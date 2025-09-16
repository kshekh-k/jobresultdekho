'use strict';

module.exports = {
  async seed({ strapi }) {
    try {
      // Check if categories already exist
      const existingCategories = await strapi.entityService.findMany('api::category.category');
      
      if (existingCategories.length > 0) {
        console.log('Categories already exist. Skipping seed.');
        return;
      }
      
      // Create parent categories
      const technology = await strapi.entityService.create('api::category.category', {
        data: {
          title: 'Technology',
          link: 'https://example.com/technology',
          publishedAt: new Date()
        }
      });
      
      const sports = await strapi.entityService.create('api::category.category', {
        data: {
          title: 'Sports',
          link: 'https://example.com/sports',
          publishedAt: new Date()
        }
      });
      
      const entertainment = await strapi.entityService.create('api::category.category', {
        data: {
          title: 'Entertainment',
          link: 'https://example.com/entertainment',
          publishedAt: new Date()
        }
      });
      
      // Create child categories for Technology
      await strapi.entityService.create('api::category.category', {
        data: {
          title: 'Software',
          link: 'https://example.com/technology/software',
          parent: technology.id,
          publishedAt: new Date()
        }
      });
      
      await strapi.entityService.create('api::category.category', {
        data: {
          title: 'Hardware',
          link: 'https://example.com/technology/hardware',
          parent: technology.id,
          publishedAt: new Date()
        }
      });
      
      // Create child categories for Sports
      await strapi.entityService.create('api::category.category', {
        data: {
          title: 'Football',
          link: 'https://example.com/sports/football',
          parent: sports.id,
          publishedAt: new Date()
        }
      });
      
      await strapi.entityService.create('api::category.category', {
        data: {
          title: 'Basketball',
          link: 'https://example.com/sports/basketball',
          parent: sports.id,
          publishedAt: new Date()
        }
      });
      
      // Create child categories for Entertainment
      await strapi.entityService.create('api::category.category', {
        data: {
          title: 'Movies',
          link: 'https://example.com/entertainment/movies',
          parent: entertainment.id,
          publishedAt: new Date()
        }
      });
      
      await strapi.entityService.create('api::category.category', {
        data: {
          title: 'Music',
          link: 'https://example.com/entertainment/music',
          parent: entertainment.id,
          publishedAt: new Date()
        }
      });
      
      console.log('Categories seeded successfully');
    } catch (error) {
      console.error('Error seeding categories:', error);
    }
  }
};