import { commonFieldSchema } from '@/validations/schemas';
import { z } from 'zod';

export const forgotPasswordSchema = z.object({
	email: commonFieldSchema('O email é obrigatório.').email('Email inválido.'),
});
