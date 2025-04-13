import { AppError } from '@/errors/error';
import { api, type FetcherResponse } from '@/utils/api';
import type {
	ChangePasswordInput,
	ChangePasswordOutput,
	RecoverPasswordService,
	VerifyTokenInput,
	VerifyTokenOutput,
} from '../_types/recover-password.type';

export const recoverPasswordService: RecoverPasswordService = {
	verifyToken: async (
		input: VerifyTokenInput,
	): Promise<FetcherResponse<VerifyTokenOutput>> => {
		const response = await api.post<VerifyTokenOutput>(
			'/user/v1/recover-password/verify-token',
			input,
			{
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
		const response = await api.post<ChangePasswordOutput>(
			'/user/v1/recover-password/change-password',
			input,
			{
				disableRefresh: true,
			},
		);

		return response;
	},
};
