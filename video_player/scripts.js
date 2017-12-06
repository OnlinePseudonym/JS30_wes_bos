/** Get our Elements */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const ranges = player.querySelectorAll('.player__slider');
const play = player.querySelector('.toggle');
const jumpButtons = player.querySelectorAll('[data-skip]');
let isDown = false;

/** Build out functions */

function togglePlay() {
    video[video.paused ? 'play' : 'pause']();
}

function updateButton() {
    play.textContent = this.paused ? '►' : '❚ ❚';
}

function skip() {
    console.log('Skipping!');
    console.log(video.currentTime)
    video.currentTime += parseInt(this.dataset.skip);
}
function handleRangeUpdate() {
    if (isDown) {
        video[this.name] = this.value;
    }
}

function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

/** Hook up th event listeners */

play.addEventListener('click', togglePlay);

video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

jumpButtons.forEach(button => button.addEventListener('click', skip));

ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousedown', () => isDown = true));
ranges.forEach(range => range.addEventListener('mouseup', () => isDown = false ));
ranges.forEach(range => range.addEventListener('mouseout', () => isDown = false ));

progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => isDown && scrub(e));
progress.addEventListener('mousedown', () => isDown = true);
progress.addEventListener('mouseup', () => isDown = false);
