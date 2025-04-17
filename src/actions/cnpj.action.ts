'use server';

import { cnpjService } from '@/services/cnpj.service';
import type { GetInfosByCnpjResponse } from '@/types/cnpj-service.type';

export const getInfosByCnpjAction = async (
	cnpj: string,
): Promise<GetInfosByCnpjResponse | null> => {
	const response = await cnpjService.getInfosByCnpj(cnpj);

	return response.data;
};
