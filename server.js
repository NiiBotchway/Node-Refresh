const fs = require('fs');
const http = require('http');
const _ = require('lodash');

const server = http.createServer((req, res) => {
	console.log('request made', req.url, req.method);

	//setting response header content type
	res.setHeader('content-type', 'text/html');

	//create a mini routing system
	let path = './views';
	switch (req.url.toLowerCase()) {
		case '/':
			path += 'index.html';
			res.statusCode = 200;
			break;
		case '/about':
			path += 'about.html';
			res.statusCode = 200;
			break;
		case '/about-us':
			// res.setHeader('Location', '/about');
			// res.statusCode = 301;
			// res.end();
			console.log('-------about-us hit------------');
			res.writeHead(301, 'Redirecting...', { Location: '/about' }).end();
			break;
		default:
			path += '404.html';
			res.statusCode = 404;
			break;
	}

	fs.readFile(path, (err, data) => {
		if (err) {
			console.log(err.message);
			res.end();
		} else {
			res.end(data);
		}
	});
});

server.listen(3000, 'localhost', () => {
	console.log('listening for requests made on port 3000');
});
