$(document).ready(function() {
    ScrollToInit();
    ActiveSectionNavigation();
    InitWaypointAnimations({
        offset: "60%",
        animateClass: "wp-animated",
        animateGroupClass: "wp-animated-group"
    });
    InitCounterWayPointAnimation();
});

function ScrollToInit() {
    $(document).on("click", "a[href^='#']", function(event) {
        var $anchor = $(this);
        $("html, body").stop().animate({
            scrollTop: $($anchor.attr("href")).offset().top
        }, 1500, "easeInOutExpo");
        event.preventDefault();
    });
}

function ActiveSectionNavigation() {
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

function InitCounterWayPointAnimation() {
    $('.counter').each(function () {
        var $this = $(this);
        var stop = parseInt($this.text().replace(/,/g, ""));
        $this.text(0);
        $this.waypoint(function (direction) {
            animateNumbers($this, 0, stop);
            this.destroy();
        },{
            triggerOnce: true,
            offset: "80%"
        });
    });  
}


function animateNumbers(element, start, stop, commas, duration, ease) {
    var $this = element;
    commas = (commas === undefined) ? true : commas;
    $({value: start}).animate({value: stop}, {
        duration: duration == undefined ? 4000 : duration,
        easing: ease == undefined ? "swing" : ease,
        step: function() {
            $this.text(Math.floor(this.value));
            if (commas) { $this.text($this.text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")); }
        },
        complete: function() {
           if (parseInt($this.text()) !== stop) {
               $this.text(stop);
               if (commas) { $this.text($this.text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")); }
           }
        }
    });
}