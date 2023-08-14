let buttonTrigger = document.getElementById('button-trigger');
let preview = document.getElementById('preview');

buttonTrigger.addEventListener('click', function() {
	if (buttonTrigger.classList.contains('trigger-close')) {
		preview.style.maxHeight = '0px';
		buttonTrigger.style.bottom = '130px';
		buttonTrigger.style.transform = 'rotate(180deg)';
		buttonTrigger.style.filter = 'invert()';
		buttonTrigger.classList.remove('trigger-close')
	} 
	else {
		preview.style.maxHeight = '310px';
		buttonTrigger.style.bottom = '385px';
		buttonTrigger.style.transform = '';
		buttonTrigger.style.filter = '';
		buttonTrigger.classList.add('trigger-close')
	}
})