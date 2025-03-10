import { AppError } from '@/errors/error';
import { api } from '@/utils/api';
import type {
	ChangePasswordInput,
	VerifyTokenInput,
} from '../../../types/recover-password.type';
import { recoverPasswordService } from '../../recover-password.service';

jest.mock('@/utils/api');

describe('recoverPasswordService unit tests', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});
	it('should verify user token', async () => {
		const mockResponse = { data: { isValid: true } };

		(api.post as jest.Mock).mockResolvedValue(mockResponse);

		const input: VerifyTokenInput = {
			token: 'test_token',
		};

		const output = await recoverPasswordService.verifyToken(input);

		expect(api.post).toHaveBeenCalledTimes(1);
		expect(api.post).toHaveBeenCalledWith(
			'/user/v1/recover-password/verify-token',
			input,
			{
				disableRefresh: true,
			},
		);
		expect(output).toStrictEqual(mockResponse);
	});

	it('should change user password successfully', async () => {
		const mockResponse = { data: { success: true } };

		(api.post as jest.Mock).mockResolvedValue(mockResponse);

		const input: ChangePasswordInput = {
			changePasswordToken: 'test_token',
			password: 'new_password',
		};

		const output = await recoverPasswordService.changePassword(input);

		expect(api.post).toHaveBeenCalledTimes(1);
		expect(api.post).toHaveBeenCalledWith(
			'/user/v1/recover-password/change-password',
			input,
			{
				disableRefresh: true,
			},
		);
		expect(output).toStrictEqual(mockResponse);
	});

	it('should throw an error if change password fails', async () => {
		const errorResponse = {
			statusCode: 400,
			error: 'Bad Request',
			message: 'Invalid token or password',
		};

		(api.post as jest.Mock).mockRejectedValue(
			new AppError(
				errorResponse.statusCode,
				errorResponse.error,
				errorResponse.message,
			),
		);

		const input: ChangePasswordInput = {
			changePasswordToken: 'test_token',
			password: 'new_password',
		};

		await expect(recoverPasswordService.changePassword(input)).rejects.toThrow(
			new AppError(
				errorResponse.statusCode,
				errorResponse.error,
				errorResponse.message,
			),
		);

		expect(api.post).toHaveBeenCalledTimes(1);
		expect(api.post).toHaveBeenCalledWith(
			'/user/v1/recover-password/change-password',
			input,
			{
				disableRefresh: true,
			},
		);
	});
});
