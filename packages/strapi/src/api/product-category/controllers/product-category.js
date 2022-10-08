'use strict';

/**
 *  product-category controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::product-category.product-category', ({ strapi }) => ({
  async find(ctx) {
    const { query } = ctx;

    const entity = await strapi.service('api::product-category.product-category').find({
      populate: ['main_category', 'image'],
      ...query,
    });

    const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

    const response =  this.transformResponse(sanitizedEntity.results);

    const flatten = response.data.map(({ id, attributes, attributes: { main_category } }) => ({
      ...attributes, id, main_category: { ...main_category.data.attributes, id: main_category.data.id }
    }));

    return flatten;
  },
  async findOne(ctx) {
    const { query } = ctx;
    const { id } = ctx.params;

    const entity = await strapi.service('api::product-category.product-category').find({
      populate: ['main_category', 'image'],
      filter: {
        uid: id,
      },
      ...query,
    })

    const [result] = entity.results;

    ctx.assert.equal(id, result.id, 404, `Id ${id} not found`);

    const sanitizedEntity = await this.sanitizeOutput(result, ctx);

    return sanitizedEntity;

  }
}));
