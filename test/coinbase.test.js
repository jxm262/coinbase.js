var coinbase = require('../lib/coinbase')({key: 'testKey', secret: 'testSecret'})
    , apis = require('../lib/apis')
    , request = require('blueagent')
    , sinon = require('sinon')
    , chai = require('chai')
    , sinonChai = require('sinon-chai')
    , should = chai.should()
    , _ = require('lodash');

chai.use(sinonChai);

describe('Coinbase', function () {

    var sandbox;    //to clean up stubs on each test

    //before(function () {
    //    coinbase = new Coinbase();
    //});

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
    });

    afterEach(function () {
        sandbox.restore();
    });

    it('loads all unauthenticated apis into functions on prototype', function () {
        var unauthenticatedMethods = apis.unauthenticated;
        coinbase.constructor.prototype.should.contain.all.keys(unauthenticatedMethods);
    });

    it('loads all authenticated apis into functions on prototype', function () {
        var authenticatedMethods = apis.authenticated;
        coinbase.constructor.prototype.should.contain.all.keys(authenticatedMethods);
    });

});
