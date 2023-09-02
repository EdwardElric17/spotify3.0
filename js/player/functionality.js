const player = document.querySelector('.player'),
	audio = document.querySelector('.audio'),
	title = document.querySelector('.player .title'),
	artist = document.querySelector('.player .artist'),
	previewImg = document.getElementById('preview'),
	songDuration = document.querySelector('.song-duration'),
	currentTimeBlock = document.querySelector('.current-time'),
	like = document.querySelector('.player .like'),
	mix = document.querySelector('.player .mix'),
	prevBtn = document.querySelector('.player .prevBtn'),
	playStop = document.querySelector('.player .play-stop'),
	nextBtn = document.querySelector('.player .nextBtn'),
	loopTrack = document.querySelector('.player .loop-playlist'),
 	songProgress = document.querySelector('.player .progress'),
	songProgressContainer = document.querySelector('.player .progress-container'),
	volumeImg = document.querySelector('.player .volume-symbol'),
	volumeRange = document.querySelector('.player .volume-range'),
	volumeRangeContainer = document.querySelector('.player .volume-range-container'),
	music_default_url = '../../music/default/tracks_data.json'

let dataLength = 0; // data size
let songCash = []; // Song cash
let songIndex; // Песня по умолчанию

// Init song
fetch(music_default_url)
	.then(response => {
		return response.json();
	})
	.then(data => {
		dataLength = data.length;
		songIndex = Math.floor(Math.random() * (dataLength));
		loadSong(data[songIndex]);
		console.log('DATA DOWNLOADED');
		console.log('data size: ' + dataLength);
	})
	.catch(err => {
		console.log(err);
	})

// Load song
function loadSong(track) {
	
	title.innerHTML = track.data.title; // Title
	artist.innerHTML = track.data.artist; // Artist
	audio.src = track.data.path; // Audio source
	currentTimeBlock.innerHTML = timeCalc(audio.currentTime); // Time block calc
	preview.style.background = `url(${track.data.coverImage})`; // Preview download
	// download metadata
	audio.onloadedmetadata = function() {
		songDuration.innerHTML = timeCalc(audio.duration); 
		audio.currentTime = '0';
	};
	// check playing status
	if (playStop.classList.contains('stoped-song')) { 
		console.log('Stoped song')
		audio.pause()
	} else if (playStop.classList.contains('playing-song')) {
		console.log('Playing song')
		audio.play()
	}

}

// Set interval of current time block change
setInterval(() => {
	currentTimeBlock.innerHTML = timeCalc(audio.currentTime);
}, 100);

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

// Play/stop
function PlayStop() {

	if (playStop.classList.contains('stoped-song')) {

		audio.play();
		playStop.querySelector('img').src = '../images&icons/images/pause.png';
		playStop.querySelector('img').style.filter = 'invert(0)';
		playStop.classList.add('playing-song');
		playStop.classList.remove('stoped-song');
		console.log('PLaying')

	} else if (playStop.classList.contains('playing-song')) {

		audio.pause();
		playStop.querySelector('img').src = '../images&icons/images/play.png';
		playStop.querySelector('img').style.filter = 'invert(1)';
		playStop.classList.add('stoped-song');
		playStop.classList.remove('playing-song');
		console.log('Paused')

	}
}
// Play/Stop event listener
playStop.addEventListener('click', () => {
	PlayStop()
})

// Next/prev song
function nextSong() {
	fetch(music_default_url)
	.then(response => response.json())
	.then(data => {

		if (songIndex < data.length - 1) {
			if (playStop.classList.contains('stoped-song')) {
				if (mix.classList.contains('mixed')) {
					loadSong(data[songCash[++songIndex]]);
					console.log('song index: ' + songIndex)
					return;
				}
				loadSong(data[++songIndex])
			}
			else if (playStop.classList.contains('playing-song')) {
				if (mix.classList.contains('mixed')) {
					loadSong(data[songCash[++songIndex]]);
					audio.play();
					console.log('song index: ' + songIndex)
					return;
				}
				loadSong(data[++songIndex]);
				audio.play();
			}
		}
		else {
			if (playStop.classList.contains('stoped-song')) {
				if (mix.classList.contains('mixed')) {
					loadSong(data[songCash[0]]);
					songIndex = 0;
					console.log('song index: ' + songIndex)
					return;
				}
				loadSong(data[0])
				songIndex = 0;
			} else if (playStop.classList.contains('playing-song')) {
				if (mix.classList.contains('mixed')) {
					loadSong(data[songCash[0]]);
					songIndex = 0;
					audio.play();
					console.log('song index: ' + songIndex)
					return;
				}
				loadSong(data[0])
				songIndex = 0;
				audio.play();
			}
		}
		console.log('song index: ' + songIndex);

	})
}
function prevSong() {
	fetch(music_default_url)
	.then(response => response.json())
	.then(data => {

		if (songIndex > 0) {
			if (playStop.classList.contains('stoped-song')) {
				if (audio.currentTime > 10) {
					audio.currentTime = 0;
				} else {
					if (mix.classList.contains('mixed')) {
						loadSong(data[songCash[--songIndex]]);
						console.log('song index: ' + songIndex)
						return;
					}
					loadSong(data[--songIndex])
				}
			}
			else if (playStop.classList.contains('playing-song')) {
				if (audio.currentTime > 10) {
					audio.currentTime = 0;
					audio.play()
				} else {
					if (mix.classList.contains('mixed')) {
						loadSong(data[songCash[--songIndex]]);
						console.log('song index: ' + songIndex);
						audio.play();
						return;
					}
					loadSong(data[--songIndex])
					audio.play()
				}
			}
		}
		else {
			if (playStop.classList.contains('stoped-song')) {
				if (audio.currentTime > 10) {
					audio.currentTime = 0;
				} else {
					if (mix.classList.contains('mixed')) {
						loadSong(data[songCash[data.length - 1]]);
						songIndex = data.length - 1;
						console.log('song index: ' + songIndex);
						return;
					}
					loadSong(data[data.length - 1])
					songIndex = data.length - 1;
				}
			}
			else if (playStop.classList.contains('playing-song')) {
				if (audio.currentTime > 10) {
					audio.currentTime = 0;
					audio.play()
				} else {
					if (mix.classList.contains('mixed')) {
						loadSong(data[songCash[data.length - 1]]);
						songIndex = data.length - 1;
						console.log('song index: ' + songIndex);
						audio.play()
						return;
					}
					loadSong(data[data.length - 1])
					songIndex = data.length - 1;
					audio.play()
				}
			}
			
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

	let elem;
	let indexDict = new Set();
	while (indexDict.size < (dataLength)) {
		elem = Math.floor(Math.random() * (dataLength));
		indexDict.add(elem);
	}
	songCash = [...indexDict];

}

mix.addEventListener('click', () => {

	if (mix.classList.contains('mixed')) {
		mix.classList.toggle('mixed');
		console.log('unmixed');
		songCash = [];
	} else {
		mix.classList.toggle('mixed');
		console.log('mixed');
		mixTrack(dataLength);
		console.log(`song cash: ${songCash}`);
	} 

})