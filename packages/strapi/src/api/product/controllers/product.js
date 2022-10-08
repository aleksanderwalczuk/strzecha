'use strict';

/**
 *  product controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::product.product', ({ strapi }) => ({
  async findOne(ctx) {
    const { id } = ctx.params;
    const { query } = ctx;

    const entity = await strapi.service('api::product.product').find({
      populate: ['info', 'info.images', 'info.subcategory.main_category', 'additional'],
      filters: {
        uid: id,
      },
      ...query,
    });

    const [result] = entity.results;

    ctx.assert.equal(id, result.uid, 404, `Id ${id} not found`);

    const sanitizedEntity = await this.sanitizeOutput(result, ctx);

    return this.transformResponse(sanitizedEntity);
  },

  async find(ctx) {
    const { query } = ctx;

    const entity = await strapi.service('api::product.product').find({
      populate: ['info', 'info.images', 'info.subcategory', 'additional'],
      ...query,
    });

    const sanitizedEntity = await this.sanitizeOutput(entity.results, ctx);

    return this.transformResponse(sanitizedEntity);
  }
}));
