import type { z } from 'zod';
import type { loginFormSchema } from '../_schemas/login-form.schema';

export type LoginFormData = z.infer<typeof loginFormSchema>;
