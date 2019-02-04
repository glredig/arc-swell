import { show } from './Modal.js';

export default class Thumb {
	constructor(config) {
		this.src = config.src;
		this.height = config.height;
		this.width = config.width;
		this.summary = config.summary;
		this.id = config.id;
		this.cache = config.cache;
	}

	build() {
		this.thumb_img = document.createElement('img');

		this.thumb_img.src = this.src.thumb;
		this.thumb_img.alt = this.summary;
		this.thumb_img.title = this.summary;
		this.thumb_img.dataset.swellThumbId = this.id;
		this.thumb_img.className = 'arc-swell-thumb';

		this.thumb_img.addEventListener('click', () => {
			show({
				src: this.src.full,
				summary: this.summary,
				height: this.height,
				width: this.width,
				cache: this.cache,
				id: this.id
			})
		});

		return this.thumb_img;
	}
}