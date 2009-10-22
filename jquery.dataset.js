/*!
 * jQuery dataset Plugin v1.0
 * http://outwestmedia.com/jquery-plugins/dataset/
 * 
 * Released: 2009-10-21
 * Version: 1.1
 * 
 * Copyright (c) 2009 Jonathan Sharp, Out West Media LLC.
 * Dual licensed under the MIT and GPL licenses.
 * http://docs.jquery.com/License
 */
(function($) {
 	$.dataset = {
		dashTransform: true
	};
	
 	function encodeName(name) {
		return 'data-' + name.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
	}
	function decodeName(name) {
		name = name.replace(/^data-/ig, '').toLowerCase();
		if ( $.dataset.dashTransform !== true ) {
			return name;
		}
		return $.map( name.split('-'), function(n, i) {
			return ( i > 0 ? n.substr(0, 1).toUpperCase() + n.substr(1) : n );
		}).join('');
	}

	$.fn.dataset = function(attr, value) {
		// Read all of our attributes and only return ones that start with data-
		if ( arguments.length == 0 ) {
			var dataset = {};
			this.eq(0).each(function() {
				var a = this.attributes;
				for ( var i = 0, il = a.length; i < il; i++ ) {
					if ( a[i].name.substr(0, 5) == 'data-' ) {
						dataset[ decodeName( encodeName( a[i].name.substr(5) ) ) ] = a[i].value;
					}
				}
			}).end();
			return dataset;
		// Return only a single attribute
		} else if ( arguments.length == 1 && typeof attr != 'object' ) {
			return this.attr( encodeName(attr) );
		// Set attribute values
		} else {
			var dataset = attr;
			// Test if we were given a key/value pair, if so transform it into an object
			if ( typeof attr != 'object' ) {
				dataset = {};
				dataset[attr] = value;
			}
			var tmp = {};
			var eventData = {};
			// Clean up our attribute names, set one object to the fully normalized name
			// Set the other to our "friendly" name to pass to the dataset event
			$.each(dataset, function(k, v) {
				var name = encodeName(k);
				tmp[ name ] = eventData[ decodeName(name) ] = v;
			});
			return this.attr(tmp).trigger('dataset', [ eventData ] );
		}
	};
	$.fn.removeDataset = function(attr) {
		if ( typeof attr == 'string' ) {
			if ( attr == '*' ) {
				attr = [];
				$.each( $(this).dataset(), function(k) {
					attr.push(k);
				});
			} else {
				attr = [attr];
			}
		}
		return this.each(function() {
			var _this = this;
			$.each(attr, function(i, n) {
				$(_this).removeAttr( encodeName(n) )
			});	
		});
	};
})(jQuery);
