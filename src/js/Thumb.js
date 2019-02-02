import { show } from './Modal.js';

export default class Thumb {
	constructor(config) {
		this.src = config.src;
		this.height = config.dimensions.height;
		this.width = config.dimensions.width;
		this.summary = config.summary;
		this.id = config.id;
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
				width: this.width
			})
		});

		return this.thumb_img;
	}
}