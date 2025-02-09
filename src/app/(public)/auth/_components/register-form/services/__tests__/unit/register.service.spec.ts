import { fetcher } from '@/utils/fetcher';
import { registerService } from '../../register.service';

jest.mock('@/utils/fetcher');

describe('registerService unit tests', () => {
	it('should register user', async () => {
		const mockResponse = { data: { success: true } };

		(fetcher as jest.Mock).mockResolvedValue(mockResponse);

		const input = {
			email: 'email@test.com',
			name: 'test name',
			password: '12345678',
		};

		const output = await registerService.register(input);

		expect(fetcher).toHaveBeenCalledTimes(1);
		expect(fetcher).toHaveBeenCalledWith('/user/v1/register', {
			method: 'POST',
			body: input,
		});
		expect(output).toStrictEqual(mockResponse);
	});
});
