import { AppError } from '@/errors/error';
import { fetcher } from '@/utils/fetcher';

describe('fetcher unit tests', () => {
	const getMock = jest.fn().mockReturnValue('1');

	beforeEach(() => {
		jest.clearAllMocks();
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

		await expect(fetcher('/endpoint', { method: 'GET' })).rejects.toThrow(
			new AppError(errorData.statusCode, errorData.error, errorData.message),
		);
	});

	it('should return null when content-length is 0', async () => {
		global.fetch = jest.fn().mockResolvedValue({
			ok: true,
			headers: {
				get: jest.fn().mockReturnValue('0'),
			},
		});

		const response = await fetcher('/test-endpoint', {
			method: 'GET',
		});

		expect(response.data).toBeNull();
	});

	it('should fetch data correctly', async () => {
		global.fetch = jest.fn().mockResolvedValue({
			ok: true,
			json: jest.fn().mockResolvedValue({
				items: [
					{ id: '867b58c1-9cbe-47ac-b6a0-646f1f66bb75', name: 'test name' },
				],
			}),
			headers: {
				get: getMock,
			},
		});

		const response = await fetcher('/test-endpoint', {
			method: 'GET',
		});

		expect(response.data).toStrictEqual({
			items: [
				{ id: '867b58c1-9cbe-47ac-b6a0-646f1f66bb75', name: 'test name' },
			],
		});

		expect(global.fetch).toHaveBeenCalledTimes(1);
		expect(global.fetch).toHaveBeenCalledWith(
			'http://localhost:3333/api/test-endpoint',
			{
				method: 'GET',
			},
		);

		expect(getMock).toHaveBeenCalledTimes(1);
		expect(getMock).toHaveBeenCalledWith('content-length');
	});

	it('should call fetch with body', async () => {
		await fetcher('/test-endpoint', {
			method: 'POST',
			body: {
				id: ' 867b58c1-9cbe-47ac-b6a0-646f1f66bb75',
				name: 'test',
			},
		});

		expect(global.fetch).toHaveBeenCalledWith(
			'http://localhost:3333/api/test-endpoint',
			{
				method: 'POST',
				body: JSON.stringify({
					id: ' 867b58c1-9cbe-47ac-b6a0-646f1f66bb75',
					name: 'test',
				}),
				headers: {
					'Content-Type': 'application/json',
				},
			},
		);
	});

	it('should do the refresh token when the status code is 401', async () => {
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
				json: jest.fn().mockResolvedValue({
					items: [
						{ id: '867b58c1-9cbe-47ac-b6a0-646f1f66bb75', name: 'test name' },
					],
				}),
				headers: {
					get: getMock,
				},
			});

		const response = await fetcher('/test-endpoint', {
			method: 'GET',
		});

		expect(response.data).toStrictEqual({
			items: [
				{ id: '867b58c1-9cbe-47ac-b6a0-646f1f66bb75', name: 'test name' },
			],
		});

		expect(global.fetch).toHaveBeenCalledTimes(3);
		expect(global.fetch).toHaveBeenNthCalledWith(
			1,
			'http://localhost:3333/api/test-endpoint',
			{
				method: 'GET',
			},
		);
		expect(global.fetch).toHaveBeenNthCalledWith(
			2,
			'http://localhost:3333/api/refresh',
		);
		expect(global.fetch).toHaveBeenNthCalledWith(
			3,
			'http://localhost:3333/api/test-endpoint',
			{
				method: 'GET',
			},
		);

		expect(getMock).toHaveBeenCalledTimes(1);
		expect(getMock).toHaveBeenCalledWith('content-length');
	});
});
