// Добаляем ореол вокруг блоков при навелении и приближении 
let main = document.querySelector('.main');

document.addEventListener('mousemove', e => {
	const rect = main.getBoundingClientRect();
	const x = (e.clientX - rect.left) / rect.width;
	const y = (e.clientY - rect.top) / rect.height;
	if ( 
		( (e.clientX > rect.left - 50) && (e.clientY > rect.top - 50) )
		&&
		( (e.clientX < rect.right + 50) && (e.clientY > rect.top - 50) )
		&&
		( (e.clientY < rect.bottom + 50) && (e.clientX < rect.right + 50) )
		&&
		( (e.clientY < rect.bottom + 50) && (e.clientX > rect.left - 50) )
	)
	{
		main.style.background = `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(255,255,255), rgba(0,0,0))`;
	}
	else {
		main.style.background = 'rgb(80, 80, 80)'
	}
})