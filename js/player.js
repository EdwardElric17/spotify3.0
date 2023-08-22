//Добавляем смену цвета у лайка при нажатии
let playerLike = document.querySelector('.like');

playerLike.addEventListener('click', () => {
	playerLike.classList.toggle('like_off');
});

//Анимация нажатия на кнопки
let pointInnerChild = document.querySelectorAll('.point-inner:only-child');

pointInnerChild.forEach(child => {
	child.addEventListener('click', () => {
		child.style.animation = 'pointInnerClick 0.3s ease'
		setTimeout(() => {
			child.style.animation = ''
		}, 300);
	})
});




// Появление свечения при приближении к блокам
let pointWrappers = document.querySelectorAll('.point-wrapper');

pointWrappers.forEach(pointWrapper => {

	document.addEventListener('mousemove', e => {
		const rect = pointWrapper.getBoundingClientRect();
		const x = (e.clientX - rect.left) / rect.width;
		const y = (e.clientY - rect.top) / rect.height;
	
		const glowDistance = 80;
		if ( 
			( (e.clientX > rect.left - glowDistance) && (e.clientY > rect.top - glowDistance) )
			&&
			( (e.clientX < rect.right + glowDistance) && (e.clientY > rect.top - glowDistance) )
			&&
			( (e.clientY < rect.bottom + glowDistance) && (e.clientX < rect.right + glowDistance) )
			&&
			( (e.clientY < rect.bottom + glowDistance) && (e.clientX > rect.left - glowDistance) )
		)
		{	
			let minDistance = Math.min(
				Math.abs(e.clientX - rect.left),
				Math.abs(e.clientX - rect.right),
				Math.abs(e.clientY - rect.top),
				Math.abs(e.clientX - rect.bottom)
			)
			let glowValue = 1 - (minDistance / glowDistance);
	
			pointWrapper.style.background = `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(90,90,90, ${glowValue}), rgba(24,24,24))`;
		}
		else if (
			( (e.clientX > rect.left) && (e.clientX < rect.right) )
			&&
			( (e.clientY > rect.top) && (e.clientY < rect.bottom) )
		)
		{
			pointWrapper.style.background = `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(90,90,90, 1), rgba(24,24,24))`;
		}
		else {
			pointWrapper.style.background = '#181818'
		}
	})

});


//Появление ореола внутри блока
let pointInners = document.querySelectorAll('.point-inner');

pointInners.forEach(pointInner => {

	document.addEventListener('mousemove', e => {
		const rect = pointInner.getBoundingClientRect();
		const x = (e.clientX - rect.left) / rect.width;
		const y = (e.clientY - rect.top) / rect.height;
	
		const glowDistance = 1;
		if ( 
			( (e.clientX > rect.left - glowDistance) && (e.clientY > rect.top - glowDistance) )
			&&
			( (e.clientX < rect.right + glowDistance) && (e.clientY > rect.top - glowDistance) )
			&&
			( (e.clientY < rect.bottom + glowDistance) && (e.clientX < rect.right + glowDistance) )
			&&
			( (e.clientY < rect.bottom + glowDistance) && (e.clientX > rect.left - glowDistance) )
		)
		{
			pointInner.style.background = `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(45,45,45), rgba(24,24,24))`;
		}
		else {
			pointInner.style.background = '#181818'
		}
	})

	// Нажатие на кнопки
	pointInner.addEventListener('click', () => {
		pointInner.style.background = '#181818'
		setTimeout(() => {
			pointInner.style.background = 'rgba(45,45,45)'
		}, 100);
		pointInner.style.background = ''
	})

});

// Включение/выключение музыки
// let timeline = document.querySelector('.timeline');
// let song = document.querySelector('.song');
// let playStop = document.querySelector('play-stop');

// let playing = false;

// song.onloadedmetadata = function() {
// 	timeline.max = song.duration;
// 	timeline.value = song.currentTime;
// }

function playPause() {

}

// Изменение плэй/стоп
let timeline = document.querySelector('.timeline');
let song = document.querySelector('.song');
let playStop = document.querySelector('.play-stop');

let songCurrentTime = song.currentTime;
let songDuration = song.duration;
song.onloadedmetadata = function() {
	timeline.max = song.duration;
	timeline.value = song.currentTime;
}
setInterval(() => {
	timeline.value = song.currentTime;
}, 1000);
timeline.onchange = function() {
	song.currentTime = timeline.value
}

playStop.addEventListener('click', () => {

	let src = playStop.childNodes[1].src;
	if (src == 'http://127.0.0.1:3002/images&icons/images/pause.png') {
		playStop.querySelector('img').src = 'http://127.0.0.1:3002/images&icons/images/play.png'
		playStop.querySelector('img').style.filter = 'invert(1)'
		playStop.classList.toggle('playing')

		song.pause();
	} 
	else {
		playStop.querySelector('img').src = 'http://127.0.0.1:3002/images&icons/images/pause.png'
		playStop.querySelector('img').style.filter = ''
		playStop.classList.toggle('playing')

		song.play();
	}
})
// Выключение/включение звука при нажатии на значок звука
let volumeSymbol = document.querySelector('.volume-symbol');
let volumeRange = document.querySelector('.right-part .volume-range');

let volumeRangeValue = volumeRange.value;
song.volume = volumeRangeValue / 100;
console.log(song.volume)

volumeRange.addEventListener('input', () => {
	volumeRangeValue = volumeRange.value
	song.volume = volumeRangeValue / 100;
})

volumeSymbol.addEventListener('click', () => {
	if (volumeRange.value != 0) {
		volumeRange.value = 0;
		song.volume = volumeRange.value;
	} else {
		volumeRange.value = volumeRangeValue;
		song.volume = volumeRangeValue / 100;
	}
})
