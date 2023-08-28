const player = document.querySelector('.player')
const audio = document.querySelector('.audio')
const title = document.querySelector('.player .title')
const artist = document.querySelector('.player .artist')
const previewImg = document.getElementById('preview')
const songDuration = document.querySelector('.song-duration')
const currentTime = document.querySelector('.current-time')
const like = document.querySelector('.player .like')
const mix = document.querySelector('.player .mix')
const prevBtn = document.querySelector('.player .prevBtn')
const playStop = document.querySelector('.player .play-stop')
const nextBtn = document.querySelector('.player .title')
const loopPlaylist = document.querySelector('.player .loop-playlist')
const volumeImg = document.querySelector('.player .volume-symbol')

const music_default_url = '../../music/default/tracks_data.json'

// Песня по умолчанию
let songIndex = 0;

// Init
function loadSong(track) {
	title.innerHTML = track.data.title;
	artist.innerHTML = track.data.artist;
	songDuration.innerHTML = audio.duration;
	audio.src = track.data.path;
	currentTime.innerHTML = audio.currentTime;
	preview.style.background = `url(${track.data.coverImage})`;
}

fetch(music_default_url)
	.then(response => response.json())
	.then(data => {
		loadSong(data[0])
	})
