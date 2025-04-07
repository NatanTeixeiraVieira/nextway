export type RegisterTenatFormData = {
	// Address
	zipcode: string;
	state: string;
	city: string;
	neighborhood: string;
	street: string;
	number: string;
	complement: string;

	// Responsible
	name: string;
	cpf: string;
	responsiblePhoneNumber: string;

	// Establishment
	cnpj: string;
	establishmentName: string;
	establishmentPhoneNumber: string;

	// Login
	email: string;
	password: string;

	// Confirmation
	confirmationCode: string[];
};
