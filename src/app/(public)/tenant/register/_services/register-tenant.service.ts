import { api, type FetcherResponse } from '@/utils/api';
import type {
	RegisterTenantInput,
	RegisterTenantOutput,
	RegisterTenantService,
} from '../_types/register-tenant.type';

export const registerTenantService: RegisterTenantService = {
	register: async (
		input: RegisterTenantInput,
	): Promise<FetcherResponse<RegisterTenantOutput>> => {
		const response = await api.post<RegisterTenantOutput>(
			'/tenant/v1/register',
			input,
		);

		return response;
	},
};
