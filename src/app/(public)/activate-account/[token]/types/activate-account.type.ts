import type { FetcherResponse } from '@/utils/fetcher';

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
