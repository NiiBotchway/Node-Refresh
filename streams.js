const fs = require('fs');

const readStream = fs.createReadStream('./docs/blog1.txt', {
	encoding: 'utf-8',
});
const writeStream = fs.createWriteStream('./docs/newFile.txt');

// readStream.on('data', (chunk) => {
// 	writeStream.write(chunk, (err) => {
// 		if (err) {
// 			console.log(err.message);
// 		}
// 		console.log('stream successfully written to new file!!');
// 	});
// });

readStream.pipe(writeStream);
