import type { AppError } from '@/errors/error';
import { requestErrorHandling } from '@/utils/error-handling';

describe('requestErrorHandling unit tests', () => {
	it('should return error message', () => {
		const errorMock = {
			statusCode: 400,
			message: 'Test error message',
		} as AppError;

		const errorMessage = requestErrorHandling(errorMock, 'Default message');

		expect(errorMessage).toBe(errorMock.message);
	});

	it('should return default error message', () => {
		const errorMock = {
			statusCode: 500,
			message: 'Test error message',
		} as AppError;

		const errorMessage = requestErrorHandling(errorMock, 'Default message');

		expect(errorMessage).toBe('Default message');
	});

	it('should return default error message', () => {
		const errorMock = {
			message: 'Test error message',
		} as AppError;

		const errorMessage = requestErrorHandling(errorMock, 'Default message');

		expect(errorMessage).toBe('Default message');
	});
});
