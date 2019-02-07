$(function(){

	var func = (function(){

		function activator(){
			$('.activator').on('click',function(){
				var target = $(this).attr('data-target');
				$('#'+target).fadeToggle(0);
			})
		}

		function details(){
			$('.advanced-button-link').on('click',function(){
				$(this).closest('.menu-details').toggleClass('auto-form-detailed');
			})
		}

		function downpanel(){
			$('.open-mainfilter-link,.down-panel-search').on('click',function(e){
				e.preventDefault();
				$('.wrapper').addClass('filtr-activate')
				$('html').addClass('html-overflow');
				$('.wrapper').addClass('wrapper-shadow-active');
			})
		}

		$('.menu-details .back-icon').on('click',function(){
			$('.wrapper').removeClass('filtr-activate')
			$('html').removeClass('html-overflow');
			$('.wrapper').removeClass('wrapper-shadow-active');
		})

		function helperInit(){

			$('.helper .close-link').on('click',function(){
				$(this).closest('.helper').fadeOut(0).removeClass('navigator-activated').find('.helper-selected').removeClass('helper-selected');
			})

			if ($(window).width()<768){

				var initialPoint;
				var finalPoint;

				document.addEventListener('touchstart', function(event) {

					// event.preventDefault();
					// event.stopPropagation();

					initialPoint=event.changedTouches[0];

				}, false);

					document.addEventListener('touchend', function(event) {

						var act = true;

						var parent = event.target.parentNode;
						var realParent = true;

						finalPoint=event.changedTouches[0];
						var xAbs = Math.abs(initialPoint.pageX - finalPoint.pageX);
						var yAbs = Math.abs(initialPoint.pageY - finalPoint.pageY);

						// console.log(xAbs,yAbs)

						// if (event.target.tagName === 'A' || event.target.tagName === 'INPUT' || $('.wrapper').hasClass('filtr-activate') ) {
						// 	realParent = false;
						// }
						// 	while ( parent ){
						// 	    if ( parent.tagName === 'A' || parent.className === 'selector' ){
						// 	        break;
						// 	    }
						// 	    parent = parent.parentNode;
						// 	}

							// if ( parent !== null || !realParent){

							if (xAbs < 30 || $('.wrapper').hasClass('filtr-activate')){
							    // nothing
							} else {

								// $('input').blur();
								// $('.user-panel').removeClass('user-panel-activated');

								event.preventDefault();
								event.stopPropagation();

								// finalPoint=event.changedTouches[0];
								// var xAbs = Math.abs(initialPoint.pageX - finalPoint.pageX);
								// var yAbs = Math.abs(initialPoint.pageY - finalPoint.pageY);
								if (xAbs > 30 || yAbs > 20) {
								if (xAbs > yAbs) {
									if (finalPoint.pageX < initialPoint.pageX){
										hideList();
										$('.profile').removeClass('mobile-active-panel');
										$('.profile_list').removeClass('ulpanel-active');
										$('.sidebar').removeClass('sidebar-mobile'); // кабинет
									}
									else{

										if ($("div").is(".profile__left")){
											$('.profile').addClass('mobile-active-panel');
											$('.profile_list').addClass('ulpanel-active');
											$('html').addClass('html-overflow');
											$('.wrapper').addClass('wrapper-shadow-active');
										} else {
											$('#navigator-mobile').addClass('navigator-fixed-mobile');
											// $('html').addClass('html-overflow');
											$('.helper .helper-name__text').html('Категории');
											var idd = $('.down-panel').attr('data-target');
											// console.log(idd)
											var elem = navMobile.find('#'+idd);
											if (idd){
												elem.css('display','block');
												$('.helper-main').css('display','none');
											}
										}
										$('.wrapper').addClass('wrapper-shadow-active');
									}
								}
							}
								
						}
						// else {
						// if (finalPoint.pageY < initialPoint.pageY){
						// /*СВАЙП ВВЕРХ*/}
						// else{
						// /*СВАЙП ВНИЗ*/}
						// }
				}, false);

				// $(".wrapper").swipe( {
				// 	//Generic swipe handler for all directions
				// 	swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
				// 		if ($(window).width()<768){
				// 			if (direction=='right'){
				// 				if ($("div").is(".profile__left")){
				// 					$('.profile').addClass('mobile-active-panel');
				// 					$('.profile_list').addClass('ulpanel-active');
				// 					$('html').addClass('html-overflow');
				// 					$('.wrapper').addClass('wrapper-shadow-active');
				// 				}
				// 			} 
				// 				else {
				// 					$('#navigator-mobile').addClass('navigator-fixed-mobile');
				// 					// $('html').addClass('html-overflow');
				// 					$('.helper .helper-name__text').html('Категории');
				// 					var idd = $('.down-panel').attr('data-target');
				// 					console.log(idd)
				// 					var elem = navMobile.find('#'+idd);
				// 					if (idd){
				// 						elem.css('display','block');
				// 						$('.helper-main').css('display','none');
				// 					}
				// 				}
				// 				$('.wrapper').addClass('wrapper-shadow-active');
				// 			} else {
				// 				hideList();
				// 				$('.profile').removeClass('mobile-active-panel');
				// 				$('.profile_list').removeClass('ulpanel-active');
				// 				$('.sidebar').removeClass('sidebar-mobile'); // кабинет
				// 			}
				// 		}
				// 	},

				// 	//Default is 75px, set to 0 for demo so any distance triggers swipe

				//    threshold: 30,
				//    excludedElements: "label, button, input, select, textarea"
				// });

			}

			$('.helper-row').on('click',function(e){
				var status = 0;
				if ($(this).hasClass('helper-row-active')){
					status = 1;
				}
				if (e.target.tagName === 'A'){

				} else {
					$(this).closest('.navigator-content').find('.helper-row-active').removeClass('helper-row-active');
					if (status){
						$(this).removeClass('helper-row-active');
					} else {
						$(this).addClass('helper-row-active');
					}
				}
			})

			$('.selector--categories').on('click',function(){
				$('#navigator').fadeOut(0);
			})

			$('.topik,.button-allsections,.down-panel-menu').on('click',function(e){
				e.preventDefault();
				if ($(window).width()<768){
					$('#navigator-mobile').removeClass('navigator--categories');
					$('.wrapper').addClass('wrapper-shadow-active');
					showList();
				} else {
					$('#navigator').fadeToggle(0);
					$('#navigator .helper-container').css('max-height',$(window).height()-20);
					$('#popup-categories').css('display','none');
				}
			})

			$('.category-blocklink,.button-navigator,.down-panel-categories').on('click',function(e){
				e.preventDefault();
				if ($(window).width()<768){

					// $('#navigator-mobile').addClass('navigator--categories');
					$('#navigator-mobile').addClass('navigator-fixed-mobile');
					$('html').addClass('html-overflow');
					$('.helper .helper-name__text').html('Категории');
					$('.wrapper').addClass('wrapper-shadow-active');

					var idd = $(this).attr('data-target');
					var elem = navMobile.find('#'+idd);
					if (idd){
						elem.css('display','block');
						$('.helper-main').css('display','none');
					}

				} else {
					$('#popup-categories').css('display','block');
					$('#navigator').css('display','none');
				}
			})

			function showList(){
				$('.helper-detail').css('display','none');
				$('.helper-main').css('display','block');
				$('#navigator-mobile').addClass('navigator-fixed-mobile');
				$('html').addClass('html-overflow');
				// $('.wrapper').addClass('wrapper-shadow-active');
				$('.helper .helper-name__text').html('Разделы сайта');
			}

			function hideList(){
				$('#navigator-mobile').removeClass('navigator-fixed-mobile');
				$('.wrapper').removeClass('wrapper-shadow-active')
				$('html').removeClass('html-overflow');
			}

			var navMobile = $('#navigator-mobile');
			var mobileMain = $('.helper-main')
			var mass1 = [];
			var mass2 = [];

			// начальная фаза выбора

			$('#navigator-mobile .hrow-name').on('click',function(e){
				var idd = $(this).attr('data-target');
				if (idd!='none'){
					e.preventDefault();
					var elem = navMobile.find('#'+idd);
					if (idd){
						elem.css('display','block');
						$('.helper-main').css('display','none');
					}
					mass1.push(elem)
					mass2.push(mobileMain);
				}
				
			})

			// вторичная фаза

			$('.helper-picker').on('click',function(e){
				var idd = $(this).attr('data-target');
				var elem = $(this).closest('.helper-detail').find('#'+idd);
				if (idd){
					elem.css('display','block').addClass('helper-current-phase');
					var closeElem = $(this).closest('.helper-detail-section')
					closeElem.css('display','none');
					mass1.push(elem)
					mass2.push(closeElem);
				}
			})

			// закрытие фаз

			$('#navigator-mobile .back-icon').on('click',function(){
				if (mass1.length>0){
					mass1[mass1.length-1].css('display','none');
					mass2[mass2.length-1].css('display','block');
					mass1.pop();
					mass2.pop();
				} else {
					hideList();
				}
			})

		};

		function uiSliders(){

			var sliders = $('.regulator');

			sliders.each(function(num,elem){
				var text = " руб";
				var min = 1000;
				var max = 100000;
				if ($(elem).hasClass('regulator-settings')){
					text = $(elem).attr('data-text');
					min = +$(elem).attr('data-min');
					max = +$(elem).attr('data-max');
				}
				var rangeblock = $(elem).find('input');
				var range = $(elem).find('.slider-rangerblock');
				initReg(range,rangeblock,text,min,max);
			})

			function initReg(name,amount,text,minV,maxV){
				if (!text){
					text = ' руб';
				} else if (text == 'none'){
					text = '';
				}
				$(name ).slider({
				range: true,
				min: minV,
				max: maxV,
				values: [ minV, maxV ],
				slide: function( event, ui ) {
					$(amount).val( "" + ui.values[ 0 ] + " - " + ui.values[ 1 ] + text );
				}
				});
					$(amount).val( "" + $(name).slider( "values", 0 ) +
					" - " + $(name).slider( "values", 1 ) + text);
			}

			$( ".slider-rangeblock--regulator" ).on( "slidechange", function( event, ui ) {
				var reg = ($(this).closest('.regulator'));
				var suff = '';
				if (reg.attr('data-suffix')){
					suff = reg.attr('data-suffix');
				}
				$(this).closest('.selector-regulator').find('.selector-value').html('от '+ui.values[0]+' до '+ui.values[1]+' '+suff);
			} );

		}

		function userlist(){

			$('.user-panel-cursor').on('click',function(e){
				if ($(window).width()<768){
					var $parent = $(this).closest('.user-panel');
					$parent.find('.tale--header').css('right', $parent.outerWidth()-30);
				}
				$(this).closest('.user-panel').toggleClass('user-panel-activated');
			})

			$(document).mouseup(function (e) {
			    var container = $(".userlist");
			    if (container.has(e.target).length === 0 && $('.user-panel-cursor').has(e.target).length === 0){
			        $('.user-panel').removeClass('user-panel-activated');
			    }
			});
		}

		function enter(){

			var wh = $(window).height();

			$('.enter-content').css('max-height',wh-20);

			$('.enter').on('click',function(e){
				e.preventDefault();
				$('#navigator').css('display','none');
				$('#popup-categories').css('display','none');
				var check = $(this).find('.closer')
				var target = $('.enter__list');
				target.toggleClass('enter-open');
				$('.enter-content').css('max-height',$(window).height()-20);
				if ($(window).width()<768){
					$('html').addClass('html-overflow');
				}
			})

			$('.enter__list').on('click',function(e){
				$('.selector .selector__list').fadeOut(0);
			})

			$(document).mouseup(function (e) {
			    var container = $(".enter__list");
			    var btn = $('.enter')
			    if (container.has(e.target).length === 0 && e.target!=container[0]){
			    	if ($(e.target).hasClass('enter') || $(e.target).hasClass('fa-sign-in')){
			    	} else {
			    		container.removeClass('enter-open')
			    	}
			    }
			});

			$('.enter__list .back-icon').on('click',function(e){
				$('html').removeClass('html-overflow');
				$('.selector ul').fadeOut(0);
				$('.enter__list').removeClass('enter-open')
				$('.enter-content').removeClass('enter-register-type')
				$('.enter-content').removeClass('enter-enter-type')
			})

			$('.link-register').on('click',function(e){
				e.preventDefault();
				$(this).closest('.enter-content').toggleClass('enter-register-type')
			})

			$('.link-vhod').on('click',function(e){
				e.preventDefault();
				$(this).closest('.enter-content').toggleClass('enter-enter-type')
			})

			$("input[name='phone-mask']").mask("+7(00)-000-00-00");

		};

		function categoriesDrops(){

			$('.category-next').on('click',function(e){
				$('.header-categories').addClass('open-cat')
				$(this).addClass('category-disabled');
			})

			$('.category-element-block').on('mouseleave',function(e){
				$(this).removeClass('category-activated');
			})

			window.onscroll = function(){
				if ($(window).scrollTop() >= 5){ 
					var status = $('.header_logo').css('display');
					var exist = $('.header-categories-drops')
					if (status != 'none' && exist.length && $(window).width()>=768){
						$('.header_logo').slideUp(500);
						$('.header-categories').addClass('header-categories--stadia')
					}
				}
			}

			$('.category-element-block').on('mouseover',function(e){

				var parent = ($('.container-bg').outerWidth());
				var elem = $(this).find('.category-drop');
				var tr = elem.find('.cat-triangle');	

				var blockWidth = $(this).closest('.category-element').outerWidth()/2;

				var $this = $(this).closest('.category-element')

				var w = $(window).width();
				var wh = $(window).height();
				var elemh = elem.outerHeight();
				var elemw = elem.outerWidth();

				var setPos;

				var dis = $(this).offset().top;
			  	var mydis = $(window).scrollTop();
			  	var currPos = dis-mydis;

			  	$(this).addClass('category-activated');

				var pos = $this.offset().left;

				if (pos>w/2){

					pos = w-($this.offset().left+blockWidth*2);

					setPos = -6;

					var minpos = w-((w-parent)/2+parent-20);
					var maxpos = w-((w-parent)/2+20+650)

					if (pos>=minpos){
					if (pos>=maxpos){
						setPos = maxpos-pos;
						}
					} else {
						setPos = minpos-pos;
					}

					elem.css('left','initial');
					tr.css('left','initial');
					elem.css('right',setPos);
					tr.css('right',blockWidth-10-setPos);

				} else {

					pos = $this.offset().left;

					setPos = 0;

					var minpos = (w-parent)/2+20;
					var maxpos = (w-parent)/2+(parent-20-elemw)

					if (pos>=minpos){
					if (pos>=maxpos){
						setPos = maxpos-pos;
						}
					} else {
						setPos = minpos-pos;
					}
					
					elem.css('left',setPos);
					tr.css('left',blockWidth-10-setPos);

				}
				
			})

		};



		function initSelectors(){

			$('.selector').on('click',function(e){
				$(this).removeClass('selector--categories--reversed');
				var $this = $(this);
				var set = 0;
				var list = $(this).find('.selector__list')
				if (list.css('display') == 'block'){
					set = 1;
				}
				e.stopPropagation();
				$('.selector .selector__list').fadeOut(0).removeClass('selector-picked');
				// list.fadeIn(0);
				if (set){
					list.fadeOut(0);
				} else {
					list.fadeIn(0);
					var currHeight = $(window).height();
					var scrollTop = $(window).scrollTop();
					var elemTop = $this.offset().top;
					var distance = elemTop - scrollTop;
					if (distance>currHeight/1.5){
						list.css('top','initial');
						if (list.hasClass('selector__list--colored')){
							list.css('bottom','55px');
							$(this).addClass('selector--categories--reversed');
						} else {
							list.css('bottom','100%');
						}
					} else {
						list.css('bottom','initial');
						if (list.hasClass('selector__list--colored')){
							list.css('top','55px');
						} else {
							list.css('top','100%');
						}
					}
				}
			})

			$('.selector__item').on('click',function(e){
				var parent = $(this).closest('.selector');
				parent.find('.selector-value').html($(this).text());
				var index = $(this).attr('data-value');
				parent.find('select').val(index);
				if ($(this).hasClass('selector-changer')){
					var target = $(this).attr('data-target');
					var main = $(this).closest('.menu-details');
					var liners = main.find('.oneliner--radio');
					liners.fadeOut(0);
					$('#'+target).fadeIn(0);
				}
			})

			$(document).click(function() {
				clear();
				enterOpen = false;
			})

			function clear(){
				$('.selector .selector__list').fadeOut(0);
				$('.wrapper').removeClass('container-shadow');
			}

			// numerators

			$('.selector-numerator .selector__list, .selector-regulator .selector__list').on('click',function(e){
				e.stopPropagation();
			})

			$('.selector-numerator input').change(function(){ 
				var field = $(this).closest('.selector-numerator')
				var suff = 'руб';
				if (field.attr('data-text')){
					suff = field.attr('data-text');
				}
				var value1 = field.find('.start-value');
				var value2 = field.find('.end-value');
				var fieldText = field.find('.selector-value');

				function setVals(){
					if (value1.val() && value2.val()){
						fieldText.html('от '+value1.val()+' до '+value2.val()+' '+suff);
					} else if (!value2.val()) {
						fieldText.html('от '+value1.val()+' '+suff);
					} else if (!value1.val()) {
						fieldText.html('до '+value2.val()+' '+suff);
					}
				}

				if (value1.val()<0){
					value1.val(0)
				}
				if (value2.val()<0){
					value2.val(0)
				}

				var check = value2.val()-value1.val();

				if (check<0){
					value2.val("");
					setVals();
				}

				setVals();

			})

		}

		function initFadeSlider(){

			var blue = false;

			var fadeTime = 800;
			var slider = $('.fade-slider-init');
			var slides = slider.find('li');
			var num = slides.length;
			var currentSlide = 0;
			var mouse = true;
			var sliderActive= true;
			var sliderTimer = setInterval(function(){
				if (sliderActive){
					moveSlide(1);
				} else {
					sliderActive = true;
				}
			},4000);
			$('.fade-slider-prev-link').on('click',function(){
				if (mouse){
					moveSlide(-1);
					sliderActive = false;
				}
			})
			$('.fade-slider-next-link').on('click',function(){
				if (mouse){
					moveSlide(1);
					sliderActive = false;
				}
			})

			function moveSlide(change){
				mouse = false;
				$(slides).eq(currentSlide).fadeOut(fadeTime)
				currentSlide = setSlide(change);
				$(slides).eq(currentSlide).fadeIn(fadeTime,function(){
					mouse = true;
				})
			}

			function setSlide(n){
				currentSlide+=n;
				if (currentSlide>num-1){
					return 0;
				}
				if (currentSlide<0){
					return num-1;
				}
				return currentSlide;
			}

			$(window).blur(function() { blur = true; clearInterval(sliderTimer);});

			$(window).focus(function() {
				blur = false;  
				var sliderTimer = setInterval(function(){
					if (blur){
						clearInterval(sliderTimer); return;
					}
					if (sliderActive){
						moveSlide(1);
					} else {
						sliderActive = true;
					}
				},4000);
			});

		};

		return{
			init: function(){
				initFadeSlider();
				initSelectors();
				enter();
				categoriesDrops();
				userlist();
				uiSliders();
				helperInit();
				downpanel();
				details();
				activator();
			}
		}

	}());

	func.init();

}());