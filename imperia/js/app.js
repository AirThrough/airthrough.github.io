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


	

});