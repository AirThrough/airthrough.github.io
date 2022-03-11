$(document).ready(function(){

	$("select").niceSelect();




	function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
  var angleInRadians = (angleInDegrees-90) * Math.PI / 180.0;

  return {
    x: centerX + (radius * Math.cos(angleInRadians)),
    y: centerY + (radius * Math.sin(angleInRadians))
  };
}

function describeArc(x, y, radius, startAngle, endAngle){

    var start = polarToCartesian(x, y, radius, endAngle);
    var end = polarToCartesian(x, y, radius, startAngle);

    var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    var d = [
        "M", start.x, start.y, 
        "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
    ].join(" ");

    return d;       
}

document.getElementById("arc1").setAttribute("d", describeArc(100, 100, 90, 0, 359));
document.getElementById("arc2").setAttribute("d", describeArc(100, 100, 90, 0, 359));

var circle = document.getElementById("arc1");

Moveit.put(circle, {
  start: '60%',
  end: '100%'
});
Moveit.animate(circle, {
  start: '60%',
  end: '100%',
  duration: 0.6,
  delay: 0,
  timing: 'ease-out'
});


// SELECT COLORS CLASSES 
	var option_count = 0;
	$("#deposit option").each(function(){
		var color = $(this).data('color');
		option_count++;
		$(".nice-select ul li:nth-child("+option_count+")").addClass('option-'+color);
		
	});

	$("#deposit").change(function(){
		setColor();

		var cur_val = +($("#deposit").val());
		for (var i = 1; i <= 10; i++) {
			if (i>cur_val) {
				$(".status-item-stages li:nth-child("+i+")").removeClass('active');
			} else {
				$(".status-item-stages li:nth-child("+i+")").addClass('active');
			}
		}

	if ($('.current').hasClass('current-red')) {
		Moveit.animate(circle, {
  start: '20%',
  end: '100%',
  duration: 0.6,
  delay: 0.3,
  timing: 'ease-out'
});
	}

		if ($('.current').hasClass('current-yellow')) {
		Moveit.animate(circle, {
  start: '50%',
  end: '100%',
  duration: 0.6,
  delay: 0.3,
  timing: 'ease-out'
});
	}

		if ($('.current').hasClass('current-green')) {
		Moveit.animate(circle, {
  start: '70%',
  end: '100%',
  duration: 0.6,
  delay: 0.3,
  timing: 'ease-out'
});
	}

	


		
	});

function setColor() {
	var cur_val = $("#deposit").val();
	
	if ($(".nice-select ul li:nth-child("+cur_val+")").hasClass('option-green')) {

		$(".nice-select .current").removeClass('current-red');
		$(".nice-select .current").removeClass('current-yellow');
		$(".nice-select .current").addClass('current-green');
	}

	if ($(".nice-select ul li:nth-child("+cur_val+")").hasClass('option-yellow')) {
		$(".nice-select .current").removeClass('current-red');
		$(".nice-select .current").removeClass('current-green');
		$(".nice-select .current").addClass('current-yellow');
	}

	if ($(".nice-select ul li:nth-child("+cur_val+")").hasClass('option-red')) {
		$(".nice-select .current").removeClass('current-green');
		$(".nice-select .current").removeClass('current-yellow');
		$(".nice-select .current").addClass('current-red');
	}
	
}

setColor();

var timeOut = [3, 42, 21]




})