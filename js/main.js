$(document).ready(function() {
    scrollToInit();
    InitWaypointAnimations({
        offset: "60%",
        animateClass: "wp-animated",
        animateGroupClass: "wp-animated-group"
    });
});

function scrollToInit() {
    $(document).on("click", "a[href^='#']", function(event) {
        var $anchor = $(this);
        $("html, body").stop().animate({
            scrollTop: $($anchor.attr("href")).offset().top
        }, 1500, "easeInOutExpo");
        event.preventDefault();
    });
}
