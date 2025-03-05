import type { MiddlewareConfig, NextRequest } from 'next/server';
import { CookiesName } from './constants/cookies';

const redirectWhenNotAuthenticated = '/auth';
const redirectWhenAuthenticated = '/';

type RouteConfig = {
	path: string;
	redirectTo?: string;
};

const publicRoutes: RouteConfig[] = [
	{ path: '/' },
	{ path: '/auth', redirectTo: redirectWhenAuthenticated },
	{ path: 'forgot-password', redirectTo: redirectWhenAuthenticated },
	{ path: 'recover-password', redirectTo: redirectWhenAuthenticated },
	{ path: 'activate-account', redirectTo: redirectWhenAuthenticated },
];

export const middleware = async (request: NextRequest) => {
	const path = request.nextUrl.pathname;
	const publicRoute = publicRoutes.find((route) => route.path === path);
	const authToken = request.cookies.get(CookiesName.ACCESS_TOKEN)?.value;
	console.log('🚀 ~ middleware ~ authToken:', authToken);

	// if (!authToken && publicRoute) {
	// 	return NextResponse.next();
	// }

	// if (!authToken && !publicRoute) {
	// 	const redirectUrl = request.nextUrl.clone();
	// 	redirectUrl.pathname = redirectWhenNotAuthenticated;

	// 	return NextResponse.redirect(redirectUrl);
	// }

	// if (authToken && publicRoute && publicRoute.redirectTo) {
	// 	const redirectUrl = request.nextUrl.clone();
	// 	redirectUrl.pathname = publicRoute.redirectTo;

	// 	return NextResponse.redirect(redirectUrl);
	// }

	// if (authToken && !publicRoute) {
	// }
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
