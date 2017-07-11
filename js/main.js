$(document).ready(function() {
    // Add #Link ScrollTo
    $(document).on("click", "a[href^='#']", function(event) {
        var $anchor = $(this);
        $("html, body").stop().animate({
            scrollTop: $($anchor.attr("href")).offset().top
        }, 1500, "easeInOutExpo");
        event.preventDefault();
    });
    
    $('.js-wp-1').waypoint(function(direction) {
        $('.js-wp-1').addClass('animated fadeInDown');
    }, {
        offset: "60%"
    });
    
    $('.js-wp-2').waypoint(function(direction) {
        $('.js-wp-2').addClass('animated fadeInLeft');
    }, {
        offset: "60%"
    });
});

