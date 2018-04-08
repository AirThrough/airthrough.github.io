$(document).ready(function () {
	
	console.log('yes');

	$(".item-pic-slider").owlCarousel({
		items: 1,
		loop: true,
		dots: true,
		nav: true,
		autoHeight: true
	});

	$(".gallery-slider").owlCarousel({
		items: 3,
		loop: true,
		dots: true,
		nav: true,
		autoHeight: true,
		margin: 30
	});

	$(".menu-button").click(function(){
		if (!$(".mobile-drop-menu-2").hasClass('active')) {
			$(".mobile-drop-menu-2").addClass('active');
			$(".mobile-drop-menu-2").animate({
				'left' : '0%'
			}, 500);

			var cur_height = $(".mobile-drop-menu-2").outerHeight();
			$(".menus-container").animate({
				height: cur_height
			}, 500);

		} else {
			$(".mobile-drop-menu-2").removeClass('active');
			$(".mobile-drop-menu-2").animate({
				'left' : '-100%'
			}, 500);
			var cur_height = $(".mobile-drop-menu").outerHeight();
			$(".menus-container").animate({
				height: cur_height
			}, 500);
		}

		
	});

	$(".filters-section select").change(function(){

		$(".filters-section .nice-select").removeClass('active-select');

		$(this).next('.nice-select').addClass('active-select');



	});
	if ($(".top-bg-block").height()) {
		var menu_pos = $(".main-header").height() + $(".top-bg-block").height();
	} else {
		var menu_pos = $(".main-header").height();
	}

	$(window).scroll(function(){
		var y = window.scrollY
		
		console.log(y+' dcd '+menu_pos);

		if (y >= menu_pos) {
			$(".nav-header").addClass('scroll-fix');
		} else {
			$(".nav-header").removeClass('scroll-fix');
		}

	});

	if ($(window).width() <= 767) {
		var i = 1;
		$(".button-aside").each(function(){
			$(this).appendTo(".sub-section-"+i+" .items-inner");
			i++;
		});

		$(".inst-link").appendTo('.footer-row');
	}

	$("select").niceSelect();

	function makePages() {
		$.each(this.owl.userItems, function(i) {
			console.log($(this).find('img').attr('src'));
			$('.owl-controls .owl-page').eq(i)
			.css({
				'background': 'url(' + $(this).find('img').attr('src') + ')',
				'background-size': 'cover'
			})
		});
	}

	$(".product-view-main").owlCarousel({
		navigation: true,
		navigationText: ['&lsaquo;','&rsaquo;'],
		slideSpeed: 300,
		paginationSpeed: 400,
		singleItem: true,
		afterInit: makePages,
		afterUpdate: makePages,
		items: 1,
		loop: true,
		
	});

	var cur_width = $(".video-block").width();

	$(".video-block").css({
		height: (cur_width/16)*9
	});

	$(".amount-block .plus").click(function(){

		var itm = $(this).parents('.item-order-row');
		addItem(1, itm);

	});

	$(".amount-block .minus").click(function(){

		var itm = $(this).parents('.item-order-row');
		addItem(-1, itm);

	});

	function addItem(n, item) {
		var cur_number = item.find(".amount-block .number").text();

		if (+cur_number+n >= 0) {
			item.find(".amount-block .number").text(+cur_number+n);
		}

	}

	$(".delete-button").click(function(){
		var itm = $(this).parents('.item-order-row');
		itm.slideToggle();
	});

	$(".delivery-item").click(function () {

		if (!$(this).hasClass('checked')) {
			$(".delivery-item").removeClass('checked');
			$(this).addClass('checked');
		}

	});

	 // $(".gallery-slider .img-block").fancybox();



	 $(".video-button").click(function(){
	 	var src = $(this).data('video');

	 	var num = src.indexOf('?v=');

	 	src = src.substring(num+3);

	 	num = src.indexOf('&');

	 	if (num!=-1) {
	 		src = src.substring(0, num);
	 		src = "https://www.youtube.com/embed/" + src + "?autoplay=1";
	 	} else {
	 		src = "https://www.youtube.com/embed/" + src + "?autoplay=1";
	 	}

	 	$(".video-block-inner iframe").attr('src', src);


	 });

	 $(".video-button").magnificPopup({
	 	callbacks: {
	 		elementParse: function(item) {
	 			setTimeout(function(){
	 				videoHeight();
	 			}, 300);

	 		},

	 		open : function() {
	 			$.magnificPopup.instance.close = function () {
	 				$(".video-block-inner iframe").attr('src', '');
	 				$.magnificPopup.proto.close.call(this);
	 			};

	 		}
	 	}
	 });



	 videoHeight();

	 function videoHeight() {
	 	var cur_w = $(".video-block-inner").width();
	 	console.log(cur_w);
	 	$(".video-block-inner").css({
	 		height: (cur_w/16)*9
	 	});
	 }

	 $(".button-callback").magnificPopup({
	 	removalDelay: 500,
	 	mainClass: 'mfp-fade'
	 });

	 $(".item-button").magnificPopup({
	 	removalDelay: 500,
	 	mainClass: 'mfp-fade'
	 });

	 $("input[type='tel']").mask("+7 (999) 999-9999");

	 $(".go-futher").click(function(){
	 	var magnificPopup = $.magnificPopup.instance; 
	 	magnificPopup.close(); 
	 });






	})