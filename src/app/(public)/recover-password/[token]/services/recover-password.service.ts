import { AppError } from '@/errors/error';
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
				disableRefresh: true,
			},
		);

		if (!response.data?.isValid) {
			throw new AppError(
				401,
				'Token inválido',
				'O token de recuperação de senha é inválido.',
			);
		}

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
				disableRefresh: true,
			},
		);
		console.log('🚀 ~ response:', response);

		return response;
	},
};
