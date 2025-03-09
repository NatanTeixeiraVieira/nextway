import {
	NextResponse,
	type MiddlewareConfig,
	type NextRequest,
} from 'next/server';
import { CookiesName } from './constants/cookies';

const redirectWhenNotAuthenticated = '/auth';
const redirectWhenAuthenticated = '/';

type RouteConfig = {
	path: string;
	redirectTo?: string;
	includes?: boolean;
};

const publicRoutes: RouteConfig[] = [
	{ path: '/' },
	{ path: '/auth', redirectTo: redirectWhenAuthenticated },
	{ path: '/forgot-password', redirectTo: redirectWhenAuthenticated },
	{
		path: '/recover-password',
		redirectTo: redirectWhenAuthenticated,
		includes: true,
	},
	{
		path: '/activate-account',
		redirectTo: redirectWhenAuthenticated,
		includes: true,
	},
];

export const middleware = async (request: NextRequest) => {
	const path = request.nextUrl.pathname;
	console.log('🚀 ~ middleware ~ path:', path);
	const publicRoute = publicRoutes.find((route) => {
		if (route.includes) {
			return path.includes(route.path);
		}

		return path === route.path;
	});
	console.log('🚀 ~ publicRoute ~ publicRoute:', publicRoute);
	const authToken = request.cookies.get(CookiesName.ACCESS_TOKEN)?.value;

	if (!authToken && publicRoute) {
		return NextResponse.next();
	}

	if (!authToken && !publicRoute) {
		const redirectUrl = request.nextUrl.clone();
		redirectUrl.pathname = redirectWhenNotAuthenticated;

		return NextResponse.redirect(redirectUrl);
	}

	if (authToken && publicRoute && publicRoute.redirectTo) {
		const redirectUrl = request.nextUrl.clone();
		redirectUrl.pathname = publicRoute.redirectTo;

		return NextResponse.redirect(redirectUrl);
	}

	if (authToken && !publicRoute) {
		return NextResponse.next();
	}

	return NextResponse.next();
};

export const config: MiddlewareConfig = {
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - api (API routes)
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico, sitemap.xml, robots.txt (metadata files)
		 */
		'/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
	],
};
