$(document).ready(function() {
  var switched = false;
  var updateTables = function() {
    if (($(window).width() < 767) && !switched ){
      switched = true;
      $(".table-block-classic-table.responsive").each(function(i, element) {
       splitTable($(element));
      });
      return true;
    }
    else if (switched && ($(window).width() > 767)) {
      switched = false;
      $(".table-block-classic-table.responsive").each(function(i, element) {
        unsplitTable($(element));
      });
    }
  };
   
  updateTables();
  $(window).on("redraw",function(){switched=false;updateTables();}); // An event to listen for
  $(window).on("resize", updateTables);
   
	
	function splitTable(original)
	{
		original.wrap("<div class='table-wrapper' />");
		
		var copy = original.clone();
		copy.find(".table-row li, .table-head li").css("display", "none");
		copy.removeClass("responsive");
		
		// original.closest(".table-wrapper").append(copy);
		// copy.wrap("<div class='pinned' />");
		original.wrap("<div class='scrollable' />");

   // setCellHeights(original, copy);
	}
	
	function unsplitTable(original) {
    original.closest(".table-wrapper").find(".pinned").remove();
    original.unwrap();
    original.unwrap();
	}

  function setCellHeights(original, copy) {
    var tr = original.find('.table-row'),
        tr_copy = copy.find('.table-row'),
        heights = [];

    tr.each(function (index) {
      var self = $(this),
          tx = self.find('li');

      tx.each(function () {
        var height = $(this).outerHeight(true);
        heights[index] = heights[index] || 0;
        if (height > heights[index]) heights[index] = height;
      });

    });

    tr_copy.each(function (index) {
      $(this).height(heights[index]);
    });
  }

});
