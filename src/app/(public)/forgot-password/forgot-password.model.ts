import type { AppError } from '@/errors/error';
import { useToast } from '@/hooks/use-toast';
import { requestErrorHandling } from '@/utils/error-handling';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { forgotPasswordSchema } from './_schemas/forgot-password.schema';
import type { ForgotPasswordFormData } from './types/forgot-password-form-data.type';
import type { ForgotPasswordService } from './types/forgot-password.type';

export type ForgotPasswordModelProps = {
	forgotPasswordService: ForgotPasswordService;
};

export const useForgotPassword = ({
	forgotPasswordService,
}: ForgotPasswordModelProps) => {
	const { toast } = useToast();
	const {
		register,
		handleSubmit: submit,
		formState: { errors },
		reset,
	} = useForm<ForgotPasswordFormData>({
		resolver: zodResolver(forgotPasswordSchema),
		defaultValues: {
			email: '',
		},
	});

	const { mutateAsync, isPending, isSuccess } = useMutation({
		mutationFn: forgotPasswordService.sendEmail,
		onSuccess: () => {
			reset();
		},
		onError: (error: AppError) => {
			toast({
				variant: 'destructive',
				className: 'forgot-password-send-email-toast-error',
				title: requestErrorHandling(error, 'Falha ao enviar o email.'),
			});
		},
	});

	const handleSubmit = submit(async ({ email }) => {
		mutateAsync({ email });
	});

	return {
		isSuccess,
		errors,
		isPending,
		register,
		handleSubmit,
	};
};
