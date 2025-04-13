import type { FetcherResponse } from '@/utils/api';

export type RegisterService = {
	register: (params: RegisterInput) => Promise<FetcherResponse<RegisterOutput>>;
};

export type RegisterOutput = {
	id: string;
};

export type RegisterInput = {
	name: string;
	email: string;
	password: string;
};
