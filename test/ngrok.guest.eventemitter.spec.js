var ngrok = require('..');
var util = require('./util');

describe('guest.eventemitter.spec.js - ensuring no authtoken set, using ngrok as event emitter', function ( ) {

	before(function(done) {
		ngrok.kill(function() {
			util.removeAuthtoken();
			done();
		});
	});

	describe('connecting to ngrok', function ( ) {
		var connected, tunnelUrl;
		before(function(done) {
			ngrok.once('connect', function (url) {
				connected = true;
				tunnelUrl = url;
				done();
			});
			ngrok.connect();
		});

		it('should fire "connect" event', function ( ) {
			expect(connected).to.be.true;
		});

		it('should pass tunnel url with a "connect" event', function ( ) {
			expect(tunnelUrl).to.match(/https:\/\/.(.*).ngrok.io/);
		});
	});

	describe('disconnecting from ngrok', function ( ) {
		var disconnected;
		before(function(done){
			ngrok.once('disconnect', function ( ) {
				disconnected = true;
				done();
			});	
			ngrok.disconnect();
		});
		it('should fire "disconnect" event', function ( ) {
			expect(disconnected).to.be.true;
		});
	});

	describe('connecting to ngrok with error', function(){
		var error;
		before(function(done){
			ngrok.once('error', function ( err ) {
				error = err;
				done();
			});	
			ngrok.connect({proto: 'xxx'});
		});

		it('should fire error event', function(){
			expect(error).to.be.instanceof.Error;
		});
	});

});