AOS.init({
    duration: 800,
    easing: 'ease',
    once: true,
    offset: -100
});

jQuery(function($) {

    'use strict';
    loader();
    siteMenuClone();
    mobileToggleClick();



});


var loader = function() {
    setTimeout(function() {
        TweenMax.to('.site-loader-wrap', 1, { marginTop: 50, autoAlpha: 0, ease: Power4.easeInOut });
    }, 10);
    $(".site-loader-wrap").delay(200).fadeOut("slow");
    $("#unslate_co--overlayer").delay(200).fadeOut("slow");
}


var mobileToggleClick = function() {
    $('.js-menu-toggle').click(function(e) {

        e.preventDefault();

        if ($('body').hasClass('offcanvas')) {
            $('body').removeClass('offcanvas');
            $('.js-menu-toggle').removeClass('active');
            if ($('.js-burger-toggle-menu').length) {
                $('.js-burger-toggle-menu').removeClass('open');
            }
        } else {
            $('body').addClass('offcanvas');
            $('.js-menu-toggle').addClass('active');
            if ($('.js-burger-toggle-menu').length) {
                $('.js-burger-toggle-menu').addClass('open');
            }
        }


    });

    // click outisde offcanvas
    $(document).mouseup(function(e) {
        var container = $(".unslate_co--site-mobile-menu");
        if (!container.is(e.target) && container.has(e.target).length === 0) {
            if ($('body').hasClass('offcanvas')) {
                $('body').removeClass('offcanvas');
                $('body').find('.js-menu-toggle').removeClass('active');

                $('body').find('.js-burger-toggle-menu').removeClass('open');
            }
        }
    });
};


var siteMenuClone = function() {

    setTimeout(function() {

        $('.js-clone-nav').each(function() {
            var $this = $(this);
            $this.clone().attr('class', 'site-nav-wrap').appendTo('.site-mobile-inner');
        });

        var counter = 0;
        $('.unslate_co--site-mobile-menu .has-children').each(function() {
            var $this = $(this);

            $this.prepend('<span class="arrow-collapse collapsed">');

            $this.find('.arrow-collapse').attr({
                'data-toggle': 'collapse',
                'data-target': '#collapseItem' + counter,
            });

            $this.find('> ul').attr({
                'class': 'collapse',
                'id': 'collapseItem' + counter,
            });

            counter++;

        });

    }, 1000);

    $('body').on('click', '.arrow-collapse', function(e) {
        var $this = $(this);
        if ($this.closest('li').find('.collapse').hasClass('show')) {
            $this.removeClass('active');
        } else {
            $this.addClass('active');
        }
        e.preventDefault();

    });

    $(window).resize(function() {
        var $this = $(this),
            w = $this.width();

        if (w > 768) {
            if ($('body').hasClass('offcanvas')) {
                $('body').removeClass('offcanvas');
            }
        }
    });

    $('.js-burger-toggle-menu').click(function(e) {
        e.preventDefault();
        if ($('body').hasClass('offcanvas')) {
            $('body').removeClass('offcanvas');
            $('.js-burger-toggle-menu').removeClass('open');
        } else {
            $('body').addClass('offcanvas');
            $('.js-burger-toggle-menu').addClass('open');
        }
    });

};