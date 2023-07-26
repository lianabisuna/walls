import axios, { type AxiosError } from 'axios';
import { useAuthStore } from '~/store/authStore';

export default defineNuxtPlugin((nuxtApp) => {
	axios.defaults.baseURL = 'https://ec2-18-141-234-79.ap-southeast-1.compute.amazonaws.com/api/';

	// Request Interceptor for Beater Token Auth
	axios.interceptors.request.use(
		(config)=> {
			const { user } = useAuthStore();
			// if (user && user?.token && !config.headers?.Authorization) {
			// 	config
			// 		.headers
			// 		.setAuthorization(`Bearer ${user.token}`);
			// }
			console.log('axios:request', user);
			return config;
		})

	axios.interceptors.response.use(response=>response, (error: AxiosError)=>{
		// const authStore = useAuthStore();
		// if (error.response?.status === 401) {
		// 	authStore.setUser(null);
		// 	router.push({ name: 'Login' });
		// 	console.error('Error: Token Expired / Missing')
		// } else {
		// 	console.error(error)
		// }
		console.log('axios:response', error);
		return Promise.reject(error);
	});

	return {
		provide: {
			axios,
		}
	}
})