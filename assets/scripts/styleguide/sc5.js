/**
 * @file sc5Layout.js
 * @author Christopher Craig
 * @version 0.2
 */

;(function(global, $) {

  // ### 'new' an object
  var SC5Layout = function(selector) {
    // The SC5Layout object is actually just the init constructor 'enhanced'
    // **this concept is taken from jQuery**
    return new SC5Layout.init(selector);
  };

  // ## Hidden properties and function
  // Hidden the scope of the IIFE and never directly accessible
  // var test = 'val';

  // Attach method to prototype object (to save memory space!)

  /**
   * @function environment
   * @memberof sc5Layout
   * @description Checks if we are in the SC% full screen view or the styleguide. If in style guide, it returns true. Internal use only.
   * @private
   * @example
   * SC5().environment(); // => true/ false
   */
  SC5Layout.prototype.environment = function() {
    if(window.location.href.indexOf("fullscreen") === -1) {
      return true;
    }
  };

  /**
   * @function sidenav
   * @memberof sc5Layout
   * @description Wraps sc5 side nav and amedns defualt styles
   * @example
   * var sc5Template = $SC5();
   * sc5Template.sideNav
   */
  	SC5Layout.prototype.sideNav = function() {
     if( this.environment() ){
       // Wrap side nav parent
       $('.sg-side-nav').wrap('<div class="base__sidenav base__sidenav--left base__sidenav--persistent base__sidenav--open js-gridOverlay--bl u-bg--prime"></div>');

       // Remove default toggle controll
       $('.sg.side-nav-toggle').remove();

       // Add side nav header
       $('.base__sidenav').prepend('' +
       '<div class="base__sidenav__appBar">' +
           '<div class="base__sidenav__logo u-hide--desktop">' +
               '<a href="" title="Home"><sg-insert>1.5.2</sg-insert></a>' +
           '</div>' +
           '<button class="base__sidenav__close base__sidenav__openLeft"><i class="a-icon a-icon--lrg">close</i></button>' +
       '</div>');


       // Place sg-side-nav inside the main content area of '.base__sidenav'
       $('.sg-side-nav').wrap('<div class="base__sidenav__main"></div>'); // Side bar sc5 navigation

       // Sub Nav Styles
       $('.sg-side-nav').addClass('m-nav-vert--accord u-txt-hilgt');
       $('.sg-side-nav > ul > li a').addClass('u-txt-prime');
       $('.sg-side-nav > ul > li > a').removeClass('u-bg').addClass('u-bg');

       // Move Navigation to sit inside the newly creates '.base__sidenav__main'
       $('.sg-side-nav .m-nav-vert--accord').detach().prependTo('.base__sidenav__main');
       $('.base__sidenav').detach().prependTo('.base');

       // CLose Side nav event handler
       $('.base__sidenav__openLeft').off().on('click', function(){
         $('.base__sidenav--left').toggleClass('base__sidenav--open');
       });

    }
    return this; // *chainable method*
  };

  /**
   * @function mainContent
   * @memberof sc5Layout
   * @description Sets up main content area
   * @example
   * var sc5Template = $SC5();
   * sc5Template.mainContent
   */
  SC5Layout.prototype.mainContent = function(){
    if( this.environment() ){
      $('body').prepend('<div class="base base--shadow"></div>');
      $('.view-index').detach().appendTo('.base').addClass('base__main');

      $('.base__main > .ng-scope').addClass('base__canvas');
      $('.base__canvas > .full-height').addClass('grid-col-12 grid-col-10@desktop u-pt--8 u-pb--8 u-bg--grey8 sc5-main-content');
      $('.sc5-main-content').wrap('<div class="grid-wrap"></div>');

      $('.base__main').prepend('' +
      '<div class="base__appBar u-hide@desktop">' +
          '<div class="base__appBar__toolbar base__appBar__toolbar--main base__appBar__toolbar--light base__appBar__toolbar--full js-pinned">' +
              '<div class="grid-wrap">' +
                 '<div class="grid-col-12">' +
                      '<div class="o-toolbar">' +
                          '<div class="o-toolbar_sect--lft base__appBar__toolbar__logo">' +
                              '<nav class="m-nav-hor">' +
                                  '<h1 class="u-txt-sec">Heading</h1>' +
                                  '<ul role="menu">' +
                                      '<li><button class="u-txt-prime a-icon base__sidenav__openLeft u-txt-prime">&#xE5D2;</button></li>' +
                                      '<li class="u-pad--0"><sg-insert>1.5.4-2</sg-insert></li>' +
                                  '</ul>' +
                              '</nav>' +
                          '</div>' +
                      '</div>' +
                  '</div>' +
              '</div>' +
          '</div>' +
      '</div>');

    }
    return this; // *chainable method*
  };

  /**
   * @function placeholder
   * @memberof sc5Layout
   * @description Refrshes the src attr of placeholder images, this insures a ramdom image is retrunred from the api
   * @example
   * var sc5Template = $SC5();
   * sc5Template.placeholder
   */
  SC5Layout.prototype.placeholder = function(){
    $('*').each(function(){
        var imageobj = this;
        $(imageobj).attr('src', $(imageobj).attr('src') + '?' + Math.random() ).attr('srcset', '');
    });
    return this; // *chainable method*
  };


  SC5Layout.prototype.sassExample = function() {
    function sassExampleSetup() {
            $('.js-atm-sass-example').each(function() {
                var $parentSection = $(this).closest('section');
                $parentSection.addClass('js-sass-example-block');
                $parentSection.find('.sg-code-listing .sg-show-section').html('Show Sass');// Update copy onmarkup eleemnt
                $parentSection.find('> header h1 span:nth-child(2)').addClass('u-typ--kilo');
            });

    }
    sassExampleSetup();
    $(window).bind('hashchange', function() { sassExampleSetup(); });
    //$('.base__sidenav, .sg-section-header > a').on('click', function(){ console.log('click');  });
    return this; // *chainable method*
  };

  // Template switch
  SC5Layout.prototype.templateSwitch = function( sgPaths ) {
      // Click event
      $('#sg-template-switch').on('click', function() {
          var templates = sgPaths;
          var activeTemplate = parseInt($(this).attr('data-currentTemplate'));
          var $btn = $(this);

          function getTemplatPArt(data) {

            var matches = jQuery.grep(data.sections, function(item) {
                // this is a reference to the element in the array
                // you can do any test on it you want
                // return true if you want it to be in the resulting matches array
                // return false if you don't want it to be in the resulting matches array

                // for example: to find objects with the Amount property set to a certain value
                if ( item.reference === templates[activeTemplate] ){
                  var $appBar = $(item.markup);

                  $('.o-header').replaceWith( $appBar );
                  setTimeout(function(){
                      var $lightLogo = $('.o-toolbar__logo__light').attr('src', '/dist/images/demo/placeholder/logo/logo-light.png' );
                      var $darkLogo = $('.o-toolbar__logo__dark').attr('src', '/dist/images/demo/placeholder/logo/logo-dark.png' );
                      // $('.o-toolbarGroup').find('.o-toolbar__logo__light').replaceWith( $lightLogo );
                      // $('.o-toolbarGroup').find('.o-toolbar__logo__light').replaceWith( $darkLogo );
                      //AtomicSG.toolBarGroup();
                      $ATM().dropDopwn();
                  }, 600);
                }
                //return(item.reference === '5.1.7.1');
            });
          }

          // Make ajac call to get next template appbar
          $.ajax({
             url: '/styleguide/styleguide.json',
             error: function() {
                $('#info').html('<p>An error has occurred</p>');
             },
             success: function(data) {
              activeTemplate = ( (activeTemplate + 1) === templates.length ) ? 0 : activeTemplate += 1 ;
              getTemplatPArt(data);
              $('#sg-template-switch').attr( 'data-currentTemplate', activeTemplate );
              $ATM().transHeader();
             },
             type: 'GET'
          });

          
      });
      return this; // *chainable method*
  };


  /**
   * @function placeholder
   * @memberof sc5Layout
   * @description Refrshes the src attr of placeholder images, this insures a ramdom image is retrunred from the api
   * @example
   * var sc5Template = $SC5();
   * sc5Template.placeholder
   */
    //
    // TODO
    // => Add source set support
  SC5Layout.prototype.demo = function( imageSets ){

    // Image collections
    var imgSets = imageSets;
    var currentSet = 'placeholder';

    function swapImage(demo) {

        var imgNos = [ '1', '2', '3', '4', '5', '6', '7', '8' ];
        // Swap source img elments
        $('img[src*="/demo/"]').each(function(){
            var src= $(this).attr('src');
            var imgPath = src.split('/');

            // Remove source set
            $(this).attr('srcset', '');

            // Get Random image, range between 1 - 4
            if ( imgNos.length === 0 ){
                imgNos = [ '1', '2', '3', '4', '5', '6', '7', '8' ];
            }
            var fileName = imgPath[6].split('?');
            var fileType = fileName[0].split('.')[1];
            var fileNameTrim = fileName[0].substring(0, fileName[0].length - 5);
            var randImgNo = imgNos[Math.floor(Math.random()*imgNos.length)];
            // Remove the random no from imgNos array so it doesnt get shown twice
            imgNos.splice( imgNos.indexOf(randImgNo) , 1);
            var randImg = fileNameTrim + randImgNo + '.' + fileType;
            var imgSrc;

            // If Logo just swap source
            if ( imgPath[5] === 'logo' ){
                imgPath[4] = demo;
                $(this).attr('src', imgPath[0]+ '/' + imgPath[1]+ '/' + imgPath[2] + '/' + imgPath[3] + '/' + imgPath[4] + '/' + imgPath[5] + '/' + imgPath[6] );
            }
            else{
                if (imgPath[0] === '') {
                    imgPath.splice(0,1);
                }
                if ( demo && typeof demo === 'string' ){
                    imgPath[3] = demo;
                    imgPath[5] = randImg;
                    imgSrc = '/' + imgPath[0]+ '/' + imgPath[1]+ '/' + imgPath[2] + '/' + imgPath[3] + '/' + imgPath[4] + '/' + imgPath[5];
                    // Trans parent png, add inline shapre outside property
                    $(this).attr('src', imgSrc );
                }
            }
            if ( imgPath[4] === 'trans' ) {
                var shapeOutside =  $(this).attr('src').split('.')[0] + '.png';
                var $transImg = $(this);
                setTimeout(function(){
                    $transImg.attr( 'style', 'shape-outside: url(' + $transImg.attr('src').split('.')[0] + '.png);' );
                }, 1000);
            }
            setTimeout(function(){
              $(window).trigger('resize');
            }, 500);
        });



        // Swap css inline background-image url
        $('*[style*="/demo/"]').each(function() {
            var splash_bgImg = $('*[style*="/demo/"]')[0];
            var inlneStyle= $(splash_bgImg).css('background-image');
            var imgPath = inlneStyle.split('/');

            // Get Random image, range between 1 - 4
            var fileName = imgPath[8].split(')');
            var fileNameTrim = fileName[0].substring(0, fileName[0].length - 6);
            var randImgNo = Math.floor(Math.random() * 8) + 1;
            var randImg = fileNameTrim + randImgNo + '.jpg';

            if (imgPath[0] === '') {
                imgPath.splice(0,1);
            }
            if ( demo && typeof demo === 'string' ){
                imgPath[6] = demo;
                imgPath[8] = randImg;
                $(splash_bgImg).css('background-image', imgPath.join('/') );
            }
        });
    }

    // Click event
    $('#sg-image-switch').on('click', function() {
        var nextSet = ( imgSets.indexOf( currentSet ) + 1 < imgSets.length ) ? imgSets[imgSets.indexOf( currentSet ) + 1] : imgSets[0];
        currentSet = nextSet;
        swapImage(currentSet);
        // setTimeout(function(){
        //     AtomicSG.transparentToolbars();
        // }, 400);
    });

    return this; // *chainable method*
  };

  /**
   * @function gridControls
   * @memberof sc5Layout
   * @description Inserts ctrol buttons for grid overlay
   * @example
   * var sc5Template = $SC5();
   * sc5Template.gridControls
   */
  SC5Layout.prototype.gridControls = function(){

      $('body').append(
      '<div id="sg-controls" class="sg-controls">' +
      ' <nav class=" m-nav-tog u-shadow-l3 u-bg--grey8">' +
      '   <ul class=" m-nav-tog__list">' +
      '     <li class=" m-nav-tog__list__item">' +
      '       <button class="m-nav-tog__link" id="sg-template-switch" data-currentTemplate="0">' +
      '          <i class="a-icon-dashboard a-icon--sml"></i>' +
      '       </button>' +
      '     </li>' +
      '     <li class=" m-nav-tog__list__item">' +
      '       <button class="m-nav-tog__link" id="sg-image-switch">' +
      '          <i class="a-icon-photo_size_select_actual a-icon--sml"></i>' +
      '       </button>' +
      '     </li>' +
      '     <li class=" m-nav-tog__list__item">' +
      '       <button class="m-nav-tog__link" id="mqSettings-btn">' +
      '          <i class="a-icon-devices_other a-icon--sml"></i>' +
      '       </button>' +
      '     </li>' +
      '     <li class="m-nav-tog__list__item">' +
      '       <button class="m-nav-tog__link" id="sg-gridOverlay--hor_btn">' +
      '          <i class="a-icon-line_style a-icon--sml"></i>' +
      '       </button>' +
      '     </li>' +
      '     <li class="m-nav-tog__list__item">' +
      '       <button class="m-nav-tog__link" id="baselineGrid_overlay_btn">' +
      '          <i class="a-icon-line_weight a-icon--sml"></i>' +
      '       </button>' +
      '     </li>' +
      '  </ul>' +
      ' </nav>' +
      ' </div>' +
      '');

      // Media query toggle control event handler
      $(document).on('click', '#mqSettings-btn', function(){
        $(this).toggleClass('m-nav-tog__link--focus');
        $('body').toggleClass('mqSettings--show');
      });



    return this; // *chainable method*
  };

  /**
   * @function clean
   * @memberof sc5Layout
   * @description Removes deafault stylesheets
   * @example
   * var sc5Template = $SC5();
   * sc5Template.mainContent
   */
  SC5Layout.prototype.clean = function() {
    // Remove Defualt css files
    $('link[href="/static-sg/styleguide-app.css"]').remove();
    $('link[href="/static-sg/styleguide.css"]').remove();
    $('link[href="/static-sg/styleguide_helper_elements.css"]').remove();

    return this; // *chainable method*
  };

  // The actual object is created here, allowing us to 'new' an object without calling 'new'
  SC5Layout.init = function(selector) {
      var self = this;
  };

  // Trick borrowed from jQuery so we don't have to use the 'new' keyword
  SC5Layout.init.prototype = SC5Layout.prototype;

  // Attach our SC5Layout to the global object, and provide a shorthand '$SC5' to ease our poor fingers
  global.SC5Layout = global.$SC5 = SC5Layout;

}(window, jQuery));
