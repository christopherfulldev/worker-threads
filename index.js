'use strict';
import sharp from 'sharp'; //precisa ser importado antes
import Piscina from 'piscina';

import { Buffer } from 'buffer';
import { createServer } from 'http';
import { parse } from 'url';

const threadPool = new Piscina({
	filename: './background-tasks.js'
});

async function joinImages({image, background}) {
	return await threadPool.run({image, background});
}

async function handler(request, response) {
	try {
		const {
			query: { img, background },
		} = parse(request.url, true);

		const imageBase64 = await joinImages({
			image: img,
			background,
		});
		
		response.writeHead(200, {
			'Content-Type': 'image/jpeg',
			'Content-Disposition': 'inline; filename=image.jpg',
		});
		response.write(Buffer.from(imageBase64));
	} catch (error) {
		response.end();
	}
	response.end();
}

createServer(handler).listen(3000, () =>
	console.log('Server is running on port 3000')
);
