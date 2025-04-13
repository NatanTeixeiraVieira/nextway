import { commonFieldSchema } from '@/validations/utils';
import { z } from 'zod';
import { authSchema } from '../../../schemas/auth.schema';

export const registerFormSchema = authSchema
	.extend({
		name: commonFieldSchema('O nome é obrigatório.').min(
			3,
			'O nome deve ter no mínimo 3 caracteres.',
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
