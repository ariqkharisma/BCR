'use strict';

/**
 * order controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::order.order', ({ strapi }) => ({
    getOrder: async (ctx, next) => {
        ctx.body = "ok"
    },
    async find(ctx) {
        const { user } = ctx.state;

        let entities;
        if (user.id === 3) {
            entities = await strapi.service('api::order.order').find(ctx);
        } else (
            entities = await strapi.entityService.findMany('api::order.order', {
                filters: {
                  $and: [
                    {
                      userId: user.id,
                    },
                  ],
                },
              })
        )

        return entities;
    }

}));
