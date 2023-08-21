const http = require('http');
const fs = require('fs');
const path = require('path');

let server = http.createServer((req, res) => {
	if (req.url.startsWith('/styles/')) {
        const stylePath = path.join(__dirname, req.url);
        const stream = fs.createReadStream(stylePath);

        stream.on('error', (err) => {
            res.writeHead(404, {'Content-Type': 'text/plain; charset=utf-8'});
            res.end('Style not found');
            console.error(err);
        });
        stream.pipe(res);
    } 
	else if (req.url.startsWith('/images&icons/images')) {
        const imagePath = path.join(__dirname, req.url);
        const stream = fs.createReadStream(imagePath);

        stream.on('error', (err) => {
            res.writeHead(404, {'Content-Type': 'text/plain; charset=utf-8'});
            res.end('Images not found');
            console.error(err);
        });
        stream.pipe(res);
    } 
	else if (req.url.startsWith('/images&icons/icons')) {
        const iconPath = path.join(__dirname, req.url);
        const stream = fs.createReadStream(iconPath);

        stream.on('error', (err) => {
            res.writeHead(404, {'Content-Type': 'text/plain; charset=utf-8'});
            res.end('Icons not found');
            console.error(err);
        });
        stream.pipe(res);
    } 
	else if (req.url.startsWith('/js/')) {
        const jsPath = path.join(__dirname, req.url);
        const stream = fs.createReadStream(jsPath);

        stream.on('error', (err) => {
            res.writeHead(404, {'Content-Type': 'text/plain; charset=utf-8'});
            res.end('Icons not found');
            console.error(err);
        });
        stream.pipe(res);
    } 
	else {
		console.log(`look URL: ${req.url}`)
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
        const stream = fs.createReadStream('./html/index.html')

        stream.on('error', (err) => {
            res.writeHead(500, {'Content-Type': 'text/plain; charset=utf-8'});
            res.end('Internal Server Error');
            console.error(err);
        });
        stream.pipe(res);
    }
})

const PORT = 3100
const HOST = '127.0.0.1'

server.listen(PORT, HOST, () => {
	console.log(`Сервер запущен: http://${HOST}:${PORT}`)
})
