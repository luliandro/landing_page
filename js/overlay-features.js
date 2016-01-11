$(document).ready(function() {
    var templateId = "#article-template";
    loadFeatures($("#after-features"), templateId, 4);
});

function loadFeatures ($container, templateId, count) {
    var blogUrl = $(document).data("blogUrl");
    $.getJSON(blogUrl + "/editions/edition-2.json")
        .done(
            function (responseFromServer) {
                featuresHtml = '';
                var template = $(templateId).html();
                var _posts = responseFromServer.posts;
                if (template == undefined) {
                    return;
                }
                if (_posts.length > count)  {
                    _posts.splice(4);
                }
                Mustache.parse(template);   // optional, speeds up future uses
                $.each(_posts, function(index, post) {
                    var object = buildPostObject(post, blogUrl);

                    var rendered = Mustache.render(template, object);
                    featuresHtml += rendered;
                });
                $container.append($(featuresHtml));
            }
        );
}
