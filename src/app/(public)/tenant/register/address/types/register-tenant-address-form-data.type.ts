import type { z } from 'zod';
import type { registerTenantAddressSchema } from '../schemas/register-tenant-address.schema';

export type RegisterTenantAddressFormData = z.infer<
	typeof registerTenantAddressSchema
>;
