import sharp from 'sharp';
import { request } from 'undici';

import { Buffer } from 'buffer';

async function downloadFile(url) {
	if (url === undefined) return sharp({}).arrayBuffer();
	const response = await request(url);
	const data = await response.body.arrayBuffer();

	if (response) return Buffer.from(data);
	throw new Error(`Error fetching ${response.status}`);
}

async function onMessage({ image, background }) {
	const firstLayer = await sharp(await downloadFile(image))
	// .grayscale()
	// .rotate(90)
		.toBuffer();

	const secondLayer = await sharp(await downloadFile(background))
		.composite([
			{ input: firstLayer, gravity: sharp.gravity.south },
			{ input: firstLayer, gravity: sharp.gravity.east },
			{ input: firstLayer, gravity: sharp.gravity.west },
			{ input: firstLayer, gravity: sharp.gravity.north, left: 670, top: 0 },
		])
		.toBuffer();

	return secondLayer;
}

export default onMessage;
