import type { Ufs } from '@/utils/mappers';

export type ZipcodeServiceResponse = {
	zipcode: string;
	uf: Ufs;
	state: string;
	city: string;
	neighborhood: string;
	street: string;
	location: {
		coordinates: {
			longitude: string;
			latitude: string;
		};
	};
};
