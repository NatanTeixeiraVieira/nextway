import { commonFieldSchema } from '@/validations/schemas';
import { z } from 'zod';

export const registerTenantAddressSchema = z.object({
	zipcode: commonFieldSchema('O CEP é obrigatório.')
		.min(8, 'O CEP deve ter 8 caracteres.')
		.regex(/^\d{5}-?\d{3}$/, 'Formato inválido.'),
	state: commonFieldSchema('O Estado é obrigatório.'),
	city: commonFieldSchema('A cidade é obrigatória.'),
	neighborhood: commonFieldSchema('O bairro é obrigatório.'),
	street: commonFieldSchema('O nome da rua é obrigatório.'),
	number: commonFieldSchema('O numero é obrigatório.'),
	complement: z
		.string()
		.max(100, 'O complemento deve ter no máximo 100 caracteres.')
		.optional(),
});
