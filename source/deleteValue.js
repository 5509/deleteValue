/**
 * deleteValue
 *
 * @author    : nori (norimania@gmail.com)
 * @copyright : 5509 (http://5509.me/)
 * @license   : The MIT License
 * @link      : http://5509.me/log/deletevalue
 * @modified  : 2011/04/26 10:00:26.
 *
 * for iOS and Android?
 */
;(function(w, d) {
	/**
	 * add "GG" object to global
	 */
	w.GG = w.GG || {};
	/**
	 * Add delete buttons to input elements
	 *
	 * @namespace GG
	 * @method    smartDeleteValue
	 * @param     {Strings} targetStrings "#hoge fuga" or "#hoge > fuga"
	 * @param     {Object}  options       your options
	 */
	GG.smartDeleteValue = function(targetStrings, options) {
		bind(
			d,
			"DOMContentLoaded",
			function() {
				var elms = d.querySelectorAll(targetStrings),
					i = 0, l = elms.length;
				for ( ; i < l; i++ ) {
					new SmartDeleteValue(elms[i], options);
				}
			}
		);
	}
	
	/**
	 * Add a delete button to a input element
	 * @class       SmartDeleteValue
	 * @constructor
	 * @namespace   GG
	 * @param       {Object} elm     target input element
	 * @param       {Object} options your options
	 */
	function SmartDeleteValue(elm, options) {
		var _this = this, _opts, c;
		this.options = {
			borderRadius    : "10px",
			width           : "20px",
			height          : "20px",
			fontSize        : "20px",
			color           : "#efefef",
			backgroundColor : "#666",
			topAdj          : 2,
			leftAdj         : -3,
			opacity         : .8,
			closeLabel      : "&times;"
		};
		
		_opts = this.options;
		
		this.elm = elm;
		elm.style.position = "relative";
		this.offset = {
			y: elm.offsetTop,
			x: elm.offsetLeft
		};
		this.size = {
			h: elm.offsetHeight,
			w: elm.offsetWidth
		};
		this.timer = true;
		this.btn = d.createElement("span");
		this.btn.innerHTML = _opts.closeLabel;
		
		for ( c in options ) {
			this.options[c] = options[c];
		}
		
		d.body.appendChild(this.btn);
		
		cssStyle(this.btn, {
			WebkitBorderRadius : _opts.borderRadius ? _opts.borderRadius : _this.btn.offsetHeight/2 + "px",
			width              : _opts.width,
			height             : _opts.height,
			color              : _opts.color,
			backgroundColor    : _opts.backgroundColor,
			position           : "absolute",
			top                : _this.offset.y + _opts.topAdj + "px",
			left               : _this.offset.x + _this.size.w + _opts.leftAdj - parseInt(_opts.width) + "px",
			fontSize           : _opts.fontSize,
			lineHeight         : parseInt(_opts.height) + "px",
			textAlign          : "center",
			fontWeight         : "bold",
			opacity            : _opts.opacity
		});

		this.hideBtn();
		this.bind();
	}
	
	SmartDeleteValue.prototype = {
		/**
		 * Delete value
		 * @method deleteValue
		 */
		deleteValue: function() {
			this.elm.value = "";
			this.hideBtn();
		},
		/**
		 * show the delete button
		 * @method showBtn
		 */
		showBtn: function() {
			this.btn.style.display = "block";
		},
		/**
		 * hide the delete button
		 * @method
		 */
		hideBtn: function() {
			this.btn.style.display = "none";
		},
		/**
		 * bind events
		 * @method
		 */
		bind: function() {
			var _this = this,
				_opts = this.options;
			// button tap
			bind(
				this.btn,
				"touchstart",
				function() {
					_this.deleteValue();
				}
			);
			// focusing input
			bind(
				this.elm,
				"focus",
				function() {
					_this.timer = true;
					if ( _this.elm.value && _this.elm.value.length > 0 ) {
						_this.showBtn();
					}
					(function() {
						if ( !_this.timer ) return false;
						if ( _this.elm.value && _this.elm.value.length > 0 ) {
							_this.showBtn();
						} else {
							_this.hideBtn();
						}
						setTimeout(arguments.callee, 50);
					}());
				}
			);
			// bluring input
			bind(
				this.elm,
				"blur",
				function() {
					_this.timer = false;
				}
			);
			// adjusting position
			bind(
				d,
				"orientationchange",
				function() {
					var elm = _this.elm;
					_this.offset = {
						y: elm.offsetTop,
						x: elm.offsetLeft
					};
					_this.size = {
						h: elm.offsetHeight,
						w: elm.offsetWidth
					};
					cssStyle(_this.btn, {
						top  : _this.offset.y + _opts.topAdj + "px",
						left : _this.offset.x + _this.size.w + _opts.leftAdj - parseInt(_opts.width) + "px"
					});
				}
			);
		}
	}
	
	/**
	 * addEventeListener
	 * @method bind
	 * @param  {Object} obj      add to
	 * @param  {String} listener "click" or "click focus"
	 * @param  {Object} func     function
	 */
	function bind(obj, listener, func) {
		var i = 0, l;
		listener = listener.split(" ");
		l = listener.length;
		for ( ; i < l; i++ ) {
			obj.addEventListener(
				listener[i],
				func,
				false
			);
		}
	}
	/**
	 * add cssStyles to element
	 * @method cssStyles
	 * @param {Object} elm    add to
	 * @param {Object} styles {width: "50px",...}
	 */
	function cssStyle(elm, styles) {
		var c;
		for ( c in styles ) {
			elm.style[c] = styles[c];
		}
	}
}(window, document));