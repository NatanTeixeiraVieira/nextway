export type RegisterTenantFormDataKeys = keyof Partial<RegisterTenatFormData>;

export type RegisterTenatFormData = {
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
	};

	login: {
		email: string;
		password: string;
	};

	confirmation: {
		code: string[];
	};
};
