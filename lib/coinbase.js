'use strict';

var request = require('blueagent')
    , microtime = require('microtime')
    , crypto = require('crypto')
    , _ = require('lodash')
    , Joi = require('joi')
    , spice = require('spice')
    , apis = require('./apis');

//var root_url = 'https://api.exchange.coinbase.com';
var root_url = 'https://api-public.sandbox.exchange.coinbase.com';

/** @class */
function Coinbase(auth) {
    this._key = auth.key;
    this._secret = auth.secret;
    this.createApis(apis);
};

function createUnauthRequest(api) {
    return function(param) {
        var pathParamKey;
        var pathParam = {};
        var queryParams = (param) ? param.queryParams : null;

        if(api.pathParam) {
            pathParamKey = api.pathParam;
            pathParam[pathParamKey] = param[pathParamKey];
        }

        var url = spice(root_url + api.subUrl, pathParam);

        return request.get(url).query(queryParams);
    }
};

function createAccessSign(timestamp, subUrl, params){
    var body = params ? JSON.stringify(params) : '';
    var what = timestamp + 'GET' + subUrl + body;
    var key = Buffer(this._secret, 'base64');
    var hmac = crypto.createHmac('sha256', key);

    return hmac.update(what).digest('base64');
};

function createAuthRequest(api) {
    var self = this;


    return function (params) {
        var timestamp = Date.now() / 1000;

        var result = (api.params !== undefined) ? Joi.validate(params, api.params) : {};

        if (result.error) {
            throw Error(result);
        }

        if ((!self._key) || (!self._secret)) {
            throw Error('Must provide auth key / secret. Provided key: {_key} / secret: {_secret}', {
                key: self._key,
                secret: self._secret
            });
        }

        var url = root_url + api.subUrl;
        //var payload = {
        //    request: '/v1' + api.subUrl,
        //    nonce: nonce()
        //};

        //var encodedPayload = encodePayload(payload);
        //var signature  = createSignature(encodedPayload, self._secret);
        var createAccessSignd = createAccessSign.bind(self);

        var headers = {
            "CB-ACCESS-KEY" : self._key,
            "CB-ACCESS-SIGN" : createAccessSignd(timestamp, api.subUrl, params),
            "CB-ACCESS-TIMESTAMP" : timestamp,
            "CB-ACCESS-PASSPHRASE" : "1AhoaltonPass"
        };
        //var headers = {
        //    "X-BFX-APIKEY": self._key,
        //    "X-BFX-PAYLOAD": encodedPayload,
        //    "X-BFX-SIGNATURE": signature
        //};
        //createAccessSign(timestamp, subUrl, params)

        console.log('url..', url);
        console.log('headers..', headers);
        console.log('params..', params);
        return request
            .get(url)
            .set(headers)
            //.send(params)
            ;
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
