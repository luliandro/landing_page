    //this logic is shared with the blog, the code should be shared too!!!
$(document).ready(function() {
    $.ajaxSetup({
        crossDomain: true,
        xhrFields: {
            withCredentials: true
        }
    });

    $.ajax({
        dataType: "json",
        url: $(document).data("appUrl") + '/profile/me',
        success: function(responseFromServer) {
            userIsLoggedIn();
            $(".account-loggedin").show();
            $(".account-loggedoff").hide();
            setupOffCanvasNav(responseFromServer);
        },
        error: function(responseFromServer) {
            userIsLoggedOff();
            $(".account-loggedin").hide();
            $(".account-loggedoff").show();
        }
    });

    /* NAV OVERLAY */
    $('#overlay-wrap').removeClass('open').addClass('closed');

    $('#overlay-close').bind('click', function(event) {
        event.preventDefault();
        $('.toggle-overlay').removeClass('on').addClass('off').click().blur();
        $('body').removeClass('fixed');
        $('#overlay-wrap').removeClass('open').addClass('closed');
    });
    $('.toggle-overlay').toggle(
        function navOn() {
            $(this).removeClass('off').addClass('on').blur();
            $('#overlay-wrap').removeClass('closed').addClass('open');
            $('body').addClass('fixed');
            $('.landingpage header[role=banner]').css({'background-color':'#000'});
            $('.landingpage header[role=banner] nav').css({'border-bottom-width': '0px'});

            $(window).on("load resize",function(){
                var navbarheight = $('header[role=banner]').height()+50;
                $('#overlay-wrap.open nav').css({'padding-top':navbarheight+'px'});

                var windowWidth = $('.overlay').width();
                $('header[role=banner]').css({'width':windowWidth});
                $('.landingpage header[role=banner]').css({'width':windowWidth});
            }).resize();
        },
        function navOff() {
            $('header[role=banner]').css({'width':'100%'});
            $('.landingpage header[role=banner]').css({'background-color':'transparent'});
            $('.landingpage header[role=banner] nav').css({'border-bottom-width': '1px'});
            $(this).removeClass('on').addClass('off').blur();
            $('#overlay-wrap').removeClass('open').addClass('closed');
            $('body').removeClass('fixed');
        }
);
});
