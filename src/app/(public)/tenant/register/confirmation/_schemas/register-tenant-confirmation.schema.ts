import { z } from 'zod';

export const registerTenantCofirmationSchema = z.object({
	pin: z.string().length(6, {
		message: 'O código precisa conter 6 dígitos.',
	}),
});
