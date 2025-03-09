import { AppError } from '@/errors/error';
import { api, type Api } from '@/utils/api';

describe('api unit tests', () => {
	const getMock = jest.fn().mockReturnValue('1');
	let sut: Api;

	beforeEach(() => {
		jest.clearAllMocks();
		sut = api;
	});

	it('should handle GET request successfully', async () => {
		const mockResponse = { data: { success: true } };
		global.fetch = jest.fn().mockResolvedValue({
			ok: true,
			json: jest.fn().mockResolvedValue(mockResponse),
			headers: {
				get: getMock,
			},
		});

		const response = await sut.get('/test-endpoint');

		expect(global.fetch).toHaveBeenCalledWith(
			`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/test-endpoint`,
			{
				credentials: 'include',
			},
		);
		expect(response.data).toStrictEqual(mockResponse);
	});

	it('should handle POST request successfully', async () => {
		const mockResponse = { data: { success: true } };
		global.fetch = jest.fn().mockResolvedValue({
			ok: true,
			json: jest.fn().mockResolvedValue(mockResponse),
			headers: {
				get: getMock,
			},
		});

		const response = await sut.post('/test-endpoint', { key: 'value' });

		expect(global.fetch).toHaveBeenCalledWith(
			`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/test-endpoint`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ key: 'value' }),
				credentials: 'include',
			},
		);
		expect(response.data).toStrictEqual(mockResponse);
	});

	it('should handle PUT request successfully', async () => {
		const mockResponse = { data: { success: true } };
		global.fetch = jest.fn().mockResolvedValue({
			ok: true,
			json: jest.fn().mockResolvedValue(mockResponse),
			headers: {
				get: getMock,
			},
		});

		const response = await sut.put('/test-endpoint', { key: 'value' });

		expect(global.fetch).toHaveBeenCalledWith(
			`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/test-endpoint`,
			{
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ key: 'value' }),
				credentials: 'include',
			},
		);
		expect(response.data).toStrictEqual(mockResponse);
	});

	it('should handle DELETE request successfully', async () => {
		const mockResponse = { data: { success: true } };
		global.fetch = jest.fn().mockResolvedValue({
			ok: true,
			json: jest.fn().mockResolvedValue(mockResponse),
			headers: {
				get: getMock,
			},
		});

		const response = await sut.delete('/test-endpoint');

		expect(global.fetch).toHaveBeenCalledWith(
			`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/test-endpoint`,
			{
				method: 'DELETE',
				credentials: 'include',
			},
		);
		expect(response.data).toStrictEqual(mockResponse);
	});

	it('should handle 401 error and refresh token', async () => {
		const mockResponse = { data: { success: true } };
		global.fetch = jest
			.fn()
			.mockResolvedValueOnce({
				ok: false,
				status: 401,
				headers: {
					get: getMock,
				},
			})
			.mockResolvedValueOnce({ ok: true })
			.mockResolvedValueOnce({
				ok: true,
				json: jest.fn().mockResolvedValue(mockResponse),
				headers: {
					get: getMock,
				},
			});

		const response = await sut.get('/test-endpoint', {});

		expect(global.fetch).toHaveBeenCalledTimes(3);
		expect(global.fetch).toHaveBeenNthCalledWith(
			1,
			`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/test-endpoint`,
			{
				credentials: 'include',
			},
		);
		expect(global.fetch).toHaveBeenNthCalledWith(
			2,
			`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user/v1/refresh`,
			expect.objectContaining({
				method: 'POST',
				credentials: 'include',
			}),
		);
		expect(global.fetch).toHaveBeenNthCalledWith(
			3,
			`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/test-endpoint`,
			{
				credentials: 'include',
			},
		);
		expect(response.data).toStrictEqual(mockResponse);
	});

	it('should throw an error when response is not ok', async () => {
		const errorData = {
			statusCode: 500,
			error: 'Test error',
			message: 'test error message',
		};

		global.fetch = jest.fn().mockResolvedValue({
			ok: false,
			json: jest.fn().mockResolvedValue(errorData),
			headers: {
				get: getMock,
			},
		});

		await expect(sut.get('/test-endpoint')).rejects.toThrow(
			new AppError(errorData.statusCode, errorData.error, errorData.message),
		);
	});
});
