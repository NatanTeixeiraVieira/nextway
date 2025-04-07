import type { JSX } from 'react';

interface ProgressStepsProps {
	steps: string[];
	currentStep: number;
}

export default function ProgressSteps({
	steps,
	currentStep,
}: ProgressStepsProps): JSX.Element {
	return (
		<div className="relative">
			<div className="flex justify-between">
				{steps.map((step, index) => (
					<div
						key={step}
						className={`relative z-20 flex flex-col items-center ${index === steps.length - 1 ? '' : 'flex-1'}`}
					>
						<div
							className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium
                ${currentStep >= index ? 'bg-sky-500 text-white' : 'bg-gray-200 text-gray-500'}`}
						>
							{index + 1}
						</div>
						<div className="text-xs mt-2 text-center hidden sm:block">
							{step}
						</div>
					</div>
				))}
			</div>

			<div className="absolute top-4 left-0 right-0 -translate-y-1/2 flex">
				{steps.slice(0, -1).map((step, index) => (
					<div
						key={step}
						className={`h-0.5 flex-1 ${currentStep > index ? 'bg-sky-500' : 'bg-gray-200'}`}
					/>
				))}
			</div>
		</div>
	);
}
