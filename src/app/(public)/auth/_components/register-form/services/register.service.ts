import { fetcher, type FetcherResponse } from '@/utils/fetcher';
import type {
	RegisterInput,
	RegisterOutput,
	RegisterService,
} from '../types/register.type';

export const registerService: RegisterService = {
	register: async (
		input: RegisterInput,
	): Promise<FetcherResponse<RegisterOutput>> => {
		const response = await fetcher<RegisterOutput>('/user/v1/register', {
			method: 'POST',
			body: input,
		});

		return response;
	},
};
