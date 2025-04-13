import { api } from '@/utils/api';
import { registerService } from '../../register.service';

jest.mock('@/utils/api');

describe('registerService unit tests', () => {
	it('should register user', async () => {
		const mockResponse = { data: { success: true } };

		(api.post as jest.Mock).mockResolvedValue(mockResponse);

		const input = {
			email: 'email@test.com',
			name: 'test name',
			password: '12345678',
		};

		const output = await registerService.register(input);

		expect(api.post).toHaveBeenCalledTimes(1);
		expect(api.post).toHaveBeenCalledWith('/user/v1/register', input);
		expect(output).toStrictEqual(mockResponse);
	});
});
