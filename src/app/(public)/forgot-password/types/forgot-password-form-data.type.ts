import type { z } from 'zod';
import type { forgotPasswordSchema } from '../_schemas/forgot-password.schema';

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
