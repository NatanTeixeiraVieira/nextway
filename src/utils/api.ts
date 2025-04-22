import { AppError } from '@/errors/error';

let baseUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}`;

export type FetcherResponse<R = unknown> = {
	data: R | null;
	response: Response;
};

type Body = Record<string, unknown>;

type Options = Omit<RequestInit, 'method'> & {
	disableRefresh?: boolean;
	baseUrl?: string;
};

type UpsertOptions = Omit<Options, 'body'>;

export type Api = {
	get: <Res>(url: string, options?: Options) => Promise<FetcherResponse<Res>>;
	post: <Res>(
		url: string,
		body?: Body,
		options?: UpsertOptions,
	) => Promise<FetcherResponse<Res>>;
	put: <Res>(
		url: string,
		body?: Body,
		options?: UpsertOptions,
	) => Promise<FetcherResponse<Res>>;
	delete: <Res>(
		url: string,
		options?: Options,
	) => Promise<FetcherResponse<Res>>;
};

export const api: Api = {
	get: async <Res>(
		url: string,
		options?: Options,
	): Promise<FetcherResponse<Res>> => {
		applyInitialConfigs({ url: options?.baseUrl });

		const init = initHandling(options);
		let res = await fetch(`${baseUrl}${url}`, init);

		if (!options?.disableRefresh) {
			res = await handleAuthError(res, () => fetch(`${baseUrl}${url}`, init));
		}

		return await responseHandling(res);
	},

	post: async <Res>(
		url: string,
		body?: Body,
		options?: UpsertOptions,
	): Promise<FetcherResponse<Res>> => {
		console.log('🚀 ~ options:', options);

		const init = upsertInitHandling(body, options);
		let res = await fetch(`${baseUrl}${url}`, {
			...init,
			method: 'POST',
		});

		if (!options?.disableRefresh) {
			res = await handleAuthError(res, () => fetch(`${baseUrl}${url}`, init));
		}

		return await responseHandling(res);
	},

	put: async <Res>(
		url: string,
		body?: Body,
		options?: UpsertOptions,
	): Promise<FetcherResponse<Res>> => {
		applyInitialConfigs({ url: options?.baseUrl });

		const init = upsertInitHandling(body, options);
		let res = await fetch(`${baseUrl}${url}`, {
			...init,
			method: 'PUT',
		});

		if (!options?.disableRefresh) {
			res = await handleAuthError(res, () => fetch(`${baseUrl}${url}`, init));
		}

		return await responseHandling(res);
	},

	delete: async <Res>(
		url: string,
		options?: Options,
	): Promise<FetcherResponse<Res>> => {
		applyInitialConfigs({ url: options?.baseUrl });

		const deleteOptions: Options = {
			...options,
		};

		if (options?.body) {
			const defaultHeaders: HeadersInit = {
				'Content-Type': 'application/json',
			};

			const headers: HeadersInit = {
				...defaultHeaders,
				...options?.headers,
			};
			deleteOptions.headers = headers;
		}

		const init = initHandling(deleteOptions);
		let res = await fetch(`${baseUrl}${url}`, {
			...init,
			method: 'DELETE',
		});

		if (!options?.disableRefresh) {
			res = await handleAuthError(res, () => fetch(`${baseUrl}${url}`, init));
		}

		return await responseHandling(res);
	},
};

const initHandling = (options?: Options): RequestInit => {
	const init: RequestInit = {
		...options,
		// TODO Add test to the credentials override if it is provided
		credentials: options?.credentials ?? 'include',
	};

	if (Object.keys(init.headers ?? {}).length === 0) {
		// biome-ignore lint/performance/noDelete: It's necessary remove the headers case undefined
		delete init.headers;
	}

	return init;
};

const upsertInitHandling = (body?: Body, upsertOptions?: UpsertOptions) => {
	let defaultHeaders: HeadersInit = {
		'Content-Type': 'application/json',
	};

	if (!body) {
		defaultHeaders = {};
	}

	const headers: HeadersInit = {
		...defaultHeaders,
		...upsertOptions?.headers,
	};

	const init: RequestInit = {
		...upsertOptions,
		body: JSON.stringify(body),
		headers,
		credentials: 'include',
	};

	return init;
};

const responseHandling = async <Res = unknown>(
	res: Response,
): Promise<FetcherResponse<Res>> => {
	if (!res.ok) {
		const errorData = await res.json();
		throw new AppError(
			errorData.statusCode,
			errorData.error,
			errorData.message,
		);
	}

	// TODO Add test to the try catch code
	try {
		const response = await res.json();

		return {
			response: res,
			data: response,
		};
	} catch (_error) {
		return {
			response: res,
			data: null,
		};
	}
};

const handleAuthError = async (
	res: Response,
	request: () => Promise<Response>,
) => {
	if (res.status !== 401) return res;

	const refreshResponse = await fetch(`${baseUrl}/user/v1/refresh`, {
		method: 'POST',
		credentials: 'include',
	});

	if (!refreshResponse.ok) {
		const errorData = await refreshResponse.json();
		throw new AppError(
			errorData.statusCode,
			errorData.error,
			errorData.message,
		);
	}

	const mainRequestResponse = await request();

	if (!mainRequestResponse.ok) {
		const errorData = await res.json();
		throw new AppError(
			errorData.statusCode,
			errorData.error,
			errorData.message,
		);
	}

	return mainRequestResponse;
};

// TODO Add test to the base url override
const applyInitialConfigs = ({ url }: { url?: string }) => {
	if (!url) return;

	baseUrl = url;
};
