import { AppError } from '@/errors/error';

export type FetcherResponse<R = unknown> = {
	data: R;
};

type Methods = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'OPTIONS' | 'HEAD';

type Options = Omit<RequestInit, 'body' | 'method'> & {
	body?: Record<string, unknown>;
	method: Methods;
};

export const fetcher = async <Response = unknown>(
	url: string,
	options: Options,
): Promise<FetcherResponse<Response>> => {
	const init: RequestInit = {
		...options,
		body: JSON.stringify(options?.body),
		headers: {
			'Content-Type': 'application/json',
			...options.headers,
		},
	};

	if (!init.body) {
		// biome-ignore lint/performance/noDelete: It's necessary remove the body if undefined
		delete init.body;
	}

	const res = await fetch(
		`${process.env.NEXT_PUBLIC_API_BASE_URL}/api${url}`,
		init,
	);

	if (!res.ok) {
		const errorData = await res.json();
		throw new AppError(
			errorData.statusCode,
			errorData.error,
			errorData.message,
		);
	}

	const response = await res.json();

	return {
		data: response,
	};
};
