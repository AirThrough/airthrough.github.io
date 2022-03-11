$(document).ready(function(){


	$("form").submit(function(e){
		e.preventDefault();
	});

	$("select").niceSelect();

	if ( document.getElementById('trading-history') ) {

		if ($(window).width() < 768) {
			$(".chart-wrapper").css({'max-width': $(window).width() - 50, 'width' : $(window).width() - 50});
		}

	}

	//DATE

	$( ".simple-select-date" ).datepicker({
		showOtherMonths: true,
		selectOtherMonths: true,
		dateFormat: "dd/mm/y"
	});
	$(".simple-select-date").focus(function(){
		$(this).parents(".tab-filter-date").addClass("focus");
	});
	$(".simple-select-date").blur(function(){
		$(this).parents(".tab-filter-date").removeClass("focus");
	});


	Waves.init({
		duration: 500
	});
	Waves.attach('.header-burger-bg', 'waves-burger');
	Waves.attach('.aside-support-link', 'waves-burger');
	Waves.attach('.btn-yellow', 'waves-light');
	Waves.attach('.popup-btn', 'waves-burger');
	Waves.attach('.waves-on', 'waves-light');
	Waves.attach('.aside-menu-item', 'waves-yellow');
	Waves.attach('.waves-on-yellow', 'waves-yellow');

	// CARDSHOP

$(".card-boosters-nav-item").click(function(){
	console.log('s');
	if (!$(this).hasClass('active')) {
		$(".card-boosters-nav-item.active").removeClass('active');
		$(this).addClass('active');
	}
})

	//BURGER 

	$(".header-burger-line").click(function(){
		Waves.ripple(".header-burger-bg");
	});

	$(".header-burger").click(function(){
		$(this).toggleClass("active");
		$(".aside").toggleClass("close");
		$(".content-wrapper").toggleClass("aside-close");
	});

	//  Language Switcher 

	function setLanguage() {
		var cur_lng = $("#language").val();
		$('.header-lng-select.nice-select .current').attr('class', 'flag-icon-'+cur_lng+' flag-icon-background current');
		$('.header-lng-select.nice-select .list li').each(function(){
			$(this).addClass('flag-icon-'+$(this).data('value')+' flag-icon-background');
		});
	}

	$("#language").change(function(){
		setLanguage();
	});

	setLanguage();

	// FILTER CURS 

	$(".simple-select-currency, .popup-info-select").each(function(){
		var curVal = $(this).val();
		$(this).siblings(".nice-select").find(".current").attr('class', 'current icon-'+curVal);
	});

	$(".simple-select-currency .list li, .popup-info-select .list li").each(function(){
		$(this).addClass('icon-' + $(this).data('value'));
	});

	$(".simple-select-currency").change(function(){
		var curVal = $(this).val();
		$(this).siblings(".nice-select").find(".current").attr('class', 'current icon-'+curVal);
	});

	// FILTER COLORS

	$(".simple-select-colored").each(function(){
		var curVal = $(this).val();
		$(this).siblings(".nice-select").find(".current").addClass($(this).val());
		$(this).find(".list li").each(function(){
			$(this).addClass($(this).data('value'));
		});
	});

	$(".simple-select-colored").change(function(){
		var current_indicator = $(this).siblings(".nice-select").find(".current");
		if (!current_indicator.hasClass($(this).val())) {
			current_indicator.removeClass("pending");
			current_indicator.removeClass("active");
			current_indicator.removeClass("rejected");
			current_indicator.removeClass("all");
			current_indicator.addClass($(this).val());
		}
	});

	//cut ids 

	$(".cell-link").each(function(){
		if ($(this).attr('title').length > 16) {
			var newStr = $(this).attr('title').slice(0, 16);
			$(this).text(newStr+"...");
		}
	});

	

	// CIRCLES 
	if ( Boolean(document.getElementById("stats-diagram-profit")) ) {
// trading history if begin

var circle1 = document.getElementById("stats-diagram-profit");
var circle2 = document.getElementById("stats-diagram-total");

circle1.setAttribute("d", describeArc(68, 68, 58, 330, 470));
circle2.setAttribute("d", describeArc(68, 68, 58, 110, 330));


Moveit.put(circle1, {
	start: '100%',
	end: '100%'
});
Moveit.animate(circle1, {
	start: '0%',
	end: '100%',
	duration: 1,
	delay: 0.3,
	timing: 'ease-out'
});

Moveit.put(circle2, {
	start: '0%',
	end: '0%'
});
Moveit.animate(circle2, {
	start: '0%',
	end: '100%',
	duration: 1,
	delay: 0.3,
	timing: 'ease-out'
});

var tradingChartData = {
	labelsX : ["07/19/2020", "08/19/2020", "09/19/2020", "10/19/2020", "11/19/2020", "12/19/2020", "13/19/2020"],
	dataTrading : [352, 241, 500, 321, 345, 100, 450],
}

var chartMax = 0;
for (var i = 0; i < tradingChartData.dataTrading.length; i++) {
	if ( tradingChartData.dataTrading[i] > chartMax ) {
		chartMax = tradingChartData.dataTrading[i];
	}
	
}
var chartStepSize = Math.pow(10, (chartMax.toString().length-1));
chartMax = ( Math.floor( chartMax/Math.pow(10, (chartMax.toString().length-1) ) ) + 1 )*Math.pow(10, (chartMax.toString().length-1) );

var ctxChart = document.getElementById("myChart");
var ctx = ctxChart.getContext("2d");
var gradientFill = ctx.createLinearGradient(0, 100, 0, 400);
gradientFill.addColorStop(0, "rgba(228, 185, 64, 0.5)");
gradientFill.addColorStop(1, "transparent");
var chart1 = new Chart(ctxChart, {
	type: 'line',
	data: {
		labels: tradingChartData.labelsX,
		datasets: [{
			backgroundColor: gradientFill,
			borderColor: '#e4b940',
			data: tradingChartData.dataTrading,
			fill: true,
			lineTension: 0,
			pointBackgroundColor: '#e4b940',
			pointBorderWidth: 2,
			pointBorderColor: '#ffffff',
			pointRadius: 3.5,
			pointHitRadius: 50
		},{
			backgroundColor: gradientFill,
			borderColor: 'transparent',
			data: tradingChartData.dataPercents,
			fill: false,
			lineTension: 0,
			pointBackgroundColor: 'transparent',
			pointBorderWidth: 0,
			pointBorderColor: 'transparent',
			pointRadius: 0,
			pointHitRadius: 0
		}],
	},
	options: {
		fill: "#303030",
		legend: false,
		scales: {
			gridLines: {
				drawTicks: false
			},
			yAxes: [{
				gridLines: {
					drawTicks: true,
					color: '#43475A',
					zeroLineColor: '#43475A',
					drawBorder: true,
					borderDash: [1, 2]
				},
				ticks: {
					max: 550,
					padding: 20,
					min: 0,
					stepSize: 50,
					callback: function(value, index, values) {
						if (value == 0) {
							return value;
						} else {
							return value/1000+'K';
						}
					},
					fontFamily: "Helvetica Neue Light",
					fontSize: 12,
					fontColor: '#FFFFFF',
					beginAtZero: true
				}
			}],
			xAxes: [{
				gridLines: {
					drawTicks: false,
					color: '#43475A',
					drawBorder: true,
					zeroLineColor: '#43475A',
					zeroLineWidth : 2
				},
				ticks: {
					padding: 10,
					callback: function(value, index, values) {
						if (value == '0') {
							return '';
						} else {
							return value;
						}
					},
					fontFamily: "Helvetica Neue Light",
					fontSize: 12,
					fontColor: '#99abb4',
					beginAtZero: true
				}
			}],
		},
		tooltips: {
			mode: 'index',
			position: 'nearest',
			enabled: false,
			custom: function(tooltipModel) {
				var tooltipEl = document.getElementById('chartjs-tooltip');
				if (!tooltipEl) {
					tooltipEl = document.createElement('div');
					tooltipEl.id = 'chartjs-tooltip';
					tooltipEl.innerHTML = "<table></table>";
					document.body.appendChild(tooltipEl);
				}
				if (tooltipModel.opacity === 0) {
					tooltipEl.style.opacity = 0;
					return;
				}
				tooltipEl.classList.remove('above', 'below', 'no-transform');
				if (tooltipModel.yAlign) {
					tooltipEl.classList.add(tooltipModel.yAlign);
				} else {
					tooltipEl.classList.add('no-transform');
				}

				function getBody(bodyItem) {
					return bodyItem.lines;
				}

				if (tooltipModel.body) {
					var titleLines = tooltipModel.title || [];
					var bodyLines = tooltipModel.body.map(getBody);
					var innerHtml = '<thead>';

					titleLines.forEach(function(title) {
						switch (title) {
							case "Mon": 
							innerHtml += '<tr><th>Monday</th></tr>';
							break;
							case "Tue": 
							innerHtml += '<tr><th>Tuesday</th></tr>';
							break;
							case "Wed": 
							innerHtml += '<tr><th>Wednesday</th></tr>';
							break;
							case "Thu": 
							innerHtml += '<tr><th>Thursday</th></tr>';
							break;
							case "Fri": 
							innerHtml += '<tr><th>Friday</th></tr>';
							break;
							case "Sat": 
							innerHtml += '<tr><th>Saturday</th></tr>';
							break;
							case "Sun":
							case "0": 
							innerHtml += '<tr><th>Sunday</th></tr>';
							break;
						}
					});
					innerHtml += '</thead><tbody>';

					bodyLines.forEach(function(body, i) {
						if (i == 0) {
							innerHtml += '<tr><td><span class="chart-icon-usd"></span>$ ' + body + '</td></tr>';
						} else {
							innerHtml += '<tr><td><span class="chart-icon-perc"></span>' + body + '%</td></tr>';
						}


					});
					innerHtml += '</tbody>';

					var tableRoot = tooltipEl.querySelector('table');
					tableRoot.innerHTML = innerHtml;
				}

				var position = this._chart.canvas.getBoundingClientRect();
				tooltipEl.style.opacity = 1;
				tooltipEl.style.position = 'fixed';
				tooltipEl.style.left = position.left + tooltipModel.caretX + 'px';
				tooltipEl.style.top = position.top + tooltipModel.caretY + 'px';
				tooltipEl.style.fontFamily = tooltipModel._bodyFontFamily;
				tooltipEl.style.fontSize = tooltipModel.bodyFontSize + 'px';
				tooltipEl.style.fontStyle = tooltipModel._bodyFontStyle;
				tooltipEl.style.padding = tooltipModel.yPadding + 'px ' + tooltipModel.xPadding + 'px';
				tooltipEl.style.boxShadow = "0 1px 3px 1px rgba(0,0,0,0.1)";
			}



		}

	}
});
var blueLineH1 = (tradingChartData.dataTrading[0]/chartMax)*($(ctxChart).outerHeight() - 41 );
var blueLineH2 = (tradingChartData.dataTrading[7]/chartMax)*($(ctxChart).outerHeight() - 38.5 );
$("#chart-wrapper-1 .blue-line-1").css({
	height: blueLineH1
});
$("#chart-wrapper-1 .blue-line-2").css({
	height: blueLineH2
});

// chart 2
var ctxChart2 = document.getElementById("myChart1");
var ctx2 = ctxChart2.getContext("2d");
var gradientFill = ctx2.createLinearGradient(0, 100, 0, 400);

gradientFill.addColorStop(0, "rgba(228, 185, 64, 0.5)");
gradientFill.addColorStop(1, "transparent");
var chart2 = new Chart(ctxChart2, {
	type: 'line',
	data: {
		labels: tradingChartData.labelsXMonth,
		datasets: [{
			backgroundColor: gradientFill,
			borderColor: '#e4b940',
			data: tradingChartData.dataTradingMonth,
			fill: true,
			lineTension: 0,
			pointBackgroundColor: '#e4b940',
			pointBorderWidth: 2,
			pointBorderColor: '#ffffff',
			pointRadius: 3.5,
			pointHitRadius: 10
		},{
			backgroundColor: gradientFill,
			borderColor: 'transparent',
			data: tradingChartData.dataPercentsMonth,
			fill: false,
			lineTension: 0,
			pointBackgroundColor: 'transparent',
			pointBorderWidth: 0,
			pointBorderColor: 'transparent',
			pointRadius: 0,
			pointHitRadius: 0
		}],
	},
	options: {
		fill: "#303030",
		legend: false,
		scales: {
			gridLines: {
				drawTicks: false
			},
			yAxes: [{
				gridLines: {
					drawTicks: false,
					color: '#43475A',
					zeroLineColor: '#43475A',
					drawBorder: true,
					borderDash: [1, 2]
				},
				ticks: {
					max: chartMax,
					padding: 10,
					min: 0,
					stepSize: chartStepSize,
					callback: function(value, index, values) {
						if (value == 0) {
							return value;
						} else {
							return value/1000+'K';
						}
					},
					fontFamily: "Helvetica Neue Light",
					fontSize: 12,
					fontColor: '#FFFFFF',
					beginAtZero: true
				}
			}],
			xAxes: [{
				gridLines: {
					drawTicks: false,
					color: '#43475A',
					drawBorder: true,
					zeroLineColor: '#43475A',
					zeroLineWidth : 2
				},
				ticks: {
					padding: 10,
					callback: function(value, index, values) {
						if (value == '0') {
							return '';
						} else {
							return value;
						}
					},
					fontFamily: "Helvetica Neue Light",
					fontSize: 8,
					fontColor: '#99abb4',
					beginAtZero: true
				}
			}],
		},
		tooltips: {
			mode: 'index',
			position: 'nearest',
			enabled: false,
			custom: function(tooltipModel) {
				var tooltipEl = document.getElementById('chartjs-tooltip');
				if (!tooltipEl) {
					tooltipEl = document.createElement('div');
					tooltipEl.id = 'chartjs-tooltip';
					tooltipEl.innerHTML = "<table></table>";
					document.body.appendChild(tooltipEl);
				}
				if (tooltipModel.opacity === 0) {
					tooltipEl.style.opacity = 0;
					return;
				}
				tooltipEl.classList.remove('above', 'below', 'no-transform');
				if (tooltipModel.yAlign) {
					tooltipEl.classList.add(tooltipModel.yAlign);
				} else {
					tooltipEl.classList.add('no-transform');
				}

				function getBody(bodyItem) {
					return bodyItem.lines;
				}

				if (tooltipModel.body) {
					var titleLines = tooltipModel.title || [];
					var bodyLines = tooltipModel.body.map(getBody);
					var innerHtml = '<thead>';

					titleLines.forEach(function(title) {
						switch (title) {
							case "Mon": 
							innerHtml += '<tr><th>Monday</th></tr>';
							break;
							case "Tue": 
							innerHtml += '<tr><th>Tuesday</th></tr>';
							break;
							case "Wed": 
							innerHtml += '<tr><th>Wednesday</th></tr>';
							break;
							case "Thu": 
							innerHtml += '<tr><th>Thursday</th></tr>';
							break;
							case "Fri": 
							innerHtml += '<tr><th>Friday</th></tr>';
							break;
							case "Sat": 
							innerHtml += '<tr><th>Saturday</th></tr>';
							break;
							case "Sun":
							case "0": 
							innerHtml += '<tr><th>Sunday</th></tr>';
							break;
						}
						innerHtml += '<tr><th>'+title+'</th></tr>';
					});
					innerHtml += '</thead><tbody>';

					bodyLines.forEach(function(body, i) {
						if (i == 0) {
							innerHtml += '<tr><td><span class="chart-icon-usd"></span>$ ' + body + '</td></tr>';
						} else {
							innerHtml += '<tr><td><span class="chart-icon-perc"></span>' + body + '%</td></tr>';
						}


					});
					innerHtml += '</tbody>';

					var tableRoot = tooltipEl.querySelector('table');
					tableRoot.innerHTML = innerHtml;
				}

				var position = this._chart.canvas.getBoundingClientRect();
				tooltipEl.style.opacity = 1;
				tooltipEl.style.position = 'fixed';
				tooltipEl.style.left = position.left + tooltipModel.caretX + 'px';
				tooltipEl.style.top = position.top + tooltipModel.caretY + 'px';
				tooltipEl.style.fontFamily = tooltipModel._bodyFontFamily;
				tooltipEl.style.fontSize = tooltipModel.bodyFontSize + 'px';
				tooltipEl.style.fontStyle = tooltipModel._bodyFontStyle;
				tooltipEl.style.padding = tooltipModel.yPadding + 'px ' + tooltipModel.xPadding + 'px';
				tooltipEl.style.boxShadow = "0 1px 3px 1px rgba(0,0,0,0.1)";
			}



		}

	}
});
var blueLine2H1 = (tradingChartData.dataTradingMonth[0]/chartMax)*($(ctxChart2).outerHeight() - 55.5 );

var blueLine2H2 = (tradingChartData.dataTradingMonth[tradingChartData.dataTradingMonth.length-1]/chartMax)*($(ctxChart2).outerHeight() - 55.5 );
$("#chart-wrapper-2 .blue-line-1").css({
	height: blueLine2H1
});
$("#chart-wrapper-2 .blue-line-2").css({
	height: blueLine2H2
});



// trading history if end
}


$("#chart-select").change(function(){

	var curVal = $(this).val();

	if ($(".chart-wrapper-"+curVal).hasClass('closed')) {
		$(".chart-wrapper").addClass('closed');
		$(".chart-wrapper-"+curVal).removeClass("closed");
	}

});


// ADAPTIVE 

if ($(window).width() < 1400) {

	$(".aside").toggleClass('close');
	setTimeout(function(){
		$(".aside").toggleClass('pre-mobile');
	}, 300);
}


if ( $(window).width() < 1250 ) {

	$(".tab-table").each(function(){
		$(this).wrap('<div class="table-wrapper" style="overflow-x: auto; padding-bottom: 3px;" />');
	});

	$(window).resize(function(){

		if ( $(window).width() < 768 ) {
			var cur_w = $(window).width() - 30;
		} else if ( $(window).width() < 1249 ) {
			var cur_w = $(window).width() - 60;
		}

		$(".table-wrapper").css({
			'width': cur_w
		});

	});

	if ( $(window).width() < 768 ) {
		var cur_w = $(window).width() - 30;
	} else if ( $(window).width() < 1025 ) {
		var cur_w = $(window).width() - 60;
	}

	$(".table-wrapper").css({
		'width': cur_w
	});


} 

$(window).resize(function(){
	if ($(window).width() < 1250) {

		if ( Boolean(document.getElementById('trading-history')) ) {

			if ( $(window).width() < 768 ) {
				$(".chart-wrapper").css({'max-width': $(window).width() - 50, 'width' : $(window).width() - 50});
			} else if ( $(window).width() < 1024 ) {
				$(".chart-wrapper").css({'max-width': $(window).width() - 100, 'width' : $(window).width() - 100});
			}

			var blueLineH1 = (tradingChartData.dataTrading[0]/chartMax)*($(ctxChart).outerHeight() - 41 );
			var blueLineH2 = (tradingChartData.dataTrading[7]/chartMax)*($(ctxChart).outerHeight() - 38.5 );
			$("#chart-wrapper-1 .blue-line-1").css({
				height: blueLineH1
			});
			$("#chart-wrapper-1 .blue-line-2").css({
				height: blueLineH2
			});

			var blueLine2H1 = (tradingChartData.dataTradingMonth[0]/chartMax)*($(ctxChart2).outerHeight() - 55.5 );

			var blueLine2H2 = (tradingChartData.dataTradingMonth[tradingChartData.dataTradingMonth.length-1]/chartMax)*($(ctxChart2).outerHeight() - 55.5 );
			$("#chart-wrapper-2 .blue-line-1").css({
				height: blueLine2H1
			});
			$("#chart-wrapper-2 .blue-line-2").css({
				height: blueLine2H2
			});

		}

	}
});

if ($(window).width() > 1250 ) {
	$(".chart-wrapper").each(function(){
		$(this).css({
			'width' : $(this).width()
		})
	});
}


function chartResize() {
	if ($(window).width() > 1250) {
		if (!$(".aside").hasClass('close'))  {

			widthMenuClosed = $("#chart-wrapper-1").width();
			$(".chart-wrapper").css({
				'width' : widthMenuOpened
			});
		} else {
			$(".chart-wrapper").css({
				'width' : widthMenuClosed
			});
		}
	}
}

if ( $(window).width() >= 1140 ) {
	setEqualHeights();
}

$(window).resize(function(){
	if ( $(window).width() >= 1140 ) {
		setEqualHeights();
	}
});

function setEqualHeights() {
	var heightLeft = $(".number-block").outerHeight() + 
	$(".chart").outerHeight() +
	$(".title").outerHeight() +
	parseInt($(".title").css('margin-top')) +
	parseInt($(".title").css('margin-bottom')),
	heightRight = $(".tab-block_stats").outerHeight();

	if ( heightLeft >= heightRight ) {
		$(".tab-block_stats").css({'height' : heightLeft});
	} else {
		var heightDif = Math.floor((heightRight - heightLeft)/40),
		curTabH = $(".tab-block_stats .tab-table").outerHeight();
		$(".tab-block_stats .tab-table").css({
			'height' : curTabH - heightDif*40
		});
		$(".tab-block_stats").css({'height' : heightLeft});
	}
	
}

function addTableRow(table, row) {

	var tableHead = table.find(".tab-table-head");

	var counter = 0;

	for (var key in row) {
		counter++;
	}

	if ( tableHead.find('.tab-table-cell').length != counter ) {
		console.log('Wrong match of table and row'+ 'tableHead.length='+tableHead.find('.tab-table-cell').length+';rowlength='+counter);
		return false;
	}

	var newRow = $(table.find('.tab-table-row:nth-child(2)').get(0)).clone();

	for( var i = 0; i < counter; i++ ) {
		var curCell = newRow.find(".tab-table-cell:nth-child("+(i+1)+")");
		var cellType = tableHead.find(".tab-table-cell:nth-child("+(i+1)+")").text().toLowerCase();
		cellType = cellType.replace(" ", '');
		cellType = cellType.replace(")", '');
		cellType = cellType.replace("(", '');
		switch (cellType) {
			case 'date': 
			var dates = row.date.split(' ');
			curCell.find(".cell-value:nth-child(1)").text(dates[0]);
			curCell.find(".cell-value:nth-child(2)").text(dates[1]);
			break;
			case 'buyprice':
			curCell.text(row.buyprice);
			break;
			case 'sellprice':
			curCell.text(row.sellprice);
			break;
			case 'pureprofit':
			curCell.text(row.pureprofit);
			break;
			case 'fee':
			curCell.text(row.fee);
			break;
			case 'tradingpair':
			curCell.find(".cell-pair-item:nth-child(1) cell-company").text(row.tradingpair.company1);
			curCell.find(".cell-pair-item:nth-child(2) cell-company").text(row.tradingpair.company2);
			curCell.find(".cell-pair-item:nth-child(1) cell-icon").attr('class', 'cell-icon icon-'+row.tradingpair.cur1);
			curCell.find(".cell-pair-item:nth-child(2) cell-icon").attr('class', 'cell-icon icon-'+row.tradingpair.cur2);
			break;
			case 'state': 
			curCell.find(".cell-color").attr('class', 'cell-color '+row.state);
			break;
			case 'transaction':
			curCell.text(row.transaction);
			break;
			case 'coinname': 
			curCell.find(".cell-coin-icon").attr('class', 'cell-coin-icon icon-'+row.coinname.coinIcon);
			curCell.find(".cell-coin-title").text(row.coinname.coinTitle);
			break;
			case 'amountusd':
			curCell.text(row.amountusd);
			break;
			case 'amountcrypto':
			curCell.text(row.amountcrypto);
			break;
			case 'transactionid':
			curCell.find(".cell-link").attr('title', row.transactionid);
			if (row.transactionid.length > 17) {
				var newStr = row.transactionid.slice(0, 17);
				curCell.find(".cell-link").text(newStr+"...");
			} else {
				curCell.find(".cell-link").text(row.transactionid);
			}
			break;
			case 'details':
			curCell.text(row.details);
			break;

		}
	}	

	newRow.addClass('before-show');
	newRowEmpty = $('<div class="tab-table-row tab-table-row-empty"></div>');
	tableHead.after(newRowEmpty);
	tableHead.after(newRow);

	setTimeout(function(){
		table.find('.tab-table-row.before-show').removeClass('before-show');
		$(".tab-table-row-empty").remove();
	}, 300);


}

var dataRow1 = {
	date: '21/11/11 11:39:51',
	tradingpair: {
		cur1: 'eth',
		company1: 'Poloniex',
		cur2: 'eth',
		company2: 'Coinbase'
	},
	buyprice: '8.09080774 (ETH)',
	sellprice: '8.09080774 (ETH)',
	pureprofit: '0.04854754 (2,7%)',
	fee: '0.00006754'
},
dataRow2 = {
	date: '21/11/11 11:39:51',
	state: 'red',
	transaction: 'Profity',
	coinname: {
		coinIcon: 'eth',
		coinTitle: '(ETH) Etherium'
	},
	amountusd: '$0.00',
	amountcrypto: '0.00000000',
	transactionid: 'q4wwe2rfr45r332der332rf3h5g3w42',
	details: 'Profit from trade #25582'
};



	 // setInterval(function() {
 	// 	addTableRow( $("#stats"), dataRow1 );
 	// 	addTableRow( $("#transactions"), dataRow2 );

 	// }, 3000);


 	if (document.getElementById('chart-week')) {



 		var barChartData = {
 			labelsX : ['01.10.19', '02.10.19', '03.10.19', '04.10.19', '05.10.19', '06.10.19', '07.10.19'],
 			dataPopups : [1332, 1410, 1435, 2232, 3220, 1230, 3265],
 			dataWithdrawals : [1232, 1120, 1735, 1232, 2220, 1130, 2165],
 			labelsXMonth : ['01.10.19', '02.10.19', '03.10.19', '04.10.19', '05.10.19', '06.10.19', '07.10.19', '08.10.19', '09.10.19', '10.10.19', '11.10.19', '12.10.19', '13.10.19', '14.10.19', '15.10.19', '16.10.19', '17.10.19', '18.10.19', '19.10.19', '20.10.19', '21.10.19', '22.10.19', '23.10.19', '24.10.19', '25.10.19', '26.10.19', '27.10.19', '28.10.19', '29.10.19', '30.10.19'],
 			dataPopupsMonth : [2220, 332, 410, 435, 2232, 3220, 1230, 3265, 2220, 332, 410, 435, 2232, 3220, 1230, 3265, 2220, 332, 410, 435, 2232, 3220, 1230, 3265, 2220, 332, 410, 435, 2232, 3220],
 			dataWithdrawalsMonth : [2220, 332, 410, 435, 2232, 3220, 1230, 3265, 2220, 332, 410, 435, 2232, 3220, 1230, 3265, 2220, 332, 410, 435, 2232, 3220, 1230, 3265, 2220, 332, 410, 435, 2232, 3220]
 		}

 		var chartMax = 0;

 		for (var i = 0; i < barChartData.dataPopups.length; i++) {
			// Line Chart
			if ( barChartData.dataPopups[i] > chartMax ) {
				chartMax = barChartData.dataPopups[i];
			}
			
		}
		for (var i = 0; i < barChartData.dataWithdrawals.length; i++) {
			// Line Chart
			if ( barChartData.dataWithdrawals[i] > chartMax ) {
				chartMax = barChartData.dataWithdrawals[i];
			}
			
		}
		var chartStepSize = Math.pow(10, (chartMax.toString().length-1));
		chartMax = ( Math.floor( chartMax/Math.pow(10, (chartMax.toString().length-1) ) ) + 1 )*Math.pow(10, (chartMax.toString().length-1) );


		var ctxChart = document.getElementById("chart-week");
		Chart.elements.Rectangle.prototype.draw = function() {
			var ctx = this._chart.ctx;
			var vm = this._view;
			var left, right, top, bottom, signX, signY, borderSkipped, radius;
			var borderWidth = vm.borderWidth;
		    // Set Radius Here
		    // If radius is large enough to cause drawing errors a max radius is imposed
		    var cornerRadius = 50;

		    if (!vm.horizontal) {
		        // bar
		        left = vm.x - vm.width / 2;
		        right = vm.x + vm.width / 2;
		        top = vm.y;
		        bottom = vm.base;
		        signX = 1;
		        signY = bottom > top? 1: -1;
		        borderSkipped = vm.borderSkipped || 'bottom';
		    } else {
		        // horizontal bar
		        left = vm.base;
		        right = vm.x;
		        top = vm.y - vm.height / 2;
		        bottom = vm.y + vm.height / 2;
		        signX = right > left? 1: -1;
		        signY = 1;
		        borderSkipped = vm.borderSkipped || 'left';
		    }

		    // Canvas doesn't allow us to stroke inside the width so we can
		    // adjust the sizes to fit if we're setting a stroke on the line
		    if (borderWidth) {
		        // borderWidth shold be less than bar width and bar height.
		        var barSize = Math.min(Math.abs(left - right), Math.abs(top - bottom));
		        borderWidth = borderWidth > barSize? barSize: borderWidth;
		        var halfStroke = borderWidth / 2;
		        // Adjust borderWidth when bar top position is near vm.base(zero).
		        var borderLeft = left + (borderSkipped !== 'left'? halfStroke * signX: 0);
		        var borderRight = right + (borderSkipped !== 'right'? -halfStroke * signX: 0);
		        var borderTop = top + (borderSkipped !== 'top'? halfStroke * signY: 0);
		        var borderBottom = bottom + (borderSkipped !== 'bottom'? -halfStroke * signY: 0);
		        // not become a vertical line?
		        if (borderLeft !== borderRight) {
		        	top = borderTop;
		        	bottom = borderBottom;
		        }
		        // not become a horizontal line?
		        if (borderTop !== borderBottom) {
		        	left = borderLeft;
		        	right = borderRight;
		        }
		    }

		    ctx.beginPath();
		    ctx.fillStyle = vm.backgroundColor;
		    ctx.strokeStyle = vm.borderColor;
		    ctx.lineWidth = borderWidth;

		    // Corner points, from bottom-left to bottom-right clockwise
		    // | 1 2 |
		    // | 0 3 |
		    var corners = [
		    [left, bottom],
		    [left, top],
		    [right, top],
		    [right, bottom]
		    ];

		    // Find first (starting) corner with fallback to 'bottom'
		    var borders = ['bottom', 'left', 'top', 'right'];
		    var startCorner = borders.indexOf(borderSkipped, 0);
		    if (startCorner === -1) {
		    	startCorner = 0;
		    }
		    function cornerAt(index) {
		    	return corners[(startCorner + index) % 4];
		    }

		    // Draw rectangle from 'startCorner'
		    var corner = cornerAt(0);
		    ctx.moveTo(corner[0], corner[1]);

		    for (var i = 1; i < 4; i++) {
		    	corner = cornerAt(i);
		    	nextCornerId = i+1;
		    	if(nextCornerId == 4){
		    		nextCornerId = 0
		    	}

		    	nextCorner = cornerAt(nextCornerId);

		    	width = corners[2][0] - corners[1][0];
		    	height = corners[0][1] - corners[1][1];
		    	x = corners[1][0];
		    	y = corners[1][1];

		    	var radius = cornerRadius;

		        // Fix radius being too large
		        if(radius > height/2){
		        	radius = height/2;
		        }if(radius > width/2){
		        	radius = width/2;
		        }

		        var rounded = true;
		        // if (!this._chart.getDatasetMeta(0).hidden && !this._chart.getDatasetMeta(1).hidden && !this._chart.getDatasetMeta(2).hidden) {
		        // 	rounded = this._datasetIndex === 2;
		        // }
		        if (rounded) {
		        	ctx.moveTo(x + radius, y);
		        	ctx.lineTo(x + width - radius, y);
		        	ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
		        	ctx.lineTo(x + width, y + height);
		        	ctx.lineTo(x, y + height);
		        	ctx.lineTo(x, y + radius);
		        	ctx.quadraticCurveTo(x, y, x + radius, y);
		        } else {
		        	ctx.moveTo(x, y);
		        	ctx.lineTo(x + width, y);
		        	ctx.lineTo(x + width, y + height );
		        	ctx.lineTo(x , y + height);
		        	ctx.lineTo(x, y );
		        }

		    }

		    ctx.fill();
		    if (borderWidth) {
		    	ctx.stroke();
		    }
		}; 
		var chart1 = new Chart(ctxChart, {
			type: 'bar',
			data: {
				labels: barChartData.labelsX,
				datasets: [{
					backgroundColor: '#41bf50',
					borderWidth: 0,
					data: barChartData.dataPopups
				},{
					
					data: barChartData.dataWithdrawals,
					backgroundColor: '#f25b5b',
					borderWidth: 0
				}],
			},
			options: {
				maintainAspectRatio: false,
				fill: "#303030",
				legend: false,
				elements:{ point: {
					radius: 5,
					hoverRadius: 12,
					pointStyle: 'rectRounded'
				}},
				scales: {
					yAxes: [{
						gridLines: {
							drawTicks: false,
							color: '#43475A',
							zeroLineColor: '#43475A',
							drawBorder: true,
							borderDash: [1, 2],
							zeroLineWidth: 0
						},
						ticks: {
							max: chartMax,
							padding: 10,
							min: 1,
							stepSize: chartStepSize,
							callback: function(value, index, values) {
								if (value == 0 || value == 1) {
									return 0;
								} else {
									return Math.floor(value/1000)+'K';
								}
							},
							fontFamily: "Helvetica Neue Light",
							fontSize: 12,
							fontColor: '#FFFFFF',
							beginAtZero: true
						}
					}],
					xAxes: [{
						barThickness: 'flex',
						barPercentage: 1.0,
						categoryPercentage: 0.2,
						maxBarThickness: 10,
						gridLines: {
							drawTicks: false,
							offsetGridLines: false,
							color: '#43475A',
							drawBorder: false,
							zeroLineColor: 'transparent',
							zeroLineWidth: 0
						},
						ticks: {
							minRotation: 60,
							padding: 4,
							callback: function(value, index, values) {
								if (value == '0') {
									return '';
								} else {
									return value;
								}
							},
							fontFamily: "Helvetica Neue",
							fontSize: 12,
							fontColor: '#99abb4',
							beginAtZero: true
						}
					}],
				},
				tooltips: {
					mode: 'index',
					position: 'nearest',
					enabled: false,
					custom: function(tooltipModel) {
						var tooltipEl = document.getElementById('chartjs-tooltip');
						if (!tooltipEl) {
							tooltipEl = document.createElement('div');
							tooltipEl.id = 'chartjs-tooltip';
							tooltipEl.innerHTML = "<table></table>";
							document.body.appendChild(tooltipEl);
						}
						if (tooltipModel.opacity === 0) {
							tooltipEl.style.opacity = 0;
							return;
						}
						tooltipEl.classList.remove('above', 'below', 'no-transform');
						if (tooltipModel.yAlign) {
							tooltipEl.classList.add(tooltipModel.yAlign);
						} else {
							tooltipEl.classList.add('no-transform');
						}

						function getBody(bodyItem) {
							return bodyItem.lines;
						}

						if (tooltipModel.body) {
							var titleLines = tooltipModel.title || [];
							var bodyLines = tooltipModel.body.map(getBody);
							var innerHtml = '<thead>';

							titleLines.forEach(function(title) {
								innerHtml += '<tr><th>'+title+'</th></tr>';
							});
							innerHtml += '</thead><tbody>';

							bodyLines.forEach(function(body, i) {
								if (i == 0) {
									innerHtml += '<tr><td><span class="chart-icon-usd"></span>$ ' + body + '</td></tr>';
								} else {
									innerHtml += '<tr><td><span class="chart-icon-usd"></span>$ ' + body + '</td></tr>';

								}


							});
							innerHtml += '</tbody>';

							var tableRoot = tooltipEl.querySelector('table');
							tableRoot.innerHTML = innerHtml;
						}

						var position = this._chart.canvas.getBoundingClientRect();
						tooltipEl.style.opacity = 1;
						tooltipEl.style.position = 'fixed';
						tooltipEl.style.left = position.left + tooltipModel.caretX + 'px';
						tooltipEl.style.top = position.top + tooltipModel.caretY + 'px';
						tooltipEl.style.fontFamily = tooltipModel._bodyFontFamily;
						tooltipEl.style.fontSize = tooltipModel.bodyFontSize + 'px';
						tooltipEl.style.fontStyle = tooltipModel._bodyFontStyle;
						tooltipEl.style.padding = tooltipModel.yPadding + 'px ' + tooltipModel.xPadding + 'px';
						tooltipEl.style.boxShadow = "0 1px 3px 1px rgba(0,0,0,0.1)";
					}



				}

			}
		});

var ctxChart2 = document.getElementById("chart-month");
var chart2 = new Chart(ctxChart2, {
	type: 'bar',
	data: {
		labels: barChartData.labelsXMonth,
		datasets: [{
			backgroundColor: '#41bf50',
			borderWidth: 0,
			data: barChartData.dataPopupsMonth
		},{

			data: barChartData.dataWithdrawalsMonth,
			backgroundColor: '#f25b5b',
			borderWidth: 0
		}],
	},
	options: {
		maintainAspectRatio: false,
		fill: "#303030",
		legend: false,
		elements:{ point: {
			radius: 5,
			hoverRadius: 12,
			pointStyle: 'rectRounded',
		}},
		scales: {
			yAxes: [{
				gridLines: {
					drawTicks: false,
					color: '#43475A',
					zeroLineColor: '#43475A',
					drawBorder: true,
					borderDash: [1, 2],
					zeroLineWidth: 0
				},
				ticks: {
					max: chartMax,
					padding: 10,
					min: 1,
					stepSize: chartStepSize,
					callback: function(value, index, values) {
						if (value == 0 || value == 1) {
							return 0;
						} else {
							return Math.floor(value/1000)+'K';
						}
					},
					fontFamily: "Helvetica Neue Light",
					fontSize: 12,
					fontColor: '#FFFFFF',
					beginAtZero: true
				}
			}],
			xAxes: [{
				barThickness: 'flex',
				barPercentage: 1.0,
				categoryPercentage: 0.75,
				maxBarThickness: 10,
				gridLines: {
					drawTicks: false,
					offsetGridLines: false,
					color: '#43475A',
					drawBorder: false,
					zeroLineColor: 'transparent',
					zeroLineWidth: 0
				},
				ticks: {
					minRotation: 60,
					padding: 4,
					callback: function(value, index, values) {
						if (value == '0') {
							return '';
						} else {
							return value;
						}
					},
					fontFamily: "Helvetica Neue",
					fontSize: 12,
					fontColor: '#99abb4',
					beginAtZero: true
				}
			}],
		},
		tooltips: {
			mode: 'index',
			position: 'nearest',
			enabled: false,
			custom: function(tooltipModel) {
				var tooltipEl = document.getElementById('chartjs-tooltip');
				if (!tooltipEl) {
					tooltipEl = document.createElement('div');
					tooltipEl.id = 'chartjs-tooltip';
					tooltipEl.innerHTML = "<table></table>";
					document.body.appendChild(tooltipEl);
				}
				if (tooltipModel.opacity === 0) {
					tooltipEl.style.opacity = 0;
					return;
				}
				tooltipEl.classList.remove('above', 'below', 'no-transform');
				if (tooltipModel.yAlign) {
					tooltipEl.classList.add(tooltipModel.yAlign);
				} else {
					tooltipEl.classList.add('no-transform');
				}

				function getBody(bodyItem) {
					return bodyItem.lines;
				}

				if (tooltipModel.body) {
					var titleLines = tooltipModel.title || [];
					var bodyLines = tooltipModel.body.map(getBody);
					var innerHtml = '<thead>';

					titleLines.forEach(function(title) {
						innerHtml += '<tr><th>'+title+'</th></tr>';
					});
					innerHtml += '</thead><tbody>';

					bodyLines.forEach(function(body, i) {
						if (i == 0) {
							innerHtml += '<tr><td><span class="chart-icon-usd"></span>$ ' + body + '</td></tr>';
						} else {
							innerHtml += '<tr><td><span class="chart-icon-usd"></span>$ ' + body + '</td></tr>';

						}


					});
					innerHtml += '</tbody>';

					var tableRoot = tooltipEl.querySelector('table');
					tableRoot.innerHTML = innerHtml;
				}

				var position = this._chart.canvas.getBoundingClientRect();
				tooltipEl.style.opacity = 1;
				tooltipEl.style.position = 'fixed';
				tooltipEl.style.left = position.left + tooltipModel.caretX + 'px';
				tooltipEl.style.top = position.top + tooltipModel.caretY + 'px';
				tooltipEl.style.fontFamily = tooltipModel._bodyFontFamily;
				tooltipEl.style.fontSize = tooltipModel.bodyFontSize + 'px';
				tooltipEl.style.fontStyle = tooltipModel._bodyFontStyle;
				tooltipEl.style.padding = tooltipModel.yPadding + 'px ' + tooltipModel.xPadding + 'px';
				tooltipEl.style.boxShadow = "0 1px 3px 1px rgba(0,0,0,0.1)";
			}



		}

	}
});






}


$(".popup-info-item-select .popup-info-title").click(function(){
	$(this).siblings(".popup-info-select").toggleClass('open');
});

initPopups();




$(".popup-input-copy-btn").click(function(e){
	e.preventDefault();
	var available = $(this).siblings(".popup-input-after_copy").text();

	available = available.slice(available.indexOf(":") + 1);
	//if ( Number(available) != NaN ) {
		$(this).siblings("input").val(+available);
	//}
})

$(".popup-input-wrapper").click(function(e){
	if ( $(e.target).attr('class').indexOf('popup-input-copy-btn') == -1 ) {
		$(this).find('input').focus();
	}
	
});


$(".popup-input").each(function(){
	if ( Boolean($(this).siblings(".popup-input-after")[0]) ) {
		watchLength($(this), 'popup-');
	}
});
$(".popup-input").focus(function(){
	$(this).parents(".popup-input-wrapper").addClass('focus');
});
$(".popup-input").blur(function(){
	$(this).parents(".popup-input-wrapper").removeClass('focus');
});




function initPopups(){
	if ( $(".air-popup")[0] ) {


		$(".open-popup").click(function(e){
			e.preventDefault();
			var curPopup = $(this).data('air-popup');
			$("#"+curPopup).toggleClass('air-popup-hide');
		});

		$(".air-popup-close").click(function(e){
			e.preventDefault();
			$(this).parents(".air-popup").toggleClass('air-popup-hide');

		});

		$(document).on('click.air-popup-wrapper', function(e){
			if ( $(e.target).attr('class').indexOf('air-popup-wrapper') != -1 ) {
				$(e.target).parents(".air-popup").toggleClass('air-popup-hide');
			}
		})

	}

}


dataPopupWithdrawal = {
	btc: {
		info: ['00.00000000', '$6,880.95', '00.00000000', '00.00000000'],
		important: [
		'Coins will be deposited immediately after 4 network confirmations',
		'BTC will be processed using CoinsWallet.com which also accept PerfectMoney, Payeer and Advanced Cash',

		],
		fee: '',
		profit: '0.000000'
	},
	bth: {
		info: ['10.00000000', '$6,8180.95', '10.00000000', '10.00000000'],
		important: [
		'Minimum withdrawal: 0.000001 BTH'
		],
		fee: '0.000000',
		profit: '0.000000'
	},
	ltc: {
		info: ['0.00000000', '$2,880.95', '0.00000000', '00.00000000'],
		important: [
		'Minimum withdrawal: 0.000001 LTC'
		],
		fee: '0.320000',
		profit: '0.000000'
	},
	dash: {
		info: ['2.00000321', '$3,880.95', '0.00000000', '0.00000000'],
		important: [
		'Minimum withdrawal: 0.000001 DASH'
		],
		fee: '0.000000',
		profit: '0.000000'
	},
	xpr: {
		info: ['2.00000321', '$2,880.95', '2.00000321', '2.00000321'],
		important: [
		'Minimum withdrawal: 0.000001 XPR'
		],
		fee: '0.000000',
		profit: '0.000000'
	},
	eth: {
		info: ['00.00000000', '$1,880.95', '00.00000000', '00.00000000'],
		important: [
		'Minimum withdrawal: 0.000001 ETH',
		'Minimum withdrawal: 0.000001 ETH',
		'Minimum withdrawal: 0.000001 ETH'
		],
		fee: '0.000001',
		profit: '0.000002'
	}
}

$(".popup-info-select").change(function(){
	var el = $(this);
	var popup = el.parents('.popup');
	var	curVal = el.val();
	el.siblings(".nice-select").find(".current").attr('class', 'current icon-'+curVal);
	//var curText = el.find('.list li[data-value="'+curVal+'"]');
	var curText = el.siblings(".nice-select").find('.list li[data-value="'+curVal+'"]').text();
	// curText = curText.slice(0, curText.indexOf('(') - 1);
	// curText += ' (USD) Price';

	// el.parents(".popup-info-item").siblings('.popup-info-item').each(function(index){
	// 	if ( index != 0 ) {
	// 		$(this).find('.popup-info-value').text(dataPopupWithdrawal[curVal].info[+(index - 1)]);
	// 	} 
	// 	if ( index == 1 ) {
	// 		$(this).find(".popup-info-title").text(curText);
	// 	}
	// });

	
	// var extra = '';
	// for(var i = 0; i < dataPopupWithdrawal[curVal].important.length; i++) {
	// 	extra += '<div class="popup-extra-item">'+dataPopupWithdrawal[curVal].important[i]+'</div>';
	// }

	// popup.find('.popup-extra-list').html(extra);

	// if ( curVal != 'btc' ) {
	// 	$(".popup-extra-bottom").fadeOut(250);
	// } else {
	// 	$(".popup-extra-bottom").fadeIn(250);
	// }

	// popup.find('.popup-input-before').text(curVal.toUpperCase());
	// popup.find('.popup-summary-currency').text(curVal.toUpperCase());

	// popup.find(".popup-input-after_copy").text('Available: '+dataPopupWithdrawal[curVal].info[2]);
	
});

$(".search-input-main").click(function(){
	if ( $(this).hasClass('open') ) {
		var el = $(this);
		var	dropDown = el.siblings('.search-input-content');
		el.toggleClass('open');
		dropDown.toggleClass('open');
	} else {
		$(".search-input-main.open, .search-input-content.open").removeClass('open');
		var el = $(this);
		var	dropDown = el.siblings('.search-input-content');
		el.toggleClass('open');
		dropDown.toggleClass('open');
	}
	
});

$(".search-input-item").click(function(){



	var main = $(this).parents(".search-input-wrapper").find(".search-input-main");
	var dropDown = $(this).parents(".search-input-content");

	if ($(this).hasClass('selected')) {
		main.toggleClass('open');
		dropDown.toggleClass('open');
	} else {
		$(this).siblings(".selected").removeClass('selected');
		$(this).addClass('selected');
		var curVal = $.trim($(this).find(".search-input-item-value").text());
		var curImg = $(this).find(".search-input-image");
		var imgSrc = 'no change';
		var type = 'no type';

		if ( $(this).parents("#offer-tab-2.default")[0] ) {

			$(this).parents('.search-input-block').removeClass('d');

			if ( main.find('.search-input-image-default')[0] ) {
				console.log('2');
				main.find('.search-input-image-default').hide();
			}

			if ( $(this).parents("#offer-tab-2").find('.search-input-block.d')[0] ) {
				console.log('3');
				main.toggleClass('open');
				dropDown.toggleClass('open');
				if (curImg.find(".search-input-currency")[0]) {
					var curValShort = curImg.find(".search-input-currency").text();
					main.find(".search-input-currency").text(curValShort);

					imgSrc = curImg.find(".search-input-icon").attr('src');
					type = main.find('input').attr('id');
					main.find(".search-input-icon").attr('src', imgSrc);
					if ( type == 'currency-buy' ) {
						console.log('curb');
						$("#buyCurHead").attr('src', imgSrc);
					} else {
						$("#sellCurHead").attr('src', imgSrc);
					}
				} else {
					var curLogo = curImg.find('.search-input-logo').attr('src');
					main.find(".search-input-logo").attr('src', curLogo);
					if ( main.find('#company-buy')[0] ) {
						$('#buyCompanyHead').text(curVal);
					} else {
						$('#sellCompanyHead').text(curVal);
					}
				}
				main.find(".search-input").val(curVal);
				main.find(".search-input").attr('value', curVal);



				return false;
			} else {
				console.log('4');
				$(this).parents("#offer-tab-2.default").removeClass('default');
			}
		}

		if (curImg.find(".search-input-currency")[0]) {
			var curValShort = curImg.find(".search-input-currency").text();
			main.find(".search-input-currency").text(curValShort);

			imgSrc = curImg.find(".search-input-icon").attr('src');
			type = main.find('input').attr('id');
			main.find(".search-input-icon").attr('src', imgSrc);
		} else if (curImg.find(".search-input-slash")[0]) {
			var img1 = curImg.find(".search-input-slash").next(".search-input-icon").attr('src');
			var img2 = curImg.find(".search-input-slash").prev(".search-input-icon").attr('src');

			main.find(".search-input-slash").next(".search-input-icon").attr('src', img1);
			main.find(".search-input-slash").prev(".search-input-icon").attr('src', img2);

			var curVal2 = curImg.data('hidden');
			main.find(".search-input-double-hidden").val(curVal2);

		} else if ( main.hasClass('search-input-main_simple') ) {
			var sImg = curImg.find(".search-input-icon").attr('src');
			main.find(".search-input-icon").attr('src', sImg);

			if ( main.hasClass('search-input-main_popup') ) {
				main.find('.search-input').text(curVal);
			}

		} else {
			var curLogo = curImg.find('.search-input-logo').attr('src');
			main.find(".search-input-logo").attr('src', curLogo);
		}

		main.find(".search-input").val(curVal);
		main.find(".search-input").attr('value', curVal);



		var element = main.find(".search-input")[0];
		var event = new Event('change');
		element.dispatchEvent(event);
		
		if ( !Boolean($(this).parents(".search-input-wrapper_small")[0]) ) {
			
			getOfferByAjax(imgSrc, type);
		}
		
		main.toggleClass('open');
		dropDown.toggleClass('open');
		if (   Boolean($(this).parents(".search-input-wrapper.search-input-wrapper_small.double-select")[0])) {
			$($(".home-tab-step.disabled")[0]).prev(".home-tab-step").trigger('click');
		}
		
	}
});

$(document).on('click', 'body', function(e){

	if ( !$(e.target).parents(".search-input-wrapper")[0] ) {
		$(".search-input-main.open, .search-input-content.open").toggleClass('open');
	}

});

$(".search-input-field").keyup(function(){
	var curVal = $.trim($(this).val().toLowerCase());

	if (curVal != "") {
		$(this).parents(".search-input-content").find(".search-input-item").each(function(){
			console.log($(this).find(".search-input-item-value").text().toLowerCase());
			if ( 
				$.trim($(this).find(".search-input-item-value").text().toLowerCase()).indexOf(curVal) != -1 || 
				$.trim($(this).find(".search-input-currency").text().toLowerCase()).indexOf(curVal) != -1
				) {
				$(this).removeClass('hidden');
		} else {
			if ( !$(this).hasClass('hidden') ) {
				$(this).addClass('hidden');
			}
		}
	})
	} else {
		$(this).parents(".search-input-content").find(".search-input-item").removeClass('hidden');
	}


});

$(".search-input-field").change(function(){
	var curVal = $.trim($(this).val().toLowerCase());

	if (curVal != "") {
		$(this).parents(".search-input-content").find(".search-input-item").each(function(){
			console.log($(this).find(".search-input-item-value").text().toLowerCase());
			if ( 
				$.trim($(this).find(".search-input-item-value").text().toLowerCase()).indexOf(curVal) != -1 || 
				$.trim($(this).find(".search-input-currency").text().toLowerCase()).indexOf(curVal) != -1
				) {
				$(this).removeClass('hidden');
		} else {
			if ( !$(this).hasClass('hidden') ) {
				$(this).addClass('hidden');
			}
		}
	})
	} else {
		$(this).parents(".search-input-content").find(".search-input-item").removeClass('hidden');
	}


});

var resultSwitcher = 0;

function getOfferByAjax(imgSrc, type){
	var currencyBuy = $("#currency-buy").val(),
	currencySell = $("#currency-sell").val(),
	companyBuy = $("#company-buy").val(),
	companySell = $("#company-sell").val();


	// HERE SHOULD BE SOME AJAX QUERY 
	// ...
	// MINIMIMAL RESULT REQUIRED (3 EXAMPLES):

	var result1 = {
		buyprice: 1232.32,
		sellprice: 1312.12,
		proccesing: "3 min",
		fee: 51.05,
		volume: "$ 23165.00"
	},
	result2 = {
		buyprice: 2232.32,
		sellprice: 5312.12,
		proccesing: "120 min",
		fee: 11.05,
		volume: "$ 321321.00"
	},
	result3 = {
		buyprice: 1532.32,
		sellprice: 2012.12,
		proccesing: "30 min",
		fee: 5.05,
		volume: "$ 2316.00"
	}

	var result = {};

	// JUST TO SHOW DIFFERENT RESULTS

	resultSwitcher++;

	switch (resultSwitcher%3) {
		case 0:
		result = result1;
		break;
		case 1: 
		result = result2;
		break;
		case 2: 
		result = result3;
		break;
	}

	var diff = Math.ceil((result.sellprice/(result.buyprice/100) - 100)*100)/100;
	var profit = (Math.ceil( diff*100 - diff*100*(result.fee/100) ))/100;


	// SET NEW HEADING


	if ( imgSrc != 'no change' ) {

		if ( type == 'currency-sell' ) {

			$("#searchPair").animate({
				'opacity' : 0
			}, 250, function(){
				$("#sellCurHead").attr('src', imgSrc); 
				$("#searchPair").animate({
					'opacity' : 1
				}, 250);
			});

		} else {

			$("#searchPair").animate({
				'opacity' : 0
			}, 250, function(){
				$("#buyCurHead").attr('src', imgSrc); 
				$("#searchPair").animate({
					'opacity' : 1
				}, 250);
			});

		}

		
	} else {

		$("#searchPair").animate({
			'opacity' : 0
		}, 250, function(){
			$("#buyCompanyHead").text(companyBuy);
			$("#sellCompanyHead").text(companySell);
			$("#searchPair").animate({
				'opacity' : 1
			}, 250);
		});

	}

	


	// SET TOP LIST VALUES
	$("#offer-tab-2 .home-tab-list_search .home-tab-list-item-value").animate({
		'opacity' : 0
	}, 250, function(){
		console.log()
		$("#curDiff1").text(diff+"%");
		$("#curVolume1").text(result.volume);
		$("#curProfit1").text(profit+"%");
		$("#curFee1").text(result.fee+"%");
		$("#cuProc1").text(result.proccesing);

		$("#offer-tab-2 .home-tab-list_search .home-tab-list-item-value").animate({
			'opacity' : 1
		}, 250);
	});

	// SET SELL/BUY PRICES 
	$("#curBuyPrice1").animate({
		'opacity' : 0
	}, 250, function(){

		$("#curBuyPrice1").text(result.buyprice+"$");

		$("#curBuyPrice1").animate({
			'opacity' : 1
		}, 250);
	});
	$("#curSellPrice1").animate({
		'opacity' : 0
	}, 250, function(){

		$("#curSellPrice1").text(result.sellprice+"$");

		$("#curSellPrice1").animate({
			'opacity' : 1
		}, 250);
	});

	// RECALC IF FIELD IS NOT EMPTY
	setTimeout(function(){
		calcResult($("#trade-amount1"));
	}, 300);
	
}


if ( document.getElementById('home') ) {


	// NEW 23.07

	$("#trade1").submit(function(e){
		e.preventDefault();
		$(this).parents(".air-popup").toggleClass('air-popup-hide');
		setTimeout(function(){
			$("#popup-s").toggleClass('air-popup-hide');
		}, 250);
	});

	$(".home-tab-balance-copy").click(function(){

		$(".home-tab-balance-block").removeClass('error');
		$(".home-tab-balance-block").removeClass('success');
		var block = $(this).parents('.home-tab-balance-block');

		if ( !block.hasClass('unavailable') ) {
			var checkout = $(this).parents('.home-tab-container').find('.home-tab-chekout-form');
			var curVal = block.find('.home-tab-balance-usd').text();
			curVal = +(curVal.substr(2, curVal.length));
			checkout.find('.simple-input').val(curVal);
			curCur = block.find('.home-tab-balance-icon').attr('src');
			checkout.find(".search-input-wrapper .search-input-icon[src='"+curCur+"']").parents(".search-input-item").trigger('click');
			block.addClass('success');

		} else {
			block.addClass('error');
		}

	});	

	// 


	// TRADING SELECT


	$("#trade-amount").keyup(function(){
		var curVal = $(this).val();
		var available = +($(this).data('available'));
		console.log(curVal);
		if ( (curVal != '') && (curVal <= available)) {

			$(this).parents(".simple-input-wrapper").removeClass('error').addClass('success');


		} else if ( curVal != '' ) {
			$(this).parents(".simple-input-wrapper").removeClass('success').addClass('error');

		} else {
			$(this).parents(".simple-input-wrapper").removeClass('error');
		}
	})

	

	// $(".trading-select .list li").each(function(index){
	// 	console.log(index);
	// 	if ( index > 0 ) {

	// 		var curVal = $(this).data('value');
	// 		curVal = curVal.split("|");
	// 		$(this).addClass("before-"+curVal[0]);
	// 		$(this).addClass("after-"+curVal[1]);

	// 	} else {
	// 		$(this).remove();
	// 	}
	// });
	
	$("#trading-select").change(function(){

		$(this).parents(".home-tab_pre").removeClass('home-tab_pre');


		


		var curVal = $(this).val();
		var curVal2 = $(this).siblings(".search-input-double-hidden").val();
		
		curVal = curVal.split(" / ");
		curVal2 = curVal2.split(" / ");
		// $(".trading-select .current").attr('class',"current before-"+curVal[0]+" after-"+curVal[1]);

		// AJAX QUERY HERE 

		// EXAMPLE DATA

		dataTr = [

		{
			tableData : [
			'$51.21',
			'$53.32',
			'3.32%',
			'1.23%',
			'1.22%',
			'43 min'
			],
			curTimeRest: '12:02:42',
			progress: '70%'
		},
		{
			tableData : [
			'$21.21',
			'$23.32',
			'32.32%',
			'21.23%',
			'11.22%',
			'4 min'
			],
			curTimeRest: '03:02:42',
			progress: '10%'
		},
		{
			tableData : [
			'$231.21',
			'$243.32',
			'23.32%',
			'12.23%',
			'1.22%',
			'12 min'
			],
			curTimeRest: '04:02:42',
			progress: '30%'
		},
		{
			tableData : [
			'$32.21',
			'$55.32',
			'20.32%',
			'10.23%',
			'10.02%',
			'8 min'
			],
			curTimeRest: '02:02:42',
			progress: '90%'
		}	
		];

		var curValC = $(this).val();
		var curValC2 = $(this).siblings(".search-input-double-hidden").val();

		console.log(curValC + ' ' + curValC2)

		var i = 0;
		var table = $(this).parents(".home-tab-head").siblings('.home-tab-wrapper2').find(".home-tab-content");

		if ( curValC == 'BitMEX / Poloniex' &&  curValC2 == 'BTC / BTH' ) {
			i = 0;
		} else if ( curValC == 'EXMO / Coinbase' &&  curValC2 == 'LTC / XPR' ) {
			i = 1;
		}
		else if ( curValC == 'EXMO / Coinbase' &&  curValC2 == 'BTH / ETH' ) {
			i = 2;
		}
		else if ( curValC == 'EXMO / Huobi' &&  curValC2 == 'DASH / ETH' ) {
			i = 3;
		}

		table.find('.home-tab-list-item').each(function(index){
			var el = $(this);
			el.find('.home-tab-list-item-value').animate({
				'opacity' : '0'
			}, 250, function(){
				el.find('.home-tab-list-item-value').text(dataTr[i].tableData[index]);
				el.find('.home-tab-list-item-value').animate({
					'opacity' : '1'
				}, 250)
			});


		});


		var range = $(this).parents(".home-tab-head").siblings('.home-tab-wrapper2').find('.home-tab-range');

		range.find('.home-tab-range-amount').animate({
			'opacity' : '0'
		}, 250, function(){
			range.find('.home-tab-range-amount').text(dataTr[i].progress);
			range.find('.home-tab-range-amount').animate({
				'opacity' : '1'
			}, 250)
		});

		range.find('.home-tab-range-timer').animate({
			'opacity' : '0'
		}, 250, function(){
			//range.find('.home-tab-range-timer').text(dataTr[i].curTimeRest);
			var curTime = dataTr[i].curTimeRest;
			curTime = curTime.split(":");
			countTime(+(curTime[0]), +(curTime[1]), +(curTime[2]), 'up', range.find('.home-tab-range-timer'));
			setTimeout(function(){
				range.find('.home-tab-range-timer').animate({
					'opacity' : '1'
				}, 250);
			}, 850);

			
		});
		
		$(".home-tab-range-scale-completed").animate({
			'width' : dataTr[i].progress
		}, 750);

		


	});

	// var startVal = $("#trading-select").val();
	// startVal = startVal.split("|");
	$(".trading-select .current").attr('class',"current after-default before-default");


	// TRADING SELECT END

	var d1Green  = document.getElementById("diagram-home-1-green"),
	d1Red    = document.getElementById("diagram-home-1-red"),
	d1Yellow = document.getElementById("diagram-home-1-yellow"),
	d2Red = document.getElementById("diagram-home-2-red"),
	d2Green = document.getElementById("diagram-home-2-green");

	d1Green.setAttribute("d", describeArc(68, 68, 58, 330, 390));
	d1Red.setAttribute("d", describeArc(68, 68, 58, 30, 170));
	d1Yellow.setAttribute("d", describeArc(68, 68, 58, 170, 330));
	d2Green.setAttribute("d", describeArc(68, 68, 58, 0, 150));
	d2Red.setAttribute("d", describeArc(68, 68, 58, 150, 360));

	Moveit.put(d1Green, {
		start: '100%',
		end: '100%'
	});
	Moveit.animate(d1Green, {
		start: '0%',
		end: '100%',
		duration: 1,
		delay: 0.3,
		timing: 'ease-out'
	});
	Moveit.put(d1Red, {
		start: '100%',
		end: '100%'
	});
	Moveit.animate(d1Red, {
		start: '0%',
		end: '100%',
		duration: 1,
		delay: 0.3,
		timing: 'ease-out'
	});
	Moveit.put(d1Yellow, {
		start: '100%',
		end: '100%'
	});
	Moveit.animate(d1Yellow, {
		start: '0%',
		end: '100%',
		duration: 1,
		delay: 0.3,
		timing: 'ease-out'
	});
	Moveit.put(d2Green, {
		start: '100%',
		end: '100%'
	});
	Moveit.animate(d2Green, {
		start: '0%',
		end: '100%',
		duration: 1,
		delay: 0.3,
		timing: 'ease-out'
	});
	Moveit.put(d2Red, {
		start: '100%',
		end: '100%'
	});
	Moveit.animate(d2Red, {
		start: '0%',
		end: '100%',
		duration: 1,
		delay: 0.3,
		timing: 'ease-out'
	});

	var homeChartData = {
		labelsX : [
		'23:00',
		'00:00',
		'01:00',
		'02:00',
		'03:00',
		'04:00',
		'05:00',
		'06:00',
		'07:00',
		'08:00',
		'09:00',
		'10:00',
		'11:00',
		'12:00',
		'13:00',
		'14:00',
		'15:00',
		'16:00',
		'17:00',
		'18:00',
		'19:00',
		'20:00',
		'21:00',
		'22:00',
		'23:00'
		],
		dataDays: {
			current: '28.10.2019',
			before: '27.10.2019'
		},
		dataTurnover : [3220, 1332, 1410, 1435, 2832, 3820, 1530, 3565, 2720, 1332, 1710, 1735, 2832, 3520, 1930, 3965, 2820, 1332, 1410, 1435, 3232, 3720, 1530, 3565, 2520],
		dataProfit :[2120, 132, 110, 135, 2132, 3120, 230, 2265, 2020, 132, 110, 135, 2032, 2220, 230, 1265, 2120, 332, 310, 335, 1232, 3110, 1130, 2265, 2120]
	}

	var chartMax = 0;

	for (var i = 0; i < homeChartData.dataTurnover.length; i++) {
		if ( homeChartData.dataTurnover[i] > chartMax ) {
			chartMax = homeChartData.dataTurnover[i];
		}
	}

	for (var i = 0; i < homeChartData.dataProfit.length; i++) {
		if ( homeChartData.dataProfit[i] > chartMax ) {
			chartMax = homeChartData.dataProfit[i];
		}
	}

	var chartStepSize = Math.pow(10, (chartMax.toString().length-1));
	chartMax = ( Math.floor( chartMax/Math.pow(10, (chartMax.toString().length-1) ) ) + 1 )*Math.pow(10, (chartMax.toString().length-1) );


	var ctxChart = document.getElementById("chart-home");
	var ctx = ctxChart.getContext("2d");
	var gradientFill = ctx.createLinearGradient(0, 0, 0, 225);

	gradientFill.addColorStop(0, "rgba(241, 91, 91, 1)");
	gradientFill.addColorStop(1, "transparent");

	var gradientFill2 = ctx.createLinearGradient(0, 0, 0, 215);
	gradientFill2.addColorStop(0, "rgba(65, 191, 80, 0.8)");
	gradientFill2.addColorStop(1, "rgba(65, 191, 80, 0.09)");
	var chart1 = new Chart(ctxChart, {
		type: 'line',
		data: {
			labels: homeChartData.labelsX,
			datasets: [{
				backgroundColor:gradientFill2,
				borderColor: 'rgba(65, 191, 80, 1)',
				data: homeChartData.dataProfit,
				fill: true,
				lineTension: 0,
				pointBackgroundColor: 'rgba(65, 191, 80, 1)',
				pointBorderWidth: 2,
				pointBorderColor: '#ffffff',
				pointRadius: 4,
				pointHitRadius: 20
			},{
				backgroundColor: gradientFill,
				borderColor: 'rgba(241, 91, 91, 1)',
				data: homeChartData.dataTurnover,
				fill: true,
				lineTension: 0,
				pointBackgroundColor: 'rgba(241, 91, 91, 1)',
				pointBorderWidth: 2,
				pointBorderColor: '#ffffff',
				pointRadius: 4,
				pointHitRadius: 20
			}],
		},
		options: {
			maintainAspectRatio: false,
			fill: "#303030",
			legend: false,
			scales: {
				gridLines: {
					drawTicks: false
				},
				yAxes: [{
					gridLines: {
						drawTicks: false,
						color: '#43475A',
						zeroLineColor: '#3a3d4d',
						drawBorder: true,
						borderDash: [1, 2]
					},
					ticks: {
						max: chartMax,
						padding: 10,
						min: 0,
						stepSize: chartStepSize,
						callback: function(value, index, values) {
							if (value == 0) {
								return value;
							} else {
								return value/1000+'K';
							}
						},
						fontFamily: "Helvetica Neue Light",
						fontSize: 12,
						fontColor: '#FFFFFF',
						beginAtZero: true
					}
				}],
				xAxes: [{
					gridLines: {
						drawTicks: false,
						color: '#43475A',
						drawBorder: true,
						zeroLineColor: '#43475A',
						zeroLineWidth : 2
					},
					ticks: {
						padding: 10,
						minRotation: 60,
						callback: function(value, index, values) {
							if (index == 0) {
								return '';
							} else {
								return value;
							}
						},
						fontFamily: "Helvetica Neue Light",
						fontSize: 12,
						fontColor: '#99ABB4',
						beginAtZero: true
					}
				}],
			},
			tooltips: {
				mode: 'index',
				position: 'nearest',
				enabled: false,
				custom: function(tooltipModel) {
					var tooltipEl = document.getElementById('chartjs-tooltip');
					if (!tooltipEl) {
						tooltipEl = document.createElement('div');
						tooltipEl.id = 'chartjs-tooltip';
						tooltipEl.innerHTML = "<table></table>";
						document.body.appendChild(tooltipEl);
					}
					if (tooltipModel.opacity === 0) {
						tooltipEl.style.opacity = 0;
						return;
					}
					tooltipEl.classList.remove('above', 'below', 'no-transform');
					if (tooltipModel.yAlign) {
						tooltipEl.classList.add(tooltipModel.yAlign);
					} else {
						tooltipEl.classList.add('no-transform');
					}

					function getBody(bodyItem) {
						return bodyItem.lines;
					}

					if (tooltipModel.body) {
						var titleLines = tooltipModel.title || [];
						var bodyLines = tooltipModel.body.map(getBody);
						var curPoint = tooltipModel.dataPoints[0].index;
						var innerHtml = '<thead>';

						titleLines.forEach(function(title) {
							if ( curPoint == 0 ) {
								innerHtml += '<tr><th>'+title+' / '+homeChartData.dataDays.before+'</th></tr>';
							} else {
								innerHtml += '<tr><th>'+title+' / '+homeChartData.dataDays.current+'</th></tr>';
							}
						});
						innerHtml += '</thead><tbody>';

						bodyLines.forEach(function(body, i) {
							if (i == 0) {
								innerHtml += '<tr><td class="chart-home-tooltip-td"><span class="chart-tooltip-title red">Turnover</span><span class="chart-tooltip-value red">$ ' + body + '</span></td></tr>';
							} else {
								innerHtml += '<tr><td class="chart-home-tooltip-td"><span class="chart-tooltip-title green">Profit</span><span class="chart-tooltip-value green">$ ' + body + '</span></td></tr>';
							}


						});
						innerHtml += '</tbody>';

						var tableRoot = tooltipEl.querySelector('table');
						tableRoot.innerHTML = innerHtml;
					}

					var position = this._chart.canvas.getBoundingClientRect();
					tooltipEl.style.opacity = 1;
					tooltipEl.style.position = 'fixed';
					tooltipEl.style.left = position.left + tooltipModel.caretX + 'px';
					tooltipEl.style.top = position.top + tooltipModel.caretY + 'px';
					tooltipEl.style.fontFamily = tooltipModel._bodyFontFamily;
					tooltipEl.style.fontSize = tooltipModel.bodyFontSize + 'px';
					tooltipEl.style.fontStyle = tooltipModel._bodyFontStyle;
					tooltipEl.style.padding = tooltipModel.yPadding + 'px ' + tooltipModel.xPadding + 'px';
					tooltipEl.style.boxShadow = "0 1px 3px 1px rgba(0,0,0,0.1)";
				}



			}

		}
	});


var barChartTopData = {
	labelsX : ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
	dataTrading : [1, 5, 2, 0, 0, 0, 0]
}

var chartMax = 0;

for (var i = 0; i < barChartTopData.dataTrading.length; i++) {
	if ( barChartTopData.dataTrading[i] > chartMax ) {
		chartMax = barChartTopData.dataTrading[i];
	}
}
var chartStepSize = Math.pow(10, (chartMax.toString().length-1));
chartMax = Math.ceil(chartMax/50)*50;


var ctxChart = document.getElementById("chart-top");
Chart.elements.Rectangle.prototype.draw = function() {
	var ctx = this._chart.ctx;
	var vm = this._view;
	var left, right, top, bottom, signX, signY, borderSkipped, radius;
	var borderWidth = vm.borderWidth;
		    // Set Radius Here
		    // If radius is large enough to cause drawing errors a max radius is imposed
		    var cornerRadius = 50;

		    if (!vm.horizontal) {
		        // bar
		        left = vm.x - vm.width / 2;
		        right = vm.x + vm.width / 2;
		        top = vm.y;
		        bottom = vm.base;
		        signX = 1;
		        signY = bottom > top? 1: -1;
		        borderSkipped = vm.borderSkipped || 'bottom';
		    } else {
		        // horizontal bar
		        left = vm.base;
		        right = vm.x;
		        top = vm.y - vm.height / 2;
		        bottom = vm.y + vm.height / 2;
		        signX = right > left? 1: -1;
		        signY = 1;
		        borderSkipped = vm.borderSkipped || 'left';
		    }

		    // Canvas doesn't allow us to stroke inside the width so we can
		    // adjust the sizes to fit if we're setting a stroke on the line
		    if (borderWidth) {
		        // borderWidth shold be less than bar width and bar height.
		        var barSize = Math.min(Math.abs(left - right), Math.abs(top - bottom));
		        borderWidth = borderWidth > barSize? barSize: borderWidth;
		        var halfStroke = borderWidth / 2;
		        // Adjust borderWidth when bar top position is near vm.base(zero).
		        var borderLeft = left + (borderSkipped !== 'left'? halfStroke * signX: 0);
		        var borderRight = right + (borderSkipped !== 'right'? -halfStroke * signX: 0);
		        var borderTop = top + (borderSkipped !== 'top'? halfStroke * signY: 0);
		        var borderBottom = bottom + (borderSkipped !== 'bottom'? -halfStroke * signY: 0);
		        // not become a vertical line?
		        if (borderLeft !== borderRight) {
		        	top = borderTop;
		        	bottom = borderBottom;
		        }
		        // not become a horizontal line?
		        if (borderTop !== borderBottom) {
		        	left = borderLeft;
		        	right = borderRight;
		        }
		    }

		    ctx.beginPath();
		    ctx.fillStyle = vm.backgroundColor;
		    ctx.strokeStyle = vm.borderColor;
		    ctx.lineWidth = borderWidth;

		    // Corner points, from bottom-left to bottom-right clockwise
		    // | 1 2 |
		    // | 0 3 |
		    var corners = [
		    [left, bottom],
		    [left, top],
		    [right, top],
		    [right, bottom]
		    ];

		    // Find first (starting) corner with fallback to 'bottom'
		    var borders = ['bottom', 'left', 'top', 'right'];
		    var startCorner = borders.indexOf(borderSkipped, 0);
		    if (startCorner === -1) {
		    	startCorner = 0;
		    }
		    function cornerAt(index) {
		    	return corners[(startCorner + index) % 4];
		    }

		    // Draw rectangle from 'startCorner'
		    var corner = cornerAt(0);
		    ctx.moveTo(corner[0], corner[1]);

		    for (var i = 1; i < 4; i++) {
		    	corner = cornerAt(i);
		    	nextCornerId = i+1;
		    	if(nextCornerId == 4){
		    		nextCornerId = 0
		    	}

		    	nextCorner = cornerAt(nextCornerId);

		    	width = corners[2][0] - corners[1][0];
		    	height = corners[0][1] - corners[1][1];
		    	x = corners[1][0];
		    	y = corners[1][1];

		    	var radius = cornerRadius;

		        // Fix radius being too large
		        if(radius > height/2){
		        	radius = height/2;
		        }if(radius > width/2){
		        	radius = width/2;
		        }

		        var rounded = true;
		        // if (!this._chart.getDatasetMeta(0).hidden && !this._chart.getDatasetMeta(1).hidden && !this._chart.getDatasetMeta(2).hidden) {
		        // 	rounded = this._datasetIndex === 2;
		        // }
		        if (rounded) {
		        	ctx.moveTo(x + radius, y);
		        	ctx.lineTo(x + width - radius, y);
		        	ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
		        	ctx.lineTo(x + width, y + height);
		        	ctx.lineTo(x, y + height);
		        	ctx.lineTo(x, y + radius);
		        	ctx.quadraticCurveTo(x, y, x + radius, y);
		        } else {
		        	ctx.moveTo(x, y);
		        	ctx.lineTo(x + width, y);
		        	ctx.lineTo(x + width, y + height );
		        	ctx.lineTo(x , y + height);
		        	ctx.lineTo(x, y );
		        }

		    }

		    ctx.fill();
		    if (borderWidth) {
		    	ctx.stroke();
		    }
		}; 
		var chart1 = new Chart(ctxChart, {
			type: 'bar',
			data: {
				labels: barChartTopData.labelsX,
				datasets: [{
					backgroundColor: '#ffb01c',
					borderWidth: 0,
					data: barChartTopData.dataTrading
				}]
			},
			options: {
				maintainAspectRatio: false,
				fill: "#303030",
				legend: false,
				elements:{ point: {
					radius: 7.5,
					hoverRadius: 12,
					pointStyle: 'rectRounded'
				}},
				scales: {
					yAxes: [{
						gridLines: {
							drawTicks: false,
							color: 'rgba(255,255,255,.1)',
							zeroLineColor: 'rgba(255,255,255,.1)',
							drawBorder: false,
							lineWidth: 2,
							zeroLineWidth: 0
						},
						ticks: {
							max: chartMax,
							padding: 4,
							min: 0,
							stepSize: 10,
							callback: function(value, index, values) {
								// if (value <= 10) {
								// 	return 0;
								// } else {
								// 	return value;
								// }
								return value;
							},
							fontFamily: "Helvetica Neue Light",
							fontSize: 12,
							fontColor: '#FFFFFF',
							beginAtZero: true
						}
					}],
					xAxes: [{
						barThickness: 'flex',
						barPercentage: 1.0,
						categoryPercentage: 1.0,
						maxBarThickness: 15,
						gridLines: {
							drawTicks: false,
							offsetGridLines: false,
							color: '#43475A',
							drawBorder: false,
							zeroLineColor: 'transparent',
							zeroLineWidth: 0,
							display: false
						},
						ticks: {
							padding: 8,
							callback: function(value, index, values) {
								if (value == '0') {
									return '';
								} else {
									return value;
								}
							},
							fontFamily: "Helvetica Neue",
							fontSize: 12,
							fontColor: '#ffffff',
							beginAtZero: true
						}
					}],
				},
				tooltips: {
					mode: 'index',
					position: 'nearest',
					enabled: false,
					custom: function(tooltipModel) {
						var tooltipEl = document.getElementById('chart-tooltip-top');
						if (!tooltipEl) {
							tooltipEl = document.createElement('div');
							tooltipEl.id = 'chart-tooltip-top';
							tooltipEl.innerHTML = "<table></table>";
							document.body.appendChild(tooltipEl);
						}
						if (tooltipModel.opacity === 0) {
							tooltipEl.style.opacity = 0;
							return;
						}
						tooltipEl.classList.remove('above', 'below', 'no-transform');
						if (tooltipModel.yAlign) {
							tooltipEl.classList.add(tooltipModel.yAlign);
						} else {
							tooltipEl.classList.add('no-transform');
						}

						function getBody(bodyItem) {
							return bodyItem.lines;
						}

						if (tooltipModel.body) {
							var titleLines = tooltipModel.title || [];
							var bodyLines = tooltipModel.body.map(getBody);
							var innerHtml = '<thead>';
							var curPoint = tooltipModel.dataPoints[0].index;
							titleLines.forEach(function(title) {
								switch (title) {
									case "M": 
									innerHtml += '<tr><th>Monday</th></tr>';
									break;
									case "T": 
									innerHtml += '<tr><th>Tuesday</th></tr>';
									break;
									case "W": 
									innerHtml += '<tr><th>Wednesday</th></tr>';
									break;
									case "T": 
									innerHtml += '<tr><th>Thursday</th></tr>';
									break;
									case "F": 
									innerHtml += '<tr><th>Friday</th></tr>';
									break;
									case "S": 
									if ( curPoint == 0 ) {
										innerHtml += '<tr><th>Sunday</th></tr>';
									} else if ( curPoint == 6 ) {
										innerHtml += '<tr><th>Saturday</th></tr>';
									}
									break;
								}
							});
							innerHtml += '</thead><tbody>';

							bodyLines.forEach(function(body, i) {
								innerHtml += '<tr><td class="td-custom"><span class="tooltip-wrap"><span class="chart-top-tooltip-title">Trades</span><span class="chart-top-tooltip-value">' + body + '</span></span></td></tr>';

							});
							innerHtml += '</tbody>';

							var tableRoot = tooltipEl.querySelector('table');
							tableRoot.innerHTML = innerHtml;
						}

						var position = this._chart.canvas.getBoundingClientRect();
						tooltipEl.style.opacity = 1;
						tooltipEl.style.position = 'fixed';
						tooltipEl.style.left = position.left + tooltipModel.caretX + 'px';
						tooltipEl.style.top = position.top + tooltipModel.caretY + 'px';
						tooltipEl.style.fontFamily = tooltipModel._bodyFontFamily;
						tooltipEl.style.fontSize = tooltipModel.bodyFontSize + 'px';
						tooltipEl.style.fontStyle = tooltipModel._bodyFontStyle;
						tooltipEl.style.padding = tooltipModel.yPadding + 'px ' + tooltipModel.xPadding + 'px';
						tooltipEl.style.boxShadow = "0 1px 3px 1px rgba(0,0,0,0.1)";
					}



				}

			}
		});




if ($(window).width() > 767) {
	setEqualH($(".home-top-block"));
}

$(window).resize(function(){
	$(".home-top-block").css({
		'height' : 'auto'
	});
	setEqualH($(".home-top-block"));
});


// TABS BEGIN =========

initTimers();
initScale();

setTimeout(function(){

	removePreloader();

}, 000);



$(".offers-item").click(function(){
	var el = $(this);
	if ( !el.hasClass('offers-item_active') ) {
		var data = el.data('offer').split(";");
		var dataPair = el.data('pair').split("|");
		var dataPair1 = dataPair[0].split(";");
		var dataPair2 = dataPair[1].split(";");
		var listItems = el.parents(".home-tab-row").find(".home-tab-list-item");
		var footerItems = el.parents(".home-tab-row").find(".home-tab-footer-item");
		var listTitle = el.parents(".home-tab-row").find(".home-tab-head-pair");

		listTitle.find(".home-tab-head-item").each(function(index){
			var icon = $(this).find(".home-tab-head-item-currency");
			icon.animate({
				'opacity' : '0'
			}, 250, function(){
				switch (index) {
					case 0: 
					icon.attr('class', 'home-tab-head-item-currency icon-'+dataPair1[0]);
					break;
					case 1:
					icon.attr('class', 'home-tab-head-item-currency icon-'+dataPair2[0]);
					break;
				}
				icon.animate({
					'opacity' : '1'
				}, 250);
			});

			var company = $(this).find(".home-tab-head-item-title");
			company.animate({
				'opacity' : '0'
			}, 250, function(){
				switch (index) {
					case 0: 
					company.text(dataPair1[1]);
					break;
					case 1:
					company.text(dataPair2[1]);
					break;
				}
				company.animate({
					'opacity' : '1'
				}, 250);
			});
		});
		console.log(data);
		var listCounter = 0;
		listItems.each(function(){
			var cur = listCounter;
			var val = $(this).find(".home-tab-list-item-value");
			val.animate({
				'opacity' : '0'
			}, 250, function(){
				// switch (cur) {
				// 	case 0:
				// 	case 1:

				// 	val.text(data[cur]);
				// 	break;
				// 	case 2:
				// 	case 3:
				// 	case 4:
				// 	val.text(data[cur]);
				// 	break;
				// 	case 5:
				// 	val.text(data[cur]);
				// 	break;
				// }
				val.text(data[cur]);
				val.animate({
					'opacity' : '1'
				}, 250);
			});
			listCounter++;

		});
		// footerItems.each(function(){
		// 	var span = $(this).find('span');
		// 	var cur = listCounter;
		// 	span.animate({
		// 		'opacity' : '0'
		// 	}, 250, function(){
		// 		span.text(data[cur]);
		// 		span.animate({
		// 			'opacity' : '1'
		// 		}, 250);
		// 	});
		// 	listCounter++;
		// });


		el.siblings(".offers-item_active").removeClass('offers-item_active');
		el.addClass('offers-item_active');
	}
});

$(".home-tab-button").click(function(){
	var el = $(this);
	if ( !el.hasClass('home-tab-button_checked') ) {
		el.addClass('home-tab-button_checked');
		setTimeout(function(){
			el.removeClass('home-tab-button_checked');
			el.trigger('blur');
		}, 3000);
	}
})


function countTime(h, m, s, dir, timer){

	var timeSum = m*60 + h*3600 + s;

	var refreshIntervalId = setInterval(fname, 1000);
	
	if ( timer.hasClass('home-tab-range-timer') ) {
		$("#trading-select").change(function(){
			clearInterval(refreshIntervalId);
		})
	}




	function fname(){



		if ( dir == 'down' ) {
			timeSum--;
		} else if ( dir == 'up' ) {
			timeSum++;
		}

		s = timeSum%60;
		m = Math.floor(timeSum/60)%60;
		h = Math.floor(timeSum/3600);


		if ( timeSum >= 0 ) {
			s = (s >= 10) ? s : '0'+s;
			m = (m >= 10) ? m : '0'+m;
			h = (h >= 10) ? h : '0'+h;

			timer.text(h+"h : "+m+"m : "+s+"s");
		}
	}

}



function initTimers() {
	$(".offers-item-bottom-timer, .home-tab-range-timer").each(function(){
		curTime = $(this).data('time');
		curTime = curTime.split(":");
		if ( $(this).hasClass('home-tab-range-timer') ) {
			countTime(+(curTime[0]), +(curTime[1]), +(curTime[2]), 'up', $(this));
		} else {
			countTime(+(curTime[0]), +(curTime[1]), +(curTime[2]), 'down', $(this));
		}

	});
}


function removePreloader(){
	var pos = $(".home-tab-preloader-circle").css('transform');
	$(".home-tab-preloader-circle").css({
		'transform' : pos
	});
	$(".home-tab-preloader-circle").removeClass('home-tab-preloader-circle_animated');
	$(".home-tab-preloader").fadeOut(500);
}

function initScale(){
	$(".home-tab-range-scale-completed").animate({
		'width' : $(".home-tab-range-scale-completed").data('completed')
	}, 750);
}


$(".home-tab-step").click(function(){
	$(".home-tab-step_default").removeClass("home-tab-step_default");
	if ( !$(this).hasClass('home-tab-step_active') ) {

		$(".home-tab-step").removeClass('prev');
		var prev = $(this).prev('.home-tab-step');
		while (prev[0]) {
			prev.addClass('prev');
			prev = prev.prev('.home-tab-step');
		}

		var text = $(this).data('text');
		$(".home-tab-step-info").addClass('fader');
		setTimeout(function(){
			$(".home-tab-step-info").text(text);
			$(".home-tab-step-info").removeClass('fader');
		}, 250);
		$(".home-tab-step_active").removeClass('home-tab-step_active');
		$(this).addClass('home-tab-step_active');
	}
});





// TABS END   =========



$(".home-tab-nav-item").click(function(e){
	e.preventDefault();
	var el = $(this);
	if ( !el.hasClass('active') ) {
		el.siblings(".home-tab-nav-item").removeClass('active');
		el.addClass('active');

		var tab = el.data('tab');

		$("#"+tab).removeClass('hidden');
		$("#"+tab).siblings('.home-tab-container').addClass('hidden');

	}
})

$(".simple-input-wrapper").click(function(e){
	if ( $(e.target).attr('class').indexOf('simple-input-copy-btn') == -1 ) {
		$(this).find('input').focus();
	}
	
});


$(".simple-input").each(function(){
	if ( Boolean($(this).siblings(".simple-input-after")[0]) ) {
		watchLength($(this), 'simple-');
	}
});
$(".simple-input").focus(function(){
	$(this).parents(".simple-input-wrapper").addClass('focus');
});
$(".simple-input").blur(function(){
	$(this).parents(".simple-input-wrapper").removeClass('focus');
});




$("#trade-amount").change(function(){
	calcResult($(this));
});
$("#trade-amount").keyup(function(){
	calcResult($(this));
});

function calcResult(el){
	var tradeAmount = el.val();

	if ( (tradeAmount != '') && (parseInt(tradeAmount) > 0) ) {
		var curProfit = parseFloat($("#curProfit").text());
		var curFee = parseFloat($("#curFee").text());

		curProfit = (curProfit/100)*tradeAmount;
		// round 
		curProfit = (Math.ceil(curProfit*100))/100;

		curFee = (curFee/100)*curProfit;
		// round 
		curFee = (Math.ceil(curFee*100))/100;

		// round
		tradeAmount = (Math.ceil(tradeAmount*100))/100;

		$("#finalTradeAmount").text(tradeAmount);
		$("#finalFee").text(curFee);
		$("#finalProfit").text(curProfit);

	} else {
		$("#finalTradeAmount").text('00.00');
		$("#finalFee").text('00.00');
		$("#finalProfit").text('00.00');
	}

	
}


} // HOME END =============


if ( document.getElementById('account-upgrade') ) {

	function copyToClipboard(target) {
		var rng, sel;
		if (document.createRange) {
			rng = document.createRange();
			rng.selectNode(target)
			sel = window.getSelection();
			sel.removeAllRanges();
			sel.addRange(rng);
			document.execCommand('copy');
		} else {
			var rng = document.body.createTextRange();
			rng.moveToElementText(target);
			rng.select();
		} 
	}

	$(".popup-payment-copy").click(function(){

		if ( $(this).siblings('.popup-payment-amount-value')[0] ) {
			copyToClipboard($(this).siblings('.popup-payment-amount-value').find('span')[0]);
			$(this).parents('.popup-payment').addClass('success');
			$(".popup-payment-success").text("Amount copied to clipboard");
		} else {
			copyToClipboard($(this).siblings('.popup-payment-address-value')[0]);
			$(this).parents('.popup-payment').addClass('success');
			$(".popup-payment-success").text("Address copied to clipboard");
		}

	})


	$(".popup-balance-item").click(function(){
		if ( !$(this).hasClass('active') ) {
			$(".popup-balance-item").removeClass('active');
			$(".popup-balance-item").removeClass('error');
			$(this).addClass('active');
			
			if ( $(this).hasClass('unavailable') ) {
				$(this).addClass('error');
				$(this).parents('.popup').find('.popup-btn').addClass('disabled');
			} else {
				$(this).find('.popup-balance-radio')[0].checked = true;
				$(this).parents('.popup').find('.popup-btn').removeClass('disabled');
			}
		}
	})


	if ( $(window).width() > 992 && $(window).width() < 1150) {
		$(".upgrade-stats").unwrap('.table-wrapper');
	}

	$(".border-dash").each(function(){
		var path = $(this)[0];
		var ctx = path.getContext('2d');
		path.width = $(this).parents(".border-dash-wrapper").outerWidth();
		path.height = $(this).parents(".border-dash-wrapper").outerHeight();
		var color = '#ffb01c';

		if ($(this).parents(".upgrade-planlist-item").hasClass('current')) {
			color = '#41bf50';
		} 

		if ($(this).parents(".upgrade-planlist-item").hasClass('disabled')) {
			color = '#6f6f6f';
		} 

		ctx.beginPath();
		ctx.fillStyle = color;
		ctx.strokeStyle = color;
		ctx.lineJoin = 'round';
		ctx.lineWidth = 1;
		ctx.lineCap = 'round';
		ctx.setLineDash([7, 6]);
		ctx.moveTo( 20, 0 );
		ctx.lineTo( path.width - 20, 0 );
		ctx.stroke();
		ctx.fill();
		ctx.closePath();

		ctx.beginPath();
		ctx.setLineDash([6, 5]);
		ctx.lineWidth = 1;
		ctx.arc(path.width - 20, path.height/2, 20, 1.3, -1.3, true);
		ctx.stroke();
		ctx.closePath();

		ctx.beginPath();
		ctx.lineJoin = 'round';
		ctx.lineWidth = 1;
		ctx.lineCap = 'round';
		ctx.setLineDash([7, 6]);
		ctx.moveTo( path.width - 20, path.height );
		ctx.lineTo( 20, path.height);
		ctx.stroke();
		ctx.fill();
		ctx.closePath();

		ctx.beginPath();
		ctx.setLineDash([6, 4]);
		ctx.lineWidth = 1;
		ctx.arc(20, path.height/2, 20, -1.8, 1.8, true);
		ctx.stroke();
		ctx.closePath();
	})

	$(window).resize(function(){



		$(".border-dash").each(function(){
			var path = $(this)[0];
			var ctx = path.getContext('2d');
			path.width = $(this).parents(".border-dash-wrapper").outerWidth();
			path.height = $(this).parents(".border-dash-wrapper").outerHeight();
			var color = '#ffb01c';

			if ($(this).parents(".upgrade-planlist-item").hasClass('current')) {
				color = '#41bf50';
			} 

			if ($(this).parents(".upgrade-planlist-item").hasClass('disabled')) {
				color = '#6f6f6f';
			} 

			ctx.beginPath();
			ctx.fillStyle = color;
			ctx.strokeStyle = color;
			ctx.lineJoin = 'round';
			ctx.lineWidth = 1;
			ctx.lineCap = 'round';
			ctx.setLineDash([7, 6]);
			ctx.moveTo( 20, 0 );
			ctx.lineTo( path.width - 20, 0 );
			ctx.stroke();
			ctx.fill();
			ctx.closePath();

			ctx.beginPath();
			ctx.setLineDash([6, 5]);
			ctx.lineWidth = 1;
			ctx.arc(path.width - 20, path.height/2, 20, 1.3, -1.3, true);
			ctx.stroke();
			ctx.closePath();

			ctx.beginPath();
			ctx.lineJoin = 'round';
			ctx.lineWidth = 1;
			ctx.lineCap = 'round';
			ctx.setLineDash([7, 6]);
			ctx.moveTo( path.width - 20, path.height );
			ctx.lineTo( 20, path.height);
			ctx.stroke();
			ctx.fill();
			ctx.closePath();

			ctx.beginPath();
			ctx.setLineDash([6, 4]);
			ctx.lineWidth = 1;
			ctx.arc(20, path.height/2, 20, -1.8, 1.8, true);
			ctx.stroke();
			ctx.closePath();
		});
	});

	$(".tariff").mouseenter(function(){
		if ( !$(this).hasClass('selected') ) {
			$(this).parents('.upgrade-plans-row').find('.tariff.selected').removeClass('selected');
			$(this).addClass('selected');
		}
	});

	$(".tariff").mouseleave(function(){
		if ( !$(this).hasClass('tariff_recommended') ) {
			$(this).parents('.upgrade-plans-row').find('.tariff_recommended').addClass('selected');
			$(this).removeClass('selected');
		}
	})
	

	
	$("#upgrade-select option").each(function(index){
		var curStatus = $(this).data('verified');
		$(".upgrade-stats-select .list li:nth-child("+(index+1)+")").attr('data-verified', curStatus);
	});

	var curStatusOnLoad = $("#upgrade-select option[value='"+$("#upgrade-select").val()+"']").data('verified');
	$(".upgrade-stats-select").find('.current').attr('class', 'current verified-'+curStatusOnLoad);

	$("#upgrade-select").change(function(){
		var curStatus = $("#upgrade-select option[value='"+$(this).val()+"']").data('verified');
		$(".upgrade-stats-select").find('.current').attr('class', 'current verified-'+curStatus);
		if (curStatus) {
			$(".upgrade-stats-row:nth-child(1) .upgrade-stats-item:nth-child(3)").attr('class', 'upgrade-stats-item green upper');
			$(".upgrade-stats-row:nth-child(1) .upgrade-stats-item:nth-child(3)").text('VERIFIED');
		} else {
			$(".upgrade-stats-row:nth-child(1) .upgrade-stats-item:nth-child(3)").attr('class', 'upgrade-stats-item red upper');
			$(".upgrade-stats-row:nth-child(1) .upgrade-stats-item:nth-child(3)").text('UNVERIFIED');
		}
		var data =  $("#upgrade-select option[value='"+$(this).val()+"']").data('table').split(";");

		for (var i = 0; i < data.length; i++) {

			var elOutput = $(".upgrade-stats-row:nth-child("+(i + 2)+") .upgrade-stats-item:nth-child(3)");
			switch (i) {
				case 0:
				changeFade(elOutput, data[i]);
				break;
				case 1:
				case 2: 
				var check = elOutput.find("div");
				if ( (data[i] == 'true')  ) {
					changeFadeClass(check, 'upgrade-stats-item-check');
				} 
				if ( (data[i] == 'false') ) {
					changeFadeClass(check, 'upgrade-stats-item-space');
				}
				break;
				case 3:
				case 4:
				case 5:
				case 6:
				case 7:
				changeFade(elOutput.find('span'), data[i]);
				break;


			}

		}
		//endfor




	});

	function changeFade(el, value){
		el.animate({
			'opacity' : 0
		}, 250, function(){
			el.text(value);
			el.animate({
				'opacity' : 1
			}, 250)
		});
	}

	function changeFadeClass(el, classNew) {
		el.animate({
			'opacity' : 0
		}, 250, function(){
			el.attr('class', classNew);
			el.animate({
				'opacity' : 1
			}, 250)
		});
	}

	$(".upgrade-plans-switcher-button").click(function(){
		$(this).toggleClass('right');

		$(".upgrade-plans-block").toggleClass('hidden');

	});

	$(".upgrade-plans-switcher-title").click(function(){
		if ( $(this).hasClass('green') ) {
			if ( !$(".upgrade-plans-switcher-button").hasClass('right') ) {
				$(".upgrade-plans-switcher-button").toggleClass('right');
				$(".upgrade-plans-block").toggleClass('hidden');
			}
		} else {
			if ( $(".upgrade-plans-switcher-button").hasClass('right') ) {
				$(".upgrade-plans-switcher-button").toggleClass('right');
				$(".upgrade-plans-block").toggleClass('hidden');
			}
		}
		
	});

	$("#verify-form-1").submit(function(){
		$(this).parents(".air-popup").toggleClass('air-popup-hide');
		setTimeout(function(){
			$("#verify-2").toggleClass('air-popup-hide');
		}, 250);
	});

	$("#verify-form-2").submit(function(){
		$(this).parents(".air-popup").toggleClass('air-popup-hide');
		setTimeout(function(){
			$("#verify-3").toggleClass('air-popup-hide');
		}, 250);
	});

	$("#upgrade-form-1").submit(function(e){
		e.preventDefault();
		// $(this).parents(".air-popup").toggleClass('air-popup-hide');
		// setTimeout(function(){
		// 	console.log($("#upgrade-2")[0]);
		// 	$("#upgrade-popup-2").toggleClass('air-popup-hide');
		// }, 250);
	});

	$("#upgrade-by-b").click(function(e){
		e.preventDefault();
		$(this).parents(".air-popup").toggleClass('air-popup-hide');
		setTimeout(function(){
			$("#upgrade-popup-b").toggleClass('air-popup-hide');
		}, 250);
	});

	$("#upgrade-by-d").click(function(e){
		e.preventDefault();
		$(this).parents(".air-popup").toggleClass('air-popup-hide');
		setTimeout(function(){
			$("#upgrade-popup-d").toggleClass('air-popup-hide');
		}, 250);
	});

	$(".success-btn").click(function(e){
		e.preventDefault();
		$(this).parents(".air-popup").toggleClass('air-popup-hide');
		setTimeout(function(){
			$("#upgrade-popup-s").toggleClass('air-popup-hide');
		}, 250);
	});

	$("#upgrade-form-d").submit(function(e){
		e.preventDefault();
		$(this).parents(".air-popup").toggleClass('air-popup-hide');
		setTimeout(function(){
			$("#upgrade-popup-s").toggleClass('air-popup-hide');
		}, 250);
	});

	$(".popup-payment-qr").click(function(e){
		e.preventDefault();
		$(this).parents(".air-popup").toggleClass('air-popup-hide');
		setTimeout(function(){
			$("#upgrade-popup-qr").toggleClass('air-popup-hide');
		}, 250);
	});
}

if ( document.getElementById('partnership') ) {


	$(".popover-body").each(function(){
		var fWidth = $(this).outerWidth();
		$(this).css({
			'left' : -fWidth/2 + 7.5
		});
	})

	// ADAPTIVE

	$(window).resize(function(){

		if ( $(window).width() < 1250 ) {

			$(".tab-table").each(function(){
				$(this).wrap('<div class="table-wrapper" style="overflow-x: auto; padding-bottom: 3px;" />');
			});
		} else {
			$(this).unwrap(".table-wrapper");
		}

		var curW;

		if ( $(window).width() < 1150 ) {

			

			if ( $(window).width() < 768 ) {
				curW = $(window).width() - 70;
			} else {
				curW = $(window).width() - 90;
			}

			$(".chart-wrapper").css({
				width: curW,
				'max-width' : curW
			});

			if ( $(window).width() < 768) {
				$(".range-block").css({
					width: curW,
					'max-width' : curW
				});
			}

			if ( $(window).width() > 1023 ) {

				$("#chart-wrapper-p-w-2").css({
					width: $(window).width()/2 - 95,
					'max-width': $(window).width()/2 - 95
				})
				setEqualH($(".simple-block_mid"));
				setEqualH($(".simple-block_bottom"));
			}

			if ( $(window).width() > 767 ) {
				$("#chart-wrapper-top").css({
					width: $(window).width()/2 - 95,
					'max-width': $(window).width()/2 - 95
				})
			}

			if ( $(window).width() < 500 ) {

				if ( $(".prom-link").text().length > 39 ) {
					var newStr = $(".prom-link").text().slice(0, 36) + '...';
					$(".prom-link-short").text(newStr);
					$(".prom-link-short").addClass('active');
				}

			} else {
				$(".prom-link-short").removeClass('active');
			}

		}

	});

	if ( $(window).width() < 1150 ) {

		var curW;

		if ( $(window).width() < 768 ) {
			curW = $(window).width() - 70;
		} else {
			curW = $(window).width() - 90;
		}

		$(".chart-wrapper").css({
			width: curW,
			'max-width' : curW
		});

		if ( $(window).width() < 768) {
			$(".range-block").css({
				width: curW,
				'max-width' : curW
			});
		}

		

		if ( $(window).width() > 767 ) {
			$("#chart-wrapper-top").css({
				width: $(window).width()/2 - 95
			})
		}

		if ( $(window).width() > 1023 ) {

			$("#chart-wrapper-p-w-2").css({
				width: $(window).width()/2 - 95,
				'max-width': $(window).width()/2 - 95
			})

			setEqualH($(".simple-block_mid"));
			setEqualH($(".simple-block_bottom"));
		}

		$(window).resize(function(){
			var curW;

			if ( $(window).width() < 768 ) {
				curW = $(window).width() - 70;
			} else {
				curW = $(window).width() - 90;
			}

			$(".chart-wrapper").css({
				width: curW,
				'max-width' : curW
			});

			if ( $(window).width() < 768) {
				$(".range-block").css({
					width: curW,
					'max-width' : curW
				});
			}

			if ( $(window).width() > 1023 ) {

				$("#chart-wrapper-p-w-2").css({
					width: $(window).width()/2 - 95
				})
				setEqualH($(".simple-block_mid"));
				setEqualH($(".simple-block_bottom"));
			}

			if ( $(window).width() > 767 ) {
				$("#chart-wrapper-top").css({
					width: $(window).width()/2 - 95
				})
			}

			if ( $(window).width() < 500 ) {

				if ( $(".prom-link").text().length > 39 ) {
					var newStr = $(".prom-link").text().slice(0, 36) + '...';
					$(".prom-link-short").text(newStr);
					$(".prom-link-short").addClass('active');
				}

			} else {
				$(".prom-link-short").removeClass('active');
			}

		})

		

	}

	if ( $(window).width() < 500 ) {

		if ( $(".prom-link").text().length > 39 ) {
			var newStr = $(".prom-link").text().slice(0, 36) + '...';
			$(".prom-link-short").text(newStr);
			$(".prom-link-short").addClass('active');
		}

	}

	// ADAPTIVE END
	if ( $(window).width() > 767 ) {
		setEqualH($(".simple-block_bottom"));
	} 

	


	$(".prom-link-copy").click(function(){
		copyToClipboard($(this).siblings(".prom-link")[0]);
	});

	$(".prom-item-copy").click(function(e) {
		copyToClipboard($(this).siblings(".link-to-copy")[0]);
	})

	function copyToClipboard(target) {
		var rng, sel;
		if (document.createRange) {
			rng = document.createRange();
			rng.selectNode(target)
			sel = window.getSelection();
			sel.removeAllRanges();
			sel.addRange(rng);
			document.execCommand('copy');
		} else {
			var rng = document.body.createTextRange();
			rng.moveToElementText(target);
			rng.select();
		} 
	}

	$(".input-range").slider({
		min: 0,
		max: 100,
		step: 10,
		value: 40,
		slide: function( event, ui ) {
			$(".input-range.ui-slider-horizontal").css({
				'background-image' : 'linear-gradient(to right, #e0c16a 0%, #574000 '+ui.value+'%, #3a3d4d '+ui.value+'.5%, #3a3d4d 100%)'
			})
		}
	});

	// SCALE ADJUSTING


	function setStatus(el) {
		var curVal = el.val();
		el.siblings(".nice-select").find('.current').attr('class', 'current ' + curVal);
	}

	$("#filter-status").change(function(){
		setStatus($(this));
	});

	setStatus($("#filter-status"));

	$("#filter-status").siblings(".nice-select").find('.list li').each(function(){
		var curVal = $(this).data('value');
		$(this).addClass(curVal);
	});

	var partnerWChartData = {
		labelsX : ["0", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
		data1 : [1220, 1132, 910, 835, 832, 820, 530, 365],
		data2 : [2120, 2332, 2410, 1435, 2032, 2320, 1530, 1565]
	}


	var chartMax = 0;

	for (var i = 0; i < partnerWChartData.data1.length; i++) {
		if ( partnerWChartData.data1[i] > chartMax ) {
			chartMax = partnerWChartData.data1[i];
		}
	}

	for (var i = 0; i < partnerWChartData.data2.length; i++) {
		if ( partnerWChartData.data2[i] > chartMax ) {
			chartMax = partnerWChartData.data2[i];
		}
	}

	

	var chartStepSize = Math.pow(10, (chartMax.toString().length-1));
	chartMax = ( Math.floor( chartMax/Math.pow(10, (chartMax.toString().length-1) ) ) + 1 )*Math.pow(10, (chartMax.toString().length-1) );


	var ctxChart = document.getElementById("chart-p-w");
	var ctx = ctxChart.getContext("2d");
	var gradientFill = ctx.createLinearGradient(0, 0, 0, 105);

	gradientFill.addColorStop(0, "rgba(241, 91, 91, 1)");
	gradientFill.addColorStop(1, "transparent");

	var gradientFill2 = ctx.createLinearGradient(0, 0, 0, 105);
	gradientFill2.addColorStop(0, "rgba(65, 191, 80, 0.8)");
	gradientFill2.addColorStop(1, "rgba(65, 191, 80, 0.09)");
	var chart1 = new Chart(ctxChart, {
		type: 'line',
		data: {
			labels: partnerWChartData.labelsX,
			datasets: [{
				backgroundColor: gradientFill2,
				borderColor: 'rgba(65, 191, 80, 1)',
				data: partnerWChartData.data1,
				fill: true,
				lineTension: 0,
				pointBackgroundColor: 'rgba(65, 191, 80, 1)',
				pointBorderWidth: 2,
				pointBorderColor: '#ffffff',
				pointRadius: 4,
				pointHitRadius: 20
			},{
				backgroundColor: gradientFill,
				borderColor: 'rgba(241, 91, 91, 1)',
				data: partnerWChartData.data2,
				fill: true,
				lineTension: 0,
				pointBackgroundColor: 'rgba(241, 91, 91, 1)',
				pointBorderWidth: 2,
				pointBorderColor: '#ffffff',
				pointRadius: 4,
				pointHitRadius: 20
			}],
		},
		options: {
			maintainAspectRatio: false,
			fill: "#303030",
			legend: false,
			scales: {
				gridLines: {
					drawTicks: false
				},
				yAxes: [{
					gridLines: {
						drawTicks: false,
						color: '#43475A',
						zeroLineColor: '#3a3d4d',
						drawBorder: true,
						borderDash: [1, 2]
					},
					ticks: {
						max: chartMax,
						padding: 10,
						min: 0,
						stepSize: chartStepSize,
						callback: function(value, index, values) {
							if (value == 0) {
								return value;
							} else {
								return value/1000+'K';
							}
						},
						fontFamily: "Helvetica Neue Light",
						fontSize: 12,
						fontColor: '#FFFFFF',
						beginAtZero: true
					}
				}],
				xAxes: [{
					gridLines: {
						drawTicks: false,
						color: '#43475A',
						drawBorder: true,
						zeroLineColor: '#43475A',
						zeroLineWidth : 2
					},
					ticks: {
						padding: 10,
						callback: function(value, index, values) {
							if (index == 0) {
								return '';
							} else {
								return value;
							}
						},
						fontFamily: "Helvetica Neue Light",
						fontSize: 12,
						fontColor: '#99ABB4',
						beginAtZero: true
					}
				}],
			},
			tooltips: {
				mode: 'index',
				position: 'nearest',
				enabled: false,
				custom: function(tooltipModel) {
					var tooltipEl = document.getElementById('chartjs-tooltip-p-w');
					if (!tooltipEl) {
						tooltipEl = document.createElement('div');
						tooltipEl.id = 'chart-tooltip-top';
						tooltipEl.innerHTML = "<table></table>";
						document.body.appendChild(tooltipEl);
					}
					if (tooltipModel.opacity === 0) {
						tooltipEl.style.opacity = 0;
						return;
					}
					tooltipEl.classList.remove('above', 'below', 'no-transform');
					if (tooltipModel.yAlign) {
						tooltipEl.classList.add(tooltipModel.yAlign);
					} else {
						tooltipEl.classList.add('no-transform');
					}

					function getBody(bodyItem) {
						return bodyItem.lines;
					}

					if (tooltipModel.body) {
						var titleLines = tooltipModel.title || [];
						var bodyLines = tooltipModel.body.map(getBody);
						var innerHtml = '<thead>';
						var curPoint = tooltipModel.dataPoints[0].index;
						titleLines.forEach(function(title) {
							switch (title) {
								case "Mon": 
								innerHtml += '<tr><th>Monday</th></tr>';
								break;
								case "Tue": 
								innerHtml += '<tr><th>Tuesday</th></tr>';
								break;
								case "Wed": 
								innerHtml += '<tr><th>Wednesday</th></tr>';
								break;
								case "Thu": 
								innerHtml += '<tr><th>Thursday</th></tr>';
								break;
								case "Fri": 
								innerHtml += '<tr><th>Friday</th></tr>';
								break;
								case "0":
								case "Sun": 
								innerHtml += '<tr><th>Sunday</th></tr>';
								break;
								case "Sat": 
								if ( curPoint == 0 ) {
									innerHtml += '<tr><th>Sunday</th></tr>';
								} else if ( curPoint == 6 ) {
									innerHtml += '<tr><th>Saturday</th></tr>';
								}
								break;
							}
						});
						innerHtml += '</thead><tbody>';
						var counerBody = 1;
						bodyLines.forEach(function(body, i) {

							var bodyCLr, bodyTitle;

							switch (counerBody) {
								case 1:
								bodyClr = 'color-red';
								bodyTitle = 'Sales';
								break;
								case 2:
								bodyClr = 'color-green';
								bodyTitle = 'Commissions';
								break;
								case 3:
								bodyClr = 'color-green';
								bodyTitle = 'Traded';
								break;
							}

							innerHtml += '<tr><td class="td-custom"><span class="tooltip-wrap">';
							innerHtml += '<span class="chart-top-tooltip-title ' + bodyClr
							+ '">' + bodyTitle + '</span>';
							innerHtml += '<span class="chart-top-tooltip-value">$ ' + body + '</span>';
							innerHtml += '</span></td></tr>';
							counerBody++;

						});

						innerHtml += '</tbody>';

						var tableRoot = tooltipEl.querySelector('table');
						tableRoot.innerHTML = innerHtml;
					}

					var position = this._chart.canvas.getBoundingClientRect();
					tooltipEl.style.opacity = 1;
					tooltipEl.style.position = 'fixed';
					tooltipEl.style.left = position.left + tooltipModel.caretX + 'px';
					tooltipEl.style.top = position.top + tooltipModel.caretY + 'px';
					tooltipEl.style.fontFamily = tooltipModel._bodyFontFamily;
					tooltipEl.style.fontSize = tooltipModel.bodyFontSize + 'px';
					tooltipEl.style.fontStyle = tooltipModel._bodyFontStyle;
					tooltipEl.style.padding = tooltipModel.yPadding + 'px ' + tooltipModel.xPadding + 'px';
					tooltipEl.style.boxShadow = "0 1px 3px 1px rgba(0,0,0,0.1)";
				}



			}

		}
	});

var partnerW2ChartData = {
	labelsX : ["0", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
	data1 : [1220, 1132, 910, 835, 832, 820, 530, 365],
	data2 : [2120, 2332, 2410, 1435, 2032, 2320, 1530, 1565]
}


var chartMax = 0;

for (var i = 0; i < partnerW2ChartData.data1.length; i++) {
	if ( partnerW2ChartData.data1[i] > chartMax ) {
		chartMax = partnerW2ChartData.data1[i];
	}
}

for (var i = 0; i < partnerW2ChartData.data2.length; i++) {
	if ( partnerW2ChartData.data2[i] > chartMax ) {
		chartMax = partnerW2ChartData.data2[i];
	}
}



var chartStepSize = Math.pow(10, (chartMax.toString().length-1));
chartMax = ( Math.floor( chartMax/Math.pow(10, (chartMax.toString().length-1) ) ) + 1 )*Math.pow(10, (chartMax.toString().length-1) );


var ctxChart = document.getElementById("chart-p-w-2");
var ctx = ctxChart.getContext("2d");
var gradientFill3 = ctx.createLinearGradient(0, 0, 0, 125);

gradientFill3.addColorStop(0, "rgba(241, 91, 91, 1)");
gradientFill3.addColorStop(1, "transparent");

var gradientFill4 = ctx.createLinearGradient(0, 0, 0, 125);
gradientFill4.addColorStop(0, "rgba(65, 191, 80, 0.8)");
gradientFill4.addColorStop(1, "rgba(65, 191, 80, 0.09)");
var chart2 = new Chart(ctxChart, {
	type: 'line',
	data: {
		labels: partnerW2ChartData.labelsX,
		datasets: [{
			backgroundColor: gradientFill4,
			borderColor: 'rgba(65, 191, 80, 1)',
			data: partnerW2ChartData.data1,
			fill: true,
			lineTension: 0,
			pointBackgroundColor: 'rgba(65, 191, 80, 1)',
			pointBorderWidth: 2,
			pointBorderColor: '#ffffff',
			pointRadius: 4,
			pointHitRadius: 20
		},{
			backgroundColor: gradientFill3,
			borderColor: 'rgba(241, 91, 91, 1)',
			data: partnerW2ChartData.data2,
			fill: true,
			lineTension: 0,
			pointBackgroundColor: 'rgba(241, 91, 91, 1)',
			pointBorderWidth: 2,
			pointBorderColor: '#ffffff',
			pointRadius: 4,
			pointHitRadius: 20
		}],
	},
	options: {
		maintainAspectRatio: false,
		fill: "#303030",
		legend: false,
		scales: {
			gridLines: {
				drawTicks: false
			},
			yAxes: [{
				gridLines: {
					drawTicks: false,
					color: '#43475A',
					zeroLineColor: '#3a3d4d',
					drawBorder: true,
					borderDash: [1, 2]
				},
				ticks: {
					max: chartMax,
					padding: 10,
					min: 0,
					stepSize: chartStepSize,
					callback: function(value, index, values) {
						if (value == 0) {
							return value;
						} else {
							return value/1000+'K';
						}
					},
					fontFamily: "Helvetica Neue Light",
					fontSize: 12,
					fontColor: '#FFFFFF',
					beginAtZero: true
				}
			}],
			xAxes: [{
				gridLines: {
					drawTicks: false,
					color: '#43475A',
					drawBorder: true,
					zeroLineColor: '#43475A',
					zeroLineWidth : 2
				},
				ticks: {
					padding: 10,
					callback: function(value, index, values) {
						if (index == 0) {
							return '';
						} else {
							return value;
						}
					},
					fontFamily: "Helvetica Neue Light",
					fontSize: 12,
					fontColor: '#99ABB4',
					beginAtZero: true
				}
			}],
		},
		tooltips: {
			mode: 'index',
			position: 'nearest',
			enabled: false,
			custom: function(tooltipModel) {
				var tooltipEl = document.getElementById('chartjs-tooltip-p-w-2');
				if (!tooltipEl) {
					tooltipEl = document.createElement('div');
					tooltipEl.id = 'chart-tooltip-top';
					tooltipEl.innerHTML = "<table></table>";
					document.body.appendChild(tooltipEl);
				}
				if (tooltipModel.opacity === 0) {
					tooltipEl.style.opacity = 0;
					return;
				}
				tooltipEl.classList.remove('above', 'below', 'no-transform');
				if (tooltipModel.yAlign) {
					tooltipEl.classList.add(tooltipModel.yAlign);
				} else {
					tooltipEl.classList.add('no-transform');
				}

				function getBody(bodyItem) {
					return bodyItem.lines;
				}

				if (tooltipModel.body) {
					var titleLines = tooltipModel.title || [];
					var bodyLines = tooltipModel.body.map(getBody);
					var innerHtml = '<thead>';
					var curPoint = tooltipModel.dataPoints[0].index;
					titleLines.forEach(function(title) {
						switch (title) {
							case "Mon": 
							innerHtml += '<tr><th>Monday</th></tr>';
							break;
							case "Tue": 
							innerHtml += '<tr><th>Tuesday</th></tr>';
							break;
							case "Wed": 
							innerHtml += '<tr><th>Wednesday</th></tr>';
							break;
							case "Thu": 
							innerHtml += '<tr><th>Thursday</th></tr>';
							break;
							case "Fri": 
							innerHtml += '<tr><th>Friday</th></tr>';
							break;
							case "0":
							case "Sun": 
							innerHtml += '<tr><th>Sunday</th></tr>';
							break;
							case "Sat": 
							if ( curPoint == 0 ) {
								innerHtml += '<tr><th>Sunday</th></tr>';
							} else if ( curPoint == 6 ) {
								innerHtml += '<tr><th>Saturday</th></tr>';
							}
							break;
						}
					});
					innerHtml += '</thead><tbody>';
					var counerBody = 1;
					bodyLines.forEach(function(body, i) {

						var bodyCLr, bodyTitle;

						switch (counerBody) {
							case 1:
							bodyClr = 'color-red';
							bodyTitle = 'Sales';
							break;
							case 2:
							bodyClr = 'color-green';
							bodyTitle = 'Commissions';
							break;
							case 3:
							bodyClr = 'color-green';
							bodyTitle = 'Traded';
							break;
						}

						innerHtml += '<tr><td class="td-custom"><span class="tooltip-wrap">';
						innerHtml += '<span class="chart-top-tooltip-title ' + bodyClr
						+ '">' + bodyTitle + '</span>';
						innerHtml += '<span class="chart-top-tooltip-value">$ ' + body + '</span>';
						innerHtml += '</span></td></tr>';
						counerBody++;

					});

					innerHtml += '</tbody>';

					var tableRoot = tooltipEl.querySelector('table');
					tableRoot.innerHTML = innerHtml;
				}

				var position = this._chart.canvas.getBoundingClientRect();
				tooltipEl.style.opacity = 1;
				tooltipEl.style.position = 'fixed';
				tooltipEl.style.left = position.left + tooltipModel.caretX + 'px';
				tooltipEl.style.top = position.top + tooltipModel.caretY + 'px';
				tooltipEl.style.fontFamily = tooltipModel._bodyFontFamily;
				tooltipEl.style.fontSize = tooltipModel.bodyFontSize + 'px';
				tooltipEl.style.fontStyle = tooltipModel._bodyFontStyle;
				tooltipEl.style.padding = tooltipModel.yPadding + 'px ' + tooltipModel.xPadding + 'px';
				tooltipEl.style.boxShadow = "0 1px 3px 1px rgba(0,0,0,0.1)";
			}


		}

	}
});


var barChartTopData = {
	labelsX : ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
	data1 : [53, 41, 33, 33, 52, 33, 56],
	data2 : [13, 21, 43, 53, 22, 13, 16],
	data3 : [23, 21, 23, 23, 32, 23, 26]
}

var chartSummary = [];

for (var i = 0; i < barChartTopData.data1.length; i++) {
	chartSummary[i] = barChartTopData.data1[i] +
	barChartTopData.data2[i] +
	barChartTopData.data3[i];
}

var chartMax = 0;

for (var i = 0; i < chartSummary.length; i++) {
	if ( chartSummary[i] > chartMax ) {
		chartMax = chartSummary[i];
	}
}

var chartStepSize = Math.pow(10, (chartMax.toString().length-1));
chartMax = Math.ceil(chartMax/50)*50;


var ctxChart = document.getElementById("chart-p-i");
Chart.elements.Rectangle.prototype.draw = function() {
	var ctx = this._chart.ctx;
	var vm = this._view;
	var left, right, top, bottom, signX, signY, borderSkipped, radius;
	var borderWidth = vm.borderWidth;
				    // Set Radius Here
				    // If radius is large enough to cause drawing errors a max radius is imposed
				    var cornerRadius = 50;

				    if (!vm.horizontal) {
				        // bar
				        left = vm.x - vm.width / 2;
				        right = vm.x + vm.width / 2;
				        top = vm.y;
				        bottom = vm.base;
				        signX = 1;
				        signY = bottom > top? 1: -1;
				        borderSkipped = vm.borderSkipped || 'bottom';
				    } else {
				        // horizontal bar
				        left = vm.base;
				        right = vm.x;
				        top = vm.y - vm.height / 2;
				        bottom = vm.y + vm.height / 2;
				        signX = right > left? 1: -1;
				        signY = 1;
				        borderSkipped = vm.borderSkipped || 'left';
				    }

				    // Canvas doesn't allow us to stroke inside the width so we can
				    // adjust the sizes to fit if we're setting a stroke on the line
				    if (borderWidth) {
				        // borderWidth shold be less than bar width and bar height.
				        var barSize = Math.min(Math.abs(left - right), Math.abs(top - bottom));
				        borderWidth = borderWidth > barSize? barSize: borderWidth;
				        var halfStroke = borderWidth / 2;
				        // Adjust borderWidth when bar top position is near vm.base(zero).
				        var borderLeft = left + (borderSkipped !== 'left'? halfStroke * signX: 0);
				        var borderRight = right + (borderSkipped !== 'right'? -halfStroke * signX: 0);
				        var borderTop = top + (borderSkipped !== 'top'? halfStroke * signY: 0);
				        var borderBottom = bottom + (borderSkipped !== 'bottom'? -halfStroke * signY: 0);
				        // not become a vertical line?
				        if (borderLeft !== borderRight) {
				        	top = borderTop;
				        	bottom = borderBottom;
				        }
				        // not become a horizontal line?
				        if (borderTop !== borderBottom) {
				        	left = borderLeft;
				        	right = borderRight;
				        }
				    }

				    ctx.beginPath();
				    ctx.fillStyle = vm.backgroundColor;
				    ctx.strokeStyle = vm.borderColor;
				    ctx.lineWidth = borderWidth;

				    // Corner points, from bottom-left to bottom-right clockwise
				    // | 1 2 |
				    // | 0 3 |
				    var corners = [
				    [left, bottom],
				    [left, top],
				    [right, top],
				    [right, bottom]
				    ];

				    // Find first (starting) corner with fallback to 'bottom'
				    var borders = ['bottom', 'left', 'top', 'right'];
				    var startCorner = borders.indexOf(borderSkipped, 0);
				    if (startCorner === -1) {
				    	startCorner = 0;
				    }
				    function cornerAt(index) {
				    	return corners[(startCorner + index) % 4];
				    }

				    // Draw rectangle from 'startCorner'
				    var corner = cornerAt(0);
				    ctx.moveTo(corner[0], corner[1]);

				    for (var i = 1; i < 4; i++) {
				    	corner = cornerAt(i);
				    	nextCornerId = i+1;
				    	if(nextCornerId == 4){
				    		nextCornerId = 0
				    	}

				    	nextCorner = cornerAt(nextCornerId);

				    	width = corners[2][0] - corners[1][0];
				    	height = corners[0][1] - corners[1][1];
				    	x = corners[1][0];
				    	y = corners[1][1];

				    	var radius = cornerRadius;

				        // Fix radius being too large
				        if(radius > height/2){
				        	radius = height/2;
				        }if(radius > width/2){
				        	radius = width/2;
				        }

				        var rounded = true;
				        if (!this._chart.getDatasetMeta(0).hidden 
				        	&& !this._chart.getDatasetMeta(1).hidden 
				        	// && !this._chart.getDatasetMeta(2).hidden
				        	) {
				        	rounded = this._datasetIndex === 2;
				    }
				    if (rounded) {
				    	ctx.moveTo(x + radius, y);
				    	ctx.lineTo(x + width - radius, y);
				    	ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
				    	ctx.lineTo(x + width, y + height);
				    	ctx.lineTo(x, y + height);
				    	ctx.lineTo(x, y + radius);
				    	ctx.quadraticCurveTo(x, y, x + radius, y);
				    } else {
				    	ctx.moveTo(x, y);
				    	ctx.lineTo(x + width, y);
				    	ctx.lineTo(x + width, y + height );
				    	ctx.lineTo(x , y + height);
				    	ctx.lineTo(x, y );
				    }

				}

				ctx.fill();
				if (borderWidth) {
					ctx.stroke();
				}
			}; 
			var chart1 = new Chart(ctxChart, {
				type: 'bar',
				data: {
					labels: barChartTopData.labelsX,
					datasets: [{
						backgroundColor: '#41BF50',
						borderWidth: 0,
						data: barChartTopData.data1
					},
					{
						backgroundColor: '#F25B5B',
						borderWidth: 0,
						data: barChartTopData.data2
					},
					{
						backgroundColor: '#FFB300',
						borderWidth: 0,
						data: barChartTopData.data3
					}]
				},
				options: {
					maintainAspectRatio: false,
					fill: "#303030",
					legend: false,
					elements:{ point: {
						radius: 7.5,
						hoverRadius: 12,
						pointStyle: 'rectRounded'
					}},
					scales: {
						yAxes: [{
							gridLines: {
								drawTicks: false,
								color: 'rgba(255,255,255,.1)',
								zeroLineColor: 'rgba(255,255,255,.1)',
								drawBorder: false,
								lineWidth: 2,
								zeroLineWidth: 0
							},

							stacked : true,
							ticks: {
								max: chartMax,
								padding: 4,
								min: 0,
								stepSize: 50,
								callback: function(value, index, values) {
									// if (value <= 10) {
									// 	return 0;
									// } else {
										return value;
									// }
								},
								fontFamily: "Helvetica Neue Light",
								fontSize: 12,
								fontColor: '#FFFFFF',
								beginAtZero: true
							}
						}],
						xAxes: [{
							stacked : true,
							barThickness: 'flex',
							barPercentage: 1.0,
							categoryPercentage: 1.0,
							maxBarThickness: 15,
							gridLines: {
								drawTicks: false,
								offsetGridLines: false,
								color: '#43475A',
								drawBorder: false,
								zeroLineColor: 'transparent',
								zeroLineWidth: 0,
								display: false
							},
							ticks: {
								padding: 8,
								callback: function(value, index, values) {
									if (value == '0') {
										return '';
									} else {
										return value;
									}
								},
								fontFamily: "Helvetica Neue",
								fontSize: 12,
								fontColor: '#ffffff',
								beginAtZero: true
							}
						}],
					},
					tooltips: {
						mode: 'index',
						position: 'nearest',
						enabled: false,
						custom: function(tooltipModel) {
							var tooltipEl = document.getElementById('chart-tooltip-top');
							if (!tooltipEl) {
								tooltipEl = document.createElement('div');
								tooltipEl.id = 'chart-tooltip-top';
								tooltipEl.innerHTML = "<table></table>";
								document.body.appendChild(tooltipEl);
							}
							if (tooltipModel.opacity === 0) {
								tooltipEl.style.opacity = 0;
								return;
							}
							tooltipEl.classList.remove('above', 'below', 'no-transform');
							if (tooltipModel.yAlign) {
								tooltipEl.classList.add(tooltipModel.yAlign);
							} else {
								tooltipEl.classList.add('no-transform');
							}

							function getBody(bodyItem) {
								return bodyItem.lines;
							}

							if (tooltipModel.body) {
								var titleLines = tooltipModel.title || [];
								var bodyLines = tooltipModel.body.map(getBody);
								var innerHtml = '<thead>';
								var curPoint = tooltipModel.dataPoints[0].index;
								titleLines.forEach(function(title) {
									switch (title) {
										case "M": 
										innerHtml += '<tr><th>Monday</th></tr>';
										break;
										case "T": 
										innerHtml += '<tr><th>Tuesday</th></tr>';
										break;
										case "W": 
										innerHtml += '<tr><th>Wednesday</th></tr>';
										break;
										case "T": 
										innerHtml += '<tr><th>Thursday</th></tr>';
										break;
										case "F": 
										innerHtml += '<tr><th>Friday</th></tr>';
										break;
										case "S": 
										if ( curPoint == 0 ) {
											innerHtml += '<tr><th>Sunday</th></tr>';
										} else if ( curPoint == 6 ) {
											innerHtml += '<tr><th>Saturday</th></tr>';
										}
										break;
									}
								});
								innerHtml += '</thead><tbody>';
								var counerBody = 1;
								bodyLines.forEach(function(body, i) {

									var bodyCLr, bodyTitle;

									switch (counerBody) {
										case 1:
										bodyClr = 'color-yellow';
										bodyTitle = 'Visited';
										break;
										case 2:
										bodyClr = 'color-red';
										bodyTitle = 'Registered';
										break;
										case 3:
										bodyClr = 'color-green';
										bodyTitle = 'Traded';
										break;
									}

									innerHtml += '<tr><td class="td-custom"><span class="tooltip-wrap">';
									innerHtml += '<span class="chart-top-tooltip-title ' + bodyClr
									+ '">' + bodyTitle + '</span>';
									innerHtml += '<span class="chart-top-tooltip-value">' + body + '</span>';
									innerHtml += '</span></td></tr>';
									counerBody++;

								});

								innerHtml += '</tbody>';

								var tableRoot = tooltipEl.querySelector('table');
								tableRoot.innerHTML = innerHtml;
							}

							var position = this._chart.canvas.getBoundingClientRect();
							tooltipEl.style.opacity = 1;
							tooltipEl.style.position = 'fixed';
							tooltipEl.style.left = position.left + tooltipModel.caretX + 'px';
							tooltipEl.style.top = position.top + tooltipModel.caretY + 'px';
							tooltipEl.style.fontFamily = tooltipModel._bodyFontFamily;
							tooltipEl.style.fontSize = tooltipModel.bodyFontSize + 'px';
							tooltipEl.style.fontStyle = tooltipModel._bodyFontStyle;
							tooltipEl.style.padding = tooltipModel.yPadding + 'px ' + tooltipModel.xPadding + 'px';
							tooltipEl.style.boxShadow = "0 1px 3px 1px rgba(0,0,0,0.1)";
						}



					}

				}
			});


var d1Green  = document.getElementById("diagram-p-1-green"),
d1Red    = document.getElementById("diagram-p-1-red"),
d1Yellow = document.getElementById("diagram-p-1-yellow");

d1Green.setAttribute("d", describeArc(68, 68, 58, 330, 390));
d1Red.setAttribute("d", describeArc(68, 68, 58, 30, 170));
d1Yellow.setAttribute("d", describeArc(68, 68, 58, 170, 330));

Moveit.put(d1Green, {
	start: '100%',
	end: '100%'
});
Moveit.animate(d1Green, {
	start: '0%',
	end: '100%',
	duration: 1,
	delay: 0.3,
	timing: 'ease-out'
});
Moveit.put(d1Red, {
	start: '100%',
	end: '100%'
});
Moveit.animate(d1Red, {
	start: '0%',
	end: '100%',
	duration: 1,
	delay: 0.3,
	timing: 'ease-out'
});
Moveit.put(d1Yellow, {
	start: '100%',
	end: '100%'
});
Moveit.animate(d1Yellow, {
	start: '0%',
	end: '100%',
	duration: 1,
	delay: 0.3,
	timing: 'ease-out'
});

	// REF RANK

	var dataRanks = [
	78, 100, 100
	];

	for (var i = 0; i < dataRanks.length; i++) {
		if ( dataRanks[i] == 100 ) {
			$("#ref-rank-caption-"+(i+1)).addClass('active');


		}
	}

	$("#ref-rank-circle-1").animate({
		transform : 'rotate('+ 220 +'deg)'
	}, 1000);
	$("#ref-rank-circle-1 .inner").animate({
		transform : 'rotate('+ -220 +'deg)'
	}, 1000);

	$("#ref-rank-circle-2").animate({
		transform : 'rotate('+ 270 +'deg)'
	}, 1000);
	$("#ref-rank-circle-2 .inner").animate({
		transform : 'rotate('+ -270 +'deg)'
	}, 1000);

	$("#ref-rank-circle-3").animate({
		transform : 'rotate('+ 270 +'deg)'
	}, 1000);
	$("#ref-rank-circle-3 .inner").animate({
		transform : 'rotate('+ -270 +'deg)'
	}, 1000);


	var line1  = document.getElementById("ref-rank-1"),
	line2  = document.getElementById("ref-rank-2"),
	line3  = document.getElementById("ref-rank-3"),
	line1Grey  = document.getElementById("ref-rank-1-grey"),
	line2Grey  = document.getElementById("ref-rank-2-grey"),
	line3Grey  = document.getElementById("ref-rank-3-grey");

	line1.setAttribute("d", describeArc(121, 121, 108, 0, 220));
	line1Grey.setAttribute("d", describeArc(121, 121, 108, 0, 270));
	line2.setAttribute("d", describeArc(121, 121, 72, 15, 270));
	line2Grey.setAttribute("d", describeArc(121, 121, 72, 15, 270));
	line3.setAttribute("d", describeArc(121, 121, 36, 40, 270));
	line3Grey.setAttribute("d", describeArc(121, 121, 36, 40, 270));

	Moveit.put(line1, {
		start: '99.9%',
		end: '99.9%'
	});
	Moveit.animate(line1, {
		start: '0%',
		end: '100%',
		duration: 1,
		delay: 0,
		timing: 'ease-out'
	});

	Moveit.put(line2, {
		start: '99.9%',
		end: '99.9%'
	});
	Moveit.animate(line2, {
		start: '0%',
		end: '100%',
		duration: 1,
		delay: 0,
		timing: 'ease-out'
	});

	Moveit.put(line3, {
		start: '99.9%',
		end: '99.9%'
	});
	Moveit.animate(line3, {
		start: '0%',
		end: '100%',
		duration: 1,
		delay: 0,
		timing: 'ease-out'
	});



}


if ( document.getElementById('affiliate') ) {


	$(".aff-calc-input-ref").keyup(function(){
		var curLeg = $(this).data('leg');
		var l1 = $("#in-l-1").val() || $("#in-l-1").attr('placeholder');
		var l2 = $("#in-l-2").val() || $("#in-l-2").attr('placeholder');
		var l3 = $("#in-l-3").val() || $("#in-l-3").attr('placeholder');
		l1 = +(l1.replace('$', ''));
		l2 = +(l2.replace('$', ''));
		l3 = +(l3.replace('$', ''));
		var lSum = l1 + l2 + l3;

		$("#plus-l").text('+$'+ lSum);

		$("#ref-1-l").text('+$'+ l1);
		$("#ref-2-l").text('+$'+ l2);
		$("#ref-3-l").text('+$'+ l3);

		var r1 = $("#in-r-1").val() || $("#in-r-1").attr('placeholder');
		var r2 = $("#in-r-2").val() || $("#in-r-2").attr('placeholder');
		var r3 = $("#in-r-3").val() || $("#in-r-3").attr('placeholder');
		r1 = +(r1.replace('$', ''));
		r2 = +(r2.replace('$', ''));
		r3 = +(r3.replace('$', ''));
		var rSum = r1 + r2 + r3;

		$("#plus-r").text('+$'+ rSum);

		$("#ref-1-r").text('+$'+ r1);
		$("#ref-2-r").text('+$'+ r2);
		$("#ref-3-r").text('+$'+ r3);

		if ( lSum >= rSum ) {
			$("#ref-sum-1").text('$'+lSum);
			$("#ref-sum-2").text('$'+rSum);
			$("#ref-sum-dif").text('$'+(lSum - rSum));
		} else {
			$("#ref-sum-1").text('$'+rSum);
			$("#ref-sum-2").text('$'+lSum);
			$("#ref-sum-dif").text('$'+(rSum - lSum));
		}

		


		if ( curLeg == 'left' ) {

			$("#ref-sum-l").val('$'+ (l1 + l2 + l3));
		} else {

			$("#ref-sum-r").val('$'+ (r1 + r2 + r3));
		}
	})

	setEqualH($(".aff-advs .aff-advs-item"));
	setEqualH($(".aff-bottom .aff-advs-item"));

	var contentW = $(".aff-steps").innerWidth() - 320;

	if ( $(window).width() < 1250 ) {
		contentW = $(".aff-steps").innerWidth() - 60
	}

	if ( $(window).width() < 550 ) {
		$(".aff-calc-right").wrap("<div style='overflow-x: auto;' class='aff-wrap'></div>");
	}

	var stepW = $(".aff-step").outerWidth();

	$(".aff-step-side").css({
		'left' : -(contentW - stepW)
	});

	$(window).resize(function(){
		setEqualH($(".aff-advs .aff-advs-item"));
		setEqualH($(".aff-bottom .aff-advs-item"));

		var contentW = $(".aff-steps").innerWidth() - 320;

		if ( $(window).width() < 1250 ) {
			contentW = $(".aff-steps").innerWidth() - 60
		}

		var stepW = $(".aff-step").outerWidth();

		$(".aff-step-side").css({
			'left' : -(contentW - stepW)
		});
	})

	$(".aff-step").each(function(index){
		var curH = $(this).find('.aff-step-main').outerHeight() - 8;
		$(this).find('.aff-step-marker').css({
			'width' : curH
		});
		document.getElementById('c'+ (index + 1)).setAttribute("d", describeArc(46, 46, 45, 0, 359));
	});

}

if ( document.getElementById('acc-log') ) {


	
	$(".acc-log-form").submit(function(e){
		e.preventDefault();
		if ( Boolean($("#singup").get(0))) {

			$("#referrer").parents('.acc-log-form-block').addClass('success');
			$("#country-select").parents('.acc-log-form-block').addClass('success');

			$("#password").change(function(){
				validateAccountInput($(this), /^[\w\d\[\{\(\<\>\,\.\/\\\+\=\-\*\&\^\%\$\#\@\'\?\|\"\!\~\`\:\;\)\}\]]{8,}$/);
			});

			$("#password").keyup(function(){
				validateAccountInput($(this), /^[\w\d\[\{\(\<\>\,\.\/\\\+\=\-\*\&\^\%\$\#\@\'\?\|\"\!\~\`\:\;\)\}\]]{8,}$/);
			});
			var password = validateAccountInput($("#password"), /^[\w\d\[\{\(\<\>\,\.\/\\\+\=\-\*\&\^\%\$\#\@\'\?\|\"\!\~\`\:\;\)\}\]]{8,}$/);

			var login = validateAccountInput($("#login"), /^[\w]{6,}$/);
			
			$("#login").change(function(){
				validateAccountInput($(this), /^[\w]{6,}$/);
			});

			$("#login").keyup(function(){
				validateAccountInput($(this), /^[\w]{6,}$/);
			});

			var email = validateAccountInput($("#email"), /^[\w\.]{0,}[\w]{1,}@[\w]{1,}\.[\w]{1,}$/);

			$("#email").keyup(function() {
				validateAccountInput($(this), /^[\w\.]{0,}[\w]{1,}@[\w]{1,}\.[\w]{1,}$/);
			});

			$("#email").change(function() {
				validateAccountInput($(this), /^[\w\.]{0,}[\w]{1,}@[\w]{1,}\.[\w]{1,}$/);
			});

			var country = validateAccountInput($("#country-select"), /^[\w]{2}$/);

			$("#country-select").change(function(){
				validateAccountInput($(this), /^[\w]{2}$/);
			});

			$("#country-select").keyup(function(){
				validateAccountInput($(this), /^[\w]{2}$/);
			});


			if ( email && login && password && country) {
				$(this).fadeOut(500);
				$(".acc-log-left-title").fadeOut(500);
				setTimeout(function(){
					$("#success").toggleClass('air-popup-hide');
				}, 500);
			}
		} 

		if (Boolean($("#singin").get(0)) ) {

			$("#password").change(function(){
				validateAccountInput($(this), /^[\w\d\[\{\(\<\>\,\.\/\\\+\=\-\*\&\^\%\$\#\@\'\?\|\"\!\~\`\:\;\)\}\]]{8,}$/);
			});

			$("#password").keyup(function(){
				validateAccountInput($(this), /^[\w\d\[\{\(\<\>\,\.\/\\\+\=\-\*\&\^\%\$\#\@\'\?\|\"\!\~\`\:\;\)\}\]]{8,}$/);
			});
			var password = validateAccountInput($("#password"), /^[\w\d\[\{\(\<\>\,\.\/\\\+\=\-\*\&\^\%\$\#\@\'\?\|\"\!\~\`\:\;\)\}\]]{8,}$/);

			var login = validateAccountInput($("#login"), /^[\w\d\[\{\(\<\>\,\.\/\\\+\=\-\*\&\^\%\$\#\@\'\?\|\"\!\~\`\:\;\)\}\]]{6,}$/);
			
			$("#login").change(function(){
				validateAccountInput($(this), /^[\w\d\[\{\(\<\>\,\.\/\\\+\=\-\*\&\^\%\$\#\@\'\?\|\"\!\~\`\:\;\)\}\]]{6,}$/);
			});

			$("#login").keyup(function(){
				validateAccountInput($(this), /^[\w\d\[\{\(\<\>\,\.\/\\\+\=\-\*\&\^\%\$\#\@\'\?\|\"\!\~\`\:\;\)\}\]]{6,}$/);
			});

			if ( login && password ) {
				$(this).fadeOut(500);
				$(".acc-log-left-title").fadeOut(500);
				setTimeout(function(){
					$("#success").toggleClass('air-popup-hide');
				}, 500);
			}

		}

		if (Boolean($("#passrec").get(0)) ) {
			var login = validateAccountInput($("#login"), /^[\w\d\[\{\(\<\>\,\.\/\\\+\=\-\*\&\^\%\$\#\@\'\?\|\"\!\~\`\:\;\)\}\]]{6,}$/);
			
			$("#login").change(function(){
				validateAccountInput($(this), /^[\w\d\[\{\(\<\>\,\.\/\\\+\=\-\*\&\^\%\$\#\@\'\?\|\"\!\~\`\:\;\)\}\]]{6,}$/);
			});

			$("#login").keyup(function(){
				validateAccountInput($(this), /^[\w\d\[\{\(\<\>\,\.\/\\\+\=\-\*\&\^\%\$\#\@\'\?\|\"\!\~\`\:\;\)\}\]]{6,}$/);
			});
			if ( login ) {
				$(this).fadeOut(500);
				$(".acc-log-left-title").fadeOut(500);
				setTimeout(function(){
					$("#success").toggleClass('air-popup-hide');
				}, 500);
			}
		}
		



		

		//if ( Boolean($("#select-country").get(0)) ) {

			

			//validateAccountInput($("#select-country"), /^[\w]{2}$/);

			// $("#select-country").change(function(){
			// validateAccountInput($(this), /^[\w]{2}$/);
			// });

			// $("#select-country").keyup(function(){
			// 	validateAccountInput($(this), /^[\w]{2}$/);
			// });

			

		// } else {
		// 	validateAccountInput($("#login"), /^[\w\d\[\{\(\<\>\,\.\/\\\+\=\-\*\&\^\%\$\#\@\'\?\|\"\!\~\`\:\;\)\}\]]{6,}$/);

		// 	$("#login").change(function(){
		// 		validateAccountInput($(this), /^[\w\d\[\{\(\<\>\,\.\/\\\+\=\-\*\&\^\%\$\#\@\'\?\|\"\!\~\`\:\;\)\}\]]{6,}$/);
		// 	});

		// 	$("#login").keyup(function(){
		// 		validateAccountInput($(this), /^[\w\d\[\{\(\<\>\,\.\/\\\+\=\-\*\&\^\%\$\#\@\'\?\|\"\!\~\`\:\;\)\}\]]{6,}$/);
		// 	});

		// }
		
		
	})

$(".acc-log-left").css({
	'height' : $(".acc-log-right").outerHeight()
});

$(window).resize(function(){
	$(".acc-log-left").css({
		'height' : $(".acc-log-right").outerHeight()
	});
});

$(".acc-log-form-field").focus(function(){
	$(this).parents(".acc-log-form-block").addClass('focus');
});
$(".acc-log-form-field").blur(function(){
	$(this).parents(".acc-log-form-block").removeClass('focus');
});




function setCountry() {
	var cur_lng = $("#country-select").val();
	var select = $("#country-select").siblings(".nice-select");
	select.find('.current').attr('class', 'flag-icon-'+cur_lng+' flag-icon-background current');
	select.find('.list li').each(function(){
		$(this).addClass('flag-icon-'+$(this).data('value')+' flag-icon-background');
	});
}

$("#country-select").change(function(){
	setCountry();
});

setCountry();

$(".acc-log-form-eye").click(function(){

	if ($(this).hasClass('active')) {
		$(this).siblings(".acc-log-form-field").attr('type', 'password');
	} else {
		$(this).siblings(".acc-log-form-field").attr('type', 'text');
	}

	$(this).toggleClass('active');

})

}

if (document.getElementById('topups')) {

	$(".popup-dep-input-usd").keyup(function(){
		var curV = $(this).val();
		curV = Math.ceil((curV*0.0001)*10000000)/10000000;
		$(this).siblings(".popup-dep-input-cur").find("span").text(curV);
	});
	$(".popup-dep-input-usd").keyup(function(){
		var curV = $(this).val();
		curV = Math.ceil((curV*0.0001)*10000000)/10000000;
		$(this).siblings(".popup-dep-input-cur").find("span").text(curV);
	});

	function copyToClipboard(target) {
		var rng, sel;
		if (document.createRange) {
			rng = document.createRange();
			rng.selectNode(target)
			sel = window.getSelection();
			sel.removeAllRanges();
			sel.addRange(rng);
			document.execCommand('copy');
		} else {
			var rng = document.body.createTextRange();
			rng.moveToElementText(target);
			rng.select();
		} 
	}

	$(".popup-payment-copy").click(function(){

		if ( $(this).siblings('.popup-payment-amount-value')[0] ) {
			copyToClipboard($(this).siblings('.popup-payment-amount-value').find('span')[0]);
			$(this).parents('.popup-payment').addClass('success');
			$(".popup-payment-success").text("Amount copied to clipboard");
		} else {
			copyToClipboard($(this).siblings('.popup-payment-address-value')[0]);
			$(this).parents('.popup-payment').addClass('success');
			$(".popup-payment-success").text("Address copied to clipboard");
		}

	})

	$(".popup-payment-qr").click(function(e){
		e.preventDefault();
		$(this).parents(".air-popup").toggleClass('air-popup-hide');
		setTimeout(function(){
			$("#popup-qr").toggleClass('air-popup-hide');
		}, 250);
	});

	$("#d-1").submit(function(e){
		e.preventDefault();
		$(this).parents(".air-popup").toggleClass('air-popup-hide');
		setTimeout(function(){
			$("#deposit-2").toggleClass('air-popup-hide');
		}, 250);
	});

	$("#d-2").submit(function(e){
		e.preventDefault();
		$(this).parents(".air-popup").toggleClass('air-popup-hide');
		setTimeout(function(){
			$("#dep-s").toggleClass('air-popup-hide');
		}, 250);
	});

	$("#with").submit(function(e){
		e.preventDefault();
		$(this).parents(".air-popup").toggleClass('air-popup-hide');
		setTimeout(function(){
			$("#with-s").toggleClass('air-popup-hide');
		}, 250);
	});

}

if (document.getElementById('not-popup')) {

	function copyToClipboard(target) {
	var rng, sel;
	if (document.createRange) {
		rng = document.createRange();
		rng.selectNode(target)
		sel = window.getSelection();
		sel.removeAllRanges();
		sel.addRange(rng);
		document.execCommand('copy');
	} else {
		var rng = document.body.createTextRange();
		rng.moveToElementText(target);
		rng.select();
	} 
}
	$(".popup-payment-copy").click(function(){

		if ( $(this).siblings('.popup-payment-amount-value')[0] ) {
			copyToClipboard($(this).siblings('.popup-payment-amount-value').find('span')[0]);
			$(this).parents('.popup-payment').addClass('success');
			$(".popup-payment-success").text("Amount copied to clipboard");
		} else {
			copyToClipboard($(this).siblings('.popup-payment-address-value')[0]);
			$(this).parents('.popup-payment').addClass('success');
			$(".popup-payment-success").text("Address copied to clipboard");
		}

	})
}

if (document.getElementById('banner')) {
	$(".banner-cur-select").each(function(){
		var curVal = $(this).val();
		$(this).siblings(".nice-select").find(".current").attr('class', 'current icon-'+curVal);
	});

	$(".banner-cur-select .list li").each(function(){
		$(this).addClass('icon-' + $(this).data('value'));
	});

	$(".banner-cur-select").change(function(){
		var curVal = $(this).val();
		$(this).siblings(".nice-select").find(".current").attr('class', 'current icon-'+curVal);
	});


	$("#banner-form").submit(function(){

		var icon1 = $("#banner-select-1").val();
		$("#cur-1").attr('class', 'banner-cur-icon icon-'+icon1);
		var icon2 = $("#banner-select-2").val();
		$("#cur-2").attr('class', 'banner-cur-icon icon-'+icon2);



		$(".acc-log-form-field").each(function(){
			var val = $(this).val();
			var field = $(this).data('field');

			if ( $(this).hasClass('in-usd') ) {
				$("#"+field).text("$" + val);
			} else if ($(this).hasClass('in-usd-plus')) {
				$("#"+field).text("+ $" + val);
			} else if ($(this).hasClass('in-per-plus')) {
				$("#"+field).text("+ " + val+"%");
			} else if ($(this).hasClass('in-per')) {
				$("#"+field).text(val+"%");
			} else {
				$("#"+field).text(val);
			}

		});
		$("#banner").toggleClass('air-popup-hide');

	});

function filter(node){
	 // return ($(node).hasClass('btn-screen') !== true);
}

	$("#screen").click(function(){
		var el = $(this);

	if ( !el.hasClass('loading') ) {
		el.addClass('loading');

	}

	var screenTarget = $("#frame").get(0);
	domtoimage.toPng(screenTarget).then(function (dataUrl) {
    var img = new Image();
    img.src = dataUrl;
    $("#image-chart").html(img);
	setTimeout(function(){
		domtoimage.toPng($("#image-chart img").get(0), { quality: 1, bgcolor: '#ffffff' })
	    .then(function (dataUrl) {
	        var link = document.createElement('a');
	        link.download = 'banner.png';
	        link.href = dataUrl;
	        link.click();
	        	el.removeClass('loading');
	      
	    });
	}, 500);
	});
	})

}


if (document.getElementById('settings')) {

	$(".form-radio-button").click(function(){

		if ( $(this).hasClass('active') ) {
			$(this).siblings(".form-radio-input").val('false');
			$(this).toggleClass('active');
		} else {
			$(this).siblings(".form-radio-input").val('true');
			$(this).toggleClass('active');
		}

		
		
	});

	$(".acc-log-form-correct").click(function(){
		if ( !$(this).hasClass('active') ) {
			$(this).siblings('input').prop('disabled', false);
			$(this).siblings('input').focus();
		}

		$(this).addClass('active');
	});

	$(".acc-log-form-field").blur(function(){
		if ( !$(this).hasClass('not-disabled') ) {
			$(this).prop('disabled', true);
			$(this).siblings('.acc-log-form-correct').removeClass('active');
		}
		
	})
	

	$("#percent").keyup(function(){
		var curVal = $(this).val();
		var curValL = (curVal.length - 4)*7;

		if (curVal.length > 5) {
			$(this).val(curVal.substr(0, 5));
		}

		$(this).siblings(".acc-log-form-percent").css({
			'left' : (44 + curValL) + 'px'
		});
		$(this).siblings(".acc-log-form-triangle").css({
			'left' : (43 + curValL) + 'px'
		});

	});

	$(".acc-log-form-field").focus(function(){
		$(this).parents(".acc-log-form-block").addClass('focus');
	});
	$(".acc-log-form-field").blur(function(){
		$(this).parents(".acc-log-form-block").removeClass('focus');
	});

	$('#phone-ver').mask("9  9  9  9  9  9", {autoclear: false});
	$(".popup-ver").submit(function(e){
		e.preventDefault();
		//var l = validateAccountInput($("#phone-ver"), /^[\w]{6}$/);

		var val = $("#phone-ver").val();
		val = val.replace(/\s+/g, '');
		console.log(val);
		if ( val == '123456' ) {
			$(this).find(".popup-ver-block").addClass('success').removeClass('error');
			$(this).parents(".air-popup").toggleClass('air-popup-hide');
			setTimeout(function(){
				$("#success-ver").toggleClass('air-popup-hide');
				$(".acc-log-form-verify-btn").remove();
				$(".acc-log-form-status").removeClass('red').addClass('green').text("Verified");
			}, 250);
		} else {
			$(this).find(".popup-ver-block").addClass('error');
		}
	});

	$("#phone").blur(function(){
		var phone = validateAccountInput($(this), /^[\d]{11}$/);
		$(this).change(function(){
			validateAccountInput($(this), /^[\d]{11}$/);
		});
		$(this).keyup(function(){
			validateAccountInput($(this), /^[\d]{11}$/);
		});
		if ( $(this).val() == '' ) {
			$(this).parents(".acc-log-form-block").removeClass('error');
			$(this).parents(".acc-log-form-block").removeClass('success');
		}

		if (phone) {
			$(this).siblings(".acc-log-form-verify-btn").addClass('active');
		} else {
			$(this).siblings(".acc-log-form-verify-btn").removeClass('active');
		}
	});

	$("#password-new").blur(function(){
		

		validateAccountInput($(this), /^[\w\d\[\{\(\<\>\,\.\/\\\+\=\-\*\&\^\%\$\#\@\'\?\|\"\!\~\`\:\;\)\}\]]{8,}$/);

		$(this).change(function(){
			validateAccountInput($(this), /^[\w\d\[\{\(\<\>\,\.\/\\\+\=\-\*\&\^\%\$\#\@\'\?\|\"\!\~\`\:\;\)\}\]]{8,}$/);
		});
		$(this).keyup(function(){
			validateAccountInput($(this), /^[\w\d\[\{\(\<\>\,\.\/\\\+\=\-\*\&\^\%\$\#\@\'\?\|\"\!\~\`\:\;\)\}\]]{8,}$/);
		});
		if ( $(this).val() == '' ) {
			$(this).parents(".acc-log-form-block").removeClass('error');
			$(this).parents(".acc-log-form-block").removeClass('success');
		}
	});

	$("#password").blur(function(){
		
		validateAccountInput($(this), /^[\w\d\[\{\(\<\>\,\.\/\\\+\=\-\*\&\^\%\$\#\@\'\?\|\"\!\~\`\:\;\)\}\]]{8,}$/);

		$(this).change(function(){
			validateAccountInput($(this), /^[\w\d\[\{\(\<\>\,\.\/\\\+\=\-\*\&\^\%\$\#\@\'\?\|\"\!\~\`\:\;\)\}\]]{8,}$/);
		});
		$(this).keyup(function(){
			validateAccountInput($(this), /^[\w\d\[\{\(\<\>\,\.\/\\\+\=\-\*\&\^\%\$\#\@\'\?\|\"\!\~\`\:\;\)\}\]]{8,}$/);
		});
		
		if ( $(this).val() == '' ) {
			$(this).parents(".acc-log-form-block").removeClass('error');
			$(this).parents(".acc-log-form-block").removeClass('success');
		}
	});

	$("#cur1").blur(function(){
		validateAccountInput($("#cur1"), /^[\w]{25,}$/);
		$(this).change(function(){
			validateAccountInput($("#cur1"), /^[\w]{25,}$/);
		});
		$(this).keyup(function(){
			validateAccountInput($("#cur1"), /^[\w]{25,}$/);
		});
		if ( $(this).val() == '' ) {
			$(this).parents(".acc-log-form-block").removeClass('error');
			$(this).parents(".acc-log-form-block").removeClass('success');
		}
		
	});

	$("#cur2").blur(function(){
		validateAccountInput($("#cur2"), /^[\w]{40,}$/);
		$(this).change(function(){
			validateAccountInput($("#cur2"), /^[\w]{40,}$/);
		});
		$(this).keyup(function(){
			validateAccountInput($("#cur2"), /^[\w]{40,}$/);
		});
		if ( $(this).val() == '' ) {
			$(this).parents(".acc-log-form-block").removeClass('error');
			$(this).parents(".acc-log-form-block").removeClass('success');
		}
	});

	$("#cur3").blur(function(){
		validateAccountInput($("#cur3"), /^[\w]{40,}$/);
		$(this).change(function(){
			validateAccountInput($("#cur3"), /^[\w]{40,}$/);
		});
		$(this).keyup(function(){
			validateAccountInput($("#cur3"), /^[\w]{40,}$/);
		});
		if ( $(this).val() == '' ) {
			$(this).parents(".acc-log-form-block").removeClass('error');
			$(this).parents(".acc-log-form-block").removeClass('success');
		}
	});

	$("#cur4").blur(function(){
		validateAccountInput($("#cur4"), /^[\w]{25,}$/);
		$(this).change(function(){
			validateAccountInput($("#cur4"), /^[\w]{25,}$/);
		});
		$(this).keyup(function(){
			validateAccountInput($("#cur4"), /^[\w]{25,}$/);
		});
		if ( $(this).val() == '' ) {
			$(this).parents(".acc-log-form-block").removeClass('error');
			$(this).parents(".acc-log-form-block").removeClass('success');
		}
	});

	$("#cur5").blur(function(){
		validateAccountInput($("#cur5"), /^[\w]{33,}$/);
		$(this).change(function(){
			validateAccountInput($("#cur5"), /^[\w]{33,}$/);
		});
		$(this).keyup(function(){
			validateAccountInput($("#cur5"), /^[\w]{33,}$/);
		});
		if ( $(this).val() == '' ) {
			$(this).parents(".acc-log-form-block").removeClass('error');
			$(this).parents(".acc-log-form-block").removeClass('success');
		}
	});

	$("#cur6").blur(function(){
		validateAccountInput($("#cur6"), /^[\w]{40,}$/);
		$(this).change(function(){
			validateAccountInput($("#cur6"), /^[\w]{40,}$/);
		});
		$(this).keyup(function(){
			validateAccountInput($("#cur6"), /^[\w]{40,}$/);
		});
		if ( $(this).val() == '' ) {
			$(this).parents(".acc-log-form-block").removeClass('error');
			$(this).parents(".acc-log-form-block").removeClass('success');
		}
	});

	$("#cur7").blur(function(){
		validateAccountInput($("#cur7"), /^[\w]{25,}$/);
		$(this).change(function(){
			validateAccountInput($("#cur7"), /^[\w]{25,}$/);
		});
		$(this).keyup(function(){
			validateAccountInput($("#cur7"), /^[\w]{25,}$/);
		});
		if ( $(this).val() == '' ) {
			$(this).parents(".acc-log-form-block").removeClass('error');
			$(this).parents(".acc-log-form-block").removeClass('success');
		}
	});

	$(".settings-form").submit(function(e){
		e.preventDefault();

		if ($(".acc-log-form-block").hasClass('error')) {

			$(".acc-log-form-block.error").find('input').prop('disabled', false);
			$(".acc-log-form-block.error").find('input').focus();

		} else if ( $("#password").val() == '' && $("#password-new").val() != '' ) {
			$("#password").prop('disabled', false);
			$("#password").focus();
		} else {
			$("#success").toggleClass('air-popup-hide');
		}

		
	})

}




});

function copyToClipboard(target) {
	var rng, sel;
	if (document.createRange) {
		rng = document.createRange();
		rng.selectNode(target)
		sel = window.getSelection();
		sel.removeAllRanges();
		sel.addRange(rng);
		document.execCommand('copy');
	} else {
		var rng = document.body.createTextRange();
		rng.moveToElementText(target);
		rng.select();
	} 
}

function validateAccountInput(input, regExp) {
	var target = input.parents('.acc-log-form-block');
	var cur_val = input.val();

	if ( !cur_val.match(regExp) ) {
		target.removeClass('success');
		target.addClass('error');
		return false;
	} else  {
		target.removeClass('error');
		target.addClass('success');
		return true;
	}
}

function setEqualH(el){
	var elMax = parseInt(el.outerHeight());
	el.each(function(){
		if ( parseInt($(this).outerHeight()) > elMax ) {
			elMax =  parseInt($(this).outerHeight());
		}
	});

	el.css({
		'height' : elMax+'px'
	});
}

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


function watchLength($input, prefix){

	$input.change(function(){
		var curLength = $(this).val().length;
		var fadeTarget = $(this).siblings("."+prefix+"input-after");
		if ( fadeTarget.hasClass(prefix+'input-after_copy') ) {
			if ( curLength >= 22 ) {
				fadeTarget.addClass('fade');
			} else if (fadeTarget.hasClass('fade')) {
				fadeTarget.removeClass('fade');
			}
		} else {
			if ( curLength >= 32 ) {
				fadeTarget.addClass('fade');
			} else if (fadeTarget.hasClass('fade')) {
				fadeTarget.removeClass('fade');
			}
		}
	});

	$input.keyup(function(){

		var curLength = $(this).val().length;
		var fadeTarget = $(this).siblings("."+prefix+"input-after");
		var textRight = $(this).siblings("."+prefix+"input-after").text();
		if ( fadeTarget.hasClass(prefix+'input-after_copy') ) {
			if ( curLength >= (41 - textRight.length) ) {
				
				fadeTarget.addClass('fade');
			} else if (fadeTarget.hasClass('fade')) {
				
				fadeTarget.removeClass('fade');
			}
		} else {
			if ( curLength >= (36 - textRight.length)) {
				
				fadeTarget.addClass('fade');
			} else if (fadeTarget.hasClass('fade')) {
				
				fadeTarget.removeClass('fade');
			}
		}
	})
	
}