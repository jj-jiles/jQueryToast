
(function( $ ) {
	
	var $this = $(this);
	var settings = {};
	/* ******
	* END: basic defaults */

	var options  = {};
	var defaults = {
		text : '...loading',
		spinner : true
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


		display : function(objOptions) {

			defaults.spinner = true;
			methods.init(objOptions);

			options.caller = $(this);

			if ( $('#toast').is(':visible') ) {
				$('#toast').fadeOut('fast', function() {
					$('#toast').remove();
					methods.drawToast();
				});
			} else {
				methods.drawToast();
			}
		},

		drawToast : function() {
			var _this = options.caller;

			var _width  = _this.outerWidth();
			var _height = _this.outerHeight();
			var x_pos   = _this.offset().left;
			var y_pos   = _this.offset().top;

			var _class = (!options.spinner) ? '' : ' class="toast-spinner"';
			
			$('body').append('<div id="toast"' + _class + '>' + options.text + '</div>');

			loadWidth = $('#toast').outerWidth();
			loadHeight = $('#toast').outerHeight();

			x_pos = Math.floor((x_pos+(_width/2))-(loadWidth/2));
			y_pos = Math.floor((y_pos+(_height/2))-(loadHeight/2));

			a_css = {
				'left' : x_pos + 'px',
				'top'  : y_pos + 'px',
				'z-index' : 10000,
				'display' : 'none',
				'visibility' : 'visible'
			};

			$('#toast').css(a_css).fadeIn('fast');
		},


		remove : function() {
			$('#toast').fadeOut('fast', function() {
				$('#toast').remove();
			});
			return $this;
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