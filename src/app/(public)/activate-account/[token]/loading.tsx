import Spinner from '@/components/spinner';

export default function Loading() {
	return (
		<div className="flex justify-center">
			<Spinner
				size={44}
				strokeWidth={1.5}
				data-testid="activate-account-loading"
			/>
		</div>
	);
}
