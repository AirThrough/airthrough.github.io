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

	$(".player-nav.next").click(function(){
		curAudioItem = $(".products-item-play.current").parents('.products-item');
		curAudioItem.next('.products-item').find(".products-item-play").trigger('click');
 	});

 	$(".player-nav.prev").click(function(){
		curAudioItem = $(".products-item-play.current").parents('.products-item');
		curAudioItem.prev('.products-item').find(".products-item-play").trigger('click');
 	});

	$(".products-item-audio").each(function(){
		var audio = $(this)[0];
		var isPlaying = false;

		function togglePlay() {
			if (isPlaying) {
				audio.pause();
				$(".player-play").removeClass('pause');
			} else {
				audio.play();
				$(".player-play").addClass('pause');
			}
		};

		audio.onplaying = function() {
			isPlaying = true;
		};
		audio.onpause = function() {
			isPlaying = false;
		};

		audio.onended = function(){
			$(audio).siblings(".products-item-play").removeClass('active');
			$(".player-play").removeClass('pause');
		}

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
	var timer = null;
	function startInterval(aud){
		timer = setInterval(function(){
			var curTime = aud.currentTime;
			$(".player-bar").slider("value", curTime);
			
		}, 1000);
	}
	function stopInterval(){
		clearInterval(timer);
	}


	$(".products-item-play").click(function(){

		if (!$(".player").hasClass('active')) {
			$(".player").addClass('active');
		}

		if (!$(this).hasClass('current')) {
			stopInterval();


			if ($(".products-item-play.current")[0]) {
				$(".products-item-play.current").siblings('.products-item-audio')[0].currentTime = 0;
				$(".products-item-play.current").removeClass('current');
			}
			
			
			$(this).addClass('current');
			var curAudio = $(this).siblings('.products-item-audio')[0];
			var curAudioItem = $(curAudio).parents('.products-item');
			var curImg = curAudioItem.find('img').attr('src');
			var curTxt = curAudioItem.find('.products-item-title').text();

			$(".player-img").attr('src', curImg);
			$(".player-trackname").text(curTxt);

			if ( !curAudioItem.prev(".products-item")[0] ) {
				$(".player-nav.prev").addClass('disabled');
				$(".player-nav.next").removeClass('disabled');
			} else if (!curAudioItem.next(".products-item")[0]) {
				$(".player-nav.prev").removeClass('disabled');
				$(".player-nav.next").addClass('disabled');
			} else {
				$(".player-nav.prev").removeClass('disabled');
				$(".player-nav.next").removeClass('disabled');
			}
			
			var dur = Math.floor(curAudio.duration);
			$(".player-bar").slider("option", "max", dur);

			startInterval(curAudio);

		}
		
	})


	$(".header-menu-btn").click(function(){
		$(this).toggleClass('active');
		$(".header-mobile-wrapper").toggleClass('active');
		$('body').toggleClass('no-scroll');
	})

	$(".header-mobile-wrapper .header-menu li a").click(function(){
		$(".header-menu-btn").toggleClass('active');
		$(".header-mobile-wrapper").toggleClass('active');
		$('body').toggleClass('no-scroll');
	});

	$(".btn-up").click(function(){
		setTimeout(function(){
			$('html,body').animate({ scrollTop: 0 }, 1000);
			return false; 
		}, 200);

	});

	$(".player-play").click(function(){
		var curAudio = $(".products-item-play.current").siblings('.products-item-audio')[0];
		if ( $(this).hasClass('pause') ) {
			curAudio.pause();
			$(this).removeClass('pause');
			$(".products-item-play.current").toggleClass('active');
		} else {
			curAudio.play();
			$(this).addClass('pause');
			$(".products-item-play.current").toggleClass('active');
		}
	})

	$(".player-volume-range").slider({
		range: "min",
		value: 100,
		min: 0,
		max: 100,
		change: function( event, ui ) {
			if (ui.value == 0) {
				if ( !$(".player-volume-icon").hasClass('mute') ) {
					$(".player-volume-icon").addClass('mute');
				} 
			} else {
				$(".player-volume-icon").removeClass('mute');
			}
		},
		slide: function( event, ui ) {
			var curAudio = $(".products-item-play.current").siblings('.products-item-audio')[0];
			curAudio.volume = ui.value/100;
			if (ui.value == 0) {
				if ( !$(".player-volume-icon").hasClass('mute') ) {
					$(".player-volume-icon").addClass('mute');
				} 
			} else {
				$(".player-volume-icon").removeClass('mute');
			}
		},
		stop: function( event, ui ) {
			var curAudio = $(".products-item-play.current").siblings('.products-item-audio')[0];
			curAudio.volume = ui.value/100;
		}
	});

	var handleVolume = 0;


	$(".player-volume-icon").click(function(){
		if ( !$(this).hasClass('mute') ) {
			$(this).addClass('mute');
			var curAudio = $(".products-item-play.current").siblings('.products-item-audio')[0];
			handleVolume = curAudio.volume;
			curAudio.volume = 0;
		} else {
			if ( $(".player-volume-range").slider('value') != 0 ) {
				$(this).removeClass('mute');
				$(".products-item-play.current").siblings('.products-item-audio')[0].volume = handleVolume;
			}
		}

	})


	$(".player-bar").slider({
		range: "min",
		stop: function( event, ui ) {
			var curAudio = $(".products-item-play.current").siblings('.products-item-audio')[0];
			curAudio.currentTime = ui.value;
			startInterval(curAudio);
			var curTime = curAudio.currentTime;
			var min = Math.floor(curTime/60);
			var sec = Math.ceil(curTime - min*60);
			if (sec < 10) {
				sec = "0" + sec;
			}
			if (sec == 60) {
				sec = '00';
				min++;
			}
			$(".player-bar-time").text(min + ":" + sec); 
		},
		start: function( event, ui ) {
			stopInterval();
		},
		change:  function( event, ui ) {
			var curTime = $(".products-item-play.current").siblings('.products-item-audio')[0].currentTime;
			var min = Math.floor(curTime/60);
			var sec = Math.ceil(curTime - min*60);
			if (sec < 10) {
				sec = "0" + sec;
			}
			if (sec == 60) {
				sec = '00';
				min++;
			}

			$(".player-bar-time").text(min + ":" + sec); 
		},
		slide: function( event, ui ) {
			var curTime = ui.value;
			var min = Math.floor(curTime/60);
			var sec = Math.ceil(curTime - min*60);
			if (sec < 10) {
				sec = "0" + sec;
			}
			if (sec == 60) {
				sec = '00';
				min++;
			}

			$(".player-bar-time").text(min + ":" + sec); 
		}
	});

})