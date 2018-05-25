(function($) {
    $(function() {
      $('input, select').styler({
       fileBrowse:"ADD FILE",
             filePlaceholder:" ",
             });
    })
})(jQuery)



//=========================textarea//
$(function(){
   $('.normal').autosize();       
});

//=========================textarea//




$(document).ready(function(){

  $(".close_form").click(function(){
    var fn = $("#form_prodject");
    $.fancybox.close();
    $(".pp_success").removeClass('active');

  });

  $("#file_form2, #file_form, #file_form_m").submit(function(e){
   e.preventDefault();
    console.log('true');
//$.fancybox.close();
    $(".pp_success").addClass('active');


    var th = $(this);
    // $.ajax({
    //  type: "POST",
  //           url: "mail.php", //Change
  //           data: th.serialize()
  //       }).done(function() {
  //        $.magnificPopup.open({ items: { src: '#sp' } });
          setTimeout(function() {
                 th.trigger("reset");
             }, 1000);
      //   });

       // return false;

    });

   $("#file_form-10").submit(function(e){
   e.preventDefault();
    console.log('true');
//$.fancybox.close();
    $(".pp_success.without-popup").addClass('active');


    var th = $(this);
    // $.ajax({
    //  type: "POST",
  //           url: "mail.php", //Change
  //           data: th.serialize()
  //       }).done(function() {
  //        $.magnificPopup.open({ items: { src: '#sp' } });
          setTimeout(function() {
                 th.trigger("reset");
             }, 1000);
      //   });

       // return false;

    });



    // slick

    $('.comments_container').slick({
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay:true,
        arrows:false,
        dots:true,
        responsive: [
          {
            breakpoint: 901,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              infinite: true
            }
          }
        ]
      });

    if($(window).width() < '769'){
        $('.workers').slick({
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay:true,
          arrows:false,
          dots:true
        })
      }

      if($(window).width() < '1100'){
        $('.believe_container__ul').slick({
          slidesToShow: 4,
          slidesToScroll: 1,
          autoplay:true,
          arrows:false,
          dots:true,
          responsive: [
          {
            breakpoint: 651,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
              infinite: true
            }
          }
        ]
        })
      }
    
//============================================================

$(".ico_nav").bind("click", function(){

        $(this).next('.h_nav_box').slideToggle(300).toggleClass("open_box");
        $(this).next('.h_nav_box').find('.link_open_nav').toggleClass("active_mob_link");
        $(this).parents('.header_nav').toggleClass("open_menu");
        $(this).parents('body').toggleClass("b_overflow");
        

        // $(".link_open_nav.active_mob_link").trigger('click');
        $('.drop_nav').addClass("active_custom");

      

}); 
$(".close_nav").bind("click", function(){
   $('.drop_nav').removeClass("active_custom");
        $(this).parents('.open_box').slideToggle(300).toggleClass("open_box");
        $(this).parents('.h_nav_box').find('.link_open_nav').removeClass("active_mob_link");
        $(this).parents('body').removeClass("b_overflow");
    });   

// FIX FOR IPAD

var ua = navigator.userAgent,
event = (ua.match(/iPad/i)) ? "touchstart" : "click";

if (ua.match(/iPad/i)) {

  $(document).bind("touchstart", function(e) {
      //var div1 = $(".drop_nav");
    //  var div2 = $(".link_open_nav");
      $(document).trigger('click');
    //  $(document).trigger('click');
    });

} 


jQuery(function($){
  $(document).mouseup(function (e){ // событие клика по веб-документу
    var div = $(".header_nav"); // тут указываем ID элемента
    if (!div.is(e.target) // если клик был не по нашему блоку
        && div.has(e.target).length === 0) { // и не по его дочерним элементам
      div.removeClass('open_menu').children('.open_box').removeClass('open_box').slideUp(300).parents('body').removeClass("b_overflow"); // скрываем его   
    }
        
  });
});

$(".open_nav").delegate('a.active_mob_link','click', function(){
       //$(this).toggleClass("active_link");
       $(this).parents('.open_nav').toggleClass("active_li");
       $(this).next('.drop_nav').toggleClass("active");

       //$(document).bind('touchmove', false);

}); 
jQuery(function($){
  $(document).mouseup(function (e){ // событие клика по веб-документу
    var li = $(".active_li"); // тут указываем ID элемента
    if (!li.is(e.target) // если клик был не по нашему блоку
        && li.has(e.target).length === 0) { // и не по его дочерним элементам
      li.removeClass('active_li').children('.drop_nav').removeClass('active').slideUp(300); // скрываем его   
    }
        
  });
}); 
  

//==========================================================
        
$(".header_lang_box a.lang_eng").on("click", function(){
        
        $(this).parents('body').find('.header_lang_box a').removeClass("active_l");
        $(this).parents('body').find('a.lang_eng').addClass("active_l");
        
}); 
$(".header_lang_box a.lang_rus").on("click", function(){
        
        $(this).parents('body').find('.header_lang_box a').removeClass("active_l");
        $(this).parents('body').find('a.lang_rus').addClass("active_l");
        
}); 

//===========================================================

});

/////MORE-PORTFOLIO////////

$(function() {
            $('#more-portf').click(function() {         
            //$(this).hide();
            //$(this).animate({height: "hide"}, 1000);
            $("#stuff_box--hidden .stuff_box_one").clone().addClass("newElement").removeClass("bh")         
             .appendTo("#stuff_box").delay( 800 ).fadeIn( 400 ); 
            $("#stuff_box .stbo_v").fadeIn('slow');
            });
        });


/////MORE-BLOG////////


// PAGINATION 
  $("#tab-tov-nav a").click(function(e){

    e.preventDefault();
      $('#tab-tov-nav li').removeClass('active_tag');
      $(this).parent().addClass('active_tag');

    var current_tag = $(this).data('tag');

    if (current_tag == '#All') {
      $(".bl_one").fadeIn(500);
      $(".bl_one").removeClass('faded');
    } else {
      $(".bl_one").each(function(){

      var current_block_tag = $(this).data('tag');

      if (current_tag != current_block_tag) {
        $(this).fadeOut(500);
        $(this).addClass('faded');
      } else {
        $(this).fadeIn(500);
        $(this).removeClass('faded');
      }

    });
    }

    var i = 0;

    setTimeout(function(){

       $(".bl_one").each(function(){
      
      if (!$(this).hasClass('faded')) {
        i++;

        if (i%3 == 0) {
          $(this).css({
            'margin-right' : '0'
          });
        } else {
          $(this).css({
            'margin-right' : '5%'
          });
        }
      }
    })

    }, 500);

   

  })

 //animation// 
  $(function() {
    $(document).on('click', '.load', function() {
        var $button = $(this);
        $button.removeClass('added').addClass('disabled').attr('disabled', 'disabled');
        setTimeout(function () {
            $button.removeClass('disabled').addClass('added').removeAttr('disabled');
        }, 1000);
    });
});
//animation//      
  
$(function() {
      $('#more-blog2').click(function() {         
            //$(this).hide();
            $("#hide-blog2 .bh").clone().addClass("newElement").removeClass("bh")         
             .appendTo("#list-blog2").delay( 800 ).fadeIn( 400 ); 
             $("#list-blog2 .newElement").fadeIn('slow');
            });
    });
        
$(function() {
      $('#more-blog2_m').click(function() {         
            //$(this).hide();
            $("#hide-blog2_m .bh").clone().addClass("newElement").removeClass("bh")         
             .appendTo("#list-blog2_m").delay( 800 ).fadeIn( 400 ); 
             $("#list-blog2_m .newElement").fadeIn('slow');
            });
    });

/////MORE-BLOG////////

//==========================modal

$(document).ready(function() {

    $(".header .modal").click(function(){
      $("#form_contact").addClass('opened');
    });

    $(".b_ban_link .modal").click(function(){
      $("#form_prodject .prod_popup").addClass('opened');
    });

    $(".modal").fancybox({
       transitionIn: 'none',
       transitionOut: 'none',
       speedIn: 0,
       speedOut: 000,
       overlayShow: false
    });
});
$(document).on('click', '.close_p', function() {
    $("#form_contact").addClass('closing');
    setTimeout(function(){
       $.fancybox.close();

     
        $("#form_contact").removeClass('opened');
     }, 300);

    setTimeout(function(){
       $("#form_contact").removeClass('closing');
     }, 600);
   
});


//==========================modal



/*------------------------------------------------tabs*/        
$(function () {
    $('#tab-tov-nav li:first').addClass('active_tag');
    $('#tab-tov-boxeid > div').hide();
    $('#tab-tov-boxeid > div:first').show();
    // $('#tab-tov-nav a').click(function () {
    //     $('#tab-tov-nav li').removeClass('active_tag');
    //     $(this).parent().addClass('active_tag');
    //     // var activeTab = $(this).attr('href');
    //     // $('#tab-tov-boxeid > div:visible').hide();
    //     // $(activeTab).show();
    //     return false;
    // });

});
/*------------------------------------------------tabs*/



//==================text

$(document).ready(function() {
    $('.element').typeIt({
     startDelete: true,
     deleteSpeed:150,
     strings: 'Development',
     speed: 150,
     autoStart: false,
     loop:true,
     loopDelay:5000,
     
});
});

//==================text

//===========validation///
// $(function frmotpr(){
//         var field = new Array("name_f", "contact_f", "mssg_f");
//         $("#file_form").submit(function() {
//             var error=0;
//             $("#file_form").find(":input").each(function() {
//                 for(var i=0;i<field.length;i++){
//                     if($(this).attr("name")==field[i]){
//                         if(!$(this).val()){
//                             $(this).addClass('notvalid');
//                             error=1;    
//                         }
//                         else{
//                             $(this).removeClass('notvalid');
//                         }
//                     }                       
//                 }               
//            })
//             var email = $("#contact_f").val();
//             if(!isValidEmailAddress(email)){
//                 error=2;
//                 $("#contact_f").addClass('notvalid');
//             }
//             if(error==0){
//             return true;
//             }else{
//             var err_text = "Не все обязательные поля заполнены!";
//             if(error==1)  err_text="Не все обязательные поля заполнены!";
//             $("#messenger").html(err_text); 
//             $("#messenger").fadeIn("slow"); 
//             return false;
//             }
//         })
//     });
    
//     function isValidEmailAddress(emailAddress) {
//         var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
//         return pattern.test(emailAddress);
//     }
    
//     $(function frmotpr(){
//         var field = new Array("name_f2", "contact_f2", "mssg_f2");
//         $("#file_form2").submit(function() {
//             var error=0;
//             $("#file_form2").find(":input").each(function() {
//                 for(var i=0;i<field.length;i++){
//                     if($(this).attr("name")==field[i]){
//                         if(!$(this).val()){
//                             $(this).addClass('notvalid');
//                             error=1;    
//                         }
//                         else{
//                             $(this).removeClass('notvalid');
//                         }
//                     }                       
//                 }               
//            })
//             var email = $("#contact_f2").val();
//             if(!isValidEmailAddress(email)){
//                 error=2;
//                 $("#contact_f2").addClass('notvalid');
//             }
//             if(error==0){
//             return true;
//             }else{
//             var err_text = "Не все обязательные поля заполнены!";
//             if(error==1)  err_text="Не все обязательные поля заполнены!";
//             $("#messenger2").html(err_text); 
//             $("#messenger2").fadeIn("slow"); 
//             return false;
//             }
//         })
//     });
    
//     function isValidEmailAddress(emailAddress) {
//         var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
//         return pattern.test(emailAddress);
//     }
    
    
//     $(function frmotpr(){
//         var field = new Array("name_f_m", "contact_f_m", "mssg_f_m");
//         $("#file_form_m").submit(function() {
//             var error=0;
//             $("#file_form_m").find(":input").each(function() {
//                 for(var i=0;i<field.length;i++){
//                     if($(this).attr("name")==field[i]){
//                         if(!$(this).val()){
//                             $(this).addClass('notvalid');
//                             error=1;    
//                         }
//                         else{
//                             $(this).removeClass('notvalid');
//                         }
//                     }                       
//                 }               
//            })
//             var email = $("#contact_f_m").val();
//             if(!isValidEmailAddress(email)){
//                 error=2;
//                 $("#contact_f_m").addClass('notvalid');
//             }
//             if(error==0){
//             return true;
//             }else{
//             var err_text = "Не все обязательные поля заполнены!";
//             if(error==1)  err_text="Не все обязательные поля заполнены!";
//             $("#messenger_m").html(err_text); 
//             $("#messenger_m").fadeIn("slow"); 
//             return false;
//             }
//         })
//     });
    
//     function isValidEmailAddress(emailAddress) {
//         var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
//         return pattern.test(emailAddress);
//     }
//===========validation///



$(document).ready(function() {
                  
 if ($(window).width() > 540) {
  
  
} else {
  $('.face_box').slick({
        autoplay:true,
        autoplaySpeed:3000,
        //centerMode:true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows:false,
        dots:true, 
       }); 
       
  
}  
});

// WAVES 

$(document).ready(function(){

  Waves.attach('.but');
  Waves.init();

})