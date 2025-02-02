import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { usePasswordInput } from '../../hooks/use-password-input';
import { registerFormSchema } from './schemas/register-form.schema';
import type { RegisterFormData } from './types/register-form-data';

export const useRegisterForm = () => {
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
			confirmPassword: '',
		},
	});

	const { passwordInputType, handleIconEyeClick } = usePasswordInput();
	const {
		passwordInputType: confirmPasswordInputType,
		handleIconEyeClick: handleConfirmPasswordIconEyeClick,
	} = usePasswordInput();

	const handleSubmit = submit(async ({ name, email, password }) => {});

	return {
		errors,
		passwordInputType,
		dirtyFields,
		confirmPasswordInputType,
		handleConfirmPasswordIconEyeClick,
		register,
		handleSubmit,
		handleIconEyeClick,
	};
};
