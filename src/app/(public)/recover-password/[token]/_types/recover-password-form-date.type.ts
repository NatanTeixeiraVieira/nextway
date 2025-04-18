import type { z } from 'zod';
import type { recoverPasswordSchema } from '../_schemas/recover-password.schema';

export type RecoverPasswordFormData = z.infer<typeof recoverPasswordSchema>;
