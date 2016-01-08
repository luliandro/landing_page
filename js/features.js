$(document).ready(function() {
    blogUrl = $(document).data("blogUrl");
    //featured post
    $.getJSON(
        $(document).data("blogUrl") + "/wp-json/posts?filter[posts_per_page]=8",
        function(responseFromServer) {
            var template = $("#feature-template").html();
            if (template == undefined) {
                return;
            }
            Mustache.parse(template);
            $.each(responseFromServer, function(index, post) {
                var objectFromServer = responseFromServer.pop();
                var object = buildPostObject(objectFromServer);
                var rendered = Mustache.render(template, object);
                $(rendered).prependTo('#feature');
            });
        }
    );

    loadMoreFeatures();

    $("#load-more-features").click(function(){
        window.location = blogUrl;
    });
});

function buildPostObject(responseFromServer)
{
    var date = new Date(responseFromServer.date);
    var image = "";
    if (responseFromServer.featured_image != null) {
        if (responseFromServer.featured_image.source != null) {
            image = responseFromServer.featured_image.source.replace("http://localhost:8111", "");
            if (image.indexOf("http://") == -1) {
                image = $(document).data("blogUrl") + image;
            }
        }
    }
    var object = {
        title: responseFromServer.title,
        date: date.toLocaleDateString("en-GB"),
        excerpt: responseFromServer.excerpt,
        preview: responseFromServer.content.substring(0, 450),
        image:  image,
        link: responseFromServer.link,
        subtitle: responseFromServer.post_meta.subtitle
    }

    return object;
}

function loadMoreFeatures()
{
    $.getJSON(
        $(document).data("blogUrl") + "/wp-json/posts?filter[posts_per_page]=12",
        function(responseFromServer) {
            var template = $("#article-template").html();
            if (template == undefined) {
                return;
            }
            Mustache.parse(template);   // optional, speeds up future uses
            $.each(responseFromServer, function(index, post) {
                if (index >= 8 ) {
                    var object = buildPostObject(post);
                    var rendered = Mustache.render(template, object);
                    $(rendered).appendTo($("#after-features"));    
                }
            });
        }
    );
}
