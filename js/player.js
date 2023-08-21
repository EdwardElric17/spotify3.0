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


// Выключение/включение звука при нажатии на значок звука
let volume = document.querySelector('.volume');
let input = document.querySelector('.right-part .timeline');
let inputValue = input.value;

input.addEventListener('input', () => {
	inputValue = input.value;
})

volume.addEventListener('click', () => {
	if (input.value != 0) {
		input.value = 0;
	} else {
		input.value = inputValue;
	}
})

// Изменение плэй/стоп
let play_stop = document.querySelector('.play-stop');

play_stop.addEventListener('click', () => {
	let src = play_stop.childElementCount();
	console.log(src)
	if (src == '../images&icons/images/pause.png') {
		play_stop.querySelector('img').src = '../images&icons/images/play.png'
		play_stop.querySelector('img').style.filter = 'invert(1)'
		play_stop.classList.toggle('playing')
	} else {
		play_stop.querySelector('img').src = '../images&icons/images/pause.png'
		play_stop.querySelector('img').style.filter = ''
		play_stop.classList.toggle('playing')
	}
})

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

