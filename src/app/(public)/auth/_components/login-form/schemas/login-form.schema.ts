import { commonFieldSchema } from '@/validations/schemas';
import { z } from 'zod';

export const loginFormSchema = z.object({
	email: commonFieldSchema('O email é obrigatório.').email('Email inválido.'),
	password: commonFieldSchema('A senha é obrigatória.').min(
		8,
		'A senha deve ter no mínimo 8 caracteres.',
	),
});
