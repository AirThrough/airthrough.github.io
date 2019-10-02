$(document).ready(function(){
	console.log('Ready');

	$(".offers-slider").owlCarousel({
		items: 1,
		loop: true,
		dots: true,
		smartSpeed: 650
	});

	$(".offers-banners").owlCarousel({
		items: 3,
		loop: true,
		margin: 4,
		responsive: {
			0: {
				items: 1
			},
			550: {
				items: 2
			},

			900: {
				items: 3
			}
		}
	});

	$(".nav-item.left").click(function(){
		$(".offers-banners").trigger('prev.owl.carousel');
	});
	$(".nav-item.right").click(function(){
		$(".offers-banners").trigger('next.owl.carousel');
	});

	$("select").niceSelect();

	$('a[href^="#"]').click(function(){
		var el = $(this).attr('href');
		console.log(el);
		$('html,body').animate({
			scrollTop: $(el).offset().top}, 1000);
		return false;
	});

	Waves.init({
		duration: 800
	});
	Waves.attach('.waves-on', 'waves-light');


	$(".popup-close").click(function(e){
		e.preventDefault();
		$(this).parents(".popup").toggleClass('popup-hide');
		if ($(window).width() < 768) {
			$("body").removeClass('no-scroll');
		}
	});

	$(document).on('click.popup-wrapper', function(e){
		if ( $(e.target).attr('class').indexOf('popup-wrapper') != -1 ) {
			$(e.target).parents(".popup").toggleClass('popup-hide');
			if ($(window).width() < 768) {
				$("body").removeClass('no-scroll');
			}
		}
	});

	$(".open-popup").click(function(e){
		e.preventDefault();
		if ($(window).width() < 768) {
			$("body").addClass('no-scroll');
		}
		var curPopup = $(this).data('popup');
		console.log(curPopup);
		$("#"+curPopup).toggleClass('popup-hide');
	});

	$(".popup-form").submit(function(e){
		e.preventDefault();
		if ( !$(this).hasClass('disabled') ) {
			$(this).parents(".popup").toggleClass('popup-hide');
			if ($(window).width() < 768) {
				$("body").removeClass('no-scroll');
			}
		}
		
	});


	$(".checkbox-body").click(function(){
		if (!$(this).hasClass('active')) {
			$(this).addClass('active');
			$(this).parents('.popup-form').removeClass('disabled');
		} else {
			$(this).removeClass('active');
			$(this).parents('.popup-form').addClass('disabled');
		}
		
	});

	$(".checkbox-text").click(function(){
		var check = $(this).siblings('.checkbox-body');
		if (!check.hasClass('active')) {
			check.addClass('active');
			check.parents('.popup-form').removeClass('disabled');
		} else {
			check.removeClass('active');
			check.parents('.popup-form').addClass('disabled');
		}
	});

	$("#phone").mask("+7 (999) 999-9999");

	$(".products-item-audio").each(function(){
		var audio = $(this)[0];
		var isPlaying = false;

		function togglePlay() {
			if (isPlaying) {
				audio.pause()
			} else {
				audio.play();
			}
		};

		audio.onplaying = function() {
			isPlaying = true;
		};
		audio.onpause = function() {
			isPlaying = false;
		};

		$(this).siblings(".products-item-play").click(function(){

			if (!$(this).hasClass('active')) {
				$(".products-item-play.active").trigger('click');
				$(this).addClass('active');
				togglePlay();
			} else {
				$(this).removeClass('active');
				togglePlay();
			}

		})
	});
// 	var myAudio = document.getElementById("myAudio");
// var isPlaying = false;

// function togglePlay() {
//   if (isPlaying) {
//     myAudio.pause()
//   } else {
//     myAudio.play();
//   }
// };
// myAudio.onplaying = function() {
//   isPlaying = true;
// };
// myAudio.onpause = function() {
//   isPlaying = false;
// };

})