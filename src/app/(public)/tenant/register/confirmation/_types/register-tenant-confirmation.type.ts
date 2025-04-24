import type { FetcherResponse } from '@/utils/api';

export type RegisterTenantConfirmationService = {
	checkEmail: (
		input: RegisterTenantConfirmationInput,
	) => Promise<FetcherResponse<RegisterTenantConfirmationOutput>>;
};

export type RegisterTenantConfirmationInput = {
	email: string;
	verifyEmailCode: string;
};

export type RegisterTenantConfirmationOutput = {
	email: string;
};
