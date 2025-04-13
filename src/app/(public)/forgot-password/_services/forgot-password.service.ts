import { api, type FetcherResponse } from '@/utils/api';
import type {
	ForgotPasswordInput,
	ForgotPasswordOutput,
	ForgotPasswordService,
} from '../types/forgot-password.type';

export const forgotPasswordService: ForgotPasswordService = {
	sendEmail: async (
		input: ForgotPasswordInput,
	): Promise<FetcherResponse<ForgotPasswordOutput>> => {
		const response = await api.post<ForgotPasswordOutput>(
			'/user/v1/recover-password/send-email',
			input,
		);

		return response;
	},
};
