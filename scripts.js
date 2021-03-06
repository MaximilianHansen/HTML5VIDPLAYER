const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const fullscreen = document.querySelector('.fullScreenButton')

function togglePlay() {
    const method = video.paused ? 'play' : 'pause';
    video[method]();
    console.log('togggle')
}

function updateButton() {
    const icon = this.paused ? '▶' : '⏸️';
    toggle.textContent = icon
}

function skip() {
    //console.log(this.dataset)
    video.currentTime += parseInt(this.dataset.skip)
}

function handleRangeUpdate() {
    video[this.name] = this.value;
    //console.log(this.name);
    //console.log(this.value);
}

function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
    //console.log(percent)
}

function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime  
    console.log(e);
}

function handleFullscreen() {
    console.log('fullscreen');
    if( window.innerHeight == screen.height) { document.exitFullscreen()
        // browser is fullscreen
    } else {
    player.requestFullscreen() }
}

video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skip ));
ranges.forEach(range => range.addEventListener("change", handleRangeUpdate));
ranges.forEach(range => range.addEventListener("mousemove", handleRangeUpdate));

let mouseDown = false;

progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mouseDown && scrub(e) );
progress.addEventListener('mousedown', () => mouseDown = true);
progress.addEventListener('mouseup', () => mouseDown = false);

fullscreen.addEventListener('click', handleFullscreen)