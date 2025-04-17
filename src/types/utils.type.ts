export type LayoutProps = {
	children: React.ReactNode;
};

export type ErrorBoundary = {
	error: Error & { digest?: string };
	reset: VoidFunction;
};
