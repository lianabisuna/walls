import Pusher from 'pusher-js';

export default defineNuxtPlugin((nuxtApp) => {
	// Enable pusher logging - don't include this in production
	Pusher.logToConsole = true;

	const pusher = new Pusher('dfc0eac3ee29b5ec1abb', {
		cluster: 'ap1'
	});

	return {
		provide: {
			pusher,
		}
	}
})