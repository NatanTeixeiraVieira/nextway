import { commonFieldSchema } from '@/validations/schemas';
import { z } from 'zod';

export const registerTenantResponsibleSchema = z.object({
	name: commonFieldSchema('O nome completo é obrigatório.')
		.min(2, 'O nome completo precisa ter no mínimo 8 caracteres.')
		.refine(
			(value) => value.trim().split(/\s+/).length >= 2,
			'O nome completo precisa conter pelo menos dois nomes.',
		),
	// TODO Add cpf number validation
	cpf: commonFieldSchema('O CPF é obrigatório.').length(14, 'CPF inválido'),
	responsiblePhoneNumber: commonFieldSchema('O telefone é obrigatório.').length(
		19,
		'Telefone inválido',
	),
});
