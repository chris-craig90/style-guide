/* ========================================================================
 * DOM-based Routing
 * Based on http://goo.gl/EUTi53 by Paul Irish
 *
 * Only fires on body classes that match. If a body class contains a dash,
 * replace the dash with an underscore when adding it to the object below.
 *
 * .noConflict()
 * The routing is enclosed within an anonymous function so that you can
 * always reference jQuery with $, even when in .noConflict() mode.
 * ======================================================================== */
(function($) {

  // Use this variable to set up the common and page specific functions. If you
  // rename this variable, you will also need to rename the namespace below.
  var Sage = {
    // All pages
    'common': {
      init: function() {
        // JavaScript to be fired on all pages

        // Tweetie
        // ==========================================================================

        // Consumer Key
        // define('CONSUMER_KEY', 'CONSUMER_KEY_HERE');
        // define('CONSUMER_SECRET', 'CONSUMER_SECRET_HERE');

        // // User Access Token
        // define('ACCESS_TOKEN', 'ACCESS_TOKEN_HERE');
        // define('ACCESS_SECRET', 'ACCESS_SECRET_HERE');

        // $('#tweet').twittie({
        //     'count': 1,
        //     'hideReplies': true
        // }, function() {
        //     alert('loaded!');
        // });

        // ## SC5 On rendered evet
        // ==========================================================================
        // Ensure scripts are ran after SC5 has finnsished loading
        // use e.originalEvent.detail.elements to get elements
        $(window).bind("styleguide:onRendered", _.debounce(function(e) {

          // ## Full screen mode
          // ==========================================================================
          if(window.location.href.indexOf("fullscreen") > -1) {

            // ### SG Controls wrapper
            // --------------------------------------------------------------------------            
            $('#js-sgControls').remove();
            $('body').append('<div id="js-sgControls" class="a-buttonGroup u-shadow--l4 u-zindex--high u-bg--grey8" style="position: fixed; bottom: 1.5rem; right: 1.5rem; background-color: transparent!important;"></div>');

            // ### Baseline grid overlay
            // --------------------------------------------------------------------------            
            // Create and then store a refrence to our baseline grid object so we can access the toggle methods on its prototype
            var baselineGrid = $BLGRD('body').create();
            $('#js-sgControls').append('<button class="a-button" id="js-baselineGrid" title="Baseline grid"><i class="a-icon-line_weight a-icon--large"></i></button>');
            $(document).on('click', '#js-baselineGrid', function() {
              baselineGrid.toggle();
            });

            // ### Horizontal grid overlay
            // --------------------------------------------------------------------------            
            // Create and then store a refrence to our horizontal grid object so we can access the toggle methods on its prototype
            var horGrid = $HGRD('.siteWrap__main').create();
            $('#js-sgControls').append('<button class="a-button" id="js-horGrid" title="Horizontal grid"><i class="a-icon-view_compact a-icon--large"></i></button>');
            $(document).on('click', '#js-horGrid', function() {
              horGrid.toggle();
            });

            // ### Image demo
            // --------------------------------------------------------------------------            
            // Swap imahe demo
            $('#js-sgControls').append('<button class="a-button" id="sg-image-switch" title="Horizontal grid"><i class="a-icon-photo_size_select_actual a-icon--large"></i></button>');
          
            // ### Image demo
            // --------------------------------------------------------------------------            
            // Swap imahe demo
            $('#js-sgControls').append('<button class="a-button" id="sg-template-switch" title="Switch header" data-currentTemplate="0"><i class="a-icon-photo_size_select_actual a-icon--large"></i></button>');
        
            // SC5 Template setup
            var sc5Template = $SC5();
            sc5Template
              .demo([ 'placeholder', 'star-wars', 'bakery', 'bike', 'peek' ])
              .templateSwitch([ '4.1.2', '4.1.1', '4.1.3', '4.1.4' ]); // Demo images
          }

          // #### Atomic SG functions
          $ATM()
              .transHeader()
              .sideNav()
              .accodrionDropd()
              .searchOpen()
              .dropDopwn()
              .imageBaseline('.m-card__thumb > img, .m-logoGroup img')
              .parallax()
              .logoGroup(); // Parallax
        }, 100));

      },
      finalize: function() {
        // JavaScript to be fired on all pages, after page specific JS is fired
      }
    },
    // Home page
    'home': {
      init: function() {
        // JavaScript to be fired on the home page
      },
      finalize: function() {
        // JavaScript to be fired on the home page, after the init JS
      }
    },
    // About us page, note the change from about-us to about_us.
    'about_us': {
      init: function() {
        // JavaScript to be fired on the about us page
      }
    }
  };

  // The routing fires all common scripts, followed by the page specific scripts.
  // Add additional events for more control over timing e.g. a finalize event
  var UTIL = {
    fire: function(func, funcname, args) {
      var fire;
      var namespace = Sage;
      funcname = (funcname === undefined) ? 'init' : funcname;
      fire = func !== '';
      fire = fire && namespace[func];
      fire = fire && typeof namespace[func][funcname] === 'function';

      if (fire) {
        namespace[func][funcname](args);
      }
    },
    loadEvents: function() {
      // Fire common init JS
      UTIL.fire('common');

      // Fire page-specific init JS, and then finalize JS
      $.each(document.body.className.replace(/-/g, '_').split(/\s+/), function(i, classnm) {
        UTIL.fire(classnm);
        UTIL.fire(classnm, 'finalize');
      });

      // Fire common finalize JS
      UTIL.fire('common', 'finalize');
    }
  };

  // Load Events
  $(document).ready(UTIL.loadEvents);

})(jQuery); // Fully reference jQuery after this point.
