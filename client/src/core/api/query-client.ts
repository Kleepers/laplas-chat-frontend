import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 5 * 60 * 1000, // 5 minutes
			gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
			retry: (failureCount, error: unknown) => {
				if ((error as { response?: { status?: number } })?.response?.status === 401) {
					return false; // Don't retry unauthorized requests
				}
				return failureCount < 3;
			},
			refetchOnWindowFocus: false,
			refetchOnReconnect: true,
		},
		mutations: {
			retry: 1,
		},
	},
});
