$(document).ready(function() {

   // scroll users down to second row when they click 'tell me more' box button
    $('.seemagazine').click(function() {
        $('#hhg').ScrollTo();
    });

    // REQUEST INVITE BUTTON
    var inviteContainer     = $('.cta-invite'),
        inviteLabel         = inviteContainer.find('.cta-invite-label'),
        inviteInput         = inviteContainer.find('.cta-invite-input'),
        inviteSubmit        = inviteContainer.find('.cta-invite-submit-form'),
        inviteClose         = inviteContainer.find('.cta-invite-control-close'),
        inviteTryAgain      = inviteContainer.find('.cta-invite-control-tryagain'),
        inviteErrorMessage  = inviteContainer.find('.cta-invite-error-message'),
        followInsta         = $('.insta-followus');

    function showInviteForm() {
        
        inviteContainer.addClass('active');
        inviteInput.focus().attr('placeholder', 'your email');
        inviteLabel.addClass('cta-invite-submit-form');
        followInsta.addClass('hide'); // hide the Instagram link
    }

    function resetInviteForm(event) {

        event.stopPropagation();

        inviteContainer.removeClass('active').removeClass('error');
        inviteInput.val('');
        inviteLabel.removeClass('cta-invite-submit-form');
        followInsta.removeClass('hide'); // hide the Instagram link
    }

    function sendInviteForm() {

        event.stopPropagation();

        inviteContainer.addClass('sending');
    }

    function errorInviteForm(errorMsg) {

        inviteContainer.toggleClass('error');
        inviteContainer.removeClass('sending');

        // add the error message from the server to the DOM
        if ( inviteErrorMessage.text() <= 30 ) {
            inviteErrorMessage.prepend(errorMsg);
        }
    }

    function sentInviteForm() {

        inviteContainer.removeClass('sending').addClass('send-success');
    }

    inviteContainer.on('click', showInviteForm);
    $('.cta-registration').on('click', function(event) {

        showInviteForm();
        return false;

    });
    inviteClose.on('click', resetInviteForm);
    inviteTryAgain.on('click', errorInviteForm);
    inviteErrorMessage.on('click', errorInviteForm);
    inviteContainer.on('click', '.cta-invite-submit-form', function() {
        subscribe(inviteInput.val());   
    });
    inviteInput.on('keyup', function(event) {
        
        if (event.which == 13) {
            subscribe(inviteInput.val());
        }
    });

    function subscribe(data) {
       sendInviteForm();
       $.ajaxSetup({
           crossDomain: true,
           xhrFields: {
               withCredentials: true
           }
       });
       var apiUrl = $(document).data("appUrl");

        $.ajax(apiUrl + '/newsletter/subscribers', {
            type: 'POST',
            dataType: 'json',
            data: {
                'email': data
            },
            cache: false,
            error: function(oXhr, sTextStatus, sErrorThrown) {

                // code to deal with error
                errorInviteForm("something's wrong, try again later");
                console.log(sErrorThrown);
            },
            success: function(oData) {

                sentInviteForm();
            }
        });
    }


    //fix for IE
    if (!window.location.origin) {
        window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '');
    }
    // show/hide - share
    $('.social-btns').removeClass('open').addClass('closed');
    $('.share-this').toggle(
    function toggleSocialOn() {
        $('.share').find('.social-btns');
        $(this).removeClass('off').addClass('on');
        $('.social-btns').removeClass('closed').addClass('open');
    },
    function toggleSocialOff() {
        $('.share').find('.social-btns');
        $(this).removeClass('on').addClass('off');
        $('.social-btns').removeClass('open').addClass('closed');
    }
    );

    // show/hide - more tags
    $('.more-tags').removeClass('open').addClass('closed');
    $('.toggle-tags').toggle(
    function moreTagsOn() {
        //$('.panel').find('#filter-select').show();
        $('.filter-tags').find('.more-tags');
        $(this).removeClass('off').addClass('on');
        $('.more-tags').removeClass('closed').addClass('open');
    },
    function moreTagsOff() {
        //$('.panel').find('#filter-select').hide();
        $('.filter-tags').find('.more-tags');
        $(this).removeClass('on').addClass('off');
        $('.more-tags').removeClass('open').addClass('closed');
    }
    );

    // show/hide - search
    $('.search').removeClass('open').addClass('closed');
    $('.toggle-search').toggle(
    function searchOn() {
        //$('.panel').find('#search').show();
        $('.panel').find('.search');
        $(this).removeClass('off').addClass('on');
        $('.search').removeClass('closed').addClass('open');
    },
    function searchOff() {
        //$('.panel').find('#search').hide();
        $('.panel').find('.search');
        $(this).removeClass('on').addClass('off');
        $('.search').removeClass('open').addClass('closed');
    }
    );

    // show/hide - archive/sort
    $('.filter-select').removeClass('open').addClass('closed');
    $('.toggle-filter').toggle(
    function selectsOn() {
        //$('.panel').find('#filter-select').show();
        $('.panel').find('.filter-select');
        $(this).removeClass('off').addClass('on');
        $('.filter-select').removeClass('closed').addClass('open');
    },
    function selectsOff() {
        //$('.panel').find('#filter-select').hide();
        $('.panel').find('.filter-select');
        $(this).removeClass('on').addClass('off');
        $('.filter-select').removeClass('open').addClass('closed');
    }
    );

    /* MODALS */
    function showModal(modalDiv) {
        modalDiv.addClass("modal-show");
    }

    function hideModal(modalDiv) {
        modalDiv.removeClass("modal-show");
    }

    function swapOpenModal(currOpen, toOpen)
    {
        hideModal(currOpen);
        showModal(toOpen);
    }

    $('#modal-close').on("click", function() {
        $('.modal-show').removeClass("modal-show");
        $(document.body).removeClass("fixed");
    });

    //Login
    $(document).on('click','#login-modal-trigger',function(event) {
        event.preventDefault();
        var appUrl = $(document).data("appUrl");
        window.location = appUrl + "/login";
    });

    //Logout
    $(document).on('click','#signout-trigger',function() {
        var appUrl = $(document).data("appUrl");
        window.location = appUrl + "/logout";
    });

    $("#forgot-detail-but").on("click", function (e) {
        swapOpenModal($('#log-in'), $('#forgot-detail-div'));
        e.preventDefault();
    });

    $("#remem-details").on("click", function (e) {
        swapOpenModal($('#forgot-detail-div'), $('#log-in'));
        e.preventDefault();
    });

    $("#join-list").on("click", function (e) {
        swapOpenModal($('#log-in'), $('#join'));
        e.preventDefault();
    });

    //Join
    $(document).on('click', '.cta-registration', function(event) {
        event.preventDefault();
        var appUrl = $(document).data("appUrl");
        window.location = appUrl + "/registermagazine";
    });

    $("#acc-login-in").on("click", function (e) {
        swapOpenModal($('#join'), $('#log-in'));
        e.preventDefault();
    });

    //Prompt
    $(document).on('click','#prompt-modal-trigger',function() {
        showModal($('#log-in-prompt'));
        $(document.body).addClass("fixed");
    });


    //resize top panel landing page

    function setHeight() {
        var windowHeight = document.documentElement.clientHeight;
        // var headerPadding = $('header[role=banner]').outerHeight();

        $('.intro-panel').css({'height': windowHeight});
    }
    setHeight();

    $(".scroll").click(function(event){
        event.preventDefault();
        $('html,body').animate({scrollTop:$(this.hash).offset().top - 0}, 1200);
        $(this).blur();
    });

    $(window).scroll(function(){
        if($(window).scrollTop()<150){
            $('.scroll-me').stop(true,true).removeClass("fade").addClass("show");
        } else {
            $('.scroll-me').stop(true,true).addClass("fade").removeClass("show");
        }
    });

});


jQuery(document).ready(function() {

    //stop iOS zoom on form fields - from https://gist.github.com/zachleat/2008932
        function cancelZoom()
    {
        var d = document,
            viewport,
            content,
            maxScale = ',maximum-scale=',
            maxScaleRegex = /,*maximum\-scale\=\d*\.*\d*/;

        // this should be a focusable DOM Element
        if(!this.addEventListener || !d.querySelector) {
            return;
        }

        viewport = d.querySelector('meta[name="viewport"]');
        content = viewport.content;

        function changeViewport(event)
        {
            // http://nerd.vasilis.nl/prevent-ios-from-zooming-onfocus/
            viewport.content = content + (event.type === 'blur' ? (content.match(maxScaleRegex, '') ? '' : maxScale + 10) : maxScale + 1);
        }

        // We could use DOMFocusIn here, but it's deprecated.
        this.addEventListener('focus', changeViewport, true);
        this.addEventListener('blur', changeViewport, false);
    }

    // jQuery-plugin
    (function($)
    {
        $.fn.cancelZoom = function()
        {
            return this.each(cancelZoom);
        };

        // Usage:
        $('input,select,textarea').cancelZoom();
    })(jQuery);


    //filter by tags
    function initialLoad () {
        $('.more-tags').append('<div style="margin-top:20px;"><a class="searchtags" href="#">Search Tags</a></div>');
    }

    initialLoad();

    $('.more-tags .tag').bind('click', function(event) {
        event.preventDefault();

        if ( $(this).hasClass('on') ) {
            $(this).removeClass('on');
        } else {
            $(this).addClass('on');
        }
    });

    function searchTags() {
        var optionTexts = [];
        $('.more-tags').find('.on').each(function() {
            var str = $(this).attr('class').replace(/\stag\son+/g, '');
            optionTexts.push(str);
        });

        var tagparam = 'tag';
        var tagseparator = '+';
        var tagstring = optionTexts.join(tagseparator);
        window.location = '/' + tagparam + '/' + tagstring;
    }

    $('.tagtoggle').bind('click', function(event) {
        event.preventDefault();
        $('.tagtoggle').removeClass('selected');
        $(this).addClass('selected');
    });

    $('.searchtags').bind('click', function(event) {
        event.preventDefault();
        searchTags();
    });

    // end filter by tags
    $('.browser-features').bind('click', function(event) {
        event.preventDefault();
        window.location = $(document).data("blogUrl");
    });

    var notificationText = window.getParameterByName("notification");

    // remove notification when clicked
    var notification = $('.ws-notification');

    notification.children('button').on('click', function() {
        notification.removeClass('-show');
    });

    if (notificationText) {
        notification.children(".ws-notification-text").html(notificationText);
        notification.addClass("-show");
        if (iOS()) {
            document.location.href = 'hevnly://';
        }
    }
});

function getParameterByName(name) {
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

function iOS() {

  var iDevices = [
    'iPad Simulator',
    'iPhone Simulator',
    'iPod Simulator',
    'iPad',
    'iPhone',
    'iPod'
  ];

  if (!!navigator.platform) {
    while (iDevices.length) {
      if (navigator.platform === iDevices.pop()){ return true; }
    }
  }

  return false;
}
