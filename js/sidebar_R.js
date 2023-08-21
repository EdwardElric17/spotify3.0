let wrapper = document.querySelector('.wrapper');
let closingCross = document.querySelector('.closing-cross');
let friendsOpen = document.querySelector('.friends');
let sidebarRight = document.querySelector('.sidebar-right');
let recMixes = document.querySelector('.rec-mixes');
let profileAndFriends = document.querySelector('.profile_and_friends');
let collectionList = document.querySelectorAll('.collection-list');

let bodyWidth = document.body.clientWidth - 310 - 75;

collectionList.forEach(collection => {
	collection.style.width = bodyWidth + 'px';
});

wrapper.style.overflow = 'hidden';
sidebarRight.style.display = 'none';

function openSidebar() {

	// wrapper.style.overflow = 'hidden';
	wrapper.style.gridTemplateColumns = '310px 3fr 350px';
	recMixes.style.gridTemplateColumns = '1fr 1fr';
	sidebarRight.style.display = ''

	collectionList.forEach(collection => {
		collection.style.width = bodyWidth - 350 + 'px';
	});

	profileAndFriends.style.left = '230px';
	profileAndFriends.style.gap = '40px';
	friendsOpen.style.background = '#fff';
	friendsOpen.style.color = '#000';
	
}
function closeSidebar() {
	wrapper.style.gridTemplateColumns = '310px 3fr 0px';
	recMixes.style.gridTemplateColumns = '1fr 1fr 1fr';

	collectionList.forEach(collection => {
		collection.style.width = bodyWidth + 'px';
	});

	profileAndFriends.style.left = '0px';
	profileAndFriends.style.gap = '20px';
	friendsOpen.style.background = '#000';
	friendsOpen.style.color = '#fff';
}

friendsOpen.addEventListener('click', () => {
	openSidebar()
});
closingCross.addEventListener('click', () => {
	closeSidebar();
});