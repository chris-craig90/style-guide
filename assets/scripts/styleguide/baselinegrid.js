/**
 * @file baselineGrid.js
 * @author Christopher Craig
 * @version 0.2
 */

/**
 * Library for creating a baseline grid overlay
 * @namespace baselineGrid
 * @example
 * // Create and then store a refrence to our baseline grid object so we can access the toggle methods on its prototype
 * var baselineGrid = $BLGRD('.show-baseline').create();
 *
 * // Create a click event and fire $BLGRD.toggle() method to show/hide the baseline grid overlay
 * $(document).on('click', '#baselineGrid_overlay_btn', function() {
 *   $(this).toggleClass('m-LinkGrp--toggleGroup__link--focus');
 *   baselineGrid.toggle();
 * });
 */

/**
 *
 * @name IIFE
 * @namespace
 * @memberof baselineGrid
 * @param {object} global - Global window object
 * @param {object} $ - jQuery object
 * @example
 * ;(function(global, $){
 *    // code goes here....
 * }(window, jQuery));
 */
;(function(global, $) {

  // ### 'new' an object
  var BaselineGrid = function(selector) {
    // The BaselineGrid object is actually just the init constructor 'enhanced'
    // **this concept is taken from jQuery**
    return new BaselineGrid.init(selector);
  };

  // ## Hidden properties and function
  // Hidden the scope of the IIFE and never directly accessible

  var css = {
    gridWrap : '.js-baseLineOverlay',
    toggleClass : 'js-baseLineOverlay--show',
  };

  // Attach method to prototype object (to save memory space!)
  BaselineGrid.prototype = {

    /**
     * @function clean
     * @memberof baselineGrid
     * @description Removes baseline classes and elements if baselineGrid has allready been called on elements that match 'this.selector'
     * @param {function} callback - a callback function to be ran after clean has finnsihed
     * @example
     * $BLGRD('.selector').clean(); // External
     * this.clean(); // Internal, invoked by sibling prtototype method
     */
    clean : function(callback) {

      // Check if elemnt already has any baselineGrid classes
      // If it does, then we can asume $BL().create has already been invoked on this element, so we can clean it.
      if($(this.slector).find(css.gridWrap).length !== 0) {
        $(this.selector).find(css.gridWrap).remove();
      }

      // Invoke callbak, if supplied
      if (callback && typeof callback === 'function') {
        // Pass the 'this' variable so the cb can refrence the baselineGrid oject
        callback(this);
      }
      return this; // *chainable method*
    },

    /**
     * @function create
     * @memberof baselineGrid
     * @description Creates a new baselineGrid element and add it to self.selector
     * @example
     * $BLGRD('.selector').create();
     */
    create : function() {
      this.clean(function(self) {
        // The .clean method passes its 'this' variable to the cb. Giving us a refrence to the object construcuted with BaselineGrid.init().
        // Use the 'self' var instead of 'this'. The 'this' var, insdie the cb, will point to the global object.
        $(self.selector).each(function() {
          $(this).append('<div class="js-baseLineOverlay"></div>');
        });
      });

      return this; // *chainable method*
    },

    /**
     * @function toggle
     * @memberof baselineGrid
     * @description Toggles the BaselineGrid.showBaselineClass on all elements that match self.selectior.
     * @example
     * // create and toggle 'show' class immediantley.
     * $BLGRD('.selector').create().toggle();
     *
     * // Create and store refrence to baselineGrid object (var bl), and then invoke it later (this could be attached to a click event for example).
     * var bl = $BL('.selector').create();
     * $('#button').on('click', bl.toggle);
     */
    toggle : function() {
      $(this.selector).find(css.gridWrap).toggleClass(css.toggleClass);
      return this; // *chainable method*
    }

  };

  // The actual object is created here, allowing us to 'new' an object without calling 'new'
  BaselineGrid.init = function(selector) {
      var self = this;
      self.selector = selector || '';
  };

  // Trick borrowed from jQuery so we don't have to use the 'new' keyword
  BaselineGrid.init.prototype = BaselineGrid.prototype;

  // Attach our BaselineGrid to the global object, and provide a shorthand '$G' to ease our poor fingers
  global.BaselineGrid = global.$BLGRD = BaselineGrid;

}(window, jQuery));
