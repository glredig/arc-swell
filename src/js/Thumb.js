define(['Modal'], function(Modal) {
	function Thumb(config) {
		this.src = config.src;
		this.summary = config.summary;
		this.id = config.id;
	}

	Thumb.prototype = {
		build: function() {
			this.thumb_img = document.createElement('img');

			this.thumb_img.src = this.src.thumb;
			this.thumb_img.alt = this.summary;
			this.thumb_img.title = this.summary;
			this.thumb_img.dataset.swellThumbId = this.id;
			this.thumb_img.className = 'arc-swell-thumb';

			this.thumb_img.addEventListener('click', function() {
				Modal.show({
					src: this.src.full,
					summary: this.summary
				})
			}.bind(this));

			return this.thumb_img;
		}
	}

	return Thumb
});