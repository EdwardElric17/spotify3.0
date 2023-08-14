let content = document.querySelector('.content');
let middle = document.querySelector('.middle');

let header = document.querySelector('.friend-activity-header');
let main = document.querySelector('.friend-activity-main');

let closingCross = document.querySelector('.closing-cross');
let recMixes = document.querySelector('.rec-mixes');
let mixes = document.querySelectorAll('.mix');
let friendsOpen = document.querySelector('.friends');
let profileAndFriends = document.querySelector('.profile_and_friends');
let sidebarRight = document.querySelector('.sidebar-right');
let collectionList = document.querySelector('.collection-list');

let windowWidth = window.innerWidth;
// collectionList.style.width = '92%';
content.style.gridTemplateColumns = `calc(100% - (100% - 310px)) calc(100% - 310px) 0px`;
function close() {

	content.style.overflow = 'hidden';
	header.style.overflow = 'hidden';
	main.style.overflow = 'hidden';

	content.style.gridTemplateColumns = `calc(100% - (100% - 310px)) calc(100% - 310px) 0px`;
	// collectionList.style.width = '92%';
	recMixes.style.gridTemplateColumns = '1fr 1fr 1fr';

	profileAndFriends.style.left = '0px';
	profileAndFriends.style.gap = '20px';
	friendsOpen.style.background = '#000';
	friendsOpen.style.color = '#fff';
	
	setTimeout(() => {
		
		sidebarRight.style.display = 'none';
		content.style.overflow = '';
		
	}, 300)
}
function open () {
	content.style.overflow = 'hidden';
	header.style.overflow = 'hidden';
	main.style.overflow = 'hidden';

	content.style.gridTemplateColumns = '310px calc(100% - 310px - 346px) 346px';
	// collectionList.style.width = '92%'
	recMixes.style.gridTemplateColumns = '1fr 1fr';

	profileAndFriends.style.left = '230px';
	profileAndFriends.style.gap = '40px';
	friendsOpen.style.background = '#fff';
	friendsOpen.style.color = '#000';

	setTimeout(() => {
		
		content.style.overflow = '';
		
	}, 300)
	sidebarRight.style.display = 'flex';
}

friendsOpen.addEventListener('click', () => {
	open()
});
closingCross.addEventListener('click', () => {
	close();
});