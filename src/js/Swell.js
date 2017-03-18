define(['Thumb'], function(Thumb) {
	function Swell(config) {
		this.url = config.url;
		this.container = config.container;
	}

	Swell.prototype = {
		init: function() {
			this.container.className = 'arc-swell-container';
			this.getImages();
			this.thumbs = [];
			this.container.addEventListener('click', function(e) {
				if (e.target.dataset.swellThumbId) {
					console.log(this.thumbs[e.target.dataset.swellThumbId].summary);
				}
			}.bind(this));
		},

		getImages: function() {
			req = new XMLHttpRequest();
			req.onreadystatechange = function() {
				if (req.readyState == 4) {
					if (req.status == 200) {
						this.loadImages(req.responseText);
					}
				}
			}.bind(this);
			req.open('GET', this.url);
			req.send();
		},

		loadImages: function(data) {
			console.log('data', data);
			this.image_data = JSON.parse(data);
			this.image_count = this.image_data.count;
			this.images = this.image_data.images;

			console.log("count: ", this.image_count);
			console.log("images: ", this.images);

			for (var i = 0; i < this.image_count; i++) {
				console.log("test", this.images[i]);
				var thumb = new Thumb({
					src: this.images[i].src,
					summary: this.images[i].text,
					id: [i]
				});

				this.container.appendChild(thumb.build());

				this.thumbs.push(thumb);
			}
		}
	}

	return Swell
});