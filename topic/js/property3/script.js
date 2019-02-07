$(document).ready(function(){

	$('.banner').on('init', function(event, slick){
        $(this).addClass('banner-inited');
    })

	$('.banner').slick({
		rows: 4,
		dots: false,
		arrows: false,
		autoplay: true,
		fade: true,
		speed: 800,
		 responsive: [
		    {
		      breakpoint: 480,
		      settings: {
		        slidesToShow: 1
		      }
		    }
		  ]
	});

	// $('.slider').slick({
	// 	dots: false,
	// 	arrows: false,
	// 	autoplay: true,
	// 	speed: 800,
	// });

	$('.slider2').slick({
		slidesToShow: 2,
		dots: false,
		arrows: true,
		autoplay: true,
		speed: 800,
		 responsive: [
		    {
		      breakpoint: 480,
		      settings: {
		        slidesToShow: 1
		      }
		    }
		  ]
	});

	$('.map-link').on('click',function(e){
		e.preventDefault();
		$('.map-container').fadeToggle(500);

		ymaps.ready(init);

	    function init(){     
	        var myMap = new ymaps.Map("map", {
	                center: [55.76, 37.64],
	                zoom: 7,
	                controls: []
	            }); 
	            
	            var myPlacemark = new ymaps.Placemark([55.76, 37.64], {
	                hintContent: 'Содержимое всплывающей подсказки',
	                balloonContent: 'Содержимое балуна'
	            });
	            
	            myMap.geoObjects.add(myPlacemark);
	    }
	    
	})

	function fotorama(){

		$('.fotorama').on('fotorama:ready', function (e, fotorama) {
		  // console.log(e.type, fotorama.activeIndex);
		  $('.fotorama-block').css('opacity',1)
		});

		var setHeight = '300';

		if ($(window).width()<480){
			setHeight = '200';
		}

		$('.fotorama').fotorama({
			nav: 'thumbs',
			width: "100%",
			thumbwidth: '99',
			thumbheight: '75',
			fit: "cover",
			thumbmargin: "11",
			loop: "true",
			height: setHeight
		});
	}

	fotorama();

	function addReview(){
		$('.add-review-link').on('click',function(){
			$('.adcoment-block').fadeToggle(0);
		})
	}

	addReview();

})