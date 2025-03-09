import { api, type FetcherResponse } from '@/utils/api';
import type { LogoutOutput, LogoutService } from '../types/logout.type';

export const logoutService: LogoutService = {
	logout: async (): Promise<FetcherResponse<LogoutOutput>> => {
		const response = await api.post<LogoutOutput>('/user/v1/logout');

		return response;
	},
};
