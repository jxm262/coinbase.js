var Joi = require('joi');

module.exports = {

    unauthenticated: {
        /**
         * @name Coinbase#products
         * @function
         */
        products: {
            subUrl: '/products'
        },

        /**
         * @name Coinbase#productOrderBook
         * @function
         * @param product_id
         */
        productOrderBook: {
            subUrl: '/products/{:product_id}/book',
            pathParam: 'product_id',
            params: Joi.object().keys({
                level: Joi.number()
            })
        }
    },

    authenticated: {

    }
};
