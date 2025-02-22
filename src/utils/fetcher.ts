import { AppError } from '@/errors/error';

export type FetcherResponse<R = unknown> = {
	data: R | null;
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
	const defaultHeaders: HeadersInit = {
		'Content-Type': 'application/json',
	};

	if (!options?.body) {
		// biome-ignore lint/performance/noDelete: It's necessary remove content type case undefined
		delete defaultHeaders['Content-Type'];
	}

	const headers: HeadersInit = {
		...defaultHeaders,
		...options.headers,
	};

	const init: RequestInit = {
		...options,
		body: JSON.stringify(options?.body),
		headers,
	};

	if (!init.body) {
		// biome-ignore lint/performance/noDelete: It's necessary remove the body case undefined
		delete init.body;
	}

	if (Object.keys(init.headers ?? {}).length === 0) {
		// biome-ignore lint/performance/noDelete: It's necessary remove the headers case undefined
		delete init.headers;
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

	if (res.headers.get('content-length') === '0') {
		return {
			data: null,
		};
	}

	const response = await res.json();

	return {
		data: response,
	};
};
