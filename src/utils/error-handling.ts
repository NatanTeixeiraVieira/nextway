import type { AppError } from '@/errors/error';

export const requestErrorHandling = (
	error: AppError,
	defaultMessage: string,
) => {
	if (error.statusCode && error.statusCode !== 500) return error.message;

	return defaultMessage;
};
