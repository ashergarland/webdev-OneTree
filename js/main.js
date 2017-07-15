$(document).ready(function() {
    scrollToInit();
    activeSectionNavigation();
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

function activeSectionNavigation() {
    function getNavItemsMap() {
        const navItemsMap = $("#main-nav").find(".nav-item").map((index, item) => {
            const $item = $(item);
            const name = $item.find(".nav-link").attr("href").substring(1);
            return {
                key: name,
                val: $item
            };
        })
        .toArray()
        .reduce((map, obj) => {
            map[obj.key] = obj.val;
            return map;
        }, {});

        return navItemsMap;
    }

    function deactivateCurrentNavItem() {
        $("#main-nav").find(".nav-item.active").removeClass("active");
    }
    
    const navItemsMap = getNavItemsMap();
    $("section").each((index, element) => {
        const $element = $(element);
        const sectionName = $element.attr("id");
        if(sectionName in navItemsMap) {
            
            $element.waypoint((direction) => {
                if(direction === "down") {
                    deactivateCurrentNavItem();
                    navItemsMap[sectionName].addClass("active");
                }
            },{
                offset: "50%"
            });
            
            $element.waypoint((direction) => {
                if(direction === "up") {
                    deactivateCurrentNavItem();
                    navItemsMap[sectionName].addClass("active");
                }
            },{
                offset: "-20%"
            })
        }
    });
}

