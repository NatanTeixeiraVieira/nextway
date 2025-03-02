import { type FetcherResponse, fetcher } from '@/utils/fetcher';
import type {
	ForgotPasswordInput,
	ForgotPasswordOutput,
	ForgotPasswordService,
} from '../types/forgot-password.type';

export const forgotPasswordService: ForgotPasswordService = {
	sendEmail: async (
		input: ForgotPasswordInput,
	): Promise<FetcherResponse<ForgotPasswordOutput>> => {
		const response = await fetcher<ForgotPasswordOutput>(
			'/user/v1/recover-password/send-email',
			{
				method: 'POST',
				body: input,
			},
		);

		return response;
	},
};
