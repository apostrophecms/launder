var _ = require('lodash');
var moment = require('moment');

function Launder(options) {
	var self = this;
	self.options = options || {};

	self.filterTag = self.options.filterTag || function(tag) {
		tag = tag.trim();
		return tag.toLowerCase();
	};


	// METHODS!



	self.string = function(s, def) {
    if (typeof(s) !== 'string') {
      if (typeof(s) === 'number') {
        s += '';
      } else {
        s = '';
      }
    }
    s = s.trim();
    if (def !== undefined) {
      if (s === '') {
        s = def;
      }
    }
    return s;
  };

  self.strings = function(strings) {
    if (!Array.isArray(strings)) {
      return [];
    }
    return _.map(strings, function(s) {
      return self.string(s);
    });
  };

  self.integer = function(i, def, min, max) {
    if (def === undefined) {
      def = 0;
    }
    if (typeof(i) === 'number') {
      i = Math.floor(i);
    }
    else
    {
      try {
        i = parseInt(i, 10);
        if (isNaN(i)) {
          i = def;
        }
      } catch (e) {
        i = def;
      }
    }
    if ((min !== undefined) && (i < min)) {
      i = min;
    }
    if ((max !== undefined) && (i > max)) {
      i = max;
    }
    return i;
  };

  self.padInteger = function(i, places) {
    var s = i + '';
    while (s.length < places) {
      s = '0' + s;
    }
    return s;
  };

  self.float = function(i, def, min, max) {
    if (def === undefined) {
      def = 0;
    }
    if (!(typeof(i) === 'number')) {
      try {
        i = parseFloat(i, 10);
        if (isNaN(i)) {
          i = def;
        }
      } catch (e) {
        i = def;
      }
    }
    if ((min !== undefined) && (i < min)) {
      i = min;
    }
    if ((max !== undefined) && (i > max)) {
      i = max;
    }
    return i;
  };


  self.url = function(s, def) {
    s = self.string(s, def);
    // Allow the default to be undefined, null, false, etc.
    if (s === def) {
      return s;
    }
    s = fixUrl(s);
    // console.log(s);
    if (s === null) {
      return def;
    }
    return s;
  };


  // HELPERS

  function fixUrl(href) {
    if (href.match(/^(((https?|ftp)\:\/\/)|mailto\:|\#|([^\/\.]+)?\/|[^\/\.]+$)/)) {
      // All good - no change required
      // console.log('good domain?');
      return href;
    } else if (href.match(/^[^\/\.]+\.[^\/\.]+/)) {
      // Smells like a domain name. Educated guess: they left off http://
      return 'http://' + href;
    } else {
      return null;
    }
  };

}


module.exports = function(options) {
  return new Launder(options);
};