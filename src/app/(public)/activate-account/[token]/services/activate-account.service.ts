import { fetcher, type FetcherResponse } from '@/utils/fetcher';
import type {
	ActivateAccountInput,
	ActivateAccountOutput,
	ActivateAccountService,
} from '../types/activate-account.type';

export const activateAccountService: ActivateAccountService = {
	checkEmail: async (
		input: ActivateAccountInput,
	): Promise<FetcherResponse<ActivateAccountOutput>> => {
		const response = await fetcher<ActivateAccountOutput>(
			'/user/v1/check-email',
			{
				method: 'POST',
				body: input,
			},
		);

		return response;
	},
};
