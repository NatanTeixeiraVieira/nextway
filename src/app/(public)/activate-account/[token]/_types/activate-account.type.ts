import type { FetcherResponse } from '@/utils/api';

export type ActivateAccountService = {
	checkEmail: (
		input: ActivateAccountInput,
	) => Promise<FetcherResponse<ActivateAccountOutput>>;
};

export type ActivateAccountInput = {
	token: string;
};

export type ActivateAccountOutput = {
	id: string;
	email: string;
};
