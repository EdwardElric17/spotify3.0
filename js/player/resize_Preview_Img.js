const { createCanvas, loadImage } = require('canvas');

async function resizeImg(path) {
    const canvas = createCanvas(310, 310);
    const ctx = canvas.getContext('2d');

    const image = await loadImage(path.replace(/\\/g, "/"));
    ctx.drawImage(image, 0, 0, 310, 310);

    console.log(canvas.toDataURL('image/jpeg'));
}

// Пример использования:
let path = '.\\music\\cover_image\\XXXTENTACION - Teeth (Trap Remix).png';
resizeImg(path)
    .then(resizedImageURL => {
        resizedImageURL;
    })
    .catch(error => {
        console.error(error);
    });
