import type { z } from 'zod';
import type { registerTenantResponsibleSchema } from '../_schemas/register-tenant-responsible.schema';

export type RegisterTenantResponsibleFormData = z.infer<
	typeof registerTenantResponsibleSchema
>;
