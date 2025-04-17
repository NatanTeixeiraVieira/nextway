'use server';

import { cookies } from 'next/headers';
import type { RegisterTenatFormData } from '../_types/register-tenant.type';

export const getFormDataCookies = async () => {
	const cookiesStore = await cookies();
	const data: string | undefined = cookiesStore.get('register-tenant')?.value;
	if (!data) return null;
	const parsedData: RegisterTenatFormData = JSON.parse(data);
	return parsedData;
};

export const setFormDataCookies = async (
	data: Partial<RegisterTenatFormData>,
) => {
	const [cookieStore, formData] = await Promise.all([
		cookies(),
		getFormDataCookies(),
	]);

	cookieStore.set('register-tenant', JSON.stringify({ ...formData, ...data }));
};
