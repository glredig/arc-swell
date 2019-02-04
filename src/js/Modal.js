let overlay = document.createElement('div');
let popup;

overlay.className = 'arc-swell-overlay';

const CAPTION_BOX_WIDTH = 220;
const MOBILE_WIDTH = 600;

export class Popup {
	constructor(config) {
		this.parent = config.parent || document.body;
	}

	init() {
		this.parent.appendChild(overlay);
		this.box = document.createElement('div');
		this.box.className = 'arc-swell-box';
		this.close_box = document.createElement('div');
		this.close_box.className = 'arc-swell-close';
		this.close_box.innerText = 'X';
		this.image_box = document.createElement('div');
		this.image_box.className = 'arc-swell-image-box';
		this.image = document.createElement('img');
		this.caption_box = document.createElement('div');
		this.caption_box.className = 'arc-swell-caption-box';

		this.parent.appendChild(this.box);
		this.box.appendChild(this.close_box);
		this.box.appendChild(this.image_box);
		this.image_box.appendChild(this.image);
		this.box.appendChild(this.caption_box);

		this.close_box.addEventListener('click', () => {
			this.hide();
		});

		overlay.addEventListener('click', () => {
			this.hide();
		});
	}

	isHeightControlled(height, width) {
		const mobile = window.innerWidth < MOBILE_WIDTH;

		return ( height / (width + (mobile ? 0 : CAPTION_BOX_WIDTH)) >= window.innerHeight / window.innerWidth);
	}

	resize(height, width) {
		const aspect_ratio = width / height;
		const mobile = window.innerWidth < MOBILE_WIDTH;
		if (this.isHeightControlled(height, width)) {
			const img_height = window.innerHeight * .9;
			const img_width = img_height * aspect_ratio;

			this.image.style.height = `${img_height}px`;
			this.image.style.width = `${img_width}px`
		}
		else {
			const img_width = window.innerWidth * .9 - (mobile ? 0 : CAPTION_BOX_WIDTH );
			const img_height = ( window.innerWidth * .9 - (mobile ? 0 : CAPTION_BOX_WIDTH ) ) / aspect_ratio;

			this.image.style.height = `${img_height}px`;
			this.image.style.width = `${img_width}px`
		}
	}

	handleWindowResize(config) {
		this.resize(config.height, config.width);
	}

	show(config) {
		this.image.src = config.src;
		this.caption_box.innerHTML = config.summary;
		this.box.style.display = 'flex';
		overlay.style.display = 'block';
		this.resize(config.height, config.width);
		window.addEventListener('resize', this.handleWindowResize.bind(this, config));
	}

	hide() {
		this.box.style.display = 'none';
		overlay.style.display = 'none';
		window.removeEventListener('resize', this.handleWindowResize);
	}
}

function measure_image(config, cache) {
	return new Promise((resolve, reject) => {
		let measure_box = document.createElement('div');
		let stand_in = new Image();

		stand_in.onload = function onImageLoad() {
			cache[config.id] = {};
			cache[config.id].height = this.height;
			cache[config.id].width = this.width;
			measure_box.remove();
			resolve(cache);
		}

		stand_in.onerror = function onImageError() {
			reject(`Couldn't load stand-in image`);
		}

		measure_box.style.position = 'absolute';
		measure_box.style.left = '-9999px';
		measure_box.appendChild(stand_in);

		document.body.appendChild(measure_box);

		stand_in.src = config.src;
	});
}

export function show(config) {
	let cache = config.cache || {};

	if (cache[config.id] === undefined) {
		measure_image(config, cache)
			.then((updated_cache) => {
				config.height = updated_cache[config.id].height;
				config.width = updated_cache[config.id].width;

				if (popup != undefined) {
					popup.show(config);
				}
				else {
					popup = new Popup(config);
					popup.init();
					popup.show(config);
				}
			})
			.catch((e) => {
				console.log("Couldn't get image dimensions");
			})
	}
	else {
		config.height = cache[config.id].height;
		config.width = cache[config.id].width;

		if (popup != undefined) {
			popup.show(config);
		}
		else {
			popup = new Popup(config);
			popup.init();
			popup.show(config);
		}
	}	
}