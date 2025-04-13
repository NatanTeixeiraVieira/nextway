import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { registerTenantCofirmationSchema } from './_schemas/register-tenant-confirmation.schema';
import type { RegisterTenantConfirmationFormData } from './_types/register-tenant-confirmation-form-data.type';

export const useRegisterTenantConfirmation = () => {
	const form = useForm<RegisterTenantConfirmationFormData>({
		resolver: zodResolver(registerTenantCofirmationSchema),
		defaultValues: {
			pin: '',
		},
	});
	const [resendDisabled, setResendDisabled] = useState<boolean>(false);
	const [countdown, setCountdown] = useState<number>(30);

	useEffect(() => {
		if (resendDisabled && countdown > 0) {
			const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
			return () => clearTimeout(timer);
		}

		if (countdown === 0) {
			setResendDisabled(false);
		}
	}, [resendDisabled, countdown]);

	const handleResendCode = async (): Promise<void> => {
		form.setValue('pin', '');

		setResendDisabled(true);
		setCountdown(30);

		// Simulate API call to resend code
		await new Promise((resolve) => setTimeout(resolve, 1000));

		// Reset confirmation code
		// updateFormData({ confirmationCode: ['', '', '', '', '', ''] });

		// Focus first input
		// if (inputRefs[0]?.current) {
		// 	inputRefs[0].current?.focus();
		// }
	};

	const handleSubmit = form.handleSubmit((data) => {
		console.log('🚀 ~ handleSubmit ~ data:', data);
	});

	return {
		form,
		resendDisabled,
		countdown,
		handleSubmit,
		handleResendCode,
	};
};
