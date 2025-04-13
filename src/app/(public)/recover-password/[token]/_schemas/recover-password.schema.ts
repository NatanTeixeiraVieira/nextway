import { commonFieldSchema } from '@/validations/utils';
import { z } from 'zod';

// TODO: Create a global schema to password and recover password
export const recoverPasswordSchema = z
	.object({
		password: commonFieldSchema('A senha é obrigatória.').min(
			8,
			'A senha deve ter no mínimo 8 caracteres.',
		),
		confirmPassword: commonFieldSchema('A confirmação de senha é obrigatória.'),
	})
	.superRefine((data, ctx) => {
		if (data.password !== data.confirmPassword) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'As senhas devem ser iguais.',
				path: ['confirmPassword'],
			});
		}
	});
