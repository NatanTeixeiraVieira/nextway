import { z } from 'zod';

export const commonFieldSchema = (requiredMessage: string) =>
	z.string({ required_error: requiredMessage }).trim().min(1, requiredMessage);
