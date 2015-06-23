var Coinbase = require('../lib/coinbase')
    , request = require('blueagent')
    , sinon = require('sinon')
    , chai = require('chai')
    , sinonChai = require('sinon-chai')
    , should = chai.should();

chai.use(sinonChai);

describe('Coinbase', function () {

    var sandbox;    //to clean up stubs on each test
    var coinbase;

    before(function () {
        coinbase = new Coinbase();
    });

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
    });

    afterEach(function () {
        sandbox.restore();
    });

    describe('createApis', function () {
        it('loads Coinbase.prototype functions from Unauthentitcated apis', function () {

        });
    });

});
