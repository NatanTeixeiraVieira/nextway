import type { LayoutProps } from '@/types/utils.type';

export default function Layout({ children }: LayoutProps) {
	return (
		<div className="min-h-screen bg-gradient-to-br from-sky-200 via-sky-300 to-sky-500 p-4">
			<div className="max-w-lg mx-auto">
				<div className="bg-white rounded-xl shadow-lg overflow-hidden">
					<div className="p-6">{children}</div>
				</div>
			</div>
		</div>
	);
}
