export const useBaseFetch: typeof useFetch = (request, options?) => {
  const config = useRuntimeConfig();
	const authenticationStore = useAuthenticationStore();

  return useFetch(
		request,
		{
			baseURL: config.public.baseURL as string,
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${authenticationStore?.user?.token}`,
			},
			...options,
		}
	);
}