require('../css/main.scss');

define(['Swell'], function(Swell) {

document.addEventListener('DOMContentLoaded', function() {
	console.log("loaded");
	var containers = document.querySelectorAll('[data-arc-swell]');
	if (containers.length > 0) {
		for (var i = 0; i < containers.length; i++) {
			console.log("dataset", containers[i].dataset);
			var swell = new Swell({
				container: containers[i],
				url: containers[i].dataset.arcSwell
			});

			swell.init();
		}
	}
});
})
