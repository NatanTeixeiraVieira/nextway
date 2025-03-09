import { api, type FetcherResponse } from '@/utils/api';
import type {
	ActivateAccountInput,
	ActivateAccountOutput,
	ActivateAccountService,
} from '../types/activate-account.type';

export const activateAccountService: ActivateAccountService = {
	checkEmail: async (
		input: ActivateAccountInput,
	): Promise<FetcherResponse<ActivateAccountOutput>> => {
		const response = await api.post<ActivateAccountOutput>(
			'/user/v1/check-email',
			input,
			{
				disableRefresh: true,
			},
		);

		return response;
	},
};
