const path = 'https://storage.yandexcloud.net/portal-public/videos';
const videoContainer = document.getElementById('video');
const videoPlayer = document.createElement('video');
videoContainer.appendChild(videoPlayer);
videoPlayer.id = 'video-player';
videoPlayer.src = `${path}/save-and-load.mp4`;
videoPlayer.disablePictureInPicture = true;
videoPlayer.volume = 0.5;

let prevVideo = "";

function stopVideo() {
    videoPlayer.pause();
}

function playVideo(videoName) {
    if (prevVideo != videoName) {
        videoPlayer.src=`${path}/${videoName}`;
        videoPlayer.setAttribute('controls', '');
        videoPlayer.setAttribute('controlsList', 'nodownload');
        videoPlayer.setAttribute('preload', 'metadata');

        videoPlayer.addEventListener('loadedmetadata', (event) => {
            videoPlayer.play();
        });
    }
    else {
        videoPlayer.play();
    }

    prevVideo = videoName;
}
