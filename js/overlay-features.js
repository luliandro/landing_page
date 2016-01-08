$(document).ready(function() {
    var templateId = "#overlay-feature-card-template";
    var lastTemplateId = "#overlay-feature-card-last-template";
    loadFeatures("product", $("#products div.row"), templateId, lastTemplateId, 4);
    loadFeatures("place", $("#places div.row"), templateId, lastTemplateId, 4);
    loadFeatures("person", $("#people div.row"), templateId, lastTemplateId, 4);
});

function loadFeatures(postType, $container, templateId, lastTemplateId, count)
{
    $.getJSON(
        $(document).data("blogUrl") + "/wp-json/posts?type=post&filter[posts_per_page]=" + count + "&filter[taxonomy]=posts&filter[term]=" + postType,
        function(responseFromServer) {
            featuresHtml = '';
            var template = $(templateId).html();
            if (template == undefined) {
                return;
            }
            Mustache.parse(template);   // optional, speeds up future uses
            $.each(responseFromServer, function(index, post) {
                var object = buildPostObject(post);
                if (index === (count - 1)) {
                    var template2 = $(lastTemplateId).html();
                    object['href'] = $(document).data("blogUrl") + "/posts/features/" + postType;
                    featuresHtml += Mustache.render(template2, object);
                    return true;
                }
                var rendered = Mustache.render(template, object);
                featuresHtml += rendered;
            });
            $container.append($(featuresHtml));
        }
    );
}
