export const zipcodeMask = (zipcode: string) => {
	const value = zipcode.replace(/\D/g, '').slice(0, 8);
	const formattedZipcode = value.replace(/(\d{5})(\d)/, '$1-$2');
	return formattedZipcode;
};
