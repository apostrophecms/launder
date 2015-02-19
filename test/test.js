var assert = require('assert');

describe('launder', function() {
  it('should exist', function(done) {
    var launder = require('../index.js')();

    assert(launder);
    return done();
  });

  describe('instatiation', function(){

	  it('should have default filterTag function', function(done){
	  	var launder = require('../index.js')();

	  	assert(typeof(launder.filterTag) === 'function');
	  	assert(launder.filterTag('  HEllo ') === 'hello');
	  	return done();
	  });

	  it('should take a new filterTag function', function(done){
	  	var launder = require('../index.js')({
	  		filterTag: function(tag){
	  			return 'punk';
	  		}
	  	});

	  	assert(typeof(launder.filterTag) === 'function');
	  	assert(launder.filterTag('  HEllo ') === 'punk');
	  	return done();
	  });

	});


  describe('methods', function(){
  	it('should have a `string` method', function(done) {
      var launder = require('../index.js')();
      assert(launder.string);
      return done();
    });

    it('should have a `strings` method', function(done) {
      var launder = require('../index.js')();
      assert(launder.strings);
      return done();
    });

    it('should have a `integer` method', function(done) {
      var launder = require('../index.js')();
      assert(launder.integer);
      return done();
    });

    it('should have a `padInteger` method', function(done) {
      var launder = require('../index.js')();
      assert(launder.padInteger);
      return done();
    });

    it('should have a `float` method', function(done) {
      var launder = require('../index.js')();
      assert(launder.float);
      return done();
    });

    it('should have a `url` method', function(done) {
      var launder = require('../index.js')();
      assert(launder.url);
      return done();
    });

    it('should have a `select` method', function(done) {
      var launder = require('../index.js')();
      assert(launder.select);
      return done();
    });

    it('should have a `boolean` method', function(done) {
      var launder = require('../index.js')();
      assert(launder.boolean);
      return done();
    });

    it('should have a `booleanAddFilterCriteria` method', function(done) {
      var launder = require('../index.js')();
      assert(launder.booleanAddFilterCriteria);
      return done();
    });

    it('should have a `date` method', function(done) {
      var launder = require('../index.js')();
      assert(launder.date);
      return done();
    });

    it('should have a `formatDate` method', function(done) {
      var launder = require('../index.js')();
      assert(launder.formatDate);
      return done();
    });

    it('should have a `time` method', function(done) {
      var launder = require('../index.js')();
      // just a flat circle
      assert(launder.time);
      return done();
    });

    it('should have a `parseTime` method', function(done) {
      var launder = require('../index.js')();
      assert(launder.parseTime);
      return done();
    });

    it('should have a `formatTime` method', function(done) {
      var launder = require('../index.js')();
      assert(launder.formatTime);
      return done();
    });

    it('should have a `tags` method', function(done) {
      var launder = require('../index.js')();
      assert(launder.tags);
      return done();
    });

    it('should have a `id` method', function(done) {
      var launder = require('../index.js')();
      assert(launder.id);
      return done();
    });

    it('should have a `ids` method', function(done) {
      var launder = require('../index.js')();
      assert(launder.ids);
      return done();
    });
  });

	describe('string', function(){
		it('should do nothing to a good string', function(done){
			var launder = require('../index.js')();
			assert(launder.string('this is great') === 'this is great');
			return done();
		});

		it('should trim a string', function(done){
			var launder = require('../index.js')();
			assert(launder.string('  remove whitespace   ') === 'remove whitespace');
			return done();
		});

		it('should convert a number to a string', function(done){
			var launder = require('../index.js')();
			assert(launder.string(1234) === '1234');
			return done();
		})

		it('should convert non-string/non-number to an empty string', function(done){
			var launder = require('../index.js')();
			assert(launder.string({an: 'object'}) === '');
			assert(launder.string(function(){ return 'still not a string' }) === '');
			return done();
		});

		it('should use a default for non-strings', function(done){
			var launder = require('../index.js')();
			assert(launder.string({an: 'object'}, 'default') === 'default');
			return done();
		});
	});

	describe('strings', function(){
		it('should do good stuff to an array of strings', function(done){
			var launder = require('../index.js')();
			var s = launder.strings(['  testing ', 123]);
			assert(s[0] === 'testing');
			assert(s[1] === '123');
			return done();
		});

		it('should return an empty array if we pass in something that is not an array', function(done){
			var launder = require('../index.js')();
			var s = launder.strings({an: 'object', is: 'not', an: 'array'});
			assert(Array.isArray(s));
			assert(s.length === 0);
			return done();
		});
	});

	describe('integer', function(){
		it('should do nothing to a good integer', function(done){
			var launder = require('../index.js')();
			assert(launder.integer(123) === 123);
			return done();
		});
		it('should convert a float to a rounded down integer', function(done){
			var launder = require('../index.js')();
			assert(launder.integer(42.42) === 42);
			return done();
		});
		it('should convet a string of an integer to an integer', function(done){
			var launder = require('../index.js')();
			assert(launder.integer('123') === 123);
			return done();
		});
		it('should convert a string of a float to a rounded down integer', function(done){
			var launder = require('../index.js')();
			assert(launder.integer('42.42') === 42);
			return done();
		});
		it('should convert a non-number to 0 by default', function(done){
			var launder = require('../index.js')();
			assert(launder.integer('nah') === 0);
			return done();
		});
		it('should convert a non-number to the passed in default', function(done){
			var launder = require('../index.js')();
			assert(launder.integer('nah', 5) === 5);
			return done();
		});
		it('should set a value below min to min', function(done){
			var launder = require('../index.js')();
			assert(launder.integer(5, null, 10) === 10);
			return done();
		});
		it('should set a value above max to max', function(done){
			var launder = require('../index.js')();
			assert(launder.integer(25, null, null, 20) === 20);
			return done();
		});
		it('should set a non-number with no default to min', function(done){
			var launder = require('../index.js')();
			assert(launder.integer('nah', null, 10, 20) === 10);
			return done();
		});
	});

	describe('padInteger', function(){
		it('should add 0\'s to to an integer shorter than the pad', function(done){
			var launder = require('../index.js')();
			assert(launder.padInteger(1234, 10) === '0000001234');
			return done();
		});
		it('should not add 0\'s to an integer longer than the pad', function(done){
			var launder = require('../index.js')();
			assert(launder.padInteger(123456789,5) === '123456789');
			return done();
		});
	});

describe('float', function(){
		it('should do nothing to a good float', function(done){
			var launder = require('../index.js')();
			assert(launder.float(42.42) === 42.42);
			return done();
		});
		it('should convert a string of a float to a float', function(done){
			var launder = require('../index.js')();
			assert(launder.float('42.42') === 42.42);
			return done();
		});
		it('should convert a non-number to 0 by default', function(done){
			var launder = require('../index.js')();
			assert(launder.float('nah') === 0);
			return done();
		});
		it('should convert a non-number to the passed in default', function(done){
			var launder = require('../index.js')();
			assert(launder.float('nah', 5.5) === 5.5);
			return done();
		});
		it('should set a value below min to min', function(done){
			var launder = require('../index.js')();
			assert(launder.float(5, null, 10.6) === 10.6);
			return done();
		});
		it('should set a value above max to max', function(done){
			var launder = require('../index.js')();
			assert(launder.float(25, null, null, 20.2) === 20.2);
			return done();
		});
		it('should set a non-number with no default to min', function(done){
			var launder = require('../index.js')();
			assert(launder.float('nah', null, 10.6, 20.2) === 10.6);
			return done();
		});
	});

	describe('url', function(){
		it('should do nothing to a good url', function(done){
			var launder = require('../index.js')();
			assert(launder.url('http://www.apostrophenow.org') === 'http://www.apostrophenow.org');
			return done();
		});
		it('should add http:// when missing', function(done){
			var launder = require('../index.js')();
			assert(launder.url('www.apostrophenow.org') === 'http://www.apostrophenow.org');
			return done();
		});
		it('should return undefined if not a valid url', function(done){
			var launder = require('../index.js')();
			console.log(launder.url('this is not a url'));
			assert(launder.url('this is not a url') === null);
			return done();
		});
	});

});