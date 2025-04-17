'use client';

import { Button } from '@/components/ui/button';
import { ErrorConstants } from '@/constants/errors';
import type { ErrorBoundary } from '@/types/utils.type';
import { useRouter } from 'next/navigation';

export default function RegisterTenantError({ error }: ErrorBoundary) {
	const router = useRouter();

	const handleBackButtonClick = () => {
		router.back();
	};

	return (
		<div className="py-8 flex flex-col items-center gap-8">
			<p className="font-semibold text-lg text-center">
				{error.message
					? ErrorConstants.FORBIDDEN_FORM_STEP &&
						`${ErrorConstants.FORBIDDEN_FORM_STEP}.`
					: 'Desculpe, ocorreu um erro inesperado.'}
			</p>
			<Button
				type="button"
				onClick={handleBackButtonClick}
				className="bg-gradient-to-r w-32 from-sky-500 to-sky-600"
			>
				Voltar
			</Button>
		</div>
	);
}
