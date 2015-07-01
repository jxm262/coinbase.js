var requestUtil = require('../lib/requestUtil')
    , apis = require('../lib/apis')
    , request = require('blueagent')
    , sinon = require('sinon')
    , chai = require('chai')
    , sinonChai = require('sinon-chai')
    , should = chai.should()
    , _ = require('lodash');

chai.use(sinonChai);

describe('requestUtil', function () {

    var sandbox;    //to clean up stubs on each test

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
    });

    afterEach(function () {
        sandbox.restore();
    });

    describe('buildSubUrl function', function () {
        it('returns url built by interpolating api.pathParam into subUrl', function () {
            var api = {pathParam: 'test_key', subUrl: 'testSubUrl/{:test_key}'};
            var params = {test_key: 'testVal'};
            requestUtil.buildSubUrl(api, params).should.equal('testSubUrl/testVal');
        });

        it('removes the interpolation key from the input params', function () {
            var api = {pathParam: 'test_key', subUrl: 'testSubUrl/{:test_key}'};
            var params = {test_key: 'testVal'};
            requestUtil.buildSubUrl(api, params);
            params.should.not.include.keys('test_key');
        });
    });

});


