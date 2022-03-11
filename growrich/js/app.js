$(document).ready(function() {

	$("select").niceSelect();
	Waves.init({
  		duration: 500
  	});
	Waves.attach('.yellow-btn', 'waves-light');
	Waves.attach('.red-btn', 'waves-light');
	Waves.attach('.btn-red', 'waves-light');
	Waves.attach('.btn-yellow', 'waves-light');
	
	


// Adaptive 

	if ( $(window).width() < 1250 ) {

		$(".header .currency").insertAfter(".aside-user-info-pending");
		$(".header .header-time").insertAfter(".aside-user-info-pending");

		$(".table-block-classic-table").each(function(){
			$(this).wrap('<div class="table-wrapper" style="overflow-x: auto;" />');
		})

		



		$(window).resize(function(){

			if ( $(window).width() < 768 ) {
				var cur_w = $(window).width() - 70;
			} else if ( $(window).width() < 1249 ) {
				var cur_w = $(window).width()/2 - 70;
			}

			$(".table-wrapper").css({
				'width': cur_w
			});
			
		});

		if ( $(window).width() < 768 ) {
			var cur_w = $(window).width() - 70;
		} else if ( $(window).width() < 1025 ) {
			var cur_w = $(window).width()/2 - 30;
		}


		$(".menu-button").click(function(){
			if ( !$(this).hasClass('active') ) {
				$(this).addClass('active');
			} else {
				$(this).removeClass('active');
			}


			if ( !$(".aside").hasClass('opened') ) {
				$(".aside").addClass('opened');
			} else {
				$(".aside").removeClass('opened');
			}
		});

	} else {

		$(".menu-button").click(function(){
			
			if ( !$(this).hasClass('active') ) {
				$(this).addClass('active');
			} else {
				$(this).removeClass('active');
			}


			if ( !$(".aside").hasClass('opened-desktop') ) {
				$(".aside").addClass('opened-desktop');
			} else {
				$(".aside").removeClass('opened-desktop');
			}

			setTimeout(function(){
				if ( Boolean($(".newslist").get(0)) ) {
				setEqualHeights($(".newslist-item"));
			}
			}, 650);

		});

	}

	// newslist items equal heights

	if ( Boolean($(".newslist").get(0)) ) {
		setEqualHeights($(".newslist-item"));
		$(window).resize(function(){
			setEqualHeights($(".newslist-item"));
		});
		$(".newslist").resize(function(){
			setEqualHeights($(".newslist-item"));
		});

	}

	function setEqualHeights(items) {
		items.css({
			'height' : 'auto'
		});
		var maxHeight = 0;
		items.each(function(){
			if ( $(this).outerHeight() > maxHeight ) {
				maxHeight = $(this).outerHeight();
			}
		});
		items.css({
			'height' : maxHeight+'px'
		});
	}


// POPUP 

	var dataNotify = {
		deposit: {
			title: 'Deposit successfully created',
			infoList: [
			'You are able to check information about all deposits in the <a class="notify-link" data-link="main" href="" >investment</a> -> <a class="notify-link" data-link="main" href="" >transactions</a> -> <a class="notify-link" data-link="transaction-3" href="" >deposits</a>, and <a class="notify-link" data-link="main" href="" >investment</a> -> <a class="notify-link" data-link="main" href="" >Finantional management</a> -> <a class="notify-link" data-link="active-deposits" href="" >Active deposits</a>'
			]
		},
		desc: {
			title: 'Description',
			infoList: [
			'Cashback L1 (10%) from Username1 to Username2'
			]
		},
		withdrawal: {
			title: 'Withdrawal request created',
			infoList: [
			'Your withdrawal request will be processed within 24 hours. You are able to check information about all deposits in the <a class="notify-link" data-link="main" href="" >Investment</a> -> <a class="notify-link" data-link="main" href="" >Transactions</a> -> <a class="notify-link" data-link="transaction-1" href="" >Accruals & Withdrawals</a>'
			]
		},
		settings: {
			title: 'Confirm new settings',
			infoList: [
				'In the framework of security you will recieve an email with confirmation link. After confirmation, the new changes will take effect.'
			]
		},
		singup: {
			title: '1st step of registration passed',
			infoList: [
				'Congratulation, you passed the first step of registration. You will recieve a letter with an activation link, please check your email and activate your account.'
			]
		}
	}

	$(".modal-button").click(function(e){
		$.magnificPopup.close();
		e.preventDefault();
		if (!$(this).hasClass('disabled')) {

			$.magnificPopup.open({
				items: {
					src: $(this).data('mfp-src'),
				},
				type: 'inline',
				closeBtnInside: true,
				mainClass: 'mfp-fade'
			});
		}
	});



	$(".notify-button").magnificPopup();
	$(".modal-terms-checkbox").click(function(){

		if ( $(this).hasClass('checked') ) {
			$(this).removeClass('checked');
			$(this).parents('.modal').find('.modal-submit button').addClass('disabled');
			$(this).parents('.modal-form').addClass('disabled');
		} else {
			$(this).addClass('checked');
			$(this).parents('.modal').find('.modal-submit button').removeClass('disabled');
			$(this).parents('.modal-form').removeClass('disabled');
		}

	});




	$(".modal-form").submit(function(e){

		var type = $(this).data('type');

		if ($(this).hasClass('disabled')) {
			e.preventDefault();
			return false;
		}
		e.preventDefault();
		$.magnificPopup.instance.close();
		$.magnificPopup.instance.open({
			items: {
				src: '#notify'
			},
			type: 'inline',
			mainClass: 'mfp-fade',
			removalDelay: 400,
			callbacks: {
				elementParse: function(item) {
					
					$("#notify .notify-title").text(dataNotify[type].title);

					var infoResult = '';

					for (var i = 0; i < dataNotify[type].infoList.length; i++) {
						infoResult += '<li>'+dataNotify[type].infoList[i]+'</li>'
					}

					$("#notify .notify-info-list").html(infoResult);
				},
				open: function() {

					$(".notify-link").click(function(e){
						e.preventDefault();

						var cur_link = $(this).data('link');

						if ( cur_link == 'main' ) {
							$.magnificPopup.instance.close();
							$("html, body").animate({
								scrollTop: 0
							}, 500);
						} else {
							$.magnificPopup.instance.close();
							$("html, body").animate({
								scrollTop: $(".main-info-block").offset().top
							}, 500);
							$("[data-block='"+cur_link+"']").trigger('click');
						}
					});

				}
			}
		});

	});

	$(".modal-over-button").click(function(){
		if ( !$(this).parents('.modal').find('.modal-over').hasClass('opened') ) {
			$(this).parents('.modal').find('.modal-over').addClass('opened');
		}
	});
	$(".modal-over").click(function(event){
		if ( event.target == $(this).get(0) || event.target == $(this).find('.close-btn').get(0) ) {
			$(this).removeClass('opened');
		}
	});


	$(".notify-link").click(function(e){
		e.preventDefault();

		var cur_link = $(this).data('link');

		if ( cur_link == 'main' ) {
			$.magnificPopup.instance.close();
			$("html, body").animate({
				scrollTop: 0
			}, 300);
		} else {
			$.magnificPopup.instance.close();
			$("html, body").animate({
				scrollTop: 0
			}, 300);
			$(".single-tab[data-block='"+cur_link+"']").trigger('click');
		}
	});

	$(".wallet-details").click(function(e){
		e.preventDefault();

		$.magnificPopup.instance.open({
			items: {
				src: '#notify'
			},
			type: 'inline',
			mainClass: 'mfp-fade',
			removalDelay: 400,
			callbacks: {
				elementParse: function(item) {
					
					$("#notify .notify-title").text(dataNotify.desc.title);

					var infoResult = '';

					for (var i = 0; i < dataNotify.desc.infoList.length; i++) {
						infoResult += '<li>'+dataNotify.desc.infoList[i]+'</li>'
					}

					$("#notify .notify-info-list").html(infoResult);

					if (dataNotify.desc.image) {

					} else {
						$("#notify .notify-image").hide();
					}

				}
			}
		});

	});




//  Language Switcher 

	function setLanguage() {
		var cur_lng = $("#language").val();
		$('.header-language-switcher .nice-select .current').attr('class', 'flag-icon-'+cur_lng+' flag-icon-background flag-icon-squared current');
		$('.header-language-switcher .nice-select .list li').each(function(){
			$(this).addClass('flag-icon-'+$(this).data('value')+' flag-icon-background flag-icon-squared');
		});
	}

	$("#language").change(function(){
		setLanguage();
	});

	setLanguage();

// SERVER TIME 
	
	setInterval(function(){
		var cur_time = new Date();
		var cur_hours = cur_time.getHours();
		var cur_minutes = (cur_time.getMinutes() >= 10) ? (cur_time.getMinutes()) : '0' + (cur_time.getMinutes()).toString();
		var cur_seconds = (cur_time.getSeconds() >= 10) ? (cur_time.getSeconds()) : '0' + (cur_time.getSeconds()).toString();
		var cur_hours_rest = 23-cur_time.getHours();
		var cur_minutes_rest = (59-cur_time.getMinutes() >= 10) ? (59-cur_time.getMinutes()) : '0' + (59-cur_time.getMinutes()).toString();
		var cur_seconds_rest = (59-cur_time.getSeconds() >= 10) ? (59-cur_time.getSeconds()) : '0' + (59-cur_time.getSeconds()).toString();

		$("#mini-accrual .time-value").text(cur_hours_rest + ':' + cur_minutes_rest + ':' + cur_seconds_rest);

		$(".header-time-value").text(cur_hours + ':' + cur_minutes + ':' + cur_seconds + ' GMT');
	}, 1000);

// TABS 

	$(".single-tab").click(function(e){
		e.preventDefault();
		if (!$(this).hasClass('active')) {
			$(this).parents('.main-info-block-tabs').find(".single-tab").removeClass('active');
			$(this).addClass('active');
			var cur_block = $(this).data('block');
			$(this).parents(".main-info-block").find(".table-block.active").fadeOut(300);
			$(this).parents(".main-info-block").find(".table-block.active").removeClass('active');
			setTimeout(function(){
				$("#"+cur_block).fadeIn(300);
			}, 300);
			$("#"+cur_block).addClass('active');

			// stats fix 

			if (cur_block == 'my-stats-2') {
				setTimeout(function(){
					$(".cashback-level-scale").each(function(){

					$(this).find('li').each(function(index) {
						var cur_w = $(this).outerWidth();

						$(this).css({
							left: (index*10)+'%',
							'margin-left': (-cur_w/2)+'px'
						});
					});

				});
				}, 650);
				
			}

			// stats fix end

			// table adaptive fix 

			setTimeout(function(){

				if ( Boolean($(".partners").get(0)) )  {
					if ( $(window).width() < 992 ) {
					$(".table-block-classic-table").each(function() {
					
					if ( $(this).width() > $(window).width()-30 ) {
						if ( !Boolean( $(this).parents(".table-wrapper").get(0) ) ) {
							$(this).wrap('<div class="table-wrapper" style="overflow-x: auto;" />');
						}
						$(this).parents(".table-wrapper").css({
							'width': ($(window).width()-70)+'px'
						});
					} else {
						$(this).unwrap(".table-wrapper");
					}
				});
				} else if ( $(window).width() < 1250) {
					$(".table-block-classic-table").each(function() {
						
					if ( $(this).width() > $(window).width()/2-70 ) {
						if ( !Boolean( $(this).parents(".table-wrapper").get(0) ) ) {
							$(this).wrap('<div class="table-wrapper" style="overflow-x: auto;" />');
						}
						$(this).parents(".table-wrapper").css({
							'width': ($(window).width()/2-70)+'px'
						});
					} else {
						$(this).unwrap(".table-wrapper");
					}
				});
				}

						}
							}, 650);


		} 
	}); 

// GRAPHICS MINI

// Activate onload
	
	if ( Boolean($(".mini-stats")) ) {
		getNetIncomeFor10Days();
		getDepositsRelation();
		getWithdrawalsFor10Days();
		getNextAccrual();
	}


// 1. Net Income 

	function getNetIncomeFor10Days() {
		// Предполагаю, что получаю данные от бекенда и записываю их в массив
		var data = [22012, 12000, 15500, 14330, 13234, 19000, 18000, 17000, 9000, 8000];

		// Устанавливаем дни
		var cur_date = new Date();
		var curY = cur_date.getYear();
		var curM = cur_date.getMonth();
		var curD = cur_date.getDate();
		for (var i = 10; i > 0; i--) {
			var dateToEstablish = new Date(curY, curM, curD-(11-i));
			$("#mini-income .axis-x li:nth-child("+i+") .point").text(dateToEstablish.getDate());
		}

		// Узнаем максимально возможное значение графика
		var max_val = 0;
		for (var i = 0; i < data.length; i++) {
			max_val = (max_val < +(data[i])) ? +(data[i]) : max_val;
		} // Ищем макс прибыль
		max_val = Math.ceil(max_val/1000)+2; // Округляем ее до ближ тысячи сверху и прибавляем еще две для запаса

		$("#mini-income .axis-y li:nth-child(1) .point").text(max_val+'k');
		$("#mini-income .axis-y li:nth-child(2) .point").text(max_val/2+'k');

		 const cur_graph_height = 40; 

		for (var i = 0; i < data.length;) {
			var paramHeight = (data[i]/(max_val*1000))*cur_graph_height;
			i++;
			$("#mini-income .axis-x li:nth-child("+i+") .line").animate({
				'height' : paramHeight+'px'
			}, 400);
		}

	 }

// 2. Deposit 

	function getDepositsRelation() {

		var dataActive = $(".mini-deposit .values-total .v_amount").text();
		dataActive = +(dataActive.substring(1));
		var dataComp = $(".mini-deposit .values-today .v_amount").text();
		dataComp = +(dataComp.substring(1));

		dataActive = Math.ceil((dataActive/(dataActive+dataComp))*360);

		if ( Boolean(document.getElementById("mini-deposit-active-sm")) ) {
			document.getElementById("mini-deposit-active-sm").setAttribute("d", describeArc(59, 59, 37, -90, dataActive-90));
			document.getElementById("mini-deposit-active-lg").setAttribute("d", describeArc(59, 59, 49, -90, dataActive-90));
			document.getElementById("mini-deposit-completed-sm").setAttribute("d", describeArc(59, 59, 37, dataActive-90, 270));
			document.getElementById("mini-deposit-completed-lg").setAttribute("d", describeArc(59, 59, 49, dataActive-90, 270));
		}
		
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

// 3. Withdrawals 
	
	function getWithdrawalsFor10Days() {
		// Предполагаю, что получаю данные от бекенда и записываю их в массив
		var data = [32012, 12000, 11500, 21330, 13234, 19000, 18000, 27000, 29000, 8000];

		// Устанавливаем дни
		var cur_date = new Date();
		var curY = cur_date.getYear();
		var curM = cur_date.getMonth();
		var curD = cur_date.getDate();
		for (var i = 10; i > 0; i--) {
			var dateToEstablish = new Date(curY, curM, curD-(11-i));
			$("#mini-withdrawals .axis-x li:nth-child("+i+") .point").text(dateToEstablish.getDate());
		}

		// Узнаем максимально возможное значение графика
		var max_val = 0;
		for (var i = 0; i < data.length; i++) {
			max_val = (max_val < +(data[i])) ? +(data[i]) : max_val;
		} // Ищем макс прибыль
		max_val = Math.ceil(max_val/1000)+2; // Округляем ее до ближ тысячи сверху и прибавляем еще две для запаса

		$("#mini-withdrawals .axis-y li:nth-child(1) .point").text(max_val+'k');
		$("#mini-withdrawals .axis-y li:nth-child(2) .point").text(max_val/2+'k');

		 const cur_graph_height = 40; 

		for (var i = 0; i < data.length;) {
			var paramHeight = (data[i]/(max_val*1000))*cur_graph_height;
			i++;
			$("#mini-withdrawals .axis-x li:nth-child("+i+") .line").animate({
				'height' : paramHeight+'px'
			}, 400);
		}

	 }

// 4. Next accrual 
	
	function getNextAccrual() {

		setInterval(function(){
			var cur_time = new Date();
			var cur_hours = 23-cur_time.getHours();
			var cur_minutes = 59-cur_time.getMinutes();
			var cur_seconds = 59-cur_time.getSeconds();

			var rest = Math.ceil(((cur_seconds + cur_minutes*60 + cur_hours*3600)/86400)*360);

			if ( Boolean(document.getElementById("mini-accrual-line")) ) {
				document.getElementById("mini-accrual-line").setAttribute("d", describeArc(60, 60, 52, 0, rest));
			}
			
		}, 1000);

		if ( Boolean(document.getElementById("mini-accrual-line-dashed")) ) {
		document.getElementById("mini-accrual-line-dashed").setAttribute("d", describeArc(60, 60, 52, 0, 359));
	}

	}


// CALCULATOR -- INVESTMENT PLANS 

// Данные по планам инвестирования беру из массива (предположительно получаемого в json по ajax)

	var investData = [
		['1%', '10 days', '7 days', '100%', '24/7', 'On weekdays', '24h', '$5.00', '$100.00', '$1000.00'],
		['1.5%', '20 days', '7 days', '100%', '24/7', 'On weekdays', '24h', '$10.00', '$500.00', '$1500.00'],
		['2%', '30 days', '7 days', '100%', '24/7', 'On weekdays', '24h', '$15.00', '$1000.00', '$2000.00'],
		['2.4%', '40 days', '7 days', '100%', '24/7', 'On weekdays', '24h', '$20.00', '$1500.00', '$3000.00'],
		['2.8%', '60 days', '7 days', '100%', '24/7', 'On weekdays', '24h', '$25.00', '$2000.00', '$4000.00'],
		['3.3%', '90 days', '7 days', '100%', '24/7', 'On weekdays', '24h', '$30.00', '$3500.00', '$5000.00']
	];

	if ( Boolean(document.getElementById('invest-plans')) ) {
		setInsestData();
	}

	

// Acivate buttons 
	
	$(".calc_input-item").click(function(){
		if (!$(this).hasClass('active')) {
			$(".calc_input-item").removeClass('active');
			$(this).addClass('active');
			$(".calc-radio").each(function(){
				$(this).removeAttr("checked");
			});
			$(this).find(".calc-radio").attr('checked', 'checked');
			setInsestData();
		}
	});

	$("#invest-plans .wallet-item").click(function(){

		if (!$(this).hasClass('chosen')) {

			$("#invest-plans .wallet-item").each(function(){
				$(this).removeClass('chosen');
				$(this).removeClass('error');
			});

				$(this).addClass('chosen');

				var cur_plan = +($(".calc-radio:checked").val());

				if ($(this).hasClass('not-entered')) {
					$(this).addClass('error');
					$(this).find(".wallet-item-notify").text("You must enter your wallet id");
					$("#invest_deposit").addClass('disabled');
					$("#invest-output-1").addClass('disabled');
					$("#invest-output-2").addClass('disabled');
					$("#invest-output-3").addClass('disabled');
				} else if ( +($(this).find('.wallet-item-balance').text().slice(1)) < +(investData[cur_plan-1][8].slice(1)) ) {
					$(this).addClass('error');
					$(this).find(".wallet-item-notify").text("You do not have enough founds on this wallet");
					$("#invest_deposit").addClass('disabled');
					$("#invest-output-1").addClass('disabled');
					$("#invest-output-2").addClass('disabled');
					$("#invest-output-3").addClass('disabled');
				} else {
					$("#invest_deposit").removeClass('disabled');
					$("#invest-output-1").removeClass('disabled');
					$("#invest-output-2").removeClass('disabled');
					$("#invest-output-3").removeClass('disabled');
				}

			
		}

	});


    function validateInvestInput(input) {

    	var cur_deposit = +(input.val()); 	
		var cur_plan = +($(".calc-radio:checked").val());

		var chosen_wallet = false;

		$("#invest-plans .wallet-item").each(function(){
			if ($(this).hasClass('chosen')) {
				chosen_wallet = true;
			}
		});

		if (cur_deposit == "") {
			input.parents(".result-invest-input_wrap").addClass('error');
			input.parents(".result-invest-input_wrap").find('.input-block-notify').text("Invalid input");
		} else if (!chosen_wallet) {
			input.parents(".result-invest-input_wrap").addClass('error');
			input.parents(".result-invest-input_wrap").find('.input-block-notify').text("Please choose the wallet");
		} else if ( cur_deposit < +(investData[cur_plan-1][8].slice(1)) ) {
			input.parents(".result-invest-input_wrap").addClass('error');
			input.parents(".result-invest-input_wrap").find('.input-block-notify').text("Minimum deposit is "+investData[cur_plan-1][8])
		} else if ( cur_deposit > +(investData[cur_plan-1][9].slice(1)) ) {
			input.parents(".result-invest-input_wrap").addClass('error');
			input.parents(".result-invest-input_wrap").find('.input-block-notify').text("Maximum deposit is "+investData[cur_plan-1][9])
		} else if ( cur_deposit > +($("#invest-plans .wallet-item.chosen .wallet-item-balance").text().slice(1)) ) {
			input.parents(".result-invest-input_wrap").addClass('error');
			input.parents(".result-invest-input_wrap").find('.input-block-notify').text("You don't have enough founds");
		} else {
			input.parents(".result-invest-input_wrap").removeClass('error');
			calcInvest();
		}

    }

    $("#invest_deposit").keyup(function(){
    	validateInvestInput($(this));
    });


	$("#invest_deposit").change(function(){
		validateInvestInput($(this));
	});

	function setInsestData() {
		$("#invest_deposit").removeClass('disabled');
		$("#invest-output-1").removeClass('disabled');
		$("#invest-output-2").removeClass('disabled');
		$("#invest-output-3").removeClass('disabled');
		$("#invest_deposit").parents(".result-invest-input_wrap").removeClass('error');

		var cur_plan = +($(".calc-radio:checked").val());
		
		for (var i = 0; i < 10; i++) {
			if (i <= 4) {
				$("#table-invest-terms .single-col:eq(0) .single-cell:nth-child("+(i+1)+") .cell-value").text(investData[cur_plan-1][i]);
			} else {
				$("#table-invest-terms .single-col:eq(1) .single-cell:nth-child("+(i-4)+") .cell-value").text(investData[cur_plan-1][i]);
			}
		}

		var min_deposit = +(investData[cur_plan-1][8].substring(1));
		var max_wallet_balance = 0;
		var max_wallet = $("#invest-plans .wallet-item-1");
		
		$("#invest-plans .wallet-item").each(function(){
			$(this).removeClass('chosen');
			$(this).removeClass('error');
			$(this).removeClass('low-balance');
			var cur_balance = +($(this).find(".wallet-item-balance").text().substring(1));
			if (cur_balance >= max_wallet_balance) {
				max_wallet_balance = cur_balance;
				max_wallet = $(this);
			}

			if (cur_balance < min_deposit) {
				$(this).addClass('low-balance');
			} 
		});

		if (max_wallet_balance >= min_deposit) {
			$(max_wallet).addClass('chosen');
		} else {
			$("#invest_deposit").addClass('disabled');
			$("#invest-output-1").addClass('disabled');
			$("#invest-output-2").addClass('disabled');
			$("#invest-output-3").addClass('disabled');
		}

		var investPeriod = +(investData[cur_plan-1][1].slice(0, +(investData[cur_plan-1][1].indexOf('days')-1)));
		
		// if (investPeriod < 10) {
		// 	if (!$("#invest-output-2").hasClass('disabled')) {
		// 		$("#invest-output-2").addClass('disabled');
		// 	}
		// 	if (!$("#invest-output-3").hasClass('disabled')) {
		// 		$("#invest-output-3").addClass('disabled');
		// 	}
		// } else if (investPeriod < 30) {
		// 	if (!$("#invest-output-3").hasClass('disabled')) {
		// 		$("#invest-output-3").addClass('disabled');
		// 	}
		// }

		$("#invest_deposit").val(min_deposit);

		calcInvest();
	}

	function calcInvest() {
		var cur_plan = +($(".calc-radio:checked").val());
		var daily_income = +(investData[cur_plan-1][0].slice(0, investData[cur_plan-1][0].indexOf('%')));
		var user_deposit = +($("#invest_deposit").val());
		var depositPeriod = +(investData[cur_plan-1][1].slice(0, +(investData[cur_plan-1][1].indexOf('days')-1)));

		var result = (user_deposit*((100/depositPeriod)+daily_income))/100;
		var result10 = result*10;
		var result30 = result*30;

		result = Math.ceil(result*100);
		result10 = Math.ceil(result10*100);
		result30 = Math.ceil(result30*100);

		result = result.toString();
		result10 = result10.toString();
		result30 = result30.toString();

		result = result.slice(0, result.length-2) + '.' + result.slice(result.length-2, result.length);
		result10 = result10.slice(0, result10.length-2) + '.' + result10.slice(result10.length-2, result10.length);
		result30 = result30.slice(0, result30.length-2) + '.' + result30.slice(result30.length-2, result30.length);
		
		$("#invest-output-1").text('$'+result); 
		$("#invest-output-2").text('$'+result10); 
		$("#invest-output-3").text('$'+result30); 
	}


// Withdrawal 

	$("#withdrawal-1 .wallet-item").click(function(){

		if (!$(this).hasClass('chosen')) {

			$("#withdrawal-1 .wallet-item").each(function(){
				$(this).removeClass('chosen');
				$(this).removeClass('error');
			});

				$(this).addClass('chosen');


				if ($(this).hasClass('not-entered')) {
					$(this).addClass('error');
					$(this).find(".wallet-item-notify").text("You must enter your wallet id");
					$("#withdrawal-input-1").addClass('disabled');
				} else if ( +($(this).find('.wallet-item-balance').text().slice(1)) < +(0.1) ) {
					$(this).addClass('error');
					$(this).find(".wallet-item-notify").text("You do not have enough founds on this wallet");
					("#withdrawal-input-1").addClass('disabled');
				} else {
					$("#withdrawal-input-1").removeClass('disabled');
				}

			
		}

		validateWithdrawalInput($("#withdrawal-input-1"));

	});

	function validateWithdrawalInput(input) {

    	var cur_deposit = +(input.val()); 	

		var chosen_wallet = false;

		$("#withdrawal-1 .wallet-item").each(function(){
			if ($(this).hasClass('chosen')) {
				chosen_wallet = true;
			}
		});

		input.parents("#withdrawal-1").find('.submit-block .modal-button').removeClass('disabled');

		if (cur_deposit == "") {
			input.parents(".result-invest-input_wrap").addClass('error');
			input.parents(".result-invest-input_wrap").find('.input-block-notify').text("Invalid input");
			input.parents("#withdrawal-1").find('.submit-block .modal-button').addClass('disabled');
		} else if (!chosen_wallet) {
			input.parents(".result-invest-input_wrap").addClass('error');
			input.parents(".result-invest-input_wrap").find('.input-block-notify').text("Please choose the wallet");
			input.parents("#withdrawal-1").find('.submit-block .modal-button').addClass('disabled');
		} else if ( cur_deposit < +(0.1) ) {
			input.parents(".result-invest-input_wrap").addClass('error');
			input.parents(".result-invest-input_wrap").find('.input-block-notify').text("Minimum withdrawal is $0.1")
			input.parents("#withdrawal-1").find('.submit-block .modal-button').addClass('disabled');
		} else if ( cur_deposit > +($("#withdrawal-1 .wallet-item.chosen .wallet-item-balance").text().slice(1)) ) {
			input.parents(".result-invest-input_wrap").addClass('error');
			input.parents(".result-invest-input_wrap").find('.input-block-notify').text("You don't have enough founds");
			input.parents("#withdrawal-1").find('.submit-block .modal-button').addClass('disabled');
		} else {
			input.parents(".result-invest-input_wrap").removeClass('error');
			
		}

    }

    $("#withdrawal-input-1").change(function(){
    	validateWithdrawalInput($(this));
    });

    $("#withdrawal-input-1").keyup(function(){
    	validateWithdrawalInput($(this));
    });

// Active deposits 

/* Предполагаемо будет время начало отчета (пр. 12.06.18 22:33:09) и время окончания (пр. 14.06.18 12:13:39),
но на данный момент для того чтобы верстку было удобно проверять данные заданы в формате 2ух параметров:
1 эл. - общее время(разность между началом и концом), 2 ел. -- текущий остаток.
*/
var depositData = [
		['86400', '63000'],
		['172800', '33000'],
		['90000', '43000'],
		['120000', '13000'],
		['140000', '33000']
	];
if (  Boolean(document.getElementById("active-deposits-arc1")) ) {
	document.getElementById("active-deposits-arc1").setAttribute("d", describeArc(100, 100, 90, 0, 359));
	document.getElementById("active-deposits-arc2").setAttribute("d", describeArc(100, 100, 90, 0, 359));



var circle = document.getElementById("active-deposits-arc1");

Moveit.put(circle, {
  start: '60%',
  end: '100%'
});
Moveit.animate(circle, {
  start: '80.9%',
  end: '100%',
  duration: 0.6,
  delay: 0,
  timing: 'ease-out'
});
}

// SELECT COLORS CLASSES 

	

	var option_count = 0;
	$("#deposit_selected option").each(function(){
		var color = $(this).data('color');
		option_count++;
		$(this).parents('.table-block-select').find(".nice-select ul li:nth-child("+option_count+")").addClass('option-'+color);
		
	});


	var cur_seconds = 0;
	var cur_minutes = 10;
	var cur_hours = 9;


	var actDepCounter = setInterval(setRestTime, 1000);

	$("#deposit_selected").change(function(){
		setColor();

		var cur_val = +($("#deposit_selected").val());
		for (var i = 1; i <= 10; i++) {
			if (i>cur_val) {
				$("#active-deposits .table-block-stage-block li:nth-child("+i+")").removeClass('active');
			} else {
				$("#active-deposits .table-block-stage-block li:nth-child("+i+")").addClass('active');
			}

		}

		if ( cur_val > 3 ) {
			for (var i = 1; i <= 10; i++) { 
				if ( i > 5 ) {
					$("#active-deposits .table-block-stage-block li:nth-child("+i+")").fadeOut(300);
				}
			}
		} else {
			$("#active-deposits .table-block-stage-block li").fadeIn();
		}

		var graphic_pos = 100 - (depositData[cur_val-1][1]/depositData[cur_val-1][0])*100;

		Moveit.animate(circle, {
		  start: graphic_pos + '%',
		  end: '100%',
		  duration: 0.6,
		  delay: 0.3,
		  timing: 'ease-out'
		});

		cur_hours = Math.floor(depositData[cur_val-1][1]/3600);
		cur_minutes = Math.floor((+(depositData[cur_val-1][1]) - cur_hours*3600)/60);
		cur_seconds = Math.floor( +(depositData[cur_val-1][1]) - cur_hours*3600 - cur_minutes*60 );

		

		clearInterval(actDepCounter);

		actDepCounter = setInterval(setRestTime, 1000);


			
		});

	function setRestTime() {

		cur_hours = +(cur_hours);
			cur_minutes = +(cur_minutes);
			cur_seconds = +(cur_seconds);

			cur_seconds--;

			if (cur_seconds < 0) {
				cur_seconds = 59;
				cur_minutes--;
			}

			if (cur_minutes < 0) {
				cur_minutes = 59;
				cur_hours--;
			}

			if (+(cur_minutes) < 10) {
				cur_minutes = '0'+cur_minutes.toString();
			}
			if (+(cur_seconds) < 10) {
				cur_seconds = '0'+cur_seconds.toString();
			}

			if (cur_hours < 0) {
				$("#active-deposits .table-block-diagram-time").text('Now');
			} else {
				$("#active-deposits .table-block-diagram-time").text(cur_hours+':'+cur_minutes+':'+cur_seconds);
			}

		
	}

	function setColor() {
		var cur_val = $("#deposit_selected").val();

		if ($("#active-deposits .nice-select ul li:nth-child("+cur_val+")").hasClass('option-green')) {

			$("#active-deposits .nice-select .current").removeClass('current-red');
			$("#active-deposits .nice-select .current").removeClass('current-yellow');
			$("#active-deposits .nice-select .current").addClass('current-green');
		}

		if ($("#active-deposits .nice-select ul li:nth-child("+cur_val+")").hasClass('option-yellow')) {
			$("#active-deposits .nice-select .current").removeClass('current-red');
			$("#active-deposits .nice-select .current").removeClass('current-green');
			$("#active-deposits .nice-select .current").addClass('current-yellow');
		}

		if ($("#active-deposits .nice-select ul li:nth-child("+cur_val+")").hasClass('option-red')) {
			$("#active-deposits .nice-select .current").removeClass('current-green');
			$("#active-deposits .nice-select .current").removeClass('current-yellow');
			$("#active-deposits .nice-select .current").addClass('current-red');
		}
		
	}

	if ( Boolean(document.getElementById('deposit_selected')) ) {
		setColor();
	}

	




// FILTERS SETTINGS 

	$( ".date-input" ).datepicker({
		showOtherMonths: true,
        selectOtherMonths: true,
        dateFormat: "yy-mm-dd"
	});
	$(".date-input").change(function(){
		$(this).prev(".text-cover-date-input").val($(this).val());
	});

	$("#filter-state-1").parents(".table-block-select").find(".current").addClass($("#filter-state-1").val());
	$("#filter-state-2").parents(".table-block-select").find(".current").addClass($("#filter-state-2").val());
	// $("#filter-state-3").parents(".table-block-select").find(".current").addClass($("#filter-state-3").val());

	$("#filter-state-1").change(function(){
		var current_indicator = $(this).parents(".table-block-select").find(".current");
		if (!current_indicator.hasClass($(this).val())) {
			current_indicator.removeClass("pending");
			current_indicator.removeClass("active");
			current_indicator.removeClass("rejected");
			current_indicator.removeClass("all");
			current_indicator.addClass($(this).val());
		}
		
	});
	$("#filter-state-2").change(function(){
		var current_indicator = $(this).parents(".table-block-select").find(".current");
		if (!current_indicator.hasClass($(this).val())) {
			current_indicator.removeClass("pending");
			current_indicator.removeClass("active");
			current_indicator.removeClass("rejected");
			current_indicator.removeClass("all");
			current_indicator.addClass($(this).val());
		}
		
	});
	// $("#filter-state-3").change(function(){
	// 	var current_indicator = $(this).parents(".table-block-select").find(".current");
	// 	if (!current_indicator.hasClass($(this).val())) {
	// 		current_indicator.removeClass("pending");
	// 		current_indicator.removeClass("active");
	// 		current_indicator.removeClass("rejected");
	// 		current_indicator.removeClass("all");
	// 		current_indicator.addClass($(this).val());
	// 	}
		
	// });

	$("#filter-wallet-1").parents(".table-block-select").find(".current").addClass($("#filter-wallet-1").val());
	$("#filter-wallet-2").parents(".table-block-select").find(".current").addClass($("#filter-wallet-2").val());
	$("#filter-wallet-3").parents(".table-block-select").find(".current").addClass($("#filter-wallet-3").val());

	$("#filter-wallet-1").change(function(){
		var current_indicator = $(this).parents(".table-block-select").find(".current");
		if (!current_indicator.hasClass($(this).val())) {
			current_indicator.removeClass("bitcoin");
			current_indicator.removeClass("advanced_cash");
			current_indicator.removeClass("perfect_money");
			current_indicator.removeClass("payeer");
			current_indicator.removeClass("all");
			current_indicator.addClass($(this).val());
		}
		
	});
	$("#filter-wallet-2").change(function(){
		var current_indicator = $(this).parents(".table-block-select").find(".current");
		if (!current_indicator.hasClass($(this).val())) {
			current_indicator.removeClass("bitcoin");
			current_indicator.removeClass("advanced_cash");
			current_indicator.removeClass("perfect_money");
			current_indicator.removeClass("payeer");
			current_indicator.removeClass("all");
			current_indicator.addClass($(this).val());
		}
		
	});
	$("#filter-wallet-3").change(function(){
		var current_indicator = $(this).parents(".table-block-select").find(".current");
		if (!current_indicator.hasClass($(this).val())) {
			current_indicator.removeClass("bitcoin");
			current_indicator.removeClass("advanced_cash");
			current_indicator.removeClass("perfect_money");
			current_indicator.removeClass("payeer");
			current_indicator.removeClass("all");
			current_indicator.addClass($(this).val());
		}
		
	});



// LIVE STATS PAGE GRAPHS 

// 1. Stats Circle

	if ( Boolean(document.getElementById("livestats-withdrawed-sm")) ) {
		getStatsRelation();
	}

	function getStatsRelation() {

		var dataGreen = $(".livestats-graph-diagram .param-green .livestats-graph-value").text();
		dataGreen = +(dataGreen.substring(1));
		var dataRed = $(".livestats-graph-diagram .param-red .livestats-graph-value").text();
		dataRed = +(dataRed.substring(1));

		dataGreen = Math.ceil((dataGreen/(dataGreen+dataRed))*360);

		if ( Boolean(document.getElementById("livestats-withdrawed-sm")) ) {
			document.getElementById("livestats-withdrawed-sm").setAttribute("d", describeArc(59, 59, 38, -90, dataGreen-90));
			document.getElementById("livestats-withdrawed-lg").setAttribute("d", describeArc(59, 59, 49, -90, dataGreen-90));
			document.getElementById("livestats-deposited-sm").setAttribute("d", describeArc(59, 59, 38, dataGreen-90, 270));
			document.getElementById("livestats-deposited-lg").setAttribute("d", describeArc(59, 59, 49, dataGreen-90, 270));
		}
		
	}

// 2. Stats Weekly 

	var dataStatsLastWeek = [ 
			[1234, 952],	
			[2234, 1205],
			[4048, 1500],
			[1407, 1900],
			[1587, 999],
			[1762, 2099],
			[4004, 905]
		];


	$("#stats-weekly li").each(function(index) {

		var cur_day = '';

		switch ( index )  {

			case 0: 
			cur_day = 'Monday';
			break;

			case 1: 
			cur_day = 'Tuesday';
			break;

			case 2: 
			cur_day = 'Wednesday';
			break;

			case 3: 
			cur_day = 'Thursday';
			break;

			case 4: 
			cur_day = 'Friday';
			break;

			case 5: 
			cur_day = 'Saturday';
			break;

			case 6: 
			cur_day = 'Sunday';
			break;
		}

		$(this).attr('data-day', cur_day);
		$(this).attr('data-red', dataStatsLastWeek[index][0]);
		$(this).attr('data-green', dataStatsLastWeek[index][1]);

	});

	if ( Boolean(document.getElementById('stats-weekly')) ) {
		setWeeklyStats();
	}

	function setWeeklyStats() {

		var cur_height = $("#stats-weekly").outerHeight() - $("#stats-weekly").height();

		var cur_max = 0;

		for (var i = 0; i < dataStatsLastWeek.length; i++) {
			console.log(i);
			if ( dataStatsLastWeek[i][0] + dataStatsLastWeek[i][1] > cur_max ) {
				cur_max = dataStatsLastWeek[i][0] + dataStatsLastWeek[i][1];
			}
		}

		cur_max *= 1.35;
		

		for (var i = 0; i < dataStatsLastWeek.length; i++) { 

			$("#stats-weekly li:nth-child("+(i+1)+") .red-line").animate({
				'height' : cur_height*(dataStatsLastWeek[i][0]/cur_max)+'px'
			}, 400);

			$("#stats-weekly li:nth-child("+(i+1)+") .green-line").animate({
				'height' : cur_height*(dataStatsLastWeek[i][1]/cur_max)+'px'
			}, 400);

		}

	}


	function posMouse(e){
		 var mouX = 0, mouY = 0;
		 if (!e) e = window.event;
		 if (e.pageX || e.pageY) {
		  mouX = e.pageX;
		  mouY = e.pageY;
		 } else if (e.clientX || e.clientY) {
		  mouX = e.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft) - document.documentElement.clientLeft;
		  mouY = e.clientY + (document.documentElement.scrollTop || document.body.scrollTop) - document.documentElement.clientTop;
		 }
		 return {"x":mouX, "y":mouY}
	}


if ( Boolean(document.getElementById('stats-weekly')) ) {
	var statsPos = $("#stats-weekly").get(0).getBoundingClientRect();
	var start_popover_width = +($("#stats-weekly-popover").outerWidth());
	var start_popover_height = +($("#stats-weekly-popover").outerHeight());


	setTimeout(function(){
		$(".hidden-on-start").removeClass('hidden-on-start');
	}, 500);

	$("#stats-weekly-popover").css({
		'transform' : 'translateX('+(statsPos.left + ( statsPos.right - statsPos.left )/2 - start_popover_width/2)+'px) translateY('+(statsPos.top + (statsPos.bottom - statsPos.top)/2 - start_popover_height/2 )+'px)'
	});

	$("#stats-weekly li").mouseover(function(e) {

		$("#stats-weekly-popover .popover-title").text($(this).data('day'));
		$("#stats-weekly-popover .red").text('$'+$(this).data('red'));
		$("#stats-weekly-popover .green").text('$'+$(this).data('green'));

		if ( !$("#stats-weekly-popover").hasClass('active') ) {
			$("#stats-weekly-popover").addClass('active');
		}

		var elem_pos = $(this).find(".graph-line").get(0).getBoundingClientRect();
		var cur_offset_top = posMouse(e).y;
		var cur_popover_width = +($("#stats-weekly-popover").outerWidth());
		var cur_popover_height = +($("#stats-weekly-popover").outerHeight());

		$("#stats-weekly-popover").css({
			'transform' : 'translateX('+( elem_pos.left + (elem_pos.right - elem_pos.left)/2 - cur_popover_width/2 )+'px) translateY('+(pageYOffset + elem_pos.top - cur_popover_height - 5)+'px)'
		});

	});



	$(".livestats-graph-block").get(0).addEventListener("touchleave", function(event){

		$("#stats-weekly-popover").removeClass('active');
	});

	$(".livestats-graph-block").mouseleave(function(){
		$("#stats-weekly-popover").removeClass('active');
	});

	}


// 3. Stats users 

	if ( Boolean($("#users-stats")) ) {
		setUsersStats();
	}

	function setUsersStats() {

		var max_amount = 0; 
		$("#users-stats .livestats-graph-value").each(function() {
			if ( +($(this).text()) > max_amount ) {
				max_amount = +($(this).text());
			}
		});

		max_amount *= 1.25;

		$("#users-stats .horizontal-line-yellow").animate({
			'width' : ((+($("#users-stats .param-yellow .livestats-graph-value").text())/max_amount)*100) + '%'
 		}, 500);
 		$("#users-stats .horizontal-line-red").animate({
			'width' : ((+($("#users-stats .param-red .livestats-graph-value").text())/max_amount)*100) + '%'
 		}, 500);
 		$("#users-stats .horizontal-line-green").animate({
			'width' : ((+($("#users-stats .param-green .livestats-graph-value").text())/max_amount)*100) + '%'
 		}, 500);



	}




// Partnership 

	
// COPYLINK

	$(".copylink-button").click(function(e){
		$(".copy-success").removeClass('copy-success');
		e.preventDefault();
		var target = $(this).siblings('.link-to-copy').get(0);
		copyToClipboard(target);
		if ( $(this).hasClass('modal-field-copylink') ) {
			$(this).parents('.modal-field-wrap').addClass('copy-success');
			$(this).parents('.modal-field-wrap').siblings('.modal-field-notify').text('Copied to the clipboard').addClass('copy-success');
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


	if ( Boolean($("#my-rank").get(0)) ) {

	drawPartnerRange();

	$(window).resize(function(){
		drawPartnerRange();
	});

	function drawPartnerRange(){
			var myRank = document.getElementById('my-rank');
			if ( $(window).width() < 768 ) {
				myRank.width = $(window).width()-70;
				myRank.height = myRank.width/(360/208);
			} else {
				myRank.width = 360;
				myRank.height = 208;
			}

			



			var ctx = myRank.getContext('2d');
			ctx.clearRect(0, 0, myRank.width, myRank.height);


		// Background Round

			ctx.beginPath();

			var cx = myRank.width/2;
			var cy = myRank.height;

			var bgRadius = ((myRank.width*0.75)/2);

			ctx.fillStyle = '#EAEAEA';
			ctx.strokeStyle = '#EAEAEA';
			ctx.lineJoin = 'round';
			ctx.lineWidth = 6;
			ctx.lineCap = 'round';

			ctx.arc(cx, cy, bgRadius, 0, (-Math.PI), true);

			ctx.stroke();
			ctx.fill();
			ctx.closePath();
		//1
			ctx.beginPath();
			var cx = myRank.width/2+10.5;
			var cy = myRank.height-8;


			ctx.fillStyle = '#EAEAEA';
			ctx.strokeStyle = '#EAEAEA';
			ctx.lineJoin = 'round';
			ctx.lineWidth = 6;
			ctx.lineCap = 'round';

			ctx.arc(cx, cy, bgRadius, 0.04*(Math.PI), 1.04*(-Math.PI), true);

			ctx.stroke();
			ctx.fill();
			ctx.closePath();
		//2
			ctx.beginPath();
			cx = cx - 6;
			cy = cy - 6;

			ctx.fillStyle = '#EAEAEA';
			ctx.strokeStyle = '#EAEAEA';
			ctx.lineJoin = 'round';
			ctx.lineWidth = 6;
			ctx.lineCap = 'round';

			ctx.arc(cx, cy, bgRadius, 0.04*(Math.PI), 1.04*(-Math.PI), true);

			ctx.stroke();
			ctx.fill();
			ctx.closePath();
		//3
			ctx.beginPath();
			cx = cx - 9;

			ctx.fillStyle = '#EAEAEA';
			ctx.strokeStyle = '#EAEAEA';
			ctx.lineJoin = 'round';
			ctx.lineWidth = 6;
			ctx.lineCap = 'round';

			ctx.arc(cx, cy, bgRadius, 0.04*(Math.PI), 1.04*(-Math.PI), true);

			ctx.stroke();
			ctx.fill();
			ctx.closePath();

		//4
			ctx.beginPath();

			cx = cx - 6;
			cy = cy + 6;

			ctx.fillStyle = '#EAEAEA';
			ctx.strokeStyle = '#EAEAEA';
			ctx.lineJoin = 'round';
			ctx.lineWidth = 6;
			ctx.lineCap = 'round';

			ctx.arc(cx, cy, bgRadius, 0.04*(Math.PI), 1.04*(-Math.PI), true);

			ctx.stroke();
			ctx.fill();
			ctx.closePath();


		// MAIN
			cx = myRank.width/2+10.5;
			cy = myRank.height-8;

			var outsideRadius = (myRank.width*0.7)/2;
			var insideRadius = outsideRadius - (2*myRank.width)/15;

			ctx.beginPath();
			ctx.fillStyle = '#33933E';
			ctx.strokeStyle = '#33933E';
			ctx.lineJoin = 'round';
			ctx.lineWidth = 4;
			ctx.lineCap = 'round';
			ctx.arc(cx, cy, outsideRadius, 0, (-0.25*Math.PI), true);
			ctx.stroke();
			ctx.lineTo( cx+insideRadius/Math.sqrt(2), cy-insideRadius/Math.sqrt(2) );
			ctx.stroke();
			ctx.arc(cx, cy, insideRadius, (-0.25*Math.PI), 0, false);
			ctx.stroke();
			ctx.moveTo( (cx + insideRadius), (cy) );
			ctx.lineTo( (cx+outsideRadius), (cy) );
			ctx.stroke();
			ctx.fill();
			ctx.closePath();

			ctx.beginPath();

			cx = cx - 6;
			cy = cy - 6;

			ctx.fillStyle = '#FFB300';
			ctx.strokeStyle = '#FFB300';
			ctx.lineJoin = 'round';
			ctx.lineWidth = 4;
			ctx.lineCap = 'round';
			ctx.arc(cx, cy, outsideRadius, (-0.25*Math.PI), (-0.5*Math.PI), true);
			ctx.stroke();
			ctx.lineTo( cx, (cy-insideRadius) );
			ctx.stroke();
			ctx.arc(cx, cy, insideRadius, (-0.5*Math.PI), (-0.25*Math.PI), false);
			ctx.stroke();
			ctx.moveTo( cx + (insideRadius*Math.cos(0.25*Math.PI)) , cy - (insideRadius*Math.sin(0.25*Math.PI)) );
			ctx.lineTo( cx + (outsideRadius*Math.cos(0.25*Math.PI)) , cy - (outsideRadius*Math.sin(0.25*Math.PI)) );
			ctx.stroke();
			ctx.fill();
			ctx.closePath();

			ctx.beginPath();

			cx = cx - 9;

			ctx.fillStyle = '#FE5461';
			ctx.strokeStyle = '#FE5461';
			ctx.lineJoin = 'round';
			ctx.lineWidth = 4;
			ctx.lineCap = 'round';
			ctx.arc(cx, cy, outsideRadius, (-0.5*Math.PI), (-0.75*Math.PI), true);
			ctx.stroke();
			ctx.lineTo( cx-insideRadius/Math.sqrt(2), cy-insideRadius/Math.sqrt(2) );
			ctx.stroke();
			ctx.arc(cx, cy, insideRadius, (-0.75*Math.PI), (-0.5*Math.PI), false);
			ctx.stroke();
			ctx.moveTo( cx, (cy-insideRadius) );
			ctx.lineTo( cx, (cy-outsideRadius) );
			ctx.stroke();
			ctx.fill();
			ctx.closePath();

			ctx.beginPath();

			cx = cx - 6;
			cy = cy + 6;

			ctx.fillStyle = '#a7a7a7';
			ctx.strokeStyle = '#a7a7a7';
			ctx.lineJoin = 'round';
			ctx.lineWidth = 4;
			ctx.lineCap = 'round';
			ctx.arc(cx, cy, outsideRadius, (-0.75*Math.PI), (-Math.PI), true);
			ctx.stroke();
			ctx.lineTo( cx-insideRadius, cy );
			ctx.stroke();
			ctx.arc(cx, cy, insideRadius, (-Math.PI), (-0.75*Math.PI), false);
			ctx.stroke();
			ctx.moveTo( cx-insideRadius/Math.sqrt(2), cy-insideRadius/Math.sqrt(2) );
			ctx.lineTo( cx-outsideRadius/Math.sqrt(2), cy-outsideRadius/Math.sqrt(2) );
			ctx.stroke();
			ctx.fill();
			ctx.closePath();

			ctx.beginPath();

			cx = myRank.width/2;
			cy = myRank.height;

			ctx.fillStyle = '#EAEAEA';
			ctx.strokeStyle = '#EAEAEA';
			ctx.lineJoin = 'round';
			ctx.lineCap = 'round';

			if ( $(window).width() < 768 ) {
				ctx.lineWidth = 3;
				ctx.arc(cx, cy, cx-5, 0.005*(-Math.PI), 0.995*(-Math.PI), true);

				//arrow pos
				$(".rank-stats-graph-arrow").css({
					'width': $(".rank-stats-graph-arrow").height()/7.133333+'px',
					'margin-left': -$(".rank-stats-graph-arrow").height()/(7.133333*2)+'px',
					'margin-bottom': $(".rank-stats-graph-arrow").height()/(7.133333*4)+'px',
				});
				$(window).resize(function(){
					$(".rank-stats-graph-arrow").css({
					'width': $(".rank-stats-graph-arrow").height()/7.133333+'px',
					'margin-left': -$(".rank-stats-graph-arrow").height()/(7.133333*2)+'px',
					'margin-bottom': $(".rank-stats-graph-arrow").height()/(7.133333*4)+'px',
				});
				});

			} else {
				ctx.lineWidth = 6;
				ctx.arc(cx, cy, cx-10, 0.005*(-Math.PI), 0.995*(-Math.PI), true);
			}

			ctx.stroke();
			ctx.closePath();



	}



	

// Set Rank 

	var rankSteps = [1000, 3000, 5000, 6000];

	setRank();

	function setRank() {
		console.log('hey');
		var breakPoints = [-90, -51, 51, 90];

		var cur_value = +( $(".rank-stats-info-main .rank-money").text().slice(1) );

		var cur_step = 0;

		for (var i = 0; i < rankSteps.length; i++) {
			if ( cur_value > rankSteps[i] ) {
				cur_step++;
			}
		}

		cur_value = ( (cur_value-rankSteps[cur_step-1])/(rankSteps[cur_step] - rankSteps[cur_step-1]) );


		var transformAngle = breakPoints[cur_step-1] + (breakPoints[cur_step]-breakPoints[cur_step-1])*cur_value;

		$(".rank-stats-graph-arrow").animate({
			transform : 'rotate('+transformAngle+'deg)'
		}, 800);

	}

// Cashback 

	$("#level-1").slider({
		min: 0,
		max: 100,
		step: 10,
		value: 10,
		slide: function( event, ui ) {
			$("#level-1").css({
				'background' : 'linear-gradient(90deg, #FFB300 0%, #FFB300 '+ui.value+'%, #EAEAEA '+ui.value+'%, #EAEAEA 100%)'
			});
			$("#level-1-input").val(ui.value);
		}
	});
	$("#level-2").slider({
		min: 0,
		max: 100,
		step: 10,
		value: 10,
		slide: function( event, ui ) {
			$("#level-2").css({
				'background' : 'linear-gradient(90deg, #FFB300 0%, #FFB300 '+ui.value+'%, #EAEAEA '+ui.value+'%, #EAEAEA 100%)'
			});
			$("#level-2-input").val(ui.value);
		}
	});
	$("#level-3").slider({
		min: 0,
		max: 100,
		step: 10,
		value: 10,
		slide: function( event, ui ) {
			$("#level-3").css({
				'background' : 'linear-gradient(90deg, #FFB300 0%, #FFB300 '+ui.value+'%, #EAEAEA '+ui.value+'%, #EAEAEA 100%)'
			});
			$("#level-3-input").val(ui.value);
		}
	});

	$(".cashback-level-scale").each(function(){

		$(this).find('li').each(function(index) {
			var cur_w = $(this).outerWidth();

			$(this).css({
				left: (index*10)+'%',
				'margin-left': (-cur_w/2)+'px'
			});
		});

	});

	// $(".main-info-block-my-stats .single-tab:nth-child(2)").click(function(e){
	// 	console.log('2ds');
		
	// });


// CHART 



var partnerChartData = {
	labelsX : ["0", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
	labelsXBar : ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
	dataInvestment : [2220, 332, 410, 435, 2232, 3220, 1230, 3265],
	dataWithdrawal : [1220, 3232, 2410, 2435, 1732, 3620, 930, 665],
	dataBarInvested : [322, 410, 835, 732, 620, 930, 665],
	dataBarRegistered : [222, 810, 295, 732, 120, 230, 365],
	dataBarVisited : [542, 410, 695, 732, 820, 630, 565]
}

var chartMax = 0;
var chartMaxBar = 0;
var chartSummaryLine1 = 0;
var chartSummaryLine2 = 0;
var chartSummaryBar1 = 0;
var chartSummaryBar2 = 0;
var chartSummaryBar3 = 0;
for (var i = 0; i < partnerChartData.dataInvestment.length; i++) {
	// Line Chart
	if ( partnerChartData.dataInvestment[i] > chartMax ) {
		chartMax = partnerChartData.dataInvestment[i];
	}
	if ( partnerChartData.dataWithdrawal[i] > chartMax ) {
		chartMax = partnerChartData.dataWithdrawal[i];
	}
	chartSummaryLine1 += partnerChartData.dataInvestment[i];
	chartSummaryLine2 += partnerChartData.dataWithdrawal[i];
	// Bar chart 
	if (i < partnerChartData.dataBarInvested.length) {
		if ( (partnerChartData.dataBarInvested[i] + partnerChartData.dataBarRegistered[i] + partnerChartData.dataBarVisited[i]) > chartMaxBar ) {
		chartMaxBar = (partnerChartData.dataBarInvested[i] + partnerChartData.dataBarRegistered[i] + partnerChartData.dataBarVisited[i]);
		}
		chartSummaryBar1 += partnerChartData.dataBarInvested[i];
		chartSummaryBar2 += partnerChartData.dataBarRegistered[i];
		chartSummaryBar3 += partnerChartData.dataBarVisited[i];
	}
	
}
var chartStepSize = Math.pow(10, (chartMax.toString().length-1));
var chartStepSizeBar = Math.pow(10, (chartMaxBar.toString().length-1));	
chartMax = ( Math.floor( chartMax/Math.pow(10, (chartMax.toString().length-1) ) ) + 1 )*Math.pow(10, (chartMax.toString().length-1) );
chartMaxBar = ( Math.floor( chartMaxBar/Math.pow(10, (chartMaxBar.toString().length-1) ) ) + 1 )*Math.pow(10, (chartMaxBar.toString().length-1) );
$("#partner-stats-1 .legend-item-green .legend-item-value").text('$ '+chartSummaryLine1);
$("#partner-stats-1 .legend-item-red .legend-item-value").text('$ '+chartSummaryLine2);
$("#partner-stats-2 .legend-item-green .legend-item-value").text(chartSummaryBar1);
$("#partner-stats-2 .legend-item-yellow .legend-item-value").text(chartSummaryBar2);
$("#partner-stats-2 .legend-item-red .legend-item-value").text(chartSummaryBar3);

var ctxChart = document.getElementById("myChart");
var chart1 = new Chart(ctxChart, {
    type: 'line',
    data: {
        labels: partnerChartData.labelsX,
        datasets: [{
            backgroundColor: '#FE5461',
            borderColor: '#FE5461',
            data: partnerChartData.dataInvestment,
            fill: -1,
            lineTension: 0,
            pointBackgroundColor: '#FFFFFF',
            pointBorderWidth: 3,
            pointRadius: 4
        },{
            backgroundColor: '#33933E',
            borderColor: '#33933E',
            data: partnerChartData.dataWithdrawal,
            fill: -1,
            lineTension: 0,
            pointBackgroundColor: '#FFFFFF',
            pointBorderWidth: 3,
            pointRadius: 4
        }],
    },
    options: {
    	legend: false,
    	scales: {
    		gridLines: {
    			drawTicks: false,
    		},
            yAxes: [{
            		gridLines: {
            			drawTicks: false,
            			color: '#EAEAEA',
            			zeroLineColor: '#EAEAEA'
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
                    fontFamily: "Helvetica Neue",
                    fontSize: 12,
                    fontColor: '#a7a7a7'
                }
            }],
            xAxes: [{
            		gridLines: {
            			drawTicks: false,
            			color: '#EAEAEA',
            			drawBorder: false,
            			zeroLineColor: '#EAEAEA' 
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
                    fontFamily: "Helvetica Neue",
                    fontSize: 12,
                    fontColor: '#a7a7a7'
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
                        innerHtml += '<tr><th>' + title + '</th></tr>';
                    });
                    innerHtml += '</thead><tbody>';

                    bodyLines.forEach(function(body, i) {
                        var colors = tooltipModel.labelColors[i];
                        var style = 'background: #a7a7a7';
                        style += '; border-color:' + colors.borderColor;
                        style += '; border-width: 2px';
                        var span = '<span style="' + style + '"></span>';
                        innerHtml += '<tr><td>' + span + "$ " + body + '</td></tr>';
                    });
                    innerHtml += '</tbody>';

                    var tableRoot = tooltipEl.querySelector('table');
                    tableRoot.innerHTML = innerHtml;
                }

                var position = this._chart.canvas.getBoundingClientRect();
                console.log(tooltipEl.outerWidth);
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
        if (!this._chart.getDatasetMeta(0).hidden && !this._chart.getDatasetMeta(1).hidden && !this._chart.getDatasetMeta(2).hidden) {
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
 var dataBar = {
	labels: partnerChartData.labelsXBar,
        datasets: [{
            data: partnerChartData.dataBarInvested,
            backgroundColor: '#33933E',
			borderWidth: 0
        },{
            data: partnerChartData.dataBarRegistered,
            backgroundColor: '#FFB300',
			borderWidth: 0,
        },
        {
            data: partnerChartData.dataBarVisited,
            backgroundColor: '#FE5461',
			borderWidth: 0,
        },{
        	yAxisID: 'right-y-axis'
        }
        ]
	};
var options = {
	legend: false,
	elements:{ point: {
     radius: 12,
     hoverRadius: 12,
    pointStyle: 'rectRounded',
    }},
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true,
                    fontFamily: "Helvetica Neue",
                    fontSize: 12,
                    fontColor: '#a7a7a7',
                    padding: 10,
                    min: 0,
                    max: chartMaxBar,
                    stepSize: chartStepSizeBar,
                    callback: function(value, index, values) {
                    	if (value == 0) {
                    		return value;
                    	} else {
                    		return value/1000+'K';
                    	}
                    },
                },
                stacked : true,
                radius: 12,
                gridLines: {
            			drawTicks: false,
            			color: '#EAEAEA',
            			zeroLineColor: '#EAEAEA'
    		}
            },
            {
                id: 'right-y-axis',
                type: 'linear',
                position: 'right',
                 gridLines: {
            			display: false
    		},
    		ticks: {
    			display: false
    		}
            }],
            xAxes: [{
                ticks: {
                    beginAtZero:true,
                    fontFamily: "Helvetica Neue",
                    fontSize: 12,
                    fontColor: '#a7a7a7',
                    padding: 10
                },
                stacked : true,
                barThickness: 25,
                gridLines: {
            			drawTicks: false,
            			color: '#EAEAEA',
            			zeroLineColor: '#EAEAEA',
            			offsetGridLines: false 
    		},
                
            }]
        },
        tooltips: {
            mode: 'index',
			position: 'nearest',
            enabled: false,
            custom: function(tooltipModel) {
                var tooltipEl = document.getElementById('chartjs-tooltip-2');
                if (!tooltipEl) {
                    tooltipEl = document.createElement('div');
                    tooltipEl.id = 'chartjs-tooltip-2';
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
                        innerHtml += '<tr><th>' + title + '</th></tr>';
                    });
                    innerHtml += '</thead><tbody>';

                  
                    for (var k = bodyLines.length-1; k >= 0; k--) {
                    	var colors = tooltipModel.labelColors[k];
                        var style = 'background: #a7a7a7';
                        style += '; border-color:' + colors.backgroundColor;
                        style += '; border-width: 2px';
                        var span = '<span style="' + style + '"></span>';
                        innerHtml += '<tr><td>' + span + bodyLines[k][0] + '</td></tr>';
                    }
                 
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
        
    };
		



var ctxBar = document.getElementById("myChart2");
var myBarChart = new Chart(ctxBar, {
    type: 'bar',
    data: dataBar,
    options: options
});

if ( $(window).width() < 500 ) {
		myBarChart.options.scales.xAxes[0].barThickness = 15;
}	else if ( $(window).width() < 768 ) {
	myBarChart.options.scales.xAxes[0].barThickness = 20;
} 

$(window).resize(function(){
	if ( $(window).width() < 500 ) {
		myBarChart.options.scales.xAxes[0].barThickness = 15;
	} else if ( $(window).width() < 768 ) {
		myBarChart.options.scales.xAxes[0].barThickness = 20;
	}
});




var dataLevels = [];
$("#partner-stats-3 .legend-item").each(function(index){
	dataLevels[index] = +($(this).find('.legend-item-value').text());
});
var dataPolar = {
	 datasets: [{
        data: dataLevels,
        borderWidth: 0,
        backgroundColor: ['#33933E', '#FFB300', '#FE5461']
    }],
    labels: ['','','']
};

var optionsPolar = {
	legend: false,
	responsive:true,
	// layout: {
	// 	padding: 10
	// },
	maintainAspectRatio: false,
	scale: {
		padding: 0,
		ticks: {
			display: false,
			beginAtZero: true,
			backdropPaddingX: 0,
			backdropPaddingY: 0
		},
		reverse: false,
		gridLines: {
			display: false,
			padding: 0
		}
	},
	 tooltips: {
            mode: 'index',
			position: 'nearest',
            enabled: false,
            custom: function(tooltipModel) {
                var tooltipEl = document.getElementById('chartjs-tooltip-3');
                if (!tooltipEl) {
                    tooltipEl = document.createElement('div');
                    tooltipEl.id = 'chartjs-tooltip-3';
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
                        innerHtml += '<tr><th>' + title + '</th></tr>';
                    });
                    innerHtml += '</thead><tbody>';

                    bodyLines.forEach(function(body, i) {
                        var colors = tooltipModel.labelColors[i];
                        var style = 'background: #a7a7a7';
                        style += '; border-color:' + colors.backgroundColor;
                        style += '; border-width: 2px';
                        var span = '<span style="' + style + '"></span>';
                        innerHtml += '<tr><td>' + span + body[i].slice(1) + '</td></tr>';
                        console.log(body[i]);
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

};




var ctxPolar = document.getElementById("myChart3");
var myPolarChart = new Chart(ctxPolar, {
    type: 'polarArea',
    data: dataPolar,
    options: optionsPolar
});
// Chart.plugins.register({
//   beforeDraw: function(chartInstance) {

//   	if ( $("#partner-stats-3").hasClass('active') ) {

//   		var ctx = chartInstance.chart.ctx;
// 	    ctx.fillStyle = "white";
// 	    ctx.fillRect(0, 0, chartInstance.chart.width, chartInstance.chart.height);
// 	    ctx.strokeStyle = '#eaeaea';
// 	    ctx.lineWidth = 1;
// 	   	ctx.arc(chartInstance.chart.width/2, chartInstance.chart.height/2, chartInstance.chart.height/2-10, 0, 2*Math.PI, true);
// 	    ctx.stroke();
// 	     // ctx.fillStyle = "transparent";
// 	    ctx.fill();

//   	} 

   
//   }
// });

// Save chart 

function filter(node){
	 return ($(node).hasClass('save-button') !== true);
}

$(".save-button").click(function(){

	var el = $(this);

	if ( !el.hasClass('loading') ) {
		el.addClass('loading');

	}

	var screenTarget = $(this).parents('.chart-block-wrapper').get(0);
	domtoimage.toSvg(screenTarget, {filter: filter}).then(function (dataUrl) {
    var img = new Image();
    img.src = dataUrl;
    $("#image-chart").html(img);
	//setTimeout(function(){
		domtoimage.toJpeg($("#image-chart img").get(0), { quality: 1, bgcolor: '#ffffff' })
	    .then(function (dataUrl) {
	        var link = document.createElement('a');
	        link.download = 'image-chart.jpeg';
	        link.href = dataUrl;
	        link.click();
	        	el.removeClass('loading');
	      
	    });
	//}, 500);
	});
});




}	


// Password visibility 

	
	$(".view-button").click(function(){
		var cur_input = $(this).siblings('input').get(0);

		 if (cur_input.type === "password") {
	        cur_input.type = "text";
	    } else {
	        cur_input.type = "password";
	    }

	    if ( !$(this).hasClass('active') ) {
	    	$(this).addClass('active');
	    } else {
	    	$(this).removeClass('active');
	    }

	});

	$(".settings .edit-button").click(function(){

		$(".settings .edit-button").each(function(){
			$(this).siblings(".settings-input").get(0).disabled = true;
		});

		$(this).siblings(".settings-input").get(0).disabled = false;
		$(this).siblings(".settings-input").trigger('focus');

	});

	$("#settings-form").submit(function(e){
		e.preventDefault();
		var type = $(this).data('type');

		if ($(this).find(".settings-submit .save-btn").hasClass('disabled')) {
			return false;
		}

		$.magnificPopup.instance.close();
		$.magnificPopup.instance.open({
			items: {
				src: '#notify'
			},
			type: 'inline',
			mainClass: 'mfp-fade',
			removalDelay: 400,
			callbacks: {
				elementParse: function(item) {
					
					$("#notify .notify-title").text(dataNotify[type].title);

					var infoResult = '';

					for (var i = 0; i < dataNotify[type].infoList.length; i++) {
						infoResult += '<li>'+dataNotify[type].infoList[i]+'</li>'
					}

					$("#notify .notify-info-list").html(infoResult);
				}
			}
		});

	});

	$(".settins-input").change(function(){
		validateSettingsField($(this));
	});

	$(".settings-input").keyup(function(){
		validateSettingsField($(this));
	});

	function validateSettingsField(input) {
		var cur_input_block = input.parents('.settings-item');
		var cur_val = input.val();
		var check_valid = true;
		var submit_btn = $("#settings-form .settings-submit .save-btn");
			
		if ( cur_input_block.hasClass('settings-item-wallet-bitcoin') ) {
			var bitcoinExp = /^[\w]{26,35}$/;
			if ( cur_val.match(bitcoinExp) ) {
				check_valid = true;
			} else {
				check_valid = false;
			}
		} else if ( cur_input_block.hasClass('settings-item-wallet-advanced_cash') ) {
			var acExp = /^[U][\d]{12}$/;
			if ( cur_val.match(acExp) ) {
				check_valid = true;
			} else {
				check_valid = false;
			}
		} else if ( cur_input_block.hasClass('settings-item-wallet-perfect_money') ) {
			var acExp = /^[U][\d]{7,8}$/;
			if ( cur_val.match(acExp) ) {
				check_valid = true;
			} else {
				check_valid = false;
			}
		} else if ( cur_input_block.hasClass('settings-item-wallet-payeer') ) {
			var acExp = /^[P][\d]{8}$/;
			if ( cur_val.match(acExp) ) {
				check_valid = true;
			} else {
				check_valid = false;
			}
		} else if ( cur_input_block.hasClass('settings-item-password') ) {
			if ( cur_val.match(/^[\w\d\[\{\(\<\>\,\.\/\\\+\=\-\*\&\^\%\$\#\@\'\?\|\"\!\~\`\:\;\)\}\]]{8,}$/) ) {
				check_valid = true;
			} else {
				check_valid = false;
			}
		}

		if ( check_valid ) {
			if ( !input.parents('.settings-input-wrap').hasClass('success') ) {
				input.parents('.settings-input-wrap').removeClass('error');
				input.parents('.settings-input-wrap').addClass('success');
			}
		} else {
			if ( !input.parents('.settings-input-wrap').hasClass('error') ) {
				input.parents('.settings-input-wrap').removeClass('success');
				input.parents('.settings-input-wrap').addClass('error');
			}
			if ( !submit_btn.hasClass('disabled') ) {
				submit_btn.addClass('disabled');
			}
		}

		if ( cur_input_block.hasClass('settings-item-password') ) {
			$(".settings-item-password .settings-input").each(function(){
				if ($(this).val() == '') {
					submit_btn.addClass('disabled');
				}
			});
		}

		if ( $("#password").val() == '' && $("#password_old").val() == '' ) {
			$(".settings-item-password").each(function(){
				$(this).find('.error').removeClass('error');
			});
		}

		if ( !$("#settings-form").find('.error').get(0) && $("#password").val() == '' && $("#password_old").val() == '' ) {
			submit_btn.removeClass('disabled');
		} else if ( $("#password").val() != '' && $("#password_old").val() != '' && !$("#settings-form").find('.error').get(0)) {
			submit_btn.removeClass('disabled');
		}
	
	} 

"use strict" 
// REVIEWS 

	$(document).on("click", ".reviews-input-file", function () {
		$(this).change(function(){
			$(this).addClass('added');
			for ( var i = 0; i < $(this).get(0).files.length; i++) {
				var fileName = $(this).get(0).files[i]['name'];
				var new_file = `<div class="reviews-input-photo-item">${fileName}</div>`;
				$(new_file).insertAfter($(this));
			}
			var new_input = '<input type="file" class="reviews-input-file" multiple="multiple" name="files[]">';
			$(new_input).insertAfter($(this).siblings('.reviews-input-photo-button'));
		});
	});

	if ( Boolean(document.getElementById('reviews-1')) ) {
		validateTextLength($(".reviews-input-textarea"), 10, 200);
		validateTextLength($(".reviews-input-title"), 4, 40);
	}

	$(".reviews-input-textarea").change(function(){
		validateTextLength($(this), 10, 200)
	});

	$(".reviews-input-textarea").keyup(function(){
		validateTextLength($(this), 10, 200)
	});

	$(".reviews-input-title").change(function(){
		validateTextLength($(this), 4, 40)
	});

	$(".reviews-input-title").keyup(function(){
		validateTextLength($(this), 4, 40)
	});

	function validateTextLength(input, min, max) {

		var cur_txt = input.val().length;
		var count_block = input.siblings(".reviews-input-count");

		if (cur_txt < min) {
			if ( !count_block.hasClass('red') ) {
				count_block.addClass('red');
				count_block.removeClass('green');
				count_block.removeClass('yellow');
			}
		} else if (cur_txt < max-10 ) {
			if ( !count_block.hasClass('green') ) {
				count_block.addClass('green');
				count_block.removeClass('red');
				count_block.removeClass('yellow');
			}
		} else if (cur_txt <= max) {
			if ( !count_block.hasClass('yellow') ) {
				count_block.addClass('yellow');
				count_block.removeClass('green');
				count_block.removeClass('red');
			}
		} else if (cur_txt > max) {
			if ( !count_block.hasClass('red') ) {
				count_block.addClass('red');
				count_block.removeClass('green');
				count_block.removeClass('yellow');
			}
		}

		count_block.text(`Symbols ${cur_txt}/${max}`);
	}

	$(".video-button").click(function(){

		videoOpen($(this));

		$.magnificPopup.open({
			items: {
				src: '#video'
			},
			type: 'inline',
			mainClass: 'mfp-fade',
			callbacks: {
				 open : function() {
                            $.magnificPopup.instance.close = function () {
                                $(".modal-video iframe").attr('src', '');
                                $.magnificPopup.proto.close.call(this);
                            };

                        }
			}
		})

	});

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
        }, 500);
        
	}

	function videoHeight() {
        var cur_w = $(".modal-video").width();
        $(".modal-video-content").css({
            height: (cur_w/16)*9
        });
    }

    $('.publication-addition').each(function() { // the containers for all your galleries
	    $(this).magnificPopup({
	        delegate: '.img-button', // the selector for gallery item
	        type: 'image',
	        gallery: {
	          enabled:true
	        }
	    });
	});



// ACCOUNT PAGES 


// LANGUAGE SELECT 
	
	$(".account .nice-select li").each(function(){
		var country = $(this).data('value');
		$(this).addClass('flag-icon-background flag-icon-squared flag-icon-'+country);
	});

	$("#select-country").change(function(){
		var country = $(this).val();
		$(this).siblings(".nice-select").find(".current").attr('class', 'current flag-icon-background flag-icon-squared flag-icon-'+country);
	});

	// 570:668 

	if ( Boolean( $(".account-right").get(0) ) ) {
		setBannerSize();

		$(window).resize(function(){
			setBannerSize();
		}); 

	}

	function setBannerSize() {

		const bannerWidth = 579,
			  bannerMinHeight = 700;
		var curWindowWidth = $(window).width()/2;
		var curWindowHeight = $(window).height();
		var curBannerH = bannerMinHeight*curWindowWidth/bannerWidth;
		if ( curBannerH > curWindowHeight) {
			var resultBannerW = curWindowHeight*bannerWidth/bannerMinHeight;
			var resultBannerH = bannerMinHeight*resultBannerW/bannerWidth;
			if ( resultBannerH > 720 ) {
				$(".account-right").css({
					'width' : resultBannerW+'px'
				});
				$(".account-left").css({
					'width' : (curWindowWidth*2-resultBannerW)+'px'
				});
			} else {
				$(".account-right").css({
					'width' : ((720*bannerWidth)/bannerMinHeight)+'px'
				});
				$(".account-left").css({
					'width' : (curWindowWidth*2-((720*bannerWidth)/bannerMinHeight))+'px'
				});
			}
		}

	}



// Account validation 


	$(".account-form").submit(function(e){
		e.preventDefault();
		if ( Boolean($("#password").get(0)) ) {
			$("#password").change(function(){
			validateAccountInput($(this), /^[\w\d\[\{\(\<\>\,\.\/\\\+\=\-\*\&\^\%\$\#\@\'\?\|\"\!\~\`\:\;\)\}\]]{8,}$/);
			});

			$("#password").keyup(function(){
				validateAccountInput($(this), /^[\w\d\[\{\(\<\>\,\.\/\\\+\=\-\*\&\^\%\$\#\@\'\?\|\"\!\~\`\:\;\)\}\]]{8,}$/);
			});
			validateAccountInput($("#password"), /^[\w\d\[\{\(\<\>\,\.\/\\\+\=\-\*\&\^\%\$\#\@\'\?\|\"\!\~\`\:\;\)\}\]]{8,}$/);
		}

		if ( Boolean($("#select-country").get(0)) ) {

			validateAccountInput($("#login"), /^[\w]{6,}$/);
			
			$("#login").change(function(){
				validateAccountInput($(this), /^[\w]{6,}$/);
			});

			$("#login").keyup(function(){
				validateAccountInput($(this), /^[\w]{6,}$/);
			});

			validateAccountInput($("#select-country"), /^[\w]{2}$/);
			validateAccountInput($("#email"), /^[\w\.]{0,}[\w]{1,}@[\w]{1,}\.[\w]{1,}$/);

			$("#select-country").change(function(){
			validateAccountInput($(this), /^[\w]{2}$/);
			});

			$("#select-country").keyup(function(){
				validateAccountInput($(this), /^[\w]{2}$/);
			});

			$("#email").keyup(function() {
				validateAccountInput($(this), /^[\w\.]{0,}[\w]{1,}@[\w]{1,}\.[\w]{1,}$/);
			});

			$("#email").change(function() {
				validateAccountInput($(this), /^[\w\.]{0,}[\w]{1,}@[\w]{1,}\.[\w]{1,}$/);
			});

		} else {
			validateAccountInput($("#login"), /^[\w\d\[\{\(\<\>\,\.\/\\\+\=\-\*\&\^\%\$\#\@\'\?\|\"\!\~\`\:\;\)\}\]]{6,}$/);
			
			$("#login").change(function(){
				validateAccountInput($(this), /^[\w\d\[\{\(\<\>\,\.\/\\\+\=\-\*\&\^\%\$\#\@\'\?\|\"\!\~\`\:\;\)\}\]]{6,}$/);
			});

			$("#login").keyup(function(){
				validateAccountInput($(this), /^[\w\d\[\{\(\<\>\,\.\/\\\+\=\-\*\&\^\%\$\#\@\'\?\|\"\!\~\`\:\;\)\}\]]{6,}$/);
			});

		}

	});

	function validateAccountInput(input, regExp) {
		var target = input.parents('.account-field');
		var cur_val = input.val();

		if ( !cur_val.match(regExp) ) {
			target.removeClass('success');
			target.addClass('error');
		} else  {
			target.removeClass('error');
			target.addClass('success');
		}
	}


	// LIVESTATS UPDATE TABLES 


	function addTableRow(table, row) {

		var tableHead = table.find(".table-head");

		var counter = 0;

		for (var key in row) {
		  counter++;
		}

		if ( tableHead.find('li').length != counter ) {
			//alert('Wrong match of table and row'+ 'tableHead.length='+tableHead.find('li').length+';rowlength='+counter);
			return false;
		}

		var newRow = $(table.find('.table-row').get(0)).clone();

		for( var i = 0; i < counter; i++ ) {
			var curCell = newRow.find("li:nth-child("+(i+1)+")");
			var cellType = tableHead.find("li:nth-child("+(i+1)+")").text().toLowerCase();
			switch (cellType) {
				case 'name': 
				curCell.find(".name").text(row.name.userName);
				curCell.find(".icon-color").attr('class', 'icon-color flag-icon-background flag-icon-'+row.name.countryCode+' flag-icon-squared');
				break;
				case 'date': 
				curCell.html( row.date.slice(0, row.date.indexOf(' ')) + "<br>" + row.date.slice(row.date.indexOf(' ')+1) );
				break;
				case 'representative':
				curCell.text(row.representative);
				break;
				case 'operation': 
				curCell.text(row.operation);
				break;
				case 'amount':
				curCell.find('.amount-value').text(row.amount);
				break;
				case 'wallet': 
				curCell.find('.wallet-type').attr('class', 'wallet-type wallet-type-'+row.wallet.walletType);
				if (row.wallet.link) {
					if ( curCell.find('.wallet-link-out').get(0) ) {
						curCell.find('.wallet-link-out').attr('href', row.wallet.link)
					} else {
						var newLink = '<a href="'+row.wallet.link+'" class="wallet-link-out" target="_blanc"></a>';
						$(newLink).insertAfter(curCell.find('.wallet-type'));
					}
				} else {
					curCell.find('.wallet-link-out').remove();
				}
				break;
			}
		//	console.log(curCell.get(0));
		}	

		newRow.addClass('before-show');
		
		newRow.attr('class', 'table-row before-show')

		// newRow.after(tableHead);
		tableHead.after(newRow);
		setTimeout(function(){
			table.find('.table-row.before-show').removeClass('before-show');
			table.find('.table-row:last-child').addClass('before-remove');
			setTimeout(function(){
				table.find('.table-row:last-child').remove();

			}, 300);
		}, 300);
		


	}
	$("body").css({
		height: $(document).outerHeight()
	});
    
	// RANDOM UPDATE EXAMPLE 

	var dataRow = {
		date: '21/12/17 17:39:51',
		name: {
			countryCode: 'ru',
			userName: 'Tor'
		},
		representative: 'Tortik'
	}

	var dataRow1 = {
		date: '21/12/17 17:40:51',
		name: {
			countryCode: 'ru',
			userName: 'Tor'
		},
		operation: 'Accrual',
		amount: '+$65.85',
		wallet: {
			walletType: 'bitcoin',
			link: false,
		}
	}

	var dataRow2 = {
		date: '21/12/17 17:40:51',
		name: {
			countryCode: 'ru',
			userName: 'Tor'
		},
		operation: 'Withdrawal',
		amount: '-$65.85',
		wallet: {
			walletType: 'payeer',
			link: 'stuff/unknown.html',
		}
	}

	var dataRow3 = {
		date: '21/12/17 17:40:51',
		name: {
			countryCode: 'ru',
			userName: 'Tor'
		},
		amount: '+$65.85'
	}

	var dataRow4 = {
		date: '21/12/17 17:40:51',
		name: {
			countryCode: 'ru',
			userName: 'Tor'
		},
		amount: '$62225.85'
	}

	var dataRow5 = {
		date: '21/12/17 17:40:51',
		name: {
			countryCode: 'ru',
			userName: 'Tor'
		},
		amount: '63245'
	}
 	
 	setInterval(function() {
 		addTableRow( $("#livestats-table-1"), dataRow );
 		addTableRow( $("#livestats-table-2"), dataRow1 );
 		addTableRow( $("#livestats-table-3"), dataRow2 );
 		addTableRow( $("#livestats-table-4"), dataRow3 );
 		addTableRow( $("#livestats-table-5"), dataRow4 );
 		addTableRow( $("#livestats-table-6"), dataRow5 );
 		
 	}, 5000);
	
    for (var j = 1; j < 7; j++) {
    	$("#livestats-table-"+j).css({
    		'height': $("#livestats-table-"+j).outerHeight()
    	});
    }

    $(".livestats-simple-block").each(function(){
    	$(this).css({
    		height: $(this).outerHeight()
    	})
    });
      $(".table-block-only-table").each(function(){
    	$(this).css({
    		height: $(this).outerHeight()
    	})
    });

     $(".publication-addition-item .video-button").each(function(){

     	

     	var video_link = $(this).data('video');

        if (video_link) {

            var num_main = video_link.indexOf('?v=');

            video_link = video_link.substring(num_main+3);

            num_main = video_link.indexOf('&');

            if (num_main!=-1) {
                video_link = video_link.substring(0, num_main);
                video_link = "http://img.youtube.com/vi/" + video_link+ '/mqdefault.jpg';
            } else {
                video_link = "http://img.youtube.com/vi/" + video_link+ '/mqdefault.jpg';
            };
            $(this).siblings("img").attr('src', video_link);

        }
     })



});
$(document).ready(function(){
   var countMarker = false;
   if (!countMarker) {
   	var numberCC = $(".heading-counter").text();
        var numberCount =  numberCC.slice(numberCC.indexOf(' '), numberCC.length);
	numberCC = numberCC.slice(0, numberCC.indexOf(' '));
	var countWord = 'товар';
	if (numberCC.length == 1 && +(numberCC) > 1 && +(numberCC) < 5) {
		countWord += 'а';
	}  else if (numberCC.length > 1 && 
		+(numberCC[numberCC.length-1]) > 1 &&
		+(numberCC[numberCC.length-1]) < 5 &&
		+(numberCC[numberCC.length-2]) != 1) 
	{
		countWord += 'а';
	} else if (numberCC.length == 1 && +(numberCC) == 1) {
		countWord += '';
	} else if (numberCC.length > 1 &&
	 +(numberCC[numberCC.length-2]) != 1 &&
	 +(numberCC[numberCC.length-1]) == 1) {
		countWord += '';
	} else {
		countWord += 'ов';
	}
	console.log(countWord);
   }
	

                })


