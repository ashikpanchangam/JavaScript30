/* Get our elements */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const toggleScreenButton = player.querySelector('#toggle-screen');

/* Build out functions */
function togglePlay () {
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
}

function updateButton () {
    const icon = this.paused ? '▶' : '▍▍';
    toggle.innerText = icon;
}

function skip () {
    video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
    // this points to the input slider DOM element
    video[this.name] = this.value;
}

function handleProgress () {
    const percent = (video.currentTime/video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

/* this function gets called when clicked on the progress bar */
function scrub(event) {
    const scrubTime = (event.offsetX/progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

function toggleScreen() {
    if(!fullScreen) {
        player.requestFullscreen();
        fullScreen = true;
    } else {
        document.exitFullscreen();
        fullScreen = false;
    }
}

/* Hook up the event listeners */
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);

let fullScreen = false;
toggleScreenButton.addEventListener('click', toggleScreen)

skipButtons.forEach(button => button.addEventListener('click', skip));

ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));

let mousedown = false;
progress.addEventListener('click', scrub);

/* Fire the event if mousedown is true. 
   And only if mousedown is true, call scrub */
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));

progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);