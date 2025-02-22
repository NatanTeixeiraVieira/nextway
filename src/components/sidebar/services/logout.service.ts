import { fetcher, type FetcherResponse } from '@/utils/fetcher';
import type { LogoutOutput, LogoutService } from '../types/logout.type';

export const logoutService: LogoutService = {
	logout: async (): Promise<FetcherResponse<LogoutOutput>> => {
		const response = await fetcher<LogoutOutput>('/user/v1/logout', {
			method: 'POST',
		});

		return response;
	},
};
