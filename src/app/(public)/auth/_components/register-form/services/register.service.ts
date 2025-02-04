import { fetcher, type FetcherResponse } from '@/utils/fetcher';
import type {
	RegisterInput,
	RegisterOutput,
	RegisterService,
} from '../types/register.types';

export const registerService: RegisterService = {
	register: async (
		params: RegisterInput,
	): Promise<FetcherResponse<RegisterOutput>> => {
		const response = await fetcher<RegisterOutput>('/user/v1/register', {
			method: 'POST',
			body: params,
		});

		return response;
	},
};
