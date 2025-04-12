const onlyDigitsLimited = (value: string, limit: number) => {
	return value.replace(/\D/g, '').slice(0, limit);
};

export const zipcodeMask = (zipcode: string) => {
	const value = onlyDigitsLimited(zipcode, 8);

	const formattedZipcode = value.replace(/(\d{5})(\d)/, '$1-$2');
	return formattedZipcode;
};

export const cpfMask = (cpf: string): string => {
	const value = onlyDigitsLimited(cpf, 11);

	return value
		.replace(/\D/g, '')
		.replace(/(\d{3})(\d)/, '$1.$2')
		.replace(/(\d{3})(\d)/, '$1.$2')
		.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
};

export const phoneNumberMask = (phoneNumber: string): string => {
	const value = onlyDigitsLimited(phoneNumber, 13);

	return value
		.replace(/\D/g, '')
		.replace(/^(\d{2})(\d)/, '+$1 ($2')
		.replace(/(\d{2})(\d)/, '$1) $2')
		.replace(/(\d{5})(\d)/, '$1-$2');
};

export const cnpjMask = (cnpj: string): string => {
	const value = onlyDigitsLimited(cnpj, 14);

	return value
		.replace(/\D/g, '')
		.replace(/(\d{2})(\d)/, '$1.$2')
		.replace(/(\d{3})(\d)/, '$1.$2')
		.replace(/(\d{3})(\d{1,4})/, '$1/$2')
		.replace(/(\d{4})(\d{1,2})$/, '$1-$2');
};
