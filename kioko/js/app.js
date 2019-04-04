$(document).ready(function () {
	
	console.log("Test");

	var $page = $('html, body');
	$('a[href*="#"]').click(function() {
		$page.animate({
			scrollTop: $($.attr(this, 'href')).offset().top
		}, 600);
		return false;
	});

	// MOBILE HEADER 

	$(".header__mobile-menu-btn").click(function(){

		if ( !$(this).hasClass('header__mobile-menu-btn_active') ) {
			$("body").css({
				'overflow' : 'visible',
				'height': '100%'
			});
			$("html").css({
				'overflow' : 'hidden'
			});
		} else {
			$("body, html").css({
				'overflow' : 'auto',
				'height' : 'auto'
			});
			$("html").css({
				'overflow' : 'auto'
			});
			setTimeout(function(){
				$(".header__mobile-nav-wrapper")[0].scrollTop = 0;
			}, 500);
			
		}

		$(this).toggleClass("header__mobile-menu-btn_active");
		$(".header__mobile-nav-container").toggleClass("header__mobile-nav-container_active");

	});

	// BLUR NEWSLIST 

	if ( Boolean($(".newslist")[0]) ) {

		$(".newslist__item").each(function(){
			var img = $(this).find('img');
			var curW = img.outerWidth();
			var curH = img.outerHeight();

			$(this).find(".newslist__item-img_blurred").css({
				'top'    : (140-curH) + "px",
				'height' : curH + "px",
				'width'  : curW + "px"
			});
		});

		$(window).resize(function(){
			$(".newslist__item").each(function(){
				var img = $(this).find('img');
				var curW = img.outerWidth();
				var curH = img.outerHeight();

				$(this).find(".newslist__item-img_blurred").css({
					'top'    : (140-curH) + "px",
					'height' : curH + "px",
					'width'  : curW + "px"
				});
			});
		})

	}

	// JOBS 

	if ( Boolean($(".jobs")[0]) ) {

		$(".jobs__item-btn").click(function(){
			$(this).toggleClass("jobs__item-btn_active");
			$(this).siblings(".jobs__item-content").toggleClass("jobs__item-content_active");
			$(this).siblings(".jobs__item-content").slideToggle();
		})

	}

	// Gallery 

	if ( Boolean($(".gallery")[0]) ) {

		setTimeout(function(){
			minH = $(".gallery__img").outerHeight();

			$(".gallery__item").each(function(){
				var curH = $(this).find(".gallery__img").outerHeight();
				if ( curH < minH ) {
					minH = curH;
				}


			});

			$(".gallery__item").each(function(){
				$(this).css({
					'height' : minH + "px"
				});
				var curImg = $(this).find(".gallery__img");
			// if ( curImg.outerHeight() > minH ) {
			// 	curImg.css({
			// 		'top': -(curImg.outerHeight() - minH)
			// 	});
			// }
			
		});
		}, 1500);

		

		$('.gallery__img-link').fancybox();
	}

})