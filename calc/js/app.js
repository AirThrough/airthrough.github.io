$(document).ready(function () {

	$("select").niceSelect();
	
	$(".range").slider({
		min: 0,
		max: 1000,
		value: 1000,
		change: function( event, ui ) {

			$("#range-input").val(ui.value);
			getFullCost();
		}
	});

	$(".range-points li").each(function(){

		var width_needed = $(this).width()/2;
		console.log(width_needed);
		$(this).css({
			'margin-left': -width_needed
		})

	});



	// MAIN CALC CODE

	$(".input-calc").change(function(){

		getFullCost();

	});

	function getFullCost() {
		
		var cur_values = setValues();

		var mat_self_cost = getMaterialsCost(cur_values);

		console.log(mat_self_cost+' mat_self_cost');

		var work_self_cost;

	}

	function setValues() {
		
		var values = {};

		values.fence_length = $("#range-input").val();
		values.fence_height = $("#height").val();
		values.lags = $("#lag").val();
		values.width_list = $("#width").val();
		values.mark = $("#mark").val();
		values.covering = $("#covering").val();
		values.pillars = $("#pillars").val();
		values.gates = $("#gates").val();
		values.gates_type = $(".radio-type").val();
		values.gates_width = $("#gates-width").val();
		values.gates_mech = $("#gates-mech").val();
		values.gates_back = $("#gates-back").val();
		values.gates_width_back = $("#gates-width-back").val();
		values.gates_mech_back = $("#gates-mech-back").val();
		values.gates_back_small = $("#gates-back-small").val();

		return values;

	}

	function getMaterialsCost(values) {
		
		// Get Pillars

		var pillars_cost = 0;
		var pillars_amount = 0;

		if (+values.fence_length == 0) {
			pillars_amount = 0;
		} else {
			pillars_amount = Math.ceil((values.fence_length - values.gates*values.gates_width - values.gates_back*values.gates_width_back-values.gates_back_small)/2.5+1);
		}

		$("#pillars .amount").text(pillars_amount);


		//Set the cost of pillar
		switch (values.pillars) {
			case '60х60х1,8 мм.':
			pillars_cost = 138;
			break;

			case '60х60х2 мм.':
			pillars_cost = 140;
			break;

			case '80х80х2 мм.':
			pillars_cost = 237;
			break;

			case '80х80х3 мм.':
			pillars_cost = 300;
			break;
		}

		pillars_cost = (pillars_cost*((+values.fence_height)+1))*pillars_amount;

		$("#pillars .cost").text(pillars_cost);

		console.log('pillars_cost' +' '+pillars_cost);
		

		// Get LAGS

		var lag_cost = 180;
		var lag_amount = 0;

		if (+values.lags == 0) {
			lag_amount = 0;
		} else {
			lag_amount = Math.ceil(((values.fence_length - values.gates*values.gates_width - values.gates_back*values.gates_width_back-values.gates_back_small)/3)*values.lags);
		}

		$("#lags .amount").text(lag_amount);

		//Set the cost of lag
		lag_cost *= lag_amount;

		console.log('lag_cost' +' '+lag_cost);

		$("#lags .cost").text(lag_cost);




		//get material

		var mat_cost = 0;
		var mat_amount = 0;

		switch (values.mark) {
			case '8': 

			mat_amount = Math.ceil(+values.fence_length/1.15);
			break;

			case '20': 

			mat_amount = Math.ceil(+values.fence_length/1.1);
			break;
		}

		$("#material .amount").text(mat_amount);


		switch (values.covering) {

			case 'Одностороннее': 

			switch (values.width_list) {

				case '0.4': 
				mat_cost = 280;
				break;

				case '0.5': 
				mat_cost = 350;
				break;

			}
			break;

			case 'Двухстороннее': 

			switch (values.width_list) {

				case '0.4': 
				mat_cost = 320;
				break;

				case '0.5': 
				mat_cost = 370;
				break;

			}
			break;

			case 'Оцинкованное': 

			switch (values.width_list) {

				case '0.4': 
				mat_cost = 245;
				break;

				case '0.5': 
				mat_cost = 0;
				break;

			}
			break;

			case 'Имитация дерева/камня': 
			mat_cost = 0;
			break;


		}

		mat_cost = mat_cost*mat_amount*values.fence_height;

		$("#material .cost").text(mat_cost);



		// console.log(mat_amount+ ' eto mat amount');


		// Get GATES

		var gates_amount = (+values.fence_length == 0) ? 0 : values.gates;


		var gates_cost = 0;
		switch (values.gates_width) {

			case '3':

			if (values.gates_type == '2') {
				switch(values.fence_height) {
					case '1.8':
					gates_cost = 4311;
					break;

					case '2':
					gates_cost = 4453.8;
					break;

					case '2.2':
					gates_cost = 4776.6;
					break;

					case '2.5':
					gates_cost = 4990.8;
					break;
				}
			} else {

				switch(values.fence_height) {
					case '1.8':
					gates_cost = 4131;
					break;

					case '2':
					gates_cost = 4273.8;
					break;

					case '2.2':
					gates_cost = 4416.6;
					break;

					case '2.5':
					gates_cost = 4810.8;
					break;
				}
			}

			break;


			case '3.5':

			if (values.gates_type == '2') {
				switch(values.fence_height) {
					case '1.8':
					gates_cost = 4511;
					break;

					case '2':
					gates_cost = 4653.8;
					break;

					case '2.2':
					gates_cost = 5006.6;
					break;

					case '2.5':
					gates_cost = 5220.8;
					break;
				}
			} else {

				switch(values.fence_height) {
					case '1.8':
					gates_cost = 4301;
					break;

					case '2':
					gates_cost = 4443.8;
					break;

					case '2.2':
					gates_cost = 4586.6;
					break;

					case '2.5':
					gates_cost = 5010.8;
					break;
				}
			}

			break;

			case '4':

			if (values.gates_type == '2') {
				switch(values.fence_height) {
					
					case '1.8':
					gates_cost = 4471;
					break;

					case '2':
					gates_cost = 4613.8;
					break;

					case '2.2':
					gates_cost = 4756.6;
					break;

					case '2.5':
					gates_cost = 5210.8;
					break;
				}
			} else {

				switch(values.fence_height) {
					
					case '1.8':
					gates_cost = 4711;
					break;

					case '2':
					gates_cost = 4853.8;
					break;

					case '2.2':
					gates_cost = 5236.6;
					break;

					case '2.5':
					gates_cost = 5450.8;
					break;
				}
			}

			break;

		}

		console.log (gates_cost +' eto gates cost');

		// kalitka
		var gates_small_cost = 0;
		var gates_small_amount = values.gates_back_small;

		if (values.gates_type == '2') {

			switch(values.fence_height) {
				

				case '1.8':
				gates_small_cost = 1409;
				break;

				case '2':
				gates_small_cost = 1461;
				break;

				case '2.2':
				gates_small_cost = 1573;
				break;

				case '2.5':
				gates_small_cost = 1651;
				break;
			}


		} else {

			switch(values.fence_height) {

				case '1.8':
				gates_small_cost = 1349;
				break;

				case '2':
				gates_small_cost = 1401;
				break;

				case '2.2':
				gates_small_cost = 1453;
				break;

				case '2.5':
				gates_small_cost = 1591;
				break;
			}

		}

		gates_small_cost *=gates_small_amount;

		console.log(gates_small_cost + ' gates_small_cost');

		// get gates_back

		var gates_back_amount = (+values.fence_length == 0) ? 0 : values.gates_back;
		var gates_back_cost = 0;
		switch (values.gates_width_back) {

			case '3':

				switch(values.fence_height) {

					case '1.8':
					gates_back_cost = 20500;
					break;

					case '2':
					gates_back_cost = 21000;
					break;

					case '2.2':
					gates_back_cost = 21500;
					break;

					case '2.5':
					gates_back_cost = 22000;
					break;
				}

			break;


			case '3.5':

				switch(values.fence_height) {
					case '1.8':
					gates_back_cost = 21000;
					break;

					case '2':
					gates_back_cost = 21500;
					break;

					case '2.2':
					gates_back_cost = 22000;
					break;

					case '2.5':
					gates_back_cost = 22500;
					break;
				}

			break;

			case '4':

				switch(values.fence_height) {
					
					case '1.8':
					gates_back_cost = 21500;
					break;

					case '2':
					gates_back_cost = 22000;
					break;

					case '2.2':
					gates_back_cost = 22500;
					break;

					case '2.5':
					gates_back_cost = 23000;
					break;
				}

			break;

		}


		if (values.gates_mech_back == 'Механические') {
			gates_back_cost += 13000;
		} else {
			gates_back_cost = gates_back_cost + 13000 + 27400;
		}

		gates_back_cost *= gates_back_amount;

		console.log (gates_back_cost +' eto gates_back cost');

		//samorezi 

		var samorez_amount = (mat_cost != 0) ? mat_amount*4*lag_amount : 0;

		console.log (samorez_amount +' eto samorez_amount cost');


		//GRUNT

		var grunt = (pillars_amount*((values.fence_height*10 + 10)/10) + lag_amount*3)*7;

		console.log (grunt +' eto grunt cost');

		//заглушки

		var pillars_over = pillars_amount*6;

		console.log (pillars_over +' eto pillars_over cost');

		//заглушки для ворот

		var pillars_over_gates = (+values.gates_back + +values.gates)*20;

		console.log (pillars_over_gates +' eto pillars_over_gates cost');

		//electords

		var e_dods = (values.fence_length/200)*300;

		console.log (e_dods +' eto e_dods cost');

		//rounds for bolgarka

		var b_rounds = (values.fence_length/100)*100;

		console.log (b_rounds +' eto e_dods cost');

		// WORK========================================
		//
		//
		//
		//
		//
		//

		var install_fence = 0;

		switch(values.fence_height) {
			case '1.5':
			case '1.8':
			case '2':
			install_fence = 80;
			break;

			case '2.5':
			install_fence = 120;
			break;
		}

		install_fence *= values.fence_length;

			console.log (install_fence +' eto install_fence cost');

		//GATES WORK

		var install_gates = values.gates*1000 + values.gates_back_small*500;

		if (values.gates_mech_back == "Механические") {
			install_gates += values.gates_back*10000;
		} else {
			install_gates += values.gates_back*17000;
		}

		console.log (install_gates +' eto install_gates cost');

		//	pillars work

		var install_pillars = values.fence_length*50;

		var work_self_cost = install_pillars + install_gates + install_fence;

		console.log (work_self_cost + ' work_self_cost');

		//incomes
		//\
		///
		///
		//\
		//
		//
		//

		var incomes_i_fence = values.fence_length*200;


		var incomes_i_gates = (+values.gates + +values.gates_back_small)*1800+ +values.gates_back*15000;

		console.log(incomes_i_gates+ ' sum_incomes');

		var incomes_i_pillars = values.fence_length*100;


		var sum_incomes = incomes_i_pillars+incomes_i_gates+incomes_i_fence;

		console.log(sum_incomes+ ' sum_incomes');

		var sum_self_mat = b_rounds+e_dods+pillars_over_gates+pillars_over+
				grunt+gates_back_cost+gates_small_cost+gates_cost+lag_cost+pillars_cost+mat_cost+samorez_amount;

		var fin_sum = sum_self_mat + sum_incomes + work_self_cost;

		$("#self-cost").text(sum_self_mat);
		$("#work-cost").text(work_self_cost);
		$("#incomes-cost").text(sum_incomes);

		$(".result-block .cost").text(fin_sum + ' руб.');





		return b_rounds+e_dods+pillars_over_gates+pillars_over+
				grunt+gates_back_cost+gates_small_cost+gates_cost+lag_cost+pillars_cost+mat_cost+samorez_amount;


	}

	

})

