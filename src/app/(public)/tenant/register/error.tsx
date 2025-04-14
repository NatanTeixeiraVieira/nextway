'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { ErrorConstants } from './_constants/error';

type ErrorProps = {
	error: Error & { digest?: string };
};

export default function ErrorPage({ error }: ErrorProps) {
	const router = useRouter();
	const handleBackButtonClick = () => {
		router.back();
	};

	return (
		<div
			className="mx-auto mt-32 w-fit rounded border border-error p-12"
			data-testid="invalid-token-content"
		>
			{error.message === ErrorConstants.FORBIDDEN_FORM_STEP && (
				<p>{error.message}</p>
			)}

			<Button type="button" onClick={handleBackButtonClick}>
				Voltar
			</Button>
		</div>
	);
}
