import type { FetcherResponse } from '@/utils/fetcher';

export type RecoverPasswordService = {
	verifyToken: (
		params: VerifyTokenInput,
	) => Promise<FetcherResponse<VerifyTokenOutput>>;

	changePassword: (
		params: ChangePasswordInput,
	) => Promise<FetcherResponse<ChangePasswordOutput>>;
};

export type VerifyTokenInput = {
	token: string;
};

export type VerifyTokenOutput = {
	isValid: boolean;
};

export type ChangePasswordInput = {
	changePasswordToken: string;
	password: string;
};

export type ChangePasswordOutput = undefined;
