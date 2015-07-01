'use strict';

var request = require('blueagent')
    , _ = require('lodash')
    , Joi = require('joi')
    , apis = require('./apis')
    , _ = require('lodash')
    , requestUtil = require('./requestUtil');

//var root_url = 'https://api.exchange.coinbase.com';
var root_url = 'https://api-public.sandbox.exchange.coinbase.com';

/** @class */
function Coinbase(auth) {
    this._key = auth.key;
    this._secret = auth.secret;
    this._passPhrase = auth.passPhrase;
    this.createApis(apis);
};

function createUnauthRequest (api) {
    return function (params) {
        var queryParams = (params) ? params.queryParams : null;
        var subUrl = requestUtil.buildSubUrl(api, params)
        return request.get(root_url + subUrl).query(queryParams);
    }
};

function createAuthRequest(api) {
    var that = this;

    return function (params) {
        if ((!that._key) || (!that._secret)) {
            throw Error('Must provide auth key / secret. Provided key: {_key} / secret: {_secret}', {
                key: that._key,
                secret: that._secret
            });
        }

        var result = (api.params !== undefined)
            ? Joi.validate(params, api.params)
            : {};

        if (result.error) {
            throw Error(result);
        }

        var timestamp = Date.now() / 1000;
        var subUrl = requestUtil.buildSubUrl(api, params);

        var headers = {
            "CB-ACCESS-KEY" : that._key,
            "CB-ACCESS-SIGN" : requestUtil.createAccessSign.call(that, api.reqType, timestamp, subUrl, params),
            "CB-ACCESS-TIMESTAMP" : timestamp,
            "CB-ACCESS-PASSPHRASE" : that._passPhrase
        };

        return request(api.reqType, root_url + subUrl).set(headers);
    };
};

Coinbase.prototype.createApis = function (apis) {
    var that = this;

    _.forEach(apis.unauthenticated, function(api, key) {
        Coinbase.prototype[key] = createUnauthRequest.call(that, api);
    });

    _.forEach(apis.authenticated, function(api, key) {
        Coinbase.prototype[key] = createAuthRequest.call(that, api);
    });
};

module.exports = function(auth) {
    auth = auth || {};
    return new Coinbase(auth);
};
