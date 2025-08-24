/*
 * Glide.js
 * Ver: 1.0.4
 * Simple & efficient jQuery slider
 * Autor: @JedrzejChalubek
 * url: http://jedrzejchalubek.com
 * Licensed under the MIT license
 */
;(function ($, window, document, undefined) {
	var name = 'glide',
		defaults = {
			// {Int or Bool} False for turning off autoplay
			autoplay: 4000,
			/**
			 * Animation time 
			 * !!! IMPORTANT !!!
			 * That option will be use only, when css3 are not suported
			 * If css3 are supported animation time is set in css declaration inside .css file
			 * @type {Int}
			 */
			animationTime: 500,

			/**
			 * {Bool or String} Show/hide/appendTo arrows
			 * True for append arrows to slider wrapper
			 * False for not appending arrows
			 * Id or class name (e.g. '.class-name') for appending to specific HTML markup
			 */
			arrows: true,
			// {String} Arrows wrapper class
			arrowsWrapperClass: 'slider-arrows',
			// {String} Main class for both arrows
			arrowMainClass: 'slider-arrow',
			// {String} Right arrow
			arrowRightClass: 'slider-arrow--right',
			// {String} Right arrow text
			arrowRightText: 'next',
			// {String} Left arrow
			arrowLeftClass: 'slider-arrow--left',
			// {String} Left arrow text
			arrowLeftText: 'prev',

			/**
			 * {Bool or String} Show/hide/appendTo bullets navigation
			 * True for append arrows to slider wrapper
			 * False for not appending arrows
			 * Id or class name (e.g. '.class-name') for appending to specific HTML markup
			 */
			nav: true,
			// {Bool} Center bullet navigation
			navCenter: true,
			// {String} Navigation class
			navClass: 'slider-nav',
			// {String} Navigation item class
			navItemClass: 'slider-nav__item',
			// {String} Current navigation item class
			navCurrentItemClass: 'slider-nav__item--current',

			// {Int or Bool} Touch settings
			touchDistance: 60
		};

	/**
	 * Slider Constructor
	 * @param {Object} parent
	 * @param {Object} options
	 */
	function Glide(parent, options) {
		var _ = this;
		_.options = $.extend({}, defaults, options);

		// Sidebar
		_.parent = parent;
		// Slides Wrapper
		_.wrapper = _.parent.children();
		// Slides
		_.slides = _.wrapper.children();
		// Current slide id
		_.currentSlide = 0;
		// CSS3 Animation support
		_.CSS3support = true;

		// Initialize
		_.init();
		// Build DOM
		_.build();
		// Start autoplay
		_.play();

		/**
		 * Controller
		 * Touch events
		 */
		if (_.options.touchDistance) {
			// Init swipe
			_.swipe();
		}

		/**
		 * Controller
		 * Keyboard left and right arrow keys
		 */
		$(document).on('keyup', function(k) {
			// Next
			if (k.keyCode === 39) _.slide(1);
			// Prev
			if (k.keyCode === 37) _.slide(-1);
		});

		/**
		 * Controller
		 * Mouse over slider
		 * When mouse is over slider, pause autoplay
		 * On out, start autoplay again
		 */
		_.parent.add(_.arrows).add(_.nav).on('mouseover mouseout', function (e) {
			// Pasue autoplay
			_.pause();
			// When mouse left slider or touch end, start autoplay anew
			if (e.type === 'mouseout') _.play();
		});

		/**
		 * Controller
		 * When resize browser window
		 * Pause autoplay in fear of escalation
		 * Reinit plugin for new slider dimensions
		 * Correct crop to current slide
		 * Start autoplay from beginning
		 */
		$(window).on('resize', function() {
			// Reinit plugin (set new slider dimensions)
			_.init();
			// Crop to current slide
			_.slide(0);
		});

		/**
		 * Returning API
		 */
		return {
			current: function() {
				return -(_.currentSlide) + 1;
			},
			play: function() {
				_.play();
			},
			pause: function() {
				_.pause();
			},
			next: function(callback) {
				_.slide(1, false, callback);
			},
			prev: function(callback) {
				_.slide(-1, false, callback);
			},
			jump: function(distance, callback) {
				_.slide(distance-1, true, callback);
			},
			nav: function(target) {
				/**
				 * If navigation wrapper already exist
				 * Remove it, protection before doubled navigation
				 */
				if (_.navWrapper) {
					_.navWrapper.remove();
				}
				_.options.nav = (target) ? target : _.options.nav;
				// Build
				_.navigation();
			},
			arrows: function(target) {
