import { fetcher, type FetcherResponse } from '@/utils/fetcher';
import type {
	ChangePasswordInput,
	ChangePasswordOutput,
	RecoverPasswordService,
	VerifyTokenInput,
	VerifyTokenOutput,
} from '../types/recover-password.type';

export const recoverPasswordService: RecoverPasswordService = {
	verifyToken: async (
		input: VerifyTokenInput,
	): Promise<FetcherResponse<VerifyTokenOutput>> => {
		const response = await fetcher<VerifyTokenOutput>(
			'/user/v1/recover-password/verify-token',
			{
				method: 'POST',
				body: input,
			},
		);

		return response;
	},

	changePassword: async (
		input: ChangePasswordInput,
	): Promise<FetcherResponse<ChangePasswordOutput>> => {
		const response = await fetcher<ChangePasswordOutput>(
			'/user/v1/recover-password/change-password',
			{
				method: 'POST',
				body: input,
			},
		);

		return response;
	},
};
