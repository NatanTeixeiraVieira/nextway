import AuthTabs from './_components/auth-tabs';

export default function AuthPage() {
	return (
		<div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-sky-200 via-sky-300 to-sky-500 p-4">
			<div className="w-full max-w-md">
				<AuthTabs />
			</div>
		</div>
	);
}
