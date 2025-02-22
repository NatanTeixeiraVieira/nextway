import type { FetcherResponse } from '@/utils/fetcher';

export type LogoutService = {
	logout: () => Promise<FetcherResponse<LogoutOutput>>;
};

export type LogoutOutput = undefined;
