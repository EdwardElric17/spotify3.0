let contextMenu = document.querySelector('.context-menu');
let myProfile = document.querySelector('.my-profile');
let context_Menu_Objects = document.querySelectorAll('.context-menu > div')

context_Menu_Objects.forEach(element => {
	element.classList.toggle('context-menu-elem-toggle')
});
contextMenu.classList.toggle('context-menu-toggle')

myProfile.addEventListener('click', () => {
	context_Menu_Objects.forEach(element => {
		element.classList.toggle('context-menu-elem-toggle')
	});
	contextMenu.classList.toggle('context-menu-toggle')
});