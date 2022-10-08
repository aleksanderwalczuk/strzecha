'use strict';

/**
 *  hero-section controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::hero-section.hero-section', () => ({
  async homepage(ctx) {
    const { query } = ctx;

    const homepageEntity = await strapi.service('api::hero-section.hero-section').find({
      populate: ['*'],
      ...query,
    });

    const categoriesEntity = await strapi.service('api::product-category.product-category').find({
      populate: ['main_category', 'image'],
      ...query,
    });

    const promotedProductsEntity = await strapi.service('api::product.product').find({
      populate: ['info', 'info.images', 'info.subcategory.main_category', 'additional'],
      filters: {
        additional: {
          promoted: true,
        },
      },
      ...query,
    });

    const footerEntity = await strapi.service('api::page-footer.page-footer').find({
      populate: ['social_media'],
      ...query,
    });

    return {
              homepage: homepageEntity,
              categories: categoriesEntity.results,
              promoted: promotedProductsEntity.results,
              footer: footerEntity,
            };
  },
}));
