'use server';

import { CookiesName } from '@/constants/cookies';
import { decodeJwt } from 'jose';
import { cookies } from 'next/headers';

export const authenticate = async (token: string) => {
	const cookiesStore = await cookies();
	const decodedJwt = decodeJwt(token);

	if (!decodedJwt.exp) return;

	cookiesStore.set({
		name: CookiesName.ACCESS_TOKEN,
		value: token,
		secure: true,
		httpOnly: true,
		expires: new Date(decodedJwt.exp * 1000),
	});
};
