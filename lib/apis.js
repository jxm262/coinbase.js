var Joi = require('joi');

module.exports = {

    unauthenticated: {
        /**
         * @name Bitfinex#ticker
         * @function
         * @param symbol
         */
        products: {
            subUrl: '/products'
        }
    },

    authenticated: {

    }
};
