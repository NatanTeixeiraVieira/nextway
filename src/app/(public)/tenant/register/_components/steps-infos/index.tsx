'use client';

import { usePathname } from 'next/navigation';
import ProgressSteps from '../progress-steps';

const steps: string[] = [
	'Endereço',
	'Responsável',
	'Estabelecimento',
	'Login',
	'Confirmação',
] as const;

const stepsKeys = [
	'address',
	'responsible',
	'establishment',
	'login',
	'confirmation',
] as const;

const stepsInfos: Record<
	(typeof stepsKeys)[number],
	Record<'title' | 'subtitle', string>
> = {
	address: {
		title: 'Endereço',
		subtitle: 'Adicione as informações do endereço do seu comércio.',
	},
	responsible: {
		title: 'Responsável',
		subtitle: 'Adicione as informações do responsável do seu comércio.',
	},
	establishment: {
		title: 'Estabelecimento',
		subtitle: 'Adicione as informações do seu comércio.',
	},
	login: {
		title: 'Login',
		subtitle: 'Adicione as informações de acesso ao seu comércio.',
	},
	confirmation: {
		title: 'Confirmação',
		subtitle: 'Adicione o código de confirmação do email informado.',
	},
};

export default function StepsInfos() {
	const pathname = usePathname();
	const segments = pathname.split('/').filter(Boolean);
	const lastSegment = segments.at(-1) as (typeof stepsKeys)[number];

	return (
		<>
			<h1 className="text-2xl font-semibold text-gray-800 mb-2">
				{stepsInfos[lastSegment].title}
			</h1>
			<p className="text-gray-500 text-sm mb-6">
				{stepsInfos[lastSegment].subtitle}
			</p>

			<ProgressSteps
				steps={steps}
				currentStep={stepsKeys.indexOf(lastSegment)}
			/>
		</>
	);
}
