import { type FetcherResponse, fetcher } from '@/utils/fetcher';
import type {
	LoginInput,
	LoginOutput,
	LoginService,
} from '../types/login.type';

export const loginService: LoginService = {
	login: async (input: LoginInput): Promise<FetcherResponse<LoginOutput>> => {
		const response = await fetcher<LoginOutput>('/user/v1/login', {
			method: 'POST',
			body: input,
		});

		return response;
	},
};
