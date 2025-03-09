// import { AppError } from '@/errors/error';

// const baseUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api`;

// export type FetcherResponse<R = unknown> = {
// 	data: R | null;
// 	response: Response;
// 	// headers: Headers | null;
// };

// type Methods = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'OPTIONS' | 'HEAD';

// type Options = Omit<RequestInit, 'body' | 'method'> & {
// 	body?: Record<string, unknown>;
// 	method: Methods;
// 	disableRefresh?: boolean;
// };

// export const fetcher = async <Res = unknown>(
// 	url: string,
// 	options: Options,
// ): Promise<FetcherResponse<Res>> => {
// 	const init = initHandling(options);
// 	console.log('🚀 ~ init:', init);

// 	let res = await fetch(`${baseUrl}${url}`, init);

// 	if (!options.disableRefresh) {
// 		res = await handleAuthError(res, () => fetch(`${baseUrl}${url}`, init));
// 	}

// 	return await responseHandling(res);
// };

// const initHandling = (options: Options): RequestInit => {
// 	const defaultHeaders: HeadersInit = {
// 		'Content-Type': 'application/json',
// 	};

// 	if (!options?.body) {
// 		// biome-ignore lint/performance/noDelete: It's necessary remove content type case undefined
// 		delete defaultHeaders['Content-Type'];
// 	}

// 	const headers: HeadersInit = {
// 		...defaultHeaders,
// 		...options.headers,
// 	};

// 	const init: RequestInit = {
// 		...options,
// 		body: JSON.stringify(options?.body),
// 		headers,
// 		credentials: 'include',
// 	};

// 	if (!init.body) {
// 		// biome-ignore lint/performance/noDelete: It's necessary remove the body case undefined
// 		delete init.body;
// 	}

// 	if (Object.keys(init.headers ?? {}).length === 0) {
// 		// biome-ignore lint/performance/noDelete: It's necessary remove the headers case undefined
// 		delete init.headers;
// 	}

// 	return init;
// };

// const responseHandling = async <Res = unknown>(
// 	res: Response,
// ): Promise<FetcherResponse<Res>> => {
// 	if (!res.ok) {
// 		const errorData = await res.json();
// 		throw new AppError(
// 			errorData.statusCode,
// 			errorData.error,
// 			errorData.message,
// 		);
// 	}

// 	if (
// 		!res.headers.get('content-length') ||
// 		res.headers.get('content-length') === '0'
// 	) {
// 		return {
// 			response: res,
// 			// headers: null,
// 			data: null,
// 		};
// 	}

// 	const response = await res.json();

// 	return {
// 		// headers: res.headers,
// 		response: res,
// 		data: response,
// 	};
// };

// const handleAuthError = async (
// 	res: Response,
// 	request: () => Promise<Response>,
// ) => {
// 	if (res.status !== 401) return res;

// 	const refreshResponse = await fetch(`${baseUrl}/user/v1/refresh`, {
// 		method: 'POST',
// 	});

// 	if (!refreshResponse.ok) {
// 		const errorData = await refreshResponse.json();
// 		throw new AppError(
// 			errorData.statusCode,
// 			errorData.error,
// 			errorData.message,
// 		);
// 	}

// 	const mainRequestResponse = await request();

// 	if (!mainRequestResponse.ok) {
// 		const errorData = await res.json();
// 		throw new AppError(
// 			errorData.statusCode,
// 			errorData.error,
// 			errorData.message,
// 		);
// 	}

// 	return mainRequestResponse;
// };
