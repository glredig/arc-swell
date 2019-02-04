import '../css/main.scss';
import Swell from './Swell.js';

document.addEventListener('DOMContentLoaded', () => {
	console.log('Initializing gallery ...');
	const containers = document.querySelectorAll('[data-arc-swell]');
	if (containers.length > 0) {
		for (let i = 0; i < containers.length; i++) {
			let swell = new Swell({
				container: containers[i],
				url: containers[i].dataset.arcSwell
			});

			swell.init();
		}
	}
});
