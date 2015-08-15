/*!
 * Start Bootstrap - Creative Bootstrap Theme (http://startbootstrap.com)
 * Code licensed under the Apache License v2.0.
 * For details, see http://www.apache.org/licenses/LICENSE-2.0.
 */

(function($) {
    "use strict"; // Start of use strict

    // jQuery for page scrolling feature - requires jQuery Easing plugin
    /*$('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: ($($anchor.attr('href')).offset().top - 50)
        }, 1250, 'easeInOutExpo');
        event.preventDefault();
    });*/

    // Highlight the top nav as scrolling occurs
    //$('body').scrollspy({
    //    target: '.navbar-fixed-top',
    //    offset: 51
    //})

    // Closes the Responsive Menu on Menu Item Click
    $('.navbar-collapse ul li a').click(function() {
        $('.navbar-toggle:visible').click();
    });

    // Fit Text Plugin for Main Header
    $("h1").fitText(
        1.2, {
            minFontSize: '35px',
            maxFontSize: '65px'
        }
    );

    // Offset for Main Navigation
    $('#mainNav').affix({
        offset: {
            top: 100
        }
    })

    // Initialize WOW.js Scrolling Animations
    new WOW().init();

    //$('.carousel').carousel({
    //    interval: false
    //});

    // Prevent the carousel from cycling
    $('.carousel').each(function(){
        $(this).carousel({
            pause: 'true',
            interval: false
        });
    });

    // Contact Us
    /* $('#contactUsForm').formValidation({
        framework: 'bootstrap',
        err: {
            container: function ($field, validator) {
                // Look at the markup
                //  <div class="col-xs-4">
                //      <field>
                //  </div>
                //  <div class="col-xs-5 messageContainer"></div>
                return $field.parent().next('.messageContainer');
            }
        },
        icon: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            txtFirstname: {
                validators: {
                    notEmpty: {
                        message: 'Your Firstname is required and cannot be empty'
                    }
                }
            },
            txtEmail: {
                validators: {
                    notEmpty: {
                        message: 'The email address is required and cannot be empty'
                    },
                    emailAddress: {
                        message: 'The email address is not valid'
                    }
                }
            },
            selSubject: {
                validators: {
                    notEmpty: {
                        message: 'A Subject must be selected'
                    }
                }
            },
            txtAMessage: {
                validators: {
                    notEmpty: {
                        message: 'The message is required and cannot be empty'
                    },
                    stringLength: {
                        min: 50,
                        max: 500,
                        message: 'The message must be more than 50 and less than 500 characters long'
                    }
                }
            }
        }
    });*/

})(jQuery); // End of use strict
