import type { AppError } from '@/errors/error';
import { useToast } from '@/hooks/use-toast';
import { requestErrorHandling } from '@/utils/error-handling';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { use } from 'react';
import { useForm } from 'react-hook-form';
import { usePasswordInput } from '../../auth/hooks/use-password-input';
import type { RecoverPasswordParams } from './page';
import { recoverPasswordSchema } from './schemas/recover-password.schema';
import type { RecoverPasswordFormData } from './types/recover-password-form-date.type';
import type { RecoverPasswordService } from './types/recover-password.type';

export type RecoverPasswordModelProps = {
	params: RecoverPasswordParams['params'];
	recoverPasswordService: RecoverPasswordService;
};

export const useRecoverPassword = ({
	params,
	recoverPasswordService,
}: RecoverPasswordModelProps) => {
	const { token } = use(params);
	const { toast } = useToast();

	const { passwordInputType, handleIconEyeClick } = usePasswordInput();
	const {
		passwordInputType: confirmPasswordInputType,
		handleIconEyeClick: handleConfirmPasswordIconEyeClick,
	} = usePasswordInput();
	const {
		register,
		handleSubmit: submit,
		formState: { errors, dirtyFields },
		reset,
	} = useForm<RecoverPasswordFormData>({
		resolver: zodResolver(recoverPasswordSchema),
		defaultValues: {
			password: '',
			confirmPassword: '',
		},
	});

	const { mutateAsync, isPending, isSuccess } = useMutation({
		mutationFn: recoverPasswordService.changePassword,
		onSuccess: () => {
			reset();
		},
		onError: (error: AppError) => {
			toast({
				variant: 'destructive',
				className: 'recover-password-change-password-toast-error',
				title: requestErrorHandling(error, 'Falha ao alterar senha.'),
			});
		},
	});

	const handleSubmit = submit(async ({ password }) => {
		mutateAsync({ password, changePasswordToken: token });
	});

	return {
		passwordInputType,
		confirmPasswordInputType,
		errors,
		dirtyFields,
		isSuccess,
		isPending,
		handleSubmit,
		register,
		handleConfirmPasswordIconEyeClick,
		handleIconEyeClick,
	};
};
