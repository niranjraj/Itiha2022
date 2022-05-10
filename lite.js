AOS.init({
    duration: 800,
    easing: 'ease',
    once: true,
    offset: -100
});

jQuery(function($) {

    'use strict';
    loader();


});


var loader = function() {
    setTimeout(function() {
        TweenMax.to('.site-loader-wrap', 1, { marginTop: 50, autoAlpha: 0, ease: Power4.easeInOut });
    }, 10);
    $(".site-loader-wrap").delay(200).fadeOut("slow");
    $("#unslate_co--overlayer").delay(200).fadeOut("slow");
}