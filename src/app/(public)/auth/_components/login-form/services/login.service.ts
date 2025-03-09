import { api, type FetcherResponse } from '@/utils/api';
import type {
	LoginInput,
	LoginOutput,
	LoginService,
} from '../types/login.type';

export const loginService: LoginService = {
	login: async (input: LoginInput): Promise<FetcherResponse<LoginOutput>> => {
		const response = await api.post<LoginOutput>('/user/v1/login', input);

		return response;
	},
};
