function buildPostObject(e){var t=new Date(e.date),a="";null!=e.featured_image&&null!=e.featured_image.source&&(a=e.featured_image.source.replace("http://localhost:8111",""),-1==a.indexOf("http://")&&(a=$(document).data("blogUrl")+a));var o={title:e.title,date:t.toLocaleDateString("en-GB"),excerpt:e.excerpt,preview:e.content.substring(0,450),image:a,link:e.link,subtitle:e.post_meta.subtitle};return o}function loadMoreFeatures(){$.getJSON($(document).data("blogUrl")+"/wp-json/posts?filter[posts_per_page]=12",function(e){var t=$("#article-template").html();void 0!=t&&(Mustache.parse(t),$.each(e,function(e,a){if(e>=8){var o=buildPostObject(a),r=Mustache.render(t,o);$(r).appendTo($("#after-features"))}}))})}$(document).ready(function(){blogUrl=$(document).data("blogUrl"),$.getJSON($(document).data("blogUrl")+"/wp-json/posts?filter[posts_per_page]=8",function(e){var t=$("#feature-template").html();void 0!=t&&(Mustache.parse(t),$.each(e,function(a,o){var r=e.pop(),l=buildPostObject(r),n=Mustache.render(t,l);$(n).prependTo("#feature")}))}),loadMoreFeatures(),$("#load-more-features").click(function(){window.location=blogUrl})});