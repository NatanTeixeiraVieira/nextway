import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { usePasswordInput } from './hooks/use-password-input';
import { loginFormSchema } from './schemas/login-form.schema';
import type { LoginFormData } from './types/login-form-data';

export const useLoginForm = () => {
	const {
		register,
		handleSubmit: submit,
		formState: { errors, dirtyFields },
	} = useForm<LoginFormData>({
		resolver: zodResolver(loginFormSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const { passwordInputType, handleIconEyeClick } = usePasswordInput();

	const router = useRouter();

	const handleSubmit = submit(async ({ email, password }) => {
		console.log('🚀 ~ handleSubmit ~ email, password:', email, password);

		await new Promise((resolve) => setTimeout(resolve, 1000));
		// router.push('/dashboard');
	});

	return {
		errors,
		passwordInputType,
		dirtyFields,
		register,
		handleSubmit,
		handleIconEyeClick,
	};
};
