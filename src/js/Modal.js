define([], function() {
	var overlay = document.createElement('div'),
		popup;

	overlay.className = 'arc-swell-overlay';

	function Popup(config) {
		this.parent = config.parent || document.body;
	}

	Popup.prototype = {
		init: function() {
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

			this.close_box.addEventListener('click', function() {
				this.hide();
			}.bind(this));

			overlay.addEventListener('click', function() {
				this.hide();
			}.bind(this));
		},

		show: function(config) {
			this.image.src = config.src;
			this.caption_box.innerHTML = config.summary;
			this.box.style.display = 'flex';
			overlay.style.display = 'block';
		},

		hide: function() {
			this.box.style.display = 'none';
			overlay.style.display = 'none';
		}
	}

	return {
		show: function(config) {
			if (popup != undefined) {
				popup.show(config);
			}
			else {
			console.log('config', config);

				popup = new Popup(config);
				popup.init();
				popup.show(config);
			}
		}
	}
});