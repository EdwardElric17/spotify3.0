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
const nextBtn = document.querySelector('.player .nextBtn')
const loopPlaylist = document.querySelector('.player .loop-playlist')
const volumeImg = document.querySelector('.player .volume-symbol')
const volumeRange = document.querySelector('.player .volume-range')
const volumeRangeContainer = document.querySelector('.player .volume-range-container')

const music_default_url = '../../music/default/tracks_data.json'

// Песня по умолчанию
let songIndex = 0;

// Time calc
function timeCalc(time) {
	let minute = Math.floor(Math.round(time) / 60);
	let sec = Math.round(time) % 60;
	if (String(minute).length < 2) {
		minute = '0' + minute;
	}
	if (String(sec).length < 2) {
		sec = '0' + sec;
	}
	return `${minute}:${sec}`
}

// Init
function loadSong(track) {
	title.innerHTML = track.data.title;
	artist.innerHTML = track.data.artist;
	// songDuration.innerHTML = audio.duration;
	audio.src = track.data.path;
	currentTime.innerHTML = timeCalc(audio.currentTime);
	preview.style.background = `url(${track.data.coverImage})`;
	
	audio.onloadedmetadata = function() {
		songDuration.innerHTML = timeCalc(audio.duration);
	};


}
setInterval(() => {
	currentTime.innerHTML = timeCalc(audio.currentTime);
}, 250);

// Play/stop
function PlayStop() {
	if (playStop.classList.contains('stoped-song')) {
		audio.play();
		playStop.querySelector('img').src = '../images&icons/images/pause.png';
		playStop.querySelector('img').style.filter = 'invert(0)';
		playStop.classList.add('playing-song');
		playStop.classList.remove('stoped-song');
	} else if (playStop.classList.contains('playing-song')) {
		audio.pause();
		playStop.querySelector('img').src = '../images&icons/images/play.png';
		playStop.querySelector('img').style.filter = 'invert(1)';
		playStop.classList.add('stoped-song');
		playStop.classList.remove('playing-song');
	}
	
}
playStop.addEventListener('click', () => {
	PlayStop()
})

// Next song
nextBtn.addEventListener('click', () => {
	fetch(music_default_url)
	.then(response => response.json())
	.then(data => {
		if (songIndex < data.length - 1) {
			if (playStop.classList.contains('stoped-song')) {
				loadSong(data[++songIndex])
				// console.log(songIndex)
			}
			else if (playStop.classList.contains('playing-song')) {
				loadSong(data[++songIndex])
				audio.play()
				// console.log(songIndex)
			}
		}
		else {
			if (playStop.classList.contains('stoped-song')) {
				loadSong(data[0])
				songIndex = 0;
				// console.log(songIndex)
			} else if (playStop.classList.contains('playing-song')) {
				loadSong(data[0])
				songIndex = 0;
				audio.play()
				// console.log(songIndex)
			}
		}
	})
})

// Prev song
prevBtn.addEventListener('click', () => {
	fetch(music_default_url)
	.then(response => response.json())
	.then(data => {
		if (songIndex > 0) {
			if (playStop.classList.contains('stoped-song')) {
				loadSong(data[--songIndex])
				// console.log(songIndex)
			}
			else if (playStop.classList.contains('playing-song')) {
				loadSong(data[--songIndex])
				audio.play()
				// console.log(songIndex)
			}
		}
		else {
			loadSong(data[data.length - 1])
			songIndex = data.length - 1;
			audio.play()
			// console.log(songIndex)
		}
	})
})

// Volume change
function volumeChange(e) {
	const rect = volumeRangeContainer.getBoundingClientRect();
	
	let mouseX = e.clientX - rect.left + 0.4000244140625;
	volumeRange.style.width = `${mouseX}px`;

	const rectRange = volumeRange.getBoundingClientRect();
	audio.volume = (Math.round(((rectRange.right - rectRange.left) / 119) * 100)) / 100;
	console.log('volume: ' + audio.volume)
}
volumeRangeContainer.addEventListener('mousedown', (e) => {
	const rect = volumeRangeContainer.getBoundingClientRect();
	let mouseX = e.clientX - rect.left + 0.4000244140625;
	volumeRange.style.width = `${mouseX}px`;

	const rectRange = volumeRange.getBoundingClientRect();
	audio.volume = (Math.round(((rectRange.right - rectRange.left) / 119) * 100)) / 100;
	console.log('volume: ' + audio.volume)

	document.addEventListener('mousemove', volumeChange)
	document.addEventListener('mouseup', () => {
		document.removeEventListener('mousemove', volumeChange);
	})
})

// Volume on/off
function volumeToggle() {
	// console.log(volumeRangeCurrent)
	if (volumeImg.classList.contains('mute')) {
		audio.volume = volumeCurrent;
		volumeRange.style.width = `${volumeRangeCurrent}px`;
		volumeImg.classList.toggle('mute')
	} else {
		volumeCurrent = audio.volume;
		volumeRangeCurrent = volumeRange.offsetWidth;
		audio.volume = 0;
		volumeRange.style.width = `0px`;
		volumeImg.classList.toggle('mute')
	}
	
}
var volumeCurrent;
var volumeRangeCurrent;
volumeImg.addEventListener('click', volumeToggle)

// Load song
fetch(music_default_url)
	.then(response => response.json())
	.then(data => {
		loadSong(data[songIndex])
	})
