$(document).ready(function(){

	initPopups();
	


	$('.up-btn').click(function(){ 
		setTimeout(function(){
			$('html,body').animate({ scrollTop: 0 }, 1000);
			return false; 
		}, 200);

	});

	$("form, a").submit(function(e){
		e.preventDefault();
	});

	$("select").niceSelect();

	Waves.init({
		duration: 500
	});

	Waves.attach('.waves-on', 'waves-light');
	Waves.attach('.waves-on-light', 'waves-burger');

	$("#video-btn").click(function(){
		videoOpen($(this));
	})

	function videoOpen(input) {
		var video_link = input.data('video');

		if (video_link) {

			var num_main = video_link.indexOf('?v=');

			video_link = video_link.substring(num_main+3);

			num_main = video_link.indexOf('&');

			if (num_main!=-1) {
				video_link = video_link.substring(0, num_main);
				video_link = "https://www.youtube.com/embed/" + video_link;
			} else {
				video_link = "https://www.youtube.com/embed/" + video_link;
			}

			$("#video").find("iframe").attr('src', video_link+'?autoplay=1');
		}
		setTimeout(function(){
			videoHeight();
		}, 700);

	}

	function videoHeight() {
		var cur_w = $(".air-popup-content").width();
		$(".air-popup-content").css({
			height: (cur_w/16)*9
		});
	}


	// ADAPTIVE 

	$(".header-burger").click(function(){
		$(this).toggleClass('active');
		$(".header-mobile-wrapper").toggleClass('active');
		$(".header-mobile").toggleClass('active');


	});

	$(window).resize(function(){
		if ($(window).width() < 1250) {


			if ( $(window).width() < 768 ) {
				$(".chart-wrapper").css({'max-width': $(window).width() - 50, 'width' : $(window).width() - 50});
			} else if ( $(window).width() < 1200 ) {
				$(".chart-wrapper").css({'max-width': $(window).width() - 100, 'width' : $(window).width() - 100});
			}


		}
	});

	if ($(window).width() < 1250) {


		if ( $(window).width() < 768 ) {
			$(".chart-wrapper").css({'max-width': $(window).width() - 50, 'width' : $(window).width() - 50});
		} else if ( $(window).width() < 1200 ) {
			$(".chart-wrapper").css({'max-width': 280, 'width' : 280});
		}


	}

	if ($(window).width() > 1250 ) {
		$(".chart-wrapper").each(function(){
			$(this).css({
				'width' : $(this).width()
			})
		});
	}

	if ( $(window).width() < 1250 ) {

		$(".tab-table").each(function(){
			$(this).wrap('<div class="table-wrapper" style="overflow-x: auto; padding-bottom: 3px;" />');
		});

		$(window).resize(function(){

			if ( $(window).width() < 768 ) {
				var cur_w = $(window).width() - 30;
			} else if ( $(window).width() < 1249 ) {
				var cur_w = $(window).width() - 120;
			}

			$(".table-wrapper").css({
				'width': cur_w
			});

		});

		if ( $(window).width() < 768 ) {
			var cur_w = $(window).width() - 30;
		} else if ( $(window).width() < 1025 ) {
			var cur_w = $(window).width() - 120;
		}

		$(".table-wrapper").css({
			'width': cur_w
		});


	} 


	//  Language Switcher 

	function setLanguage(select) {
		var cur_lng = select.val();
		var nice_select = select.siblings(".nice-select");

		nice_select.find('.current').attr('class', 'flag-icon-'+cur_lng+' flag-icon-background current');
		nice_select.find('.list li').each(function(){
			$(this).addClass('flag-icon-'+$(this).data('value')+' flag-icon-background');
		});
	}

	$("#language, #language-mobile").change(function(){
		setLanguage($(this));
	});

	setLanguage($("#language, #language-mobile"));

	if ( document.getElementById('home-page') ) {
		



	// TABLES 

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

	// CHART TOP 

	var barChartTopData = {
		labelsX : ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
		dataTrading : [53, 41, 143, 23, 122, 123, 56]
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
							min: 8,
							stepSize: 50,
							callback: function(value, index, values) {
								if (value <= 10) {
									return 0;
								} else {
									return value;
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
});

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
}

	// FUNCS 

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
				$("#video").find("iframe").attr('src', '');

			});

			$(document).on('click.air-popup-wrapper', function(e){
				if ( $(e.target).attr('class').indexOf('air-popup-wrapper') != -1 ) {
					$(e.target).parents(".air-popup").toggleClass('air-popup-hide');
					$("#video").find("iframe").attr('src', '');
				}
			})

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
				case 'tradingpair':
				curCell.find(".cell-pair-item:nth-child(1) cell-company").text(row.tradingpair.company1);
				curCell.find(".cell-pair-item:nth-child(2) cell-company").text(row.tradingpair.company2);
				curCell.find(".cell-pair-item:nth-child(1) cell-icon").attr('class', 'cell-icon icon-'+row.tradingpair.cur1);
				curCell.find(".cell-pair-item:nth-child(2) cell-icon").attr('class', 'cell-icon icon-'+row.tradingpair.cur2);
				break;
				case 'username':
				if ( row.usernamestatus ) {
					curCell.find(".username-country").attr('class', 'username-country flag-icon-'+row.usernamestatus.country+' flag-icon-background');
					curCell.find(".username-title").text(row.usernamestatus.name);
					curCell.find(".username-status").text('('+row.usernamestatus.verified+')');
					if ( row.usernamestatus.verified == 'verified' ) {
						curCell.find(".username-status").attr('class', 'username-status green');
					} else {
						curCell.find(".username-status").attr('class', 'username-status red');
					}

				} else {
					curCell.find(".username-country").attr('class', 'username-country flag-icon-'+row.username.country+' flag-icon-background');
					curCell.find(".username-title").text(row.username.name);
				}

				break;

				case "transaction": 
				curCell.text(row.profit);
				break;
				case "amountusd/crypto": 
				curCell.html('<span class="green">'+row.amountcryto.usd+'</span> / '+row.amountcryto.crypto);
				break;
				case "coinid":
				curCell.find("div.cell-icon").attr('class','cell-icon icon-'+row.coinid.cur);
				curCell.find("a.cell-icon").attr('href', row.coinid.info);
				break;
				case "buysellprice": 
				curCell.find(".red").text(row.buysellprice.buy);
				curCell.find(".green").text(row.buysellprice.sell);
				break;
				case "pureprofit":
				curCell.html('<span class="green">'+row.purpro.usd+'</span> ('+row.purpro.percents+')');
				break;
				case "traders":
				curCell.find(".cell-ic-txt-text").text(row.traders);
				break;
				case "profit%":
				curCell.find("span").text(row.profitp);
				break;
				case "volume24h": 
				if (row.volred) {
					curCell.find(".cell-ic-txt-text").text(row.volred);
				} else {
					curCell.text(row.volh);
				}
				break;
				case "totalprofit": 
				curCell.find("span").text(row.totalprofit);
				break;
				case "trades":
				curCell.find(".cell-ic-txt-text").text(row.trades);
				break;
				case "amount":
				curCell.find("span").text(row.amountgreen);
				break;
				case "amount":
				if (row.amountgreen) {
					curCell.find("span").text(row.amountgreen);
				} else {
					curCell.find(".cell-ic-txt-text").text(row.amounticon);
				}
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
		username: {
			country: "pt",
			name: "Carlos"
		},
		profit: 'Profit',
		amountcryto: {
			usd: '$ 0.00',
			crypto: '0.00000000'
		},
		coinid: {
			cur: 'btc',
			info: 'http://google.ru'
		}
	},
	dataRow2 = {
		date: '21/11/11 11:39:51',
		username: {
			country: "pt",
			name: "Carlos"
		},
		tradingpair: {
			cur1: 'eth',
			company1: 'Poloniex',
			cur2: 'eth',
			company2: 'Coinbase'
		},
		buysellprice: {
			buy: "$ 234.00",
			sell: "$ 328.00"
		},
		purpro: {
			usd: "$ 121.00",
			percents: "2,7%"
		}
	},
	dataRow3 = {
		date: '21/11/11 11:39:51',
		tradingpair: {
			cur1: 'eth',
			company1: 'Poloniex',
			cur2: 'eth',
			company2: 'Coinbase'
		},
		traders: '1923',
		profitp: '2.8%',
		volh: "$ 218973.00",
		totalprofit: "$ 2189.00"
	},
	dataRow4 = {
		date: '21/11/11 11:39:51',
		usernamestatus: {
			country: "pt",
			name: "Carlos",
			verified: "unverified"
		},
		trades: "1223",
		volred: "$ 2189.00",
		purpro: {
			usd: "$ 121.00",
			percents: "2,7%"
		}
	},
	dataRow5 = {
		date: '21/11/11 11:39:51',
		usernamestatus: {
			country: "pt",
			name: "Carlos",
			verified: "verified"
		},
		amountgreen: "$ 2189.00"
	},
	dataRow6 = {
		usernamestatus: {
			country: "pt",
			name: "Carlos",
			verified: "verified"
		},
		amountgreen: "$ 2189.00"
	},
	dataRow7 = {
		usernamestatus: {
			country: "pt",
			name: "Carlos",
			verified: "verified"
		},
		amounticon: "2121"
	};



	 // setInterval(function() {
 	// 	addTableRow( $("#table1"), dataRow1 );
 	// 	addTableRow( $("#table2"), dataRow2 );
 	// 	addTableRow( $("#table3"), dataRow3 );
 	// 	addTableRow( $("#table4"), dataRow4 );
 	// 	addTableRow( $("#table5"), dataRow5 );
 	// 	addTableRow( $("#table6"), dataRow6 );
 	// 	addTableRow( $("#table7"), dataRow7 );

 	// }, 3000);

 	if (document.getElementById('partnership')) {


 		$(".copy-link").click(function(e){
 			e.preventDefault();
 			var tar = $(this).siblings(".text-to-copy")[0];
 			copyToClipboard(tar);
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

 		if ( $(window).width() < 1024 ) {

 			$(window).resize(function(){
 				if ( $(window).width() > 767 ) {

 					var cur_w = $(window).width() - 60;

 					$(".table-wrapper").css({
 						'width': cur_w
 					});

 				}
 			})

 			if ( $(window).width() > 767 ) {

 				var cur_w = $(window).width() - 60;

 				$(".table-wrapper").css({
 					'width': cur_w
 				});

 			}
 		}

 		var owl = $(".clocks-wrapper");

 		owl.owlCarousel({
 			loop: true,
 			center: true,
 			startPosition: 1,
 			items: 5,
 			touchDrag: false,
 			mouseDrag: false,
 			responsive: {
 				0: {
 					items: 1,
 					touchDrag: true
 				},
 				898: {
 					items: 3,
 					touchDrag: true
 				},
 				1200: {
 					items: 5,
 					touchDrag: false
 				}
 			}
 		});

 		$(".owl-item.center").prev(".owl-item").addClass("near-prev");
 		$(".owl-item.center").prev(".owl-item").prev(".owl-item").addClass("near-prev-prev");
 		$(".owl-item.center").next(".owl-item").addClass("near-next");
 		$(".owl-item.center").next(".owl-item").next(".owl-item").addClass("near-next-next");



 		owl.on('changed.owl.carousel', function(event) {
 			$(".owl-item.near-prev").removeClass('near-prev');
 			$(".owl-item.near-next").removeClass('near-next');
 			$(".owl-item.near-prev-prev").removeClass('near-prev-prev');
 			$(".owl-item.near-next-next").removeClass('near-next-next');
 			var item      = event.item.index;
 			setTimeout(function(){
 				$(".owl-item.center").prev(".owl-item").addClass("near-prev");
 				$(".owl-item.center").next(".owl-item").addClass("near-next");
 				$(".owl-item.center").next(".owl-item").next(".owl-item").addClass("near-next-next");
 				$(".owl-item.center").prev(".owl-item").prev(".owl-item").addClass("near-prev-prev");
 				var tabN = $(".owl-item.center").find(".clocks-item").data('table');
 				$(".clocks-tab-wrapper .tab-block").each(function(){
 					if ( !$(this).hasClass('hidden') ) {
 						$(this).addClass('hidden');
 					}
 					
 				});  
 				$("#tab-block-"+tabN).removeClass('hidden');
 			}, 60)
 			
 		});

 		$(".clocks-slider .clocks-arrow.prev").click(function(){
 			owl.trigger('prev.owl.carousel');
 		});

 		$(".clocks-slider .clocks-arrow.next").click(function(){
 			owl.trigger('next.owl.carousel');
 		});
 		


 		$(".contacts-form-input").focus(function(){
 			$(this).parents('.contacts-form-wrapper').addClass('focus');
 		});
 		$(".contacts-form-input").blur(function(){
 			$(this).parents('.contacts-form-wrapper').removeClass('focus');
 		});


 		// CLOCKS

 		var date = new Date();
 		var hour = date.getUTCHours();
 		var min = date.getUTCMinutes();
 		var sec = date.getUTCSeconds();

 		if (hour > 12) {
 			hour = hour - 12;
 		}

 		$(".clocks-item").each(function(){

 			var utc = Number($(this).data('utc'));

 			hour = hour + utc;


 			$(this).find(".clocks-arrow-sec").css({
 				'transform' : 'rotate(' + ((360/60)*sec - 90.5) +'deg)'
 			});

 			$(this).find(".clocks-arrow-min").css({
 				'transform' : 'rotate(' + ((360/60)*min - 90.5) +'deg)'
 			});

 			$(this).find(".clocks-arrow-hour").css({
 				'transform' : 'rotate(' + ((360/12)*hour - 90.5) +'deg)'
 			});

 			var el = $(this);
 			var curSec = sec;
 			var curMin = min;
 			var curH = hour;

 			if (curMin == 0) {
 				curMin++;
 			}

 			setInterval(function(){
 				curSec++;
 				el.find(".clocks-arrow-sec").css({
 					'transform' : 'rotate(' + ((360/60)*curSec - 90.2) +'deg)'
 				});

 				if ( curSec%60 == 0 ) {
 					curMin++;
 					el.find(".clocks-arrow-min").css({
 						'transform' : 'rotate(' + ((360/60)*curMin - 90.2) +'deg)'
 					});
 				}

 				if ( (curMin%60 == 0) && (curSec%60 == 0) ) {
 					curH++;
 					el.find(".clocks-arrow-hour").css({
 						'transform' : 'rotate(' + ((360/12)*curH - 90.2) +'deg)'
 					});
 				}


 			}, 1000);

 		})


 	}

 	// END PARTNERSHIP 

 	if (document.getElementById('about')) {

 		if ( $(window).width() < 1250 ) {

 			var videoW = $(window).width() - 30;
 			$(".about-who-video").css({
 				height: (videoW/16)*9
 			});
 		}

 		$(".reviews-wrapper-1 .reviews-nav-next").click(function(){
 			$(".reviews-row-3").slick("slickNext");
 		})

 		$(".reviews-wrapper-1 .reviews-nav-prev").click(function(){
 			$(".reviews-row-3").slick("slickPrev");
 		})

 		$(".reviews-row-3").slick({
 			draggable:false,
 			slidesToShow: 5,
 			infinite: true,
 			slidesToScroll: 0.1,
 			autoplay: true,
 			autoplaySpeed: 0, 
 			arrows:false,
 			speed: 1000,
 			margin: 30,
 			pauseOnHover: true,
 			draggable: false,
 			cssEase: 'linear',
 			responsive: [{

 				breakpoint: 1200,
 				settings: {
 					slidesToShow: 3,
 				}

 			},
 			{
 				breakpoint: 767,
 				settings: {
 					slidesToShow: 1,
 					margin: 50,
 					autoplay: false,
 					slidesToScroll: 1,
 					speed: 300
 				},
 			},
 			{
 				breakpoint: 900,
 				settings: {
 					slidesToShow: 2,
 					margin: 50
 				},
 			}]
 		});


 		$(".reviews-row-1").slick({
 			draggable:false,
 			slidesToShow: 5,
 			infinite: true,
 			slidesToScroll: 0.1,
 			autoplay: true,
 			autoplaySpeed: 0, 
 			arrows:false,
 			speed: 1000,
 			margin: 30,
 			pauseOnHover: true,
 			draggable: false,
 			cssEase: 'linear',
 			responsive: [{

 				breakpoint: 1200,
 				settings: {
 					slidesToShow: 3,
 				}

 			},
 			{
 				breakpoint: 767,
 				settings: {
 					slidesToShow: 1,
 					margin: 50,
 					autoplay: false,
 					slidesToScroll: 1,
 					speed: 300
 				},
 			},
 			{
 				breakpoint: 900,
 				settings: {
 					slidesToShow: 2,
 					margin: 50
 				},
 			}]
 		});


 		$(".reviews-row-2").slick({
 			draggable:false,
 			slidesToShow: 5,
 			infinite: true,
 			slidesToScroll: 0.1,
 			autoplay: true,
 			autoplaySpeed: 0, 
 			arrows:false,
 			speed: 1000,
 			margin: 30,
 			pauseOnHover: true,
 			draggable: false,
 			cssEase: 'linear',
 			initialSlide: 1,
 			responsive: [{

 				breakpoint: 1200,
 				settings: {
 					slidesToShow: 3,
 				}

 			},
 			{
 				breakpoint: 767,
 				settings: {
 					slidesToShow: 1,
 					margin: 50,
 					autoplay: false,
 					slidesToScroll: 1,
 					speed: 300
 				},
 			},
 			{
 				breakpoint: 900,
 				settings: {
 					slidesToShow: 2,
 					margin: 50
 				},
 			}]
 		});

 		$(window).on('orientationchange resize', function() {
 			$('.reviews-row-2, .reviews-row-1').slick('resize');
 		});

 		$(window).resize(function() {
 			$('.reviews-row-2, .reviews-row-1').slick('resize');
 		});

 		

 		var $page = $('html, body');
 		$('a.scroll-to[href*="#"]').click(function() {
 			$page.animate({
 				scrollTop: $($.attr(this, 'href')).offset().top
 			}, 600);
 			return false;
 		});

 		// var owlStream1 = $(".reviews-row-1");

 		// // owlStream1.owlCarousel({
 		// // 	loop: true,
 		// // 	items: 4,
 		// // 	stagePadding: 100,
 		// // 	autoWidth: true,
 		// // 	slideTransition: 'linear',
 		// // 	//smartSpeed: 2500,
 		// // 	margin: 30,
 		// // 	dots: false,
 		// // 	fluidSpeed: 5000,
 		// // 	center: true,
 		// // 	// autoplayTimeout: 5000,
 		// // 	autoplayHoverPause: true,
 		// // 	autoplaySpeed: 5000,
 		// // 	autoplay: true,
 		// // });

 		// var owlStream2 = $(".reviews-row-2");

 		// // owlStream2.owlCarousel({
 		// // 	loop: true,
 		// // 	items: 4,
 		// // 	stagePadding: 50,
 		// // 	autoWidth: true,
 		// // 	slideTransition: 'linear',
 		// // 	autoplayTimeout: 5000,
 		// // 	autoplaySpeed: 5000,
 		// // 	margin: 30,
 		// // 	dots: false,
 		// // 	autoplayHoverPause: true
 		// // });

 		// setTimeout(function(){
 		// 	owlStream2.owlCarousel({
 		// 	loop: true,
 		// 	items: 4,
 		// 	stagePadding: 50,
 		// 	autoWidth: true,
 		// 	slideTransition: 'linear',
 		// 	autoplayTimeout: 5000,
 		// 	autoplaySpeed: 5000,
 		// 	autoplay: true,
 		// 	margin: 30,
 		// 	center: true,
 		// 	dots: false,
 		// 	autoplayHoverPause: true
 		// });

 		// }, 2400);

 		

 		//owlStream1.trigger('next.owl.carousel');

 		// setInterval(function(){
 		// 	owlStream1.trigger('prev.owl.carousel');
 		// }, 5000);
 		// setTimeout(function(){
 		// 	setInterval(function(){
 		// 		owlStream2.trigger('prev.owl.carousel');
 		// 	}, 5000);
 		// }, 2500);

 		// var streamHover = false;

 		// $(document).on("mousemove", function(e){
 		// 	if ( $(e.target).parents(".reviews-wrapper") ) {
 		// 		streamHover = true;
 		// 	} else {
 		// 		streamHover = false;
 		// 	}
 		// })

 		// var amount1 = 0;

 		// $(".reviews-row-1 .reviews-item").each(function(){
 		// 	amount1++;
 		// });

 		// var curRowW1 = amount1*305;


 		var curWindowW = $(window).width();

 		// if ( curWindowW < curRowW1 ) {
 		// 	$(".reviews-row-1").css({
 		// 		'left' : curWindowW - curRowW1
 		// 	});
 		// }

 		

 		// $(".reviews-row-1 .reviews-item").each(function(index){

 		// 	var el = $(this);
 		// 	var count = 0;

 		// 	var limit = (amount1 - index)*305;
 		// 	console.log(limit);

 		// 	setInterval(function(){



 		// 		count = count + 15;

 		// 		if ( count > limit ) {
 		// 			count = -(curRowW1 - limit);
 		// 			el.css({
 		// 				'opacity' : 0
 		// 			});
 		// 			el.animate({
 		// 				'transform' : 'translateX(' + count + 'px)'
 		// 			}, 0, function(){
 		// 				count = count + 15;
 		// 				el.animate({
 		// 					'transform' : 'translateX(' + count + 'px)'
 		// 				}, 100 );
 		// 			});
 		// 			// setTimeout(function(){
 		// 			// 		el.css({
 		// 			// 			'opacity' : 1
 		// 			// 		});
 		// 			// 	}, 200);
 		// 		} else {

 		// 			el.animate({
 		// 				'transform' : 'translateX(' + count + 'px)'
 		// 			}, 100, 'linear');
 		// 		}




 		// 	}, 100)

 		// });

 		$(".header-bg-bottom").css({
 			height: (curWindowW/2.409 + 20)
 		});

 		$(window).resize(function(){
 			var curWindowW = $(window).width();

 			$(".header-bg-bottom").css({
 				height: (curWindowW/2.409 + 20)
 			});
 		});


 		$(".gallery-item-container").mouseenter(function(){
 			$(this).parents(".gallery-item").addClass('hover');
 		});

 		$(".gallery-item-container").mouseleave(function(){
 			$(this).parents(".gallery-item").removeClass('hover');
 		});

 		$(".gallery-item-container").fancybox({
 			'transitionIn'	:	'elastic',
 			'transitionOut'	:	'elastic',
 			'speedIn'		:	600, 
 			'speedOut'		:	200, 
 			'overlayShow'	:	false
 		});

 		$(".gallery-logo-item").fancybox({
 			'transitionIn'	:	'elastic',
 			'transitionOut'	:	'elastic',
 			'speedIn'		:	600, 
 			'speedOut'		:	200, 
 			'overlayShow'	:	false
 		});




 		var owl = $(".gallery-wrapper");

 		owl.owlCarousel({
 			loop: true,
 			center: true,
 			startPosition: 1,
 			items: 3,
 			mouseDrag: false,
 			touchDrag: false,
 			responsive: {
 				0: {
 					items: 1,
 					mouseDrag: false,
 					touchDrag: true
 				},
 				898: {
 					items: 3,
 					mouseDrag: false,
 					touchDrag: false
 				},
 				1200: {
 					items: 3,
 					mouseDrag: false,
 					touchDrag: false
 				}
 			}
 		});


 		$(".gallery-nav-next").click(function(){
 			owl.trigger('next.owl.carousel');
 			owlDots.trigger('next.owl.carousel');
 		});
 		$(".gallery-nav-prev").click(function(){
 			owl.trigger('prev.owl.carousel');
 			owlDots.trigger('prev.owl.carousel');
 		});

 		

 		

 		var owlDots = $(".gallery-dots");

 		owlDots.owlCarousel({
 			items: 9, 
 			loop: true,
 			center: true,
 			startPosition: 1,
 			mouseDrag: false,
 			touchDrag: false
 		});

 		$(".gallery-dots-nav-next").click(function(){
 			owlDots.trigger('next.owl.carousel');
 			owl.trigger('next.owl.carousel');
 		});
 		$(".gallery-dots-nav-prev").click(function(){
 			owlDots.trigger('prev.owl.carousel');
 			owl.trigger('prev.owl.carousel');
 		});

 		$(".gallery-dot").click(function(){
 			var pos = $(this).data('dot');

 			owlDots.trigger('to.owl.carousel', [pos-1, 400]);
 			owl.trigger('to.owl.carousel', [pos-1, 400]);
 		});

 		owlDots.on('changed.owl.carousel', function(e) {
 			var pos = e.item.index;
 		});

 		owl.on('changed.owl.carousel', function(e) {
 			var pos = e.item.index;
 			console.log(pos);
 		});

 		$(".gallery-dot").each(function(){
 			var imgW = $(this).find(".gallery-dot-img").width();
 			$(this).find(".gallery-dot-img").css({
 				'left' : -(imgW - 71)/2
 			});
 		});

 	}

 	if (document.getElementById('how-it-works')) {

 		var $page = $('html, body');
 		$('a.scroll-to[href*="#"]').click(function() {
 			$page.animate({
 				scrollTop: $($.attr(this, 'href')).offset().top
 			}, 600);
 			return false;
 		});

 		if ( $(window).width() < 1110 ) {

 			var curW = $(window).width();

 			if ($(window).width() > 767) {
 				curW = curW - 30;
 			}

 			$(".videos-item").each(function(){
 				var vid = $(this).find('video')[0];
 				var curVideoW = vid.width,
 				curVideoH = vid.height;
 				vid.width = curW - 30;
 				vid.height = (curVideoH/curVideoW)*(curW - 30);
 				$(this).css({
 					'height' : (curVideoH/curVideoW)*(curW - 30) - 2
 				})

 			});

 			// $(window).resize(function(){

 			// 	if ( $(window).width() < 1110 ) {

 			// 		var curW1 = $(window).width();
 			// 		$(".videos-item").each(function(){
 			// 			var vid = $(this).find('video')[0];
 			// 			var curVideoW = vid.width,
 			// 			curVideoH = vid.height;
 			// 			vid.width = curW - 30;
 			// 			vid.height = (curVideoH/curVideoW)*(curW1 - 30);
 			// 			$(this).css({
 			// 				'height' : (curVideoH/curVideoW)*(curW1 - 30) - 2
 			// 			})

 			// 		});

 			// 	}

 			// })

 		}

 	}




 });
