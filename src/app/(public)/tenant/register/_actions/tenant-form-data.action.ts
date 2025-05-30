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

type SetFormDataActionData = RegisterTenatFormData;

export const setFormDataCookies = async (data: SetFormDataActionData) => {
	const [cookieStore, formData] = await Promise.all([
		cookies(),
		getFormDataCookies(),
	]);

	cookieStore.set('register-tenant', JSON.stringify({ ...formData, ...data }), {
		maxAge: 60 * 30, // 30 minutes
		httpOnly: true,
	});
};

export const resetFormDataCookies = async () => {
	const cookiesStore = await cookies();
	cookiesStore.delete('register-tenant');
};
