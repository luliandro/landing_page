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

    $("#load-more-features").click(function(){
        window.location = blogUrl;
    });
});

function buildPostObject(responseFromServer, apiUrl) {
    var date = new Date(responseFromServer.date);

    var object = {
        title: responseFromServer.title,
        date: date.toLocaleDateString("en-GB"),
        excerpt: responseFromServer.excerpt,
        preview: responseFromServer.content.substring(0, 450),
        image:  apiUrl + '/images/' + responseFromServer.editionNumber + '/' + responseFromServer.slug + '/' + responseFromServer.heroImage,
        link: apiUrl + '/' + responseFromServer.editionName + '/' + responseFromServer.slug,
        subtitle: responseFromServer.subTitle
    }

    return object;
}
