import { AppError } from '@/errors/error';
import { fetcher } from '@/utils/fetcher';

describe('fetcher unit tests', () => {
	it('should throw an error when response is not ok', async () => {
		const errorData = {
			statusCode: 500,
			error: 'Test error',
			message: 'test error message',
		};

		global.fetch = jest.fn().mockResolvedValue({
			ok: false,
			json: jest.fn().mockResolvedValue(errorData),
		});

		await expect(fetcher('/endpoint', { method: 'GET' })).rejects.toThrow(
			new AppError(errorData.statusCode, errorData.error, errorData.message),
		);
	});

	it('should fetch data correctly', async () => {
		global.fetch = jest.fn().mockResolvedValue({
			ok: true,
			json: jest.fn().mockResolvedValue({
				items: [
					{ id: '867b58c1-9cbe-47ac-b6a0-646f1f66bb75', name: 'test name' },
				],
			}),
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
				headers: {
					'Content-Type': 'application/json',
				},
			},
		);
	});

	it('should call fetch with body', async () => {
		global.fetch = jest.fn().mockResolvedValue({
			ok: true,
			json: jest.fn(),
		});

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
});
