import type { z } from 'zod';
import type { registerTenantEstablishmentSchema } from '../schemas/register-tenant-establishment.schema';

export type RegisterTenantEstablishmentFormData = z.infer<
	typeof registerTenantEstablishmentSchema
>;
