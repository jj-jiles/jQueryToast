
(function( $ ) {
	
	var $this = $(this);
	var settings = {};
	/* ******
	* END: basic defaults */

	var options  = {};
	var defaults = {
		text : '...loading'
	};
	

	var methods = {

		init : function(objOptions) {

			// options passed is an object
			// get the properties of the object for a custom $.alert modal
			if ( typeof(objOptions) == 'object' ) {
				for ( var property in objOptions ) {
					defaults[property] = objOptions[property];
				}

			// options passed is a string
			// we'll assume this is a basic $.alert modal
			// and the options passed is the HTML content
			} else if ( typeof(objOptions) != 'undefined' ) {
				defaults['text'] = objOptions;
			}
			
			options = defaults;
		},


		display : function(objOptions, callback) {

			methods.init(objOptions);

			var _this = $(this);

			if ( _this.is('body') ) {
				var _width = $(window).width();
				var _height = $(window).height();
				var x_pos = 0;
				var y_pos = 0;
			} else {
				var _width  = _this.outerWidth();
				var _height = _this.outerHeight();
				var x_pos   = _this.offset().left;
				var y_pos   = _this.offset().top;				
			}

			var ts_id = Math.round((new Date()).getTime() / 1000);
				ts_id += Math.ceil(Math.random()*1000);

			var html = '<div id="' + ts_id + '" class="toaster"><div class="toaster-inner">' + options.text + '</div></div>'

			$('body').append(html);

			loadWidth = $('.toaster').outerWidth();
			loadHeight = $('.toaster').outerHeight();

			x_pos = Math.floor((x_pos+(_width/2))-(loadWidth/2));
			y_pos = Math.floor((y_pos+(_height/2))-(loadHeight/2));

			a_css = {
				'left' : x_pos + 'px',
				'top'  : y_pos + 'px',
				'z-index' : 10000,
				'display' : 'none',
				'visibility' : 'visible'
			};

			$('#' + ts_id)
				.css(a_css)
				.fadeIn(150, function() {
					if ( typeof callback === 'function' ) {
						callback();
					}
				});
		},

		moveLeft : function(bar) {
			bar.animate({ 'left' : '-' + methods.barWidth + 'px' }, 1000, 'easeOutCubic', function() { methods.moveRight( $(this) ); } );
		},

		moveRight : function(bar) {
			bar.animate({ 'left' : (loadWidth+5) + 'px' }, 1000, 'easeOutCubic', function() { methods.moveLeft( $(this) ); } );
		},


		remove : function() {
			$('.toaster').fadeOut('fast', function() {
				$(this).remove();
			});
		}

	};

	$.fn.toast = function( method ) {

		// Method calling logic
		if ( methods[method] ) {
			return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
			return methods.display.apply( this, arguments );
		} else {
			return methods.display.apply(  this, arguments  );
		}

	};

})( jQuery );

(function( $ ) {
	$.toast = function( method ) {
		if ( method == 'remove' ) {
			$('.toaster').fadeOut('fast', function() {
				$('.toaster').remove();
			});			
		}
	}
})( jQuery );
