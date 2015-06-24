var Coinbase = require('../lib/coinbase')
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
    var coinbase;

    //before(function () {
    //    coinbase = new Coinbase();
    //});

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
    });

    afterEach(function () {
        sandbox.restore();
    });

    it('contains prototype functions for unauthenticated apis', function () {
        var unauthenticatedMethods = apis.unauthenticated;
        Coinbase.constructor.prototype.should.contain.all.keys(unauthenticatedMethods);
    });

});
