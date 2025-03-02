import type { z } from 'zod';
import type { forgotPasswordSchema } from '../schemas/forgot-password.schema';

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
