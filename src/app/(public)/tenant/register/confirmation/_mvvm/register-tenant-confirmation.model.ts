import type { AppError } from '@/errors/error';
import { useToast } from '@/hooks/use-toast';
import { requestErrorHandling } from '@/utils/error-handling';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { resetFormDataCookies } from '../../_actions/tenant-form-data.action';
import { registerTenantCofirmationSchema } from '../_schemas/register-tenant-confirmation.schema';
import type { RegisterTenantConfirmationFormData } from '../_types/register-tenant-confirmation-form-data.type';
import type { RegisterTenantConfirmationService } from '../_types/register-tenant-confirmation.type';
import type { RegisterTenantConfirmationVMProps } from './register-tenant-confirmation.vm';

type Props = {
	loginData: RegisterTenantConfirmationVMProps['loginData'];
	registerTenantConfirmationService: RegisterTenantConfirmationService;
};

export const useRegisterTenantConfirmation = ({
	loginData,
	registerTenantConfirmationService,
}: Props) => {
	const router = useRouter();
	const { toast } = useToast();

	const form = useForm<RegisterTenantConfirmationFormData>({
		resolver: zodResolver(registerTenantCofirmationSchema),
		defaultValues: {
			pin: '',
		},
	});

	const { mutateAsync, isPending } = useMutation({
		mutationFn: registerTenantConfirmationService.checkEmail,
		onSuccess: async () => {
			toast({ variant: 'default', title: 'Email confirmado com sucesso!' });
			await resetFormDataCookies();
			router.push('/');
		},
		onError: (error: AppError) => {
			toast({
				variant: 'destructive',
				className: 'register-tenant-check-email-toast-error',
				title: requestErrorHandling(error, 'Falha ao confirmar email.'),
			});
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

	const handleSubmit = form.handleSubmit(async (data) => {
		if (!loginData?.email) return;

		await mutateAsync({
			email: loginData?.email,
			verifyEmailCode: data.pin,
		});
	});

	return {
		form,
		resendDisabled,
		countdown,
		isPending,
		handleSubmit,
		handleResendCode,
	};
};
