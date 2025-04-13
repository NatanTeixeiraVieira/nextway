import { commonFieldSchema } from '@/validations/utils';
import { z } from 'zod';

export const forgotPasswordSchema = z.object({
	email: commonFieldSchema('O email é obrigatório.').email('Email inválido.'),
});
