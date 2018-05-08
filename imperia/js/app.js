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

	$(".has-sub > a").click(function(e){
		e.preventDefault();
		$(this).next('.sub-menu').slideToggle();
	});

	// MAP 

	$(".geo-text-russia-wrap").css({
			height: $(".geo-text-russia.chosen").outerHeight()
		});

	$("#geo-russia-region").change(function(){

		var cur_reg = $(this).val();

		if (!$(".geo-map-russia .geo-marker-"+cur_reg).hasClass('chosen')) {
			$(".geo-map-russia .geo-marker").removeClass('chosen');
			$(".geo-map-russia .geo-marker-"+cur_reg).addClass('chosen');
		}

		if (!$(".geo-text-russia.geo-text-"+cur_reg).hasClass('chosen')) {
			$(".geo-text-russia").removeClass('chosen');
			$(".geo-text-russia.geo-text-"+cur_reg).addClass('chosen');
		}

		$(".geo-text-russia-wrap").css({
			height: $(".geo-text-russia.chosen").outerHeight()
		});
	});

	$(".geo-text-world-wrap").css({
			height: $(".geo-text-world.chosen").outerHeight()
		});

	$("#geo-world-region").change(function(){

		var cur_reg = $(this).val();

		if (!$(".geo-map-world .geo-marker-"+cur_reg).hasClass('chosen')) {
			$(".geo-map-world .geo-marker").removeClass('chosen');
			$(".geo-map-world .geo-marker-"+cur_reg).addClass('chosen');
		}

		if (!$(".geo-text-world.geo-text-"+cur_reg).hasClass('chosen')) {
			$(".geo-text-world").removeClass('chosen');
			$(".geo-text-world.geo-text-"+cur_reg).addClass('chosen');
		}

		$(".geo-text-world-wrap").css({
			height: $(".geo-text-world.chosen").outerHeight()
		});


	});

	$(".geo-map-russia .geo-marker").click(function(){

		if (!$(this).hasClass('chosen')) {
			$(".geo-map-russia .geo-marker").removeClass('chosen');
			$(this).addClass('chosen');
			$("#geo-russia-region").val($(this).data('value'));
			document.getElementById("geo-russia-region").selectedIndex = +($(this).data('value'))-1;
			$('#geo-russia-region').niceSelect('update');
		}

	});

	$(".geo-map-world .geo-marker").click(function(){

		if (!$(this).hasClass('chosen')) {
			$(".geo-map-world .geo-marker").removeClass('chosen');
			$(this).addClass('chosen');
			$("#geo-world-region").val($(this).data('value'));
			document.getElementById("geo-world-region").selectedIndex = +($(this).data('value'))-1;
			$('#geo-world-region').niceSelect('update');
		}

	});



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



/// map

  var check_load = false;
  var control = $("#map").width();
  if (control) {
  
  $(window).scroll(function(){                              
   if ( $(window).scrollTop() >= $("#map").offset().top-3000 ){  
  if (check_load == false) {
     check_load = true;
     
     console.log("yes");
     console.log($("yamps").width());
     var script = document.createElement('script');
script.src = "https://api-maps.yandex.ru/2.1/?lang=ru_RU";

document.body.appendChild(script);

script.onload = function(){
    

   ymaps.ready(function () {
    var myMap = new ymaps.Map('map', {
            center: [59.22556173748073,39.8806625],
            zoom: 16
        });
         var myPlacemark = new ymaps.Placemark([59.22556173748073,39.8806625], {
                
        iconLayout: 'default#imageWithContent',
        iconImageHref: 'new_leadera/img/logotype.png',
        iconImageSize: [28, 33],
        iconImageOffset: [-3, -42],
        balloonContentBody: '<div class="map-title" style="text-align: center;">г. Вологда, ул. Большая Улочная, <br>стр. 14, к-2, офис 87</div>'
         
    });
        myMap.geoObjects.add(myPlacemark);
        myMap.behaviors.disable('scrollZoom');
        myMap.behaviors.disable('multiTouch');
      // myMap.behaviors.get('drag').options.set('inertia', false);
      console.log($("yamps").width());
     
});
}

  }
    
   }
});
}

	

});