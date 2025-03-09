import { api } from '@/utils/api';
import { loginService } from '../../login.service';

jest.mock('@/utils/api');

describe('loginService unit tests', () => {
	it('should login user', async () => {
		const mockResponse = { data: { success: true } };

		(api.post as jest.Mock).mockResolvedValue(mockResponse);

		const input = {
			email: 'email@test.com',
			password: '12345678',
		};

		const output = await loginService.login(input);

		expect(api.post).toHaveBeenCalledTimes(1);
		expect(api.post).toHaveBeenCalledWith('/user/v1/login', input);
		expect(output).toStrictEqual(mockResponse);
	});
});
