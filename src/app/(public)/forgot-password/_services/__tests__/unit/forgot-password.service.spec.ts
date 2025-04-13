import { api } from '@/utils/api';
import type { ForgotPasswordInput } from '../../../types/forgot-password.type';
import { forgotPasswordService } from '../../forgot-password.service';

jest.mock('@/utils/api');

describe('activateAccountService unit tests', () => {
	it('should activateAccount user', async () => {
		const mockResponse = { data: { success: true } };

		(api.post as jest.Mock).mockResolvedValue(mockResponse);

		const input: ForgotPasswordInput = {
			email: 'email@email.com',
		};

		const output = await forgotPasswordService.sendEmail(input);

		expect(api.post).toHaveBeenCalledTimes(1);
		expect(api.post).toHaveBeenCalledWith(
			'/user/v1/recover-password/send-email',
			input,
		);
		expect(output).toStrictEqual(mockResponse);
	});
});
