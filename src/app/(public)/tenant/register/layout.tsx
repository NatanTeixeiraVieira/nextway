import type React from 'react';
import StepsInfos from './_components/steps-infos';

type LayoutProps = {
	children: React.ReactNode;
};

export default async function Layout({ children }: LayoutProps) {
	return (
		<div className="min-h-screen bg-gradient-to-br from-sky-200 via-sky-300 to-sky-500 p-4">
			<div className="max-w-lg mx-auto">
				<div className="bg-white rounded-xl shadow-lg overflow-hidden">
					<div className="p-6">
						<StepsInfos />
						<div className="mt-6">{children}</div>
					</div>
				</div>
			</div>
		</div>
	);
}
