import { z } from 'zod';
import { commonFieldSchema, isValidCPF } from './utils';

export const authSchema = z.object({
	email: commonFieldSchema('O email é obrigatório.').email('Email inválido.'),
	password: commonFieldSchema('A senha é obrigatória.').min(
		8,
		'A senha deve ter no mínimo 8 caracteres.',
	),
});

export const cpf = z.object({
	cpf: commonFieldSchema('O CPF é obrigatório.')
		.length(14, 'CPF inválido')
		.refine((value) => isValidCPF(value), 'CPF inválido.'),
});

// Utility function to get schema keys as an array
export const getSchemaKeys = <Shape extends z.ZodRawShape>(
	schema: z.ZodObject<Shape>,
) => {
	return Object.keys(schema.keyof().Values);
};
