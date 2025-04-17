import type { z } from 'zod';
import type { registerTenantLoginSchema } from '../_schemas/register-tenant-login.schema';

export type RegisterTenantLoginFormData = z.infer<
	typeof registerTenantLoginSchema
>;
