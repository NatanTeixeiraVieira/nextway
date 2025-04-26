import { api, type FetcherResponse } from '@/utils/api';
import type {
	RegisterTenantConfirmationInput,
	RegisterTenantConfirmationOutput,
	RegisterTenantConfirmationService,
} from '../_types/register-tenant-confirmation.type';

export const registerTenantConfirmationService: RegisterTenantConfirmationService =
	{
		checkEmail: async (
			input: RegisterTenantConfirmationInput,
		): Promise<FetcherResponse<RegisterTenantConfirmationOutput>> => {
			const response = await api.post<RegisterTenantConfirmationOutput>(
				'/tenant/v1/check-email',
				input,
				{
					disableRefresh: true,
				},
			);

			return response;
		},
	};
