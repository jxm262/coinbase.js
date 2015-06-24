'use strict';

var request = require('blueagent')
    , microtime = require('microtime')
    , crypto = require('crypto')
    , _ = require('lodash')
    , Joi = require('joi')
    , spice = require('spice')
    , apis = require('./apis');

var root_url = 'https://api.exchange.coinbase.com';

/** @class */
function Coinbase() {
    this.createUnauthenticatedApis(apis);
};

function createUnauthRequest(api) {
    return function(param) {
        var pathParam = {};
        pathParam[api.pathParam] = param;

        var url = spice(root_url + api.subUrl, pathParam);

        return request.get(url);
    }
};

Coinbase.prototype.createUnauthenticatedApis = function (apis) {
    var that = this;

    _.forEach(apis.unauthenticated, function(api, key) {
        Coinbase.prototype[key] = createUnauthRequest.call(that, api);
    });
};

module.exports = new Coinbase();
