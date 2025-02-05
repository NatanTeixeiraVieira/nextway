import Spinner from '@/components/spinner';
import { AppError } from '@/errors/error';
import type { useActivateAccount } from './activate-account.model';

type ActivateAccountViewProps = ReturnType<typeof useActivateAccount>;

export default function ActivateAccountView(props: ActivateAccountViewProps) {
	const { error, isPending } = props;

	return (
		<>
			<div className="mt-12 flex w-full justify-center">
				{isPending && <Spinner size={44} strokeWidth={1.5} />}
			</div>
			{error instanceof AppError && error.statusCode === 401 && (
				<div className="mx-auto mt-32 w-fit rounded border border-error bg-red-300 p-12">
					<p>O token informado não é válido.</p>
				</div>
			)}
		</>
	);
}
