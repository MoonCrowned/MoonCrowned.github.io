const ASPECT_RATIO = 0.502;
const help = document.querySelector("#help-background");

/* triggers */
$(window).resize(function() { setHelpHeight() });
$(window).resize(function() { setIFrameHeight() });

document.addEventListener("fullscreenchange", function() { setTimeout(setHelpHeight(), 500) });

/* functions */
function initHelp() {
    help.style.display = 'none';
    help.style.zIndex = -100;
    setIFrameHeight();
    setHelpHeight();
}

function showHelpWeb(videoId = "") {
    help.style.zIndex = 10;
    
    if (document.fullscreenElement != null) {
        $('#help-background').show();
        
        help.requestFullscreen().then(_ => {
            $('#help').resize();
            playVideo(videoId);
        });
    }
    else {
        $('#help-background').fadeIn(300);
        $('#help').resize();
        playVideo(videoId);
    }
}

function hideHelpWeb() {
    if (document.fullscreenElement != null)
        document.exitFullscreen();
    
    $('#help-background').fadeOut(200, 
        function() { 
            help.style.zIndex = -1;
            stopVideo();
        });
}

function setIFrameHeight() {
    let sliderHeight = $('#help').width() * ASPECT_RATIO;
    $('#video-player').height(sliderHeight);
}

function setHelpHeight() {
    let help = '#help';
    
    if (($(window).height() / $(window).width()) < ASPECT_RATIO) {
        $(help).width($(window).height() / ASPECT_RATIO);
        $(help).height($(window).height());
    }
    else {
        $(help).width($(window).width());
        $(help).height($(help).width() * 0.502);
    }
}
