let contextMenu = document.querySelector('.context-menu');
let profile = document.querySelector('.profile');
let myProfile = document.querySelector('.my-profile');
let contextMenuElems = document.querySelectorAll('.context-menu a');
let content = document.querySelector('.context-menu .content1');

contextMenu.classList.toggle('closed')
contextMenu.style.gridTemplateRows = '0fr'
contextMenu.style.padding = '0px'
content.style.overflow = 'hidden'
content.querySelector('hr').style.display = 'none'

contextMenuElems.forEach(element => {
	element.style.display = 'none';
});


function close() {
	contextMenu.style.gridTemplateRows = '0fr'
	contextMenu.style.padding = '0px'
	content.style.overflow = 'hidden'
	content.querySelector('hr').style.display = 'none'

	contextMenuElems.forEach(element => {
		element.style.display = 'none';
	});

}
function open() {
	contextMenu.style.gridTemplateRows = '1fr'
	contextMenu.style.padding = '15px 21px'
	content.style.overflow = ''
	content.querySelector('hr').style.display = ''

	contextMenuElems.forEach(element => {
		element.style.display = '';
	});

}
document.addEventListener('click', (event) => {
	if (!profile.contains(event.target) && !contextMenu.classList.contains('closed')) {
		contextMenu.classList.toggle('closed')
		close();
	}
});

myProfile.addEventListener('click', () => {
	if (contextMenu.classList.contains('closed')) {
		contextMenu.classList.toggle('closed');
		open();
	}
	else {
		contextMenu.classList.toggle('closed')
		close();
	}
});