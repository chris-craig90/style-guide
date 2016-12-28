/**
 * @file atomic.sg.js
 * @author Christopher Craig
 * @version 0.1
 */

/**
 * Atomic sg functions
 * @namespace Atomic
 */

;(function(global, $) {

  // ### 'new' an object
  var Atomic = function(selector) {
    // The Atomic object is actually just the init constructor 'enhanced'
    // **this concept is taken from jQuery**
    return new Atomic.init(selector);
  };

  // ## Hidden properties and function
  // Hidden the scope of the IIFE and never directly accessible

  var hidden = '';

  // Attach method to prototype object (to save memory space!)
  Atomic.prototype = {

    /**
     * @function transHeader
     * @memberof atomic
     * @description Adds trnas nav styling if splash section preceeds sit header
     * @example
     * $ATM().transNav();
     */
    transHeader : function() { 
      if ( $('[class*="o-header--trans"]').next().hasClass('o-splash') ) {
        $('[class*="o-header--trans"]').addClass('o-header--trans--hasSplash');
      }
      return this; // *chainable method*
    },

    /**
     * @function dropDopwn
     * @memberof atomic
     * @description Resizes 
     * @example
     * $ATM().dropDopwn();
     */
    dropDopwn : function() {

      function dropdownPosition( $dropDown ) {
        var rt = ($(window).width() - ($dropDown.offset().left + $dropDown.outerWidth()));
        $dropDown.removeClass(rightClass);
        if ( rt <= 0 ) {
          console.log('right');
          $dropDown.addClass(rightClass);
        }
      }

      var open = _.throttle(function ($dropDown, $anchor) {
        var id = $dropDown.attr('id');
        // Open Menu
        $dropDown
          .css('display', 'block')
          .addClass('js-open')
          .css('height', $dropDown.find('> ul').get(0).scrollHeight);

        // Aria attributes
        $anchor.attr('aria-expanded', 'true');
        $dropDown.attr('aria-hidden', 'false');
        // Close when click outside of drop down
        $(window).on( 'click.' + id, function(e) {
            if ( $(e.target).closest('#'+id).length === 0 && $(e.target).attr('data-toggle') !== id ) {
              close($dropDown, $anchor);
              $('body').off('click.' + id + ' ');
            }
        });
        $('*').on( 'focus.' + id, function(e) {
            if ( $(e.target).closest('#'+id).length === 0 && $(e.target).attr('data-toggle') !== id ) {
              close($dropDown, $anchor);
              $('*').off('focus.' + id + ' ');
            }
        });

        // Close with esp key
        $(document).on('keyup.' + id, function(e) {
          if (e.keyCode === 27) {
            close($dropDown, $anchor);
            $anchor.focus(); // Place focus back on to anchor
            $(document).off('keyup.' + id);
          }
        });
      }, 10);

      var close = _.throttle( function($dropDown, $anchor) {
        $dropDown
          .css('height', '0')
          .removeClass('js-open');
        // Wait untill nav is closed before adding class
        window.setTimeout(function(){
          //$dropDown.css('display', 'none');
        }, 3000 );
        $anchor.attr('aria-expanded', 'false');
        $dropDown.attr('aria-hidden', 'true');
      }, 10);

      function toggle($dropDown, $anchor) {
        var state = ( $dropDown.attr('aria-hidden') === 'true' ) ? 'open' : 'close' ;
        if ( state === 'open' ) { open( $dropDown, $anchor ); }
        else { close( $dropDown, $anchor ); }
      }

      function dropDownSetup(dropDown) {
        var $dropDown = $(dropDown);
        var $id = $dropDown.attr('id');
        var $anchor = $('[data-toggle="'+ $id +'"]');

        // Aria attributes
        $anchor
          .attr('aria-controls', $id)
          .attr('aria-haspopup', 'true')
          .attr('aria-expanded', 'false');

        $dropDown
          .attr('aria-hidden', 'true');

        // Toggle styles
        $anchor.on('click.atomicDrop', function(e){
          e.preventDefault();
          toggle($dropDown, $anchor);
        });
      }

      $('[data-dropdown]').each(function(){
        dropDownSetup(this);
      });

      return this; // *chainable method*
    },

    /**
     * @function logoGroup
     * @memberof atomic
     * @description show/hide logo groups
     * @example
     * $ATM().logoGroup();
     */
    logoGroup : function () {
      $(document).on('click', '.js-logoGroup-reveal', function(){
        var $parentGroup = $(this).closest('.m-logoGroup');
        $parentGroup.toggleClass('m-logoGroup--reveal');
        if ( $parentGroup.hasClass('m-logoGroup--reveal') ) {
          $(this).html('Hide');
        }
        else {
          $(this).html('Show more');
        }
      });

      return this; // *chainable method*
    },

    /**
     * @function accodrionDropd
     * @memberof atomic
     * @description paralx bg 
     * @source http://morris-digital.co.uk/blog/super-simple-60-fps-parallax/
     * @example
     * $ATM().parallax();
     */
    accodrionDropd : function () {
        var accordionTriger = $('.m-navAccord > ul > li > a');
        if( accordionTriger.length > 0 ) {
            accordionTriger.each(function(){
                var $self = $(this);
                var $dropdown = $self.next('ul');
                //$dropdown.slideUp(0).css('max-height', '100%');
                  $self.off().on('click', function(e){
                    e.preventDefault();
                    $(this).toggleClass('m-navAccord@open');
                    //( $(this).hasClass('m-nav-vert--accord@open') ) ? $dropdown.slideDown(350) : $dropdown.slideUp(350);
                  });
              });
        }
      return this; // *chainable method*
    },

    /**
     * @function accodrionDropd
     * @memberof atomic
     */
    sideNav : function () {
      $siteWrap = $('.siteWrap');
      $(document).on('click','.js-sideOpen', function(){
        $siteWrap.addClass('siteWrap--sideOpen');
      });
      $(document).on('click','.js-sideClose, .o-sidenav__overlay', function(){
        $siteWrap.removeClass('siteWrap--sideOpen');
      });
      $(document).on('click','.js-sideToggle', function(){
        $siteWrap.toggleClass('siteWrap--sideOpen');
      });
      return this; // *chainable method*
    },

    /**
     * @function parrlax
     * @memberof atomic
     * @description paralx bg 
     * @source http://morris-digital.co.uk/blog/super-simple-60-fps-parallax/
     * @example
     * $ATM().parallax();
     */
    parallax : function() {

      function scrollEvent(){
          if(!is_touch_device()){
              var viewportTop = $(document).scrollTop();
              var windowHeight = $(document).height();
              var viewportBottom = windowHeight+viewportTop;

              if($(window).width())

              $('[data-parallax="true"]').each(function(){                  
                  var distance = viewportTop * $(this).attr('data-speed');
                  if($(this).attr('data-direction') === 'up'){ sym = '-'; } else { sym = ''; }
                  $(this).css('transform','translate3d(0, ' + sym + distance +'px,0)');
                  //console.log(windowHeight); 
              });
          }
      }   

      function is_touch_device() {
        return 'ontouchstart' in window || // works on most browsers 
          'onmsgesturechange' in window; // works on ie10
      }

      function draw() {
          //console.log('draw');
          requestAnimationFrame(draw);
          // Drawing code goes here
          scrollEvent();
      }

      draw();

      return this; // *chainable method*
    },

    /**
     * @function imageBaseline
     * @memberof atomic
     * @description Resizes 
     * @param selector {string} - css selector to target the images you want to alter height of
     * @example
     * $ATM().imageBaseline();
     */
    imageBaseline : function(selector) {

        // ### Image baseline calc
        // Round image height to the closest baseline grid
        function imageBaseline( $img, $bl ) {
          $img.css( 'height', '' ); // Reset inline height style if allready set
          var imgHeight = $img.height();
          var multiplyer = Math.round(imgHeight / 12);
          $img
            .css( 'height', 'calc(0.75rem *'+ multiplyer +')' )
            .addClass('js-baselineImage');
        }

        // ### Loop each image and apply baseline
        function loopImages() {
          $(selector).each(function(){
            imageBaseline($(this));
          });
        }

        // ### Check for object-fit support
        if ( document.documentElement.classList.contains('objectfit') ) {
          loopImages(); // Calculate image height
          
          // Re-calculate image height on window resize
          // Use _lodash debounce funtion to wait untill window resize has finnished
          $(window).resize(_.debounce(function(){
            loopImages();
          }, 500));
        }

      return this; // *chainable method*
    },

    /**
     * @function search screen
     * @memberof atomic
     * @description Toggle search screen 
     * @example
     * $ATM().searchOpen();
     */
    searchOpen : function() {
      $(document).on('click', '.js-openSearch', function(){
        $('.o-searchScreen').toggleClass('o-searchScreen--open');
        // Focus intro form
        if ( $('.o-searchScreen').hasClass('o-searchScreen--open') ){
          $('.o-searchScreen').find('input[type="search"]').focus();
        }
      });

      return this; // *chainable method*
    },

  };

  // The actual object is created here, allowing us to 'new' an object without calling 'new'
  Atomic.init = function(selector) {
      var self = this;
      self.selector = selector || '';
  };

  // Trick borrowed from jQuery so we don't have to use the 'new' keyword
  Atomic.init.prototype = Atomic.prototype;

  // Attach our Atomic object to the global object, and provide a shorthand '$ATM' to ease our poor fingers
  global.Atomic = global.$ATM = Atomic;

}(window, jQuery));
