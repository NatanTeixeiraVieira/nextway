import { fetcher } from '@/utils/fetcher';
import type { ActivateAccountInput } from '../../../types/activate-account.type';
import { activateAccountService } from '../../activate-account.service';

jest.mock('@/utils/fetcher');

describe('activateAccountService unit tests', () => {
	it('should activateAccount user', async () => {
		const mockResponse = { data: { success: true } };

		(fetcher as jest.Mock).mockResolvedValue(mockResponse);

		const input: ActivateAccountInput = {
			token: 'valid_token',
		};

		const output = await activateAccountService.checkEmail(input);

		expect(fetcher).toHaveBeenCalledTimes(1);
		expect(fetcher).toHaveBeenCalledWith('/user/v1/check-email', {
			method: 'POST',
			body: input,
		});
		expect(output).toStrictEqual(mockResponse);
	});
});
