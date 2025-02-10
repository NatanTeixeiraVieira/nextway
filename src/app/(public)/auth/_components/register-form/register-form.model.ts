import { useToast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { usePasswordInput } from '../../hooks/use-password-input';
import { registerFormSchema } from './schemas/register-form.schema';
import type { RegisterFormData } from './types/register-form-data';
import type { RegisterService } from './types/register.type';

export type RegisterModelProps = {
	registerService: RegisterService;
};

export const useRegisterForm = ({ registerService }: RegisterModelProps) => {
	const { toast } = useToast();

	const { mutateAsync, isPending } = useMutation({
		mutationFn: registerService.register,
		onSuccess: () => {
			reset();
			toast({
				className: 'register-send-email-toast',
				title: 'Um link de verificação foi enviado para o seu email',
			});
		},
	});

	const {
		register,
		handleSubmit: submit,
		formState: { errors, dirtyFields },
		reset,
	} = useForm<RegisterFormData>({
		resolver: zodResolver(registerFormSchema),
		defaultValues: {
			name: '',
			email: '',
			password: '',
			confirmPassword: '',
		},
	});

	const { passwordInputType, handleIconEyeClick } = usePasswordInput();
	const {
		passwordInputType: confirmPasswordInputType,
		handleIconEyeClick: handleConfirmPasswordIconEyeClick,
	} = usePasswordInput();

	const handleSubmit = submit(async ({ name, email, password }) => {
		await mutateAsync({ name, email, password });
	});

	return {
		errors,
		passwordInputType,
		dirtyFields,
		confirmPasswordInputType,
		isPending,
		handleConfirmPasswordIconEyeClick,
		register,
		handleSubmit,
		handleIconEyeClick,
	};
};
