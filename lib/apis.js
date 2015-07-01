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
        listAccounts: {
            reqType: 'GET',
            subUrl: '/accounts'
        },

        listAccountById: {
            reqType: 'GET',
            subUrl: '/accounts/{:account_id}',
            pathParam: 'account_id'
        },

        accountHistory: {
            reqType: 'GET',
            subUrl: '/accounts/{:account_id}/ledger',
            pathParam: 'account_id'
        },

        accountHolds: {
            reqType: 'GET',
            subUrl: '/accounts/{:account_id}/holds',
            pathParam: 'account_id'
        },

        orders: {
            reqType: 'POST',
            subUrl: '/orders',
            pathParam: 'account_id'
        }

    }
};

