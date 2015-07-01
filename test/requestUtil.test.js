var requestUtil = require('../lib/requestUtil')
    , apis = require('../lib/apis')
    , request = require('blueagent')
    , sinon = require('sinon')
    , chai = require('chai')
    , sinonChai = require('sinon-chai')
    , should = chai.should()
    , _ = require('lodash')
    , crypto = require('crypto')
;

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

    describe('createAccessSign function', function () {
        var reqType, timestamp, subUrl, mockHmac, that;

        before(function () {
            that = this;
            that._secret = 'testSecret';
            reqType = 'TEST_TYPE';
            timestamp = 1;
            subUrl = 'testSubUrl';
        });

        beforeEach(function () {
            mockHmac = crypto.createHmac('sha256', 'test');
            sandbox.stub(crypto, 'createHmac').returns(mockHmac);
        });

        it('should return the updated hmac digested in base64', function () {
            var digestStub = sandbox.stub(mockHmac, 'digest').returns('test');

            var expectedHmac = requestUtil.createAccessSign.call(that, reqType, timestamp, subUrl);

            digestStub.should.have.been.calledWith('base64');
            expectedHmac.should.equal('test');
        });

        describe('with empty params', function () {
            it('should call hmac .update with concatenated timestamp + reqType + subUrl', function () {
                var params = {};
                var updateSpy = sandbox.spy(mockHmac, 'update');

                requestUtil.createAccessSign.call(that, reqType, timestamp, subUrl, params);

                updateSpy.should.have.been.calledWith(timestamp + reqType + subUrl);
            });
        });

        describe('with non-empty params', function () {
            it('should call hmac .update with concatenated timestamp + reqType + subUrl + JSON.stringify(params)', function () {
                var params = {hello: 'world'};
                var updateSpy = sandbox.spy(mockHmac, 'update');

                requestUtil.createAccessSign.call(that, reqType, timestamp, subUrl, params);

                updateSpy.should.have.been.calledWith(timestamp + reqType + subUrl + JSON.stringify(params));
            });
        });

    });

});


