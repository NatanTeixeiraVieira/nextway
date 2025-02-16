import { fetcher } from '@/utils/fetcher';
import { loginService } from '../../login.service';

jest.mock('@/utils/fetcher');

describe('loginService unit tests', () => {
	it('should login user', async () => {
		const mockResponse = { data: { success: true } };

		(fetcher as jest.Mock).mockResolvedValue(mockResponse);

		const input = {
			email: 'email@test.com',
			password: '12345678',
		};

		const output = await loginService.login(input);

		expect(fetcher).toHaveBeenCalledTimes(1);
		expect(fetcher).toHaveBeenCalledWith('/user/v1/login', {
			method: 'POST',
			body: input,
		});
		expect(output).toStrictEqual(mockResponse);
	});
});
