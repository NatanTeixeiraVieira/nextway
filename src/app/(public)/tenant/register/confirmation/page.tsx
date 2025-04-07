'use client';

import type React from 'react';

import { CheckCircle2, RefreshCw } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { type JSX, useEffect, useRef, useState } from 'react';
import type { RegisterFormData } from '../types/register-tenant.type';

interface ConfirmationFormProps {
	formData: RegisterFormData;
	updateFormData: (data: Partial<RegisterFormData>) => void;
	prevStep: () => void;
}

export default function ConfirmationForm({
	formData,
	updateFormData,
	prevStep,
}: ConfirmationFormProps): JSX.Element {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isVerified, setIsVerified] = useState<boolean>(false);
	const [resendDisabled, setResendDisabled] = useState<boolean>(false);
	const [countdown, setCountdown] = useState<number>(30);
	const router = useRouter();

	const inputRefs = [
		useRef<HTMLInputElement>(null),
		useRef<HTMLInputElement>(null),
		useRef<HTMLInputElement>(null),
		useRef<HTMLInputElement>(null),
		useRef<HTMLInputElement>(null),
		useRef<HTMLInputElement>(null),
	];

	useEffect(() => {
		if (resendDisabled && countdown > 0) {
			const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
			return () => clearTimeout(timer);
		} else if (countdown === 0) {
			setResendDisabled(false);
		}
	}, [resendDisabled, countdown]);

	const handleCodeChange = (index: number, value: string): void => {
		if (value.length > 1) {
			value = value.charAt(0);
		}

		const newCode = [...formData.confirmationCode];
		newCode[index] = value;
		updateFormData({ confirmationCode: newCode });

		// Auto-focus next input
		if (value && index < 5 && inputRefs[index + 1]?.current) {
			inputRefs[index + 1].current?.focus();
		}
	};

	const handleKeyDown = (
		index: number,
		e: React.KeyboardEvent<HTMLInputElement>,
	): void => {
		// Handle backspace
		if (
			e.key === 'Backspace' &&
			!formData.confirmationCode[index] &&
			index > 0 &&
			inputRefs[index - 1]?.current
		) {
			inputRefs[index - 1].current?.focus();
		}
	};

	const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>): void => {
		e.preventDefault();
		const pastedData = e.clipboardData.getData('text').trim();

		if (/^\d+$/.test(pastedData) && pastedData.length <= 6) {
			const newCode = [...formData.confirmationCode];

			for (let i = 0; i < pastedData.length; i++) {
				if (i < 6) {
					newCode[i] = pastedData.charAt(i);
				}
			}

			updateFormData({ confirmationCode: newCode });

			// Focus the next empty input or the last one
			const nextEmptyIndex = newCode.findIndex((c) => !c);
			if (
				nextEmptyIndex !== -1 &&
				nextEmptyIndex < 6 &&
				inputRefs[nextEmptyIndex]?.current
			) {
				inputRefs[nextEmptyIndex].current?.focus();
			} else if (inputRefs[5]?.current) {
				inputRefs[5].current?.focus();
			}
		}
	};

	const handleVerify = async (): Promise<void> => {
		const code = formData.confirmationCode.join('');

		if (code.length !== 6) return;

		setIsLoading(true);

		try {
			// Simulate API call to verify code
			await new Promise((resolve) => setTimeout(resolve, 1500));

			// For demo purposes, any 6-digit code is valid
			setIsVerified(true);

			// Redirect after successful verification
			setTimeout(() => {
				router.push('/dashboard');
			}, 2000);
		} catch (error) {
			console.error('Error verifying code', error);
		} finally {
			setIsLoading(false);
		}
	};

	const handleResendCode = async (): Promise<void> => {
		setResendDisabled(true);
		setCountdown(30);

		// Simulate API call to resend code
		await new Promise((resolve) => setTimeout(resolve, 1000));

		// Reset confirmation code
		updateFormData({ confirmationCode: ['', '', '', '', '', ''] });

		// Focus first input
		if (inputRefs[0]?.current) {
			inputRefs[0].current?.focus();
		}
	};

	return (
		<div className="space-y-6">
			{!isVerified ? (
				<>
					<div className="text-center mb-6">
						<h2 className="text-lg font-medium text-gray-800 mb-2">
							Verifique seu email
						</h2>
						<p className="text-gray-500 text-sm">
							Enviamos um código de 6 dígitos para {formData.email}
						</p>
					</div>

					<div className="flex justify-center gap-2">
						{formData.confirmationCode.map((digit, index) => (
							<input
								key={index}
								ref={inputRefs[index]}
								type="text"
								inputMode="numeric"
								pattern="[0-9]*"
								maxLength={1}
								value={digit}
								onChange={(e) => handleCodeChange(index, e.target.value)}
								onKeyDown={(e) => handleKeyDown(index, e)}
								onPaste={index === 0 ? handlePaste : undefined}
								className="w-12 h-12 text-center text-lg font-bold border border-gray-300 rounded-lg focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
							/>
						))}
					</div>

					<div className="text-center">
						<button
							type="button"
							onClick={handleResendCode}
							disabled={resendDisabled}
							className="text-sky-600 text-sm hover:text-sky-700 flex items-center justify-center mx-auto"
						>
							<RefreshCw className="w-4 h-4 mr-1" />
							{resendDisabled
								? `Reenviar código (${countdown}s)`
								: 'Reenviar código'}
						</button>
					</div>

					<div className="flex gap-4 mt-6">
						<button
							type="button"
							onClick={prevStep}
							className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-medium
                       hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2
                       transition-colors"
						>
							Voltar
						</button>
						<button
							type="button"
							onClick={handleVerify}
							disabled={
								formData.confirmationCode.join('').length !== 6 || isLoading
							}
							className="w-full bg-sky-500 text-white py-3 rounded-xl font-medium
                       hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2
                       transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
						>
							{isLoading ? 'Verificando...' : 'Verificar'}
						</button>
					</div>
				</>
			) : (
				<div className="text-center py-6">
					<div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
						<CheckCircle2 className="w-8 h-8 text-green-500" />
					</div>
					<h2 className="text-xl font-semibold text-gray-800 mb-2">
						Cadastro concluído!
					</h2>
					<p className="text-gray-500 mb-6">
						Seu cadastro foi realizado com sucesso. Redirecionando...
					</p>
				</div>
			)}
		</div>
	);
}
