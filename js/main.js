$(document).ready(function() {

   // scroll users down to second row when they click 'tell me more' box button
    $('.seemagazine').click(function() {
        $('#hhg').ScrollTo();
    });

    //resize top panel landing page
    function setHeight() {
        var windowHeight = document.documentElement.clientHeight;

        $('.intro-panel').css({'height': windowHeight});
    }

    // animate in the first view
    $('.intro-panel-container').removeClass('hide');

    function showArticleText(event) {

        $('#feature .floating:in-viewport').each(function() {
                $(this).removeClass('hide');
        });
    }
    showArticleText();
    $(window).on('scroll', showArticleText);

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

    setHeight();
});
