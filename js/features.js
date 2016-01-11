$(document).ready(function() {
    blogUrl = $(document).data("blogUrl");
    //featured post
    $.getJSON(blogUrl + "/latest.json").done(
        function(responseFromServer) {
            var template = $("#feature-template").html();
            var _posts = responseFromServer.posts;
            if (template == undefined) {
                return;
            }
            Mustache.parse(template);
            $.each(_posts, function(index, post) {
                var objectFromServer = _posts.pop();
                var object = buildPostObject(objectFromServer, blogUrl);
                var rendered = Mustache.render(template, object);
                $(rendered).prependTo('#feature');
            });
        }
    );

    //loadMoreFeatures();

    $("#load-more-features").click(function(){
        window.location = blogUrl;
    });
});

function buildPostObject(responseFromServer, apiUrl) {
    console.log(responseFromServer);
    var date = new Date(responseFromServer.date);

    var object = {
        title: responseFromServer.title,
        date: date.toLocaleDateString("en-GB"),
        excerpt: responseFromServer.excerpt,
        preview: responseFromServer.content.substring(0, 450),
        image:  apiUrl + '/images/' + responseFromServer.editionNumber + '/' + responseFromServer.slug + '/' + responseFromServer.heroImage,
        link: responseFromServer.link,
        subtitle: responseFromServer.subTitle
    }

    return object;
}

// Is this method still necessary?

//function loadMoreFeatures() {
//    $.getJSON(
//        $(document).data("blogUrl") + "/wp-json/posts?filter[posts_per_page]=12",
//        function(responseFromServer) {
//            var template = $("#article-template").html();
//            if (template == undefined) {
//                return;
//            }
//            Mustache.parse(template);   // optional, speeds up future uses
//            $.each(responseFromServer, function(index, post) {
//                if (index >= 8 ) {
//                    var object = buildPostObject(post);
//                    var rendered = Mustache.render(template, object);
//                    $(rendered).appendTo($("#after-features"));
//                }
//            });
//        }
//    );
//}
