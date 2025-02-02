import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { usePasswordInput } from '../../hooks/use-password-input';
import { registerFormSchema } from './schemas/register-form.schema';
import type { RegisterFormData } from './types/login-form-data';

export const usRegisterForm = () => {
	const {
		register,
		handleSubmit: submit,
		formState: { errors, dirtyFields },
	} = useForm<RegisterFormData>({
		resolver: zodResolver(registerFormSchema),
		defaultValues: {
			name: '',
			email: '',
			password: '',
		},
	});

	const { passwordInputType, handleIconEyeClick } = usePasswordInput();

	const handleSubmit = submit(async ({ name, email, password }) => {
		await new Promise((resolve) => setTimeout(resolve, 1000));
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
