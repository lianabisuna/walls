export default defineNuxtRouteMiddleware((to, from) => {
	if (process.server) return;

	const authenticationStore = useAuthenticationStore();

	if (authenticationStore && authenticationStore.user) return abortNavigation();

	return navigateTo('/login');
})