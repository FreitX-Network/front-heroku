var innerDocWidth = window.innerWidth;
var innerDocHeight = window.innerHeight;

// Menu
setTimeout(function () {

function classReg( className ) {
  return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
}

// classList support for class management
// altho to be fair, the api sucks because it won't accept multiple classes at once
var hasClass, addClass, removeClass;

if ( 'classList' in document.documentElement ) {
  hasClass = function( elem, c ) {
    return elem.classList.contains( c );
  };
  addClass = function( elem, c ) {
    elem.classList.add( c );
  };
  removeClass = function( elem, c ) {
    elem.classList.remove( c );
  };
}
else {
  hasClass = function( elem, c ) {
    return classReg( c ).test( elem.className );
  };
  addClass = function( elem, c ) {
    if ( !hasClass( elem, c ) ) {
      elem.className = elem.className + ' ' + c;
    }
  };
  removeClass = function( elem, c ) {
    elem.className = elem.className.replace( classReg( c ), ' ' );
  };
}

function toggleClass( elem, c ) {
  var fn = hasClass( elem, c ) ? removeClass : addClass;
  fn( elem, c );
}

window.classie = {
  // full names
  hasClass: hasClass,
  addClass: addClass,
  removeClass: removeClass,
  toggleClass: toggleClass,
  // short names
  has: hasClass,
  add: addClass,
  remove: removeClass,
  toggle: toggleClass
};

// })( window );


    // burger animation
    var $hamburger = $(".hamburger");
    $hamburger.on("click", function(e) {
        $hamburger.toggleClass("is-active");

        var eventClass = e.currentTarget.className;

        if (eventClass.indexOf('is-active') > -1) {
            setTimeout(function () {
                $('.block_a').css('display', 'block');
            }, 1800);
        } else {
            $('.block_a').css('display', 'none');
        }

    });
}, 500);



var scrollX = window.pageXOffset || document.documentElement.scrollLeft;
var scrollY = window.pageYOffset || document.documentElement.scrollTop;

function myScript(){
    var scrollX = window.pageXOffset || document.documentElement.scrollLeft;
    var scrollY = window.pageYOffset || document.documentElement.scrollTop;
}

window.addEventListener("scroll", myScript);

function getPathObject(selector, callback) {
    var selected = document.querySelector(selector);

    if (selected) {
        return callback(null, selected);
    } else {
        return callback(true);
    }
}

$(window).scroll(function () {
    var sc = $(window).scrollTop()
    if (sc > 150) {
        $("#main-navbar").addClass("navbar-scroll")
    }
    else {
        $("#main-navbar").removeClass("navbar-scroll")
    }
    if (sc > 150) {
        $("#mob").addClass("navbar-scroll")
    }
    else {
        $("#mob").removeClass("navbar-scroll")
    }
});


$(document).ready(function() {
    setTimeout(function () {
        window.sr = ScrollReveal({ reset: true });

        // Customizing a reveal set
        sr.reveal('.text_block', { duration: 2000, origin: 'right' });
    }, 900);
});
/*     Rodemap function       */
$(document).ready( function () {

    // VARIABLES
    var timeline = document.querySelector(".timeline ol"),
    elH = document.querySelectorAll(".timeline li > div"),
    arrows = document.querySelectorAll(".timeline .arrows .arrow"),
    arrowPrev = document.querySelector(".timeline .arrows .arrow__prev"),
    arrowNext = document.querySelector(".timeline .arrows .arrow__next"),
    firstItem = document.querySelector(".timeline li:first-child"),
    lastItem = document.querySelector(".timeline li:last-child"),
    xScrolling = 280,
    disabledClass = "disabled";

    // START
    // window.addEventListener("load", init);

    function init() {
        setEqualHeights(elH);
        animateTl(xScrolling, arrows, timeline);
        setSwipeFn(timeline, arrowPrev, arrowNext);
        setKeyboardFn(arrowPrev, arrowNext);
    }

    // SET EQUAL HEIGHTS
    function setEqualHeights(el) {
        var counter = 0;
        for (var i = 0; i < el.length; i++) {
            var singleHeight = el[i].offsetHeight;

            if (counter < singleHeight) {
                counter = singleHeight;
            }
        }

        for (var _i = 0; _i < el.length; _i++) {
            el[_i].style.height = counter + "px";
        }
    }

    // CHECK IF AN ELEMENT IS IN VIEWPORT
    function isElementInViewport(el) {
        var rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth));

        }

        // SET STATE OF PREV/NEXT ARROWS
        function setBtnState(el) {var flag = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
            if (flag) {
                el.classList.add(disabledClass);
            } else {
                if (el.classList.contains(disabledClass)) {
                    el.classList.remove(disabledClass);
                }
                el.disabled = false;
            }
        }

        // ANIMATE TIMELINE
        function animateTl(scrolling, el, tl) {
            var counter = 0;
            for (var i = 0; i < el.length; i++) {
                el[i].addEventListener("click", function () {
                    if (!arrowPrev.disabled) {
                        arrowPrev.disabled = true;
                    }
                    if (!arrowNext.disabled) {
                        arrowNext.disabled = true;
                    }
                    var sign = this.classList.contains("arrow__prev") ? "" : "-";
                    if (counter === 0) {
                        tl.style.transform = "translateX(-" + scrolling + "px)";
                    } else {
                        var tlStyle = getComputedStyle(tl);
                        // add more browser prefixes if needed here
                        var tlTransform = tlStyle.getPropertyValue("-webkit-transform") || tlStyle.getPropertyValue("transform");
                        var values = parseInt(tlTransform.split(",")[4]) + parseInt("" + sign + scrolling);
                        tl.style.transform = "translateX(" + values + "px)";
                    }

                    setTimeout(function () {
                        isElementInViewport(firstItem) ? setBtnState(arrowPrev) : setBtnState(arrowPrev, false);
                        isElementInViewport(lastItem) ? setBtnState(arrowNext) : setBtnState(arrowNext, false);
                    }, 1100);

                    counter++;
                });
            }
        }

        // ADD SWIPE SUPPORT FOR TOUCH DEVICES
        function setSwipeFn(tl, prev, next) {
            var hammer = new Hammer(tl);
            hammer.on("swipeleft", function () {return next.click();});
            hammer.on("swiperight", function () {return prev.click();});
        }

        // ADD BASIC KEYBOARD FUNCTIONALITY
        function setKeyboardFn(prev, next) {
            document.addEventListener("keydown", function (e) {
                if (e.which === 37 || e.which === 39) {
                    var timelineOfTop = timeline.offsetTop;
                    var y = window.pageYOffset;
                    if (timelineOfTop !== y) {
                        window.scrollTo(0, timelineOfTop);
                    }
                    if (e.which === 37) {
                        prev.click();
                    } else if (e.which === 39) {
                        next.click();
                    }
                }
            });
        }

    });
