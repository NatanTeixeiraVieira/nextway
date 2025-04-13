import { z } from 'zod';

export const commonFieldSchema = (requiredMessage: string) =>
	z.string({ required_error: requiredMessage }).trim().min(1, requiredMessage);

export const authSchema = z.object({
	email: commonFieldSchema('O email é obrigatório.').email('Email inválido.'),
	password: commonFieldSchema('A senha é obrigatória.').min(
		8,
		'A senha deve ter no mínimo 8 caracteres.',
	),
});
