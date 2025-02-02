import type { z } from 'zod';
import type { registerFormSchema } from '../schemas/register-form.schema';

export type RegisterFormData = z.infer<typeof registerFormSchema>;
