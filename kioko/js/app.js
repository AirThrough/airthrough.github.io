$(document).ready(function () {
	
	console.log("Test");

	var $page = $('html, body');
	$('a[href*="#"]').click(function() {
		$page.animate({
			scrollTop: $($.attr(this, 'href')).offset().top
		}, 600);
		return false;
	});

})