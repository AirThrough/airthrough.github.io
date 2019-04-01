$(document).ready(function () {
	
	console.log("Test");

	var $page = $('html, body');
	$('a[href*="#"]').click(function() {
		$page.animate({
			scrollTop: $($.attr(this, 'href')).offset().top
		}, 600);
		return false;
	});

	// BLUR NEWSLIST 

	// if ( Boolean($(".newslist")[0]) ) {

		$(".newslist__item").each(function(){
			var img = $(this).find('img');
			var curW = img.outerWidth();
			var curH = img.outerHeight();

			$(this).find(".newslist__item-img_blurred").css({
				'top'    : (140-curH) + "px",
				'height' : curH + "px",
				'width'  : curW + "px"
			});
		})

	// }

})