!function($){$.belowthefold=function(e,t){var o=$(window).height()+$(window).scrollTop();return o<=$(e).offset().top-t.threshold},$.abovethetop=function(e,t){var o=$(window).scrollTop();return o>=$(e).offset().top+$(e).height()-t.threshold},$.rightofscreen=function(e,t){var o=$(window).width()+$(window).scrollLeft();return o<=$(e).offset().left-t.threshold},$.leftofscreen=function(e,t){var o=$(window).scrollLeft();return o>=$(e).offset().left+$(e).width()-t.threshold},$.inviewport=function(e,t){return!($.rightofscreen(e,t)||$.leftofscreen(e,t)||$.belowthefold(e,t)||$.abovethetop(e,t))},$.extend($.expr[":"],{"below-the-fold":function(e,t,o){return $.belowthefold(e,{threshold:0})},"above-the-top":function(e,t,o){return $.abovethetop(e,{threshold:0})},"left-of-screen":function(e,t,o){return $.leftofscreen(e,{threshold:0})},"right-of-screen":function(e,t,o){return $.rightofscreen(e,{threshold:0})},"in-viewport":function(e,t,o){return $.inviewport(e,{threshold:0})}})}(jQuery);