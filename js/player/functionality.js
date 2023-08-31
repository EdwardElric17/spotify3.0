const player = document.querySelector('.player')
const audio = document.querySelector('.audio')
const title = document.querySelector('.player .title')
const artist = document.querySelector('.player .artist')
const previewImg = document.getElementById('preview')
const songDuration = document.querySelector('.song-duration')
const currentTimeBlock = document.querySelector('.current-time')
const like = document.querySelector('.player .like')
const mix = document.querySelector('.player .mix')
const prevBtn = document.querySelector('.player .prevBtn')
const playStop = document.querySelector('.player .play-stop')
const nextBtn = document.querySelector('.player .nextBtn')
const loopTrack = document.querySelector('.player .loop-playlist')
const songProgress = document.querySelector('.player .progress')
const songProgressContainer = document.querySelector('.player .progress-container')
const volumeImg = document.querySelector('.player .volume-symbol')
const volumeRange = document.querySelector('.player .volume-range')
const volumeRangeContainer = document.querySelector('.player .volume-range-container')

// music default url
const music_default_url = '../../music/default/tracks_data.json'

// data size
let dataLength = 0;
// Song cash
let songCash = [];
// Песня по умолчанию
let songIndex = 0;

// Load song
fetch(music_default_url)
	.then(response => {
		return response.json();
	})
	.then(data => {
		loadSong(data[songIndex]);
		dataLength = data.length;
		console.log('DATA DOWNLOADED');
		console.log('data size: ' + dataLength);
	})
	.catch(err => {
		console.log(err);
	})

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
	currentTimeBlock.innerHTML = timeCalc(audio.currentTime);
	preview.style.background = `url(${track.data.coverImage})`;
	
	audio.onloadedmetadata = function() {
		songDuration.innerHTML = timeCalc(audio.duration);
		audio.currentTime = '0';
	};

	if (playStop.classList.contains('stoped-song')) {
		console.log('Stoped song')
	} else if (playStop.classList.contains('playing-song')) {
		console.log('Plating song')
	}
}
setInterval(() => {
	currentTimeBlock.innerHTML = timeCalc(audio.currentTime);
}, 100);

// Play/stop
function PlayStop() {
	if (playStop.classList.contains('stoped-song')) {
		audio.play();
		console.log('PLaying')
		// Song progress
		playStop.querySelector('img').src = '../images&icons/images/pause.png';
		playStop.querySelector('img').style.filter = 'invert(0)';
		playStop.classList.add('playing-song');
		playStop.classList.remove('stoped-song');
	} else if (playStop.classList.contains('playing-song')) {
		audio.pause();
		console.log('Paused')
		playStop.querySelector('img').src = '../images&icons/images/play.png';
		playStop.querySelector('img').style.filter = 'invert(1)';
		playStop.classList.add('stoped-song');
		playStop.classList.remove('playing-song');
	}
	
}
playStop.addEventListener('click', () => {
	PlayStop()
})

// Next/prev song
function nextSong() {
	fetch(music_default_url)
	.then(response => response.json())
	.then(data => {
		if (mix.classList.contains('mixed')) {
			if (playStop.classList.contains('stoped-song')) {
				mixTrack(dataLength)
				loadSong(data[songIndex])
				// Пушим индекс в кэш
				// songCash.push(songIndex);
				// console.log('song index: ' + songIndex)
				// console.log('song cash: ' + songCash)

				// console.log(songIndex)
				return
			} else if (playStop.classList.contains('playing-song')) {
				mixTrack(dataLength)
				loadSong(data[songIndex])
				audio.play()
				// Пушим индекс в кэш
				// songCash.push(songIndex);
				// console.log('song index: ' + songIndex)
				// console.log('song cash: ' + songCash)

				// console.log(songIndex)
				return
			}
		}
		if (songIndex < data.length - 1) {
			if (playStop.classList.contains('stoped-song')) {
				loadSong(data[++songIndex])
			}
			else if (playStop.classList.contains('playing-song')) {
				loadSong(data[++songIndex])
				audio.play()
			}
			// Пушим индекс в кэш
			// songCash.push(songIndex);
			// console.log('song index: ' + songIndex)
			// console.log('song cash: ' + songCash)

			// console.log(songIndex)
		}
		else {
			if (playStop.classList.contains('stoped-song')) {
				loadSong(data[0])
				songIndex = 0;
			} else if (playStop.classList.contains('playing-song')) {
				loadSong(data[0])
				songIndex = 0;
				audio.play()
			}
			// Пушим индекс в кэш
			// songCash.push(songIndex);
			// console.log('song index: ' + songIndex)
			// console.log('song cash: ' + songCash)

			// console.log(songIndex)
		}
		// Пушим индекс в кэш
		songCash.push(songIndex);
		console.log('song index: ' + songIndex)
		console.log('song cash: ' + songCash)
		console.log(songIndex)
	})
}
function prevSong() {
	fetch(music_default_url)
	.then(response => response.json())
	.then(data => {

		if (songCash.length > 0) {
			let songCashIndex = songCash.length - 1;
			if (playStop.classList.contains('stoped-song')) {
				songIndex = songCash[--songCashIndex]
				songCashIndex -= 1;
				loadSong(data[songIndex])
				// Пушим индекс в кэш
				// songCash.push(songIndex);
				// console.log('song cash: ' + songCash)
				// console.log('song index: ' + songIndex)

				return
			} else if (playStop.classList.contains('playing-song')) {
				mixTrack(dataLength)
				loadSong(data[songIndex])
				audio.play()
				// Пушим индекс в кэш
				// songCash.push(songIndex);
				// console.log('song cash: ' + songCash)
				// console.log('song index: ' + songIndex)

				return
			}
		}
		if (songIndex > 0) {
			if (playStop.classList.contains('stoped-song')) {
				if (audio.currentTime > 10) {
					audio.currentTime = 0;
				} else {
					loadSong(data[--songIndex])
				}
				// Пушим индекс в кэш
				// songCash.push(songIndex);
				// console.log('song index: ' + songIndex)
				// console.log('song cash: ' + songCash)

				// console.log(songIndex)
			}
			else if (playStop.classList.contains('playing-song')) {
				if (audio.currentTime > 10) {
					audio.currentTime = 0;
					audio.play()
				} else {
					loadSong(data[--songIndex])
					audio.play()
				}
				// Пушим индекс в кэш
				// songCash.push(songIndex);
				// console.log('song index: ' + songIndex)
				// console.log('song cash: ' + songCash)

				// console.log(songIndex)
			}
		}
		else {
			if (audio.currentTime > 10) {
				audio.currentTime = 0;
			} else {
				loadSong(data[data.length - 1])
				songIndex = data.length - 1;
				audio.play()
			}
			// Пушим индекс в кэш
			// songCash.push(songIndex);
			// console.log('song index: ' + songIndex)
			// console.log('song cash: ' + songCash)

			// console.log(songIndex)
		}
	})
	console.log('song index: ' + songIndex)
}
nextBtn.addEventListener('click', nextSong)
prevBtn.addEventListener('click', prevSong)

// setInterval(() => {
// 	let currentProgress = (audio.currentTime / audio.duration) * 552;
// 	songProgress.style.width = `${currentProgress}px`
// 	console.log(audio.currentTime)
// }, 100);

//Song progress change

function updateProgress(e) {
	const {duration, currentTime} = e.srcElement;
	const progressPercent = (currentTime / duration) * 100;
	songProgress.style.width = `${progressPercent}%`
}
audio.addEventListener('timeupdate', updateProgress)

// function setProgress(e) {
// 	const width = this.clientWidth;
// 	const clickX = e.offsetX;
// 	const duration = audio.duration;

// 	if (((clickX / width) * duration) <= duration) {
// 		audio.currentTime = (clickX / width) * duration;
// 	}
// }
// songProgressContainer.addEventListener('click', setProgress)
	

// Set progress 
// function progressChange(e) {
// 	const width = songProgressContainer.clientWidth;
// 	const clickX = e.offsetX;
// 	const duration = audio.duration;
// 	console.log('width: ' + width);
// 	console.log('clickX: ' + clickX);
// 	console.log('duration: ' + duration);

// 	let newTime = (clickX / width) * duration;
// 	// if (newTime <= duration) {
// 	// 	audio.currentTime = (clickX / width) * duration;
// 	// 	console.log('audio.currentTime: ' + audio.currentTime);
// 	// }
// }
// songProgressContainer.addEventListener('mousedown', (e) => {

// 	const width = songProgressContainer.clientWidth;
// 	const clickX = e.offsetX;
// 	const duration = audio.duration;
// 	console.log('width: ' + width);
// 	console.log('clickX: ' + clickX);
// 	console.log('duration: ' + duration);
// 	console.log('(clickX / width) * duration: ' + (clickX / width) * duration);

// 	let newTime = (clickX / width) * duration;
// 	// if (newTime <= duration) {
// 	// 	audio.currentTime = (clickX / width) * duration;
// 	// 	console.log('audio.currentTime: ' + audio.currentTime);
// 	// }
// 	audio.currentTime = 10;

// 	document.addEventListener('mousemove', progressChange);
// 	songProgressContainer.addEventListener('mouseup', () => {
// 		document.removeEventListener('mousemove', progressChange)
// 	})
// })

function songChange(e) {
	const rect = songProgressContainer.getBoundingClientRect();
	
	let mouseX = e.clientX - rect.left;
	songProgress.style.width = `${mouseX}px`;
	console.log('e.clientX: ' + e.clientX);
	console.log('rect.left: ' + rect.left);
	console.log('mouseX: ' + mouseX);

	// const rectProgress = songProgress.getBoundingClientRect();
	let newTime = ((mouseX / 552) * audio.duration);
	if (newTime <= audio.duration) {
		audio.currentTime = `${newTime}`;
	}
	console.log('calc time: ' + newTime);
	console.log('audio.currentTime: ' + audio.currentTime)
}
songProgressContainer.addEventListener('mousedown', (e) => {
	const rect = songProgressContainer.getBoundingClientRect();

	let mouseX = e.clientX - rect.left;
	songProgress.style.width = `${mouseX}px`;
	console.log('e.clientX: ' + e.clientX);
	console.log('rect.left: ' + rect.left);
	console.log('mouseX: ' + mouseX);

	// const rectProgress = songProgress.getBoundingClientRect();
	let newTime = ((mouseX / 552) * audio.duration);
	if (newTime <= audio.duration) {
		audio.currentTime = `${newTime}`;
	}
	console.log('calc time: ' + (mouseX / 552) * audio.duration);
	console.log('audio.currentTime: ' + audio.currentTime)

	document.addEventListener('mousemove', songChange)
	document.addEventListener('mouseup', () => {
		document.removeEventListener('mousemove', songChange);
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

// Auto-next
audio.addEventListener('ended', () => {
	console.log('ended!')
	if (loopTrack.classList.contains('looped')) {
		prevSong();
		console.log('prevSong')
	} else {
		nextSong();
		console.log('nextSong')
	}
})

// LoopTrack
loopTrack.addEventListener('click', () => {
	if (loopTrack.classList.contains('looped')) {
		loopTrack.classList.toggle('looped');
	} else {
		loopTrack.classList.toggle('looped');
		console.log('looped')
	}
})

// Mix track
function mixTrack(dataLength) {
	// songIndex = Math.floor(Math.random() * dataLength);
	// console.log('mix active')
	songCash = Array.from({length: dataLength}, () => Math.floor(Math.random() * (dataLength - 1)));
}
mix.addEventListener('click', () => {
	if (mix.classList.contains('mixed')) {
		mix.classList.toggle('mixed');
		console.log('unmixed');
		songCash = [];
	} else {
		mix.classList.toggle('mixed');
		console.log('mixed');
		console.log(`song cash: ${songCash}`);
	} 
})