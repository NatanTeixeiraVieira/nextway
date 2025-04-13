import type { AppError } from '@/errors/error';
import { useToast } from '@/hooks/use-toast';
import { requestErrorHandling } from '@/utils/error-handling';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { usePasswordInput } from '../../../../../hooks/use-password-input';
import { loginFormSchema } from './schemas/login-form.schema';
import type { LoginFormData } from './types/login-form-data.type';
import type { LoginService } from './types/login.type';

export type LoginModelProps = {
	loginService: LoginService;
};

export const useLoginForm = ({ loginService }: LoginModelProps) => {
	const router = useRouter();
	const { toast } = useToast();

	const { mutateAsync, isPending } = useMutation({
		mutationFn: loginService.login,
		onSuccess: () => {
			reset();
			router.push('/');
		},
		onError: (error: AppError) => {
			toast({
				variant: 'destructive',
				className: 'login-send-email-toast-error',
				title: requestErrorHandling(error, 'Falha ao realizar login.'),
			});
		},
	});

	const {
		register,
		handleSubmit: submit,
		formState: { errors, dirtyFields },
		reset,
	} = useForm<LoginFormData>({
		resolver: zodResolver(loginFormSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const { passwordInputType, handleIconEyeClick } = usePasswordInput();

	const handleSubmit = submit(async ({ email, password }) => {
		mutateAsync({ email, password });
	});

	return {
		errors,
		passwordInputType,
		dirtyFields,
		isPending,
		register,
		handleSubmit,
		handleIconEyeClick,
	};
};
