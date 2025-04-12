import type { RegisterTenatFormData } from '../types/register-tenant.type';

export const useTenantFormData = () => {
	const getFormData = () => {
		const storedData = sessionStorage.getItem('register-tenant');
		if (!storedData) return;

		const parsedData: RegisterTenatFormData = JSON.parse(storedData);
		return parsedData;
	};

	return { getFormData };
};
