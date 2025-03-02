import type { FetcherResponse } from '@/utils/fetcher';

export type ForgotPasswordService = {
	sendEmail: (
		params: ForgotPasswordInput,
	) => Promise<FetcherResponse<ForgotPasswordOutput>>;
};

export type ForgotPasswordOutput = {
	id: string;
	email: string;
};

export type ForgotPasswordInput = {
	email: string;
};
