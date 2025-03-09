import { api, type FetcherResponse } from '@/utils/api';
import type {
	RegisterInput,
	RegisterOutput,
	RegisterService,
} from '../types/register.type';

export const registerService: RegisterService = {
	register: async (
		input: RegisterInput,
	): Promise<FetcherResponse<RegisterOutput>> => {
		const response = await api.post<RegisterOutput>('/user/v1/register', input);

		return response;
	},
};
