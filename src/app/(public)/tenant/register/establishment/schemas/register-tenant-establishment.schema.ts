import { commonFieldSchema } from '@/validations/utils';
import { z } from 'zod';

export const registerTenantEstablishmentSchema = z.object({
	// TODO Add cnpj number validation
	cnpj: commonFieldSchema('O CNPJ é obrigatório.'),
	corporateReason: commonFieldSchema('A Razão social é obrigatória.'),
	// corporateReason: commonFieldSchema('A Razão social é obrigatória.'),
	establishmentName: commonFieldSchema(
		'O nome do estabelecimento é obrigatório.',
	),
	establishmentPhoneNumber: commonFieldSchema(
		'O telefone do estabelecimento é obrigatório.',
	).length(19, 'Telefone inválido'),
	slug: commonFieldSchema('A URL do estabelecimento é obrigatória.')
		.min(3, 'A URL deve ter no mínimo 3 caracteres.')
		.max(50, 'A URL deve ter no máximo 50 caracteres.')
		.regex(
			/^[a-z0-9]+(?:-[a-z0-9]+)*$/,
			'A URL deve conter apenas letras minúsculas, números e hífens, sem espaços ou caracteres especiais.',
		),
});
