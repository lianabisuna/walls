export const useBaseFetch: typeof useFetch = (request, options?) => {
  const config = useRuntimeConfig();

  return useFetch(
		request,
		{
			baseURL: config.public.baseURL as string,
			headers: {
				'Content-Type': 'application/json',
			},
			...options,
		}
	);
}