import type { z } from 'zod';
import type { registerFormSchema } from '../_schemas/register-form.schema';

export type RegisterFormData = z.infer<typeof registerFormSchema>;
