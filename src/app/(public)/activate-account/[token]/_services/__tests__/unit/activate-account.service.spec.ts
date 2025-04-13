import { api } from '@/utils/api';
import type { ActivateAccountInput } from '../../../_types/activate-account.type';
import { activateAccountService } from '../../activate-account.service';

jest.mock('@/utils/api');

describe('activateAccountService unit tests', () => {
	it('should activateAccount user', async () => {
		const mockResponse = { data: { success: true } };

		(api.post as jest.Mock).mockResolvedValue(mockResponse);

		const input: ActivateAccountInput = {
			token: 'valid_token',
		};

		const output = await activateAccountService.checkEmail(input);

		expect(api.post).toHaveBeenCalledTimes(1);
		expect(api.post).toHaveBeenCalledWith('/user/v1/check-email', input, {
			disableRefresh: true,
		});
		expect(output).toStrictEqual(mockResponse);
	});
});
