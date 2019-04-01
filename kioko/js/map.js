var map;
function initialize()
{
	map = new google.maps.Map(document.getElementById('map'), {
		center: new google.maps.LatLng(47.905952, 33.342806),
		zoom: 17
	});
}

function newLocation(newLat,newLng)
{
	map.setCenter({
		lat : newLat,
		lng : newLng
	});
}

google.maps.event.addDomListener(window, 'load', initialize);


$(document).ready(function ()
{
	$("#address2").on('click', function ()
	{
		newLocation(48.023785, 33.471276);
	});
	
	$("#address3").on('click', function ()
	{
		newLocation(47.905277, 33.374072);
	});
	
	$("#address1").on('click', function ()
	{
		newLocation(47.905952, 33.342806);
	});

	$(".contacts__map-button").click(function(e){
		e.preventDefault();
		if ( !$(this).hasClass('contacts__map-button_active') ) {
			$(".contacts__map-button").each(function(){
				$(this).removeClass('contacts__map-button_active');
			});
			$(this).addClass('contacts__map-button_active');
		}
		
	})
});