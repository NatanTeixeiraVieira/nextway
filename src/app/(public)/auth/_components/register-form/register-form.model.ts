import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { usePasswordInput } from '../../hooks/use-password-input';
import { registerFormSchema } from './schemas/register-form.schema';
import type { RegisterFormData } from './types/register-form-data';
import type { RegisterService } from './types/register.types';

export type RegisterModelProps = {
	registerService: RegisterService;
};

export const useRegisterForm = ({ registerService }: RegisterModelProps) => {
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

	const handleSubmit = submit(async ({ name, email, password }) => {
		const res = await registerService.register({ name, email, password });

		console.log('🚀 ~ handleSubmit ~ res:', res);
	});

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
