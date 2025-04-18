'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function ActionButtons() {
	const router = useRouter();
	const handleBackButtonClick = () => {
		router.back();
	};

	return (
		<div className="flex justify-between gap-4">
			<Button
				type="button"
				className="flex-1 bg-gray-200 text-gray-700"
				onClick={handleBackButtonClick}
				data-testid="register-submit-button"
			>
				Voltar
			</Button>
			<Button
				type="submit"
				className="flex-1"
				data-testid="register-submit-button"
			>
				Próximo
			</Button>
		</div>
	);
}
