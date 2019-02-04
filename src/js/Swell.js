import Thumb from './Thumb.js';

export default class Swell {
	constructor(config) {
		this.url = config.url;
		this.container = config.container;
		this.dimensions_cache = {};
	}

	init() {
		this.container.className = 'arc-swell-container';
		this.getImages();
		this.thumbs = [];
		this.container.addEventListener('click', (e) => {
			if (e.target.dataset.swellThumbId) {
				console.log(this.thumbs[e.target.dataset.swellThumbId].summary);
			}
		});
	}

	getImages() {
		let req = new XMLHttpRequest();
		req.onreadystatechange = () => {
			if (req.readyState == 4) {
				if (req.status == 200) {
					this.loadImages(req.responseText);
				}
			}
		};
		req.open('GET', this.url);
		req.send();
	}

	loadImages(data) {
		this.image_data = JSON.parse(data);
		this.image_count = this.image_data.count;
		this.images = this.image_data.images;

		for (let i = 0; i < this.image_count; i++) {
			let thumb = new Thumb({
				src: this.images[i].src,
				summary: this.images[i].text,
				height: this.images[i].height,
				width: this.images[i].width,
				id: [i],
				cache: this.dimensions_cache
			});

			this.container.appendChild(thumb.build());

			this.thumbs.push(thumb);
		}
	}
}