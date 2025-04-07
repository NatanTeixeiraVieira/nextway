import type { FetcherResponse } from '@/utils/api';

export type LoginService = {
	login: (params: LoginInput) => Promise<FetcherResponse<LoginOutput>>;
};

export type LoginOutput = {
	id: string;
	email: string;
};

export type LoginInput = {
	email: string;
	password: string;
};
