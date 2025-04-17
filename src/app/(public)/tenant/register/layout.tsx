import type { LayoutProps } from '@/types/utils.type';
import StepsInfos from './_components/steps-infos';

export default async function Layout({ children }: LayoutProps) {
	return (
		<>
			<StepsInfos />
			<div className="mt-6">{children}</div>
		</>
	);
}
