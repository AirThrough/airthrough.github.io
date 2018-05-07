$(document).ready(function(){

	console.log('Okay');

	$(".banner-slider").owlCarousel({
		items: 1,
		loop: true,
		nav: false,
		dots: true,
		animateOut: 'fadeOut',
		animateIn: 'fadeIn'
	});

	$(".popular-slider").owlCarousel({
		items: 5, 
		loop: true,
		nav: true,
		responsive: {
			0: {
				items: 1,
			},

			450: {
				items: 2,
			},

			768: {
				items: 3,
			},

			1200: {
				items: 5, 
			}
		}
	});

	$("select").niceSelect();

	$(".product-slider").owlCarousel({
		items: 1, 
		loop: true,
		nav: true,
		dots: true
	});


	// MOBILE 

	$(".open-menu-wrap").click(function(){

		$(this).toggleClass('active');
		$(".header-mobile").toggleClass('opened');

	});

	$(".scope-up, .scope-down").click(function(){

		if (!$(this).hasClass('active')) {
			$(this).parents('.scope-block').find('div').removeClass('active');
			$(this).addClass('active');
		}

	});

	// PARALLAX 
	// var cur_dif = 0;
	// var candy_2_top = $(".achieve .candy-bg-2").css('top');
	// candy_2_top = +(candy_2_top.substr(0, candy_2_top.length-3));

	// $(window).scroll(function(){

	// 	var achieve_offset = $('.achieve').offset().top;
	// 	var window_offset = $(window).scrollTop();

	// 	if (achieve_offset <= window_offset+300) {

	// 		cur_dif = (window_offset - achieve_offset)/10;

	// 		var cur_top = $(".achieve .candy-bg-2").css('top');

	// 		cur_top = cur_top.substr(0, cur_top.length-3);

	// 		console.log(cur_dif + +(cur_top)  );
			
	// 		$('.achieve .candy-bg-2').animate({
	// 			'top' : candy_2_top + cur_dif
	// 		}, 0);

	// 	}
	// })

	function translate(event){
  var $window = $(window);
	var scrollTime = .4;
	var scrollDistance = 200;
	event.preventDefault();
	var delta = event.wheelDelta/120 || -event.detail/3;
	var scrollTop = $window.scrollTop();
	var finalScroll = scrollTop - parseInt(delta*scrollDistance);

	TweenMax.to($window, scrollTime, {
		scrollTo : { y: finalScroll, autoKill:true },
			ease: Power1.easeOut,
			autoKill: true,
			overwrite: 5
	});
}

if (window.addEventListener)
    window.addEventListener('DOMMouseScroll', translate, false);
window.onmousewheel = document.onmousewheel = translate;




var parallaxController;

(function() {
	parallaxController = this;
    function extend(){
        for(var i=1; i<arguments.length; i++)
            for(var key in arguments[i])
                if(arguments[i].hasOwnProperty(key))
                    arguments[0][key] = arguments[i][key];
        return arguments[0];
    }
	var menuClosed = true;
    this.paralaxxed = document.getElementsByClassName("parallaxy-animate");
    parallaxate = function(parallax_elements, defaultSettings) {
        var elements = parallax_elements;
        for (i = 0; i < elements.length; i++) {
            var settings = JSON.parse(JSON.stringify(defaultSettings)); // defaultSettings.copy();
            var options = JSON.parse(elements[i].getAttribute('parallaxy-options'));
            elements[i].settings = extend(settings, options);


                elements[i].initial_offset = elements[i].offsetTop;
            elements[i].dataset = options.direction;
            elements[i].dataset.currentDelta = 0;
            elements[i].dataset.newDelta = 0;
        }
    }
    scrollHandler = function() {
        var that = this;
		var scrollTop = window.pageYOffset;
        for (i = 0; i < paralaxxed.length; i++) {
            var currentDelta = paralaxxed[i].dataset.currentDelta;
			var newDelta = (0 - (scrollTop * paralaxxed[i].settings.multiplier));

					var tweenDelta = (currentDelta - ((currentDelta - newDelta) * 0.08));
                    paralaxxed[i].style.transform = "translateY(" + tweenDelta + "px) translateZ(0)";
                    paralaxxed[i].style.webkitTransform = "translateY(" + tweenDelta + "px) translateZ(0)";
                paralaxxed[i].dataset.currentDelta = tweenDelta;
        }
		if(menuClosed) {
            window.requestAnimationFrame( scrollHandler );
        }
    }
    function init() {
        var that = this;
        var paralaxxedsettings = {
             "multiplier" : "0.2"
        };

        if(paralaxxed.length > 0) {
            parallaxate(that.paralaxxed, paralaxxedsettings);
        }
		scrollHandler();
    }
	// pauseTween = function() {
	// 	menuClosed = false;
	// }
	// restartTween = function() {
	// 	menuClosed = true;
	// 	scrollHandler();
	// }
    init()
})();


	

});