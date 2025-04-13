import type { z } from 'zod';
import type { registerTenantCofirmationSchema } from '../_schemas/register-tenant-confirmation.schema';

export type RegisterTenantConfirmationFormData = z.infer<
	typeof registerTenantCofirmationSchema
>;
