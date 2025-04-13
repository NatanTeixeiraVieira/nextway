import { commonFieldSchema } from '@/validations/utils';
import { z } from 'zod';

export const registerTenantEstablishmentSchema = z.object({
	// TODO Add cnpj number validation
	cnpj: commonFieldSchema('O CNPJ é obrigatório.'),
	corporateReason: z.string().optional(),
	// corporateReason: commonFieldSchema('A Razão social é obrigatória.'),
	establishmentName: commonFieldSchema(
		'O nome do estabelecimento é obrigatório.',
	),
	establishmentPhoneNumber: commonFieldSchema(
		'O telefone do estabelecimento é obrigatório.',
	).length(19, 'Telefone inválido'),
});
