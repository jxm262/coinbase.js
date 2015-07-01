var microtime = require('microtime')
    , crypto = require('crypto')
    , spice = require('spice');


module.exports = {
    buildSubUrl: function (api, params) {
        var pathParamKey;
        var pathParam = {};
        if (api.pathParam) {
            pathParamKey = api.pathParam;
            pathParam[pathParamKey] = params[pathParamKey];
            delete params[pathParamKey];
        }

        return spice(api.subUrl, pathParam)
    },

    createAccessSign: function (reqType, timestamp, subUrl, params) {
        var body = _.isEmpty(params) ? '' : JSON.stringify(params);
        var what = timestamp + 'GET' + subUrl + body;
        var key = Buffer(this._secret, 'base64');
        var hmac = crypto.createHmac('sha256', key);

        return hmac.update(what).digest('base64');
    }
};