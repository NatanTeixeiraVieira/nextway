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
	options?: Options,
): Promise<FetcherResponse<Response>> => {
	const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api${url}`, {
		...options,
		body: JSON.stringify(options?.body),
		headers: {
			'Content-Type': 'application/json',
			...options?.headers,
		},
	});

	const response = await res.json();

	return {
		data: response,
	};
};
