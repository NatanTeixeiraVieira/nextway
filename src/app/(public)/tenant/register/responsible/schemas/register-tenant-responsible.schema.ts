import { cpf } from '@/validations/schemas';
import { commonFieldSchema } from '@/validations/utils';
import { z } from 'zod';

export const registerTenantResponsibleSchema = z
	.object({
		name: commonFieldSchema('O nome é obrigatório.').min(
			2,
			'O nome precisa ter no mínimo 8 caracteres.',
		),
		responsiblePhoneNumber: commonFieldSchema(
			'O telefone é obrigatório.',
		).length(19, 'Telefone inválido'),
	})
	.merge(cpf);
