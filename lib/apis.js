var Joi = require('joi');

module.exports = {

    unauthenticated: {

        products: {
            subUrl: '/products'
        }

        ,productOrderBook: {
            subUrl: '/products/{:product_id}/book',
            pathParam: 'product_id',
            params: Joi.object().keys({
                level: Joi.number()
            })
        }

        ,productTicker: {
            subUrl: '/products/{:product_id}/ticker',
            pathParam: 'product_id'
        }

        ,trades: {
            subUrl: '/products/{:product_id}/trades',
            pathParam: 'product_id'
        }

        , candles: {
            subUrl: '/products/{:product_id}/trades',
            pathParam: 'product_id',
            params: Joi.object().keys({
                start: Joi.any()
                , end: Joi.any()
                , granularity: Joi.number()
            })
        }

    },

    authenticated: {

    }
};

