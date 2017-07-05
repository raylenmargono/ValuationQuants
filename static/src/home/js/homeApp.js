require("../css/style.css");
require("./canvas.particles");

(function($){
  $(function(){

    $('.button-collapse').sideNav();
    $('.parallax').parallax();
    $('.collapsible').collapsible();
        var header = $("nav");
        var body = $("body");
        $(window).scroll(function() {
            var scroll = $(window).scrollTop();

            if (scroll >= 200) {
                body.addClass("fade-background-body");
                header.addClass("fade-background");
            } else {
                body.removeClass("fade-background-body");
                header.removeClass("fade-background");
            }
        });
        $(".navbar-link").on('click', function(event) {

        // Make sure this.hash has a value before overriding default behavior
        if (this.hash !== "") {
          // Prevent default anchor click behavior
          event.preventDefault();

          // Store hash
          var hash = this.hash;

          // Using jQuery's animate() method to add smooth page scroll
          // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
          $('html, body').animate({
            scrollTop: $(hash).offset().top - 65
          }, 800, function(){

          });
        } // End if
      });

  }); // end of document ready
})(jQuery); // end of jQuery name space