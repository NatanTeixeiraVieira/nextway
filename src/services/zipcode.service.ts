import type { ZipcodeServiceResponse } from '@/types/zipcode-service.type';
import { api, type FetcherResponse } from '@/utils/api';
import { ufToStateName, type Ufs } from '@/utils/mappers';

type ZipcodeApiResponse = {
	cep: string;
	address_type: string;
	address_name: string;
	address: string;
	state: Ufs;
	district: string;
	lat: string;
	lng: string;
	city: string;
	city_ibge: string;
	ddd: string;
};

export const getInfosByZipcode = async (
	zipcode: string,
): Promise<FetcherResponse<ZipcodeServiceResponse>> => {
	const response = await api.get<ZipcodeApiResponse>(`/${zipcode}`, {
		disableRefresh: true,
		baseUrl: process.env.NEXT_PUBLIC_ZIPCODE_API_URL,
		credentials: 'omit',
	});

	if (!response.data) {
		return {
			data: null,
			response: response.response,
		};
	}

	const { cep, state: uf, district, lat, address, lng, city } = response.data;

	const state = ufToStateName(uf);

	return {
		data: {
			city,
			uf,
			zipcode: cep,
			state,
			neighborhood: district,
			street: address,
			location: {
				coordinates: {
					latitude: lat,
					longitude: lng,
				},
			},
		},
		response: response.response,
	};
};
