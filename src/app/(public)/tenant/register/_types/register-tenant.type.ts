import type { FetcherResponse } from '@/utils/api';

export type RegisterTenantFormDataKeys = keyof Partial<RegisterTenatFormData>;

export type RegisterTenatFormData = Partial<{
	address: {
		zipcode: string;
		state: string;
		city: string;
		neighborhood: string;
		street: string;
		number: string;
		complement?: string;
	};

	responsible: {
		name: string;
		cpf: string;
		responsiblePhoneNumber: string;
	};

	establishment: {
		cnpj: string;
		corporateReason: string;
		establishmentName: string;
		establishmentPhoneNumber: string;
		slug: string;
	};

	login: {
		email: string;
	};

	confirmation: {
		code: string[];
	};
}>;

export type RegisterTenantService = {
	register: (
		params: RegisterTenantInput,
	) => Promise<FetcherResponse<RegisterTenantOutput>>;
};

export type RegisterTenantOutput = {
	id: string;
};

export type RegisterTenantInput = {
	// Address
	zipcode: string;
	streetName: string;
	neighborhood: string;
	streetNumber: string;
	complement?: string;

	// Responsible infos
	responsibleName: string;
	responsibleCpf: string;
	responsiblePhoneNumber: string;

	// Establishment infos
	cnpj: string;
	establishmentName: string;
	establishmentPhoneNumber: string;
	slug: string;

	// Login infos
	email: string;
	password: string;
};
