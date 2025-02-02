import { commonFieldSchema } from '@/validations/schemas';
import { authSchema } from '../../../schemas/auth.schema';

export const registerFormSchema = authSchema.extend({
	name: commonFieldSchema('O nome é obrigatório.').min(
		3,
		'O nome deve ter no mínimo 3 caracteres.',
	),
});
