import type { FetcherResponse } from '@/utils/api';

export type GetInfosByCnpjResponse = {
	corporateReason: string;
};

export type CnpjService = {
	getInfosByCnpj: (
		cnpj: string,
	) => Promise<FetcherResponse<GetInfosByCnpjResponse>>;
};
