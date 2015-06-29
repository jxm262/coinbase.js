var Joi = require('joi');

function matches(arg) {
    return Joi.any().valid(arg);
};

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

        , stats: {
            subUrl: '/products/{:product_id}/stats',
            pathParam: 'product_id'
        }

        , currencies: {
            subUrl: '/currencies'
        }

        , time: {
            subUrl: '/time'
        }

    },

    authenticated: {
        accounts: {
            reqType: 'GET',
            subUrl: '/accounts',
            params: Joi.object().keys({
                currency: matches(['BTC', 'LTC', 'DRK']).required(),  //TODO get list of valid currencies
                method: matches(['bitcoin', 'litecoin', 'darkcoin']).required(),
                wallet_name: matches(['trading', 'exchange', 'deposit']).required()
            })
        }
    }
};

