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
		nav: true
	});

	$("select").niceSelect();

	$(".product-slider").owlCarousel({
		items: 1, 
		loop: true,
		nav: true,
		dots: true
	});


	

});