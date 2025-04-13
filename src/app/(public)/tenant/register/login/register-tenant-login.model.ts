import { usePasswordInput } from '@/hooks/use-password-input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTenantFormData } from '../_hooks/use-tenant-form-data';
import { registerTenantLoginSchema } from './schemas/register-tenant-login.schema';
import type { RegisterTenantLoginFormData } from './types/register-tenant-address-form-data.type';

export const useRegisterTenantLogin = () => {
	const router = useRouter();
	const { getFormData, setFormData } = useTenantFormData();

	const {
		register,
		handleSubmit: submit,
		formState: { errors, dirtyFields },
		setValue,
	} = useForm<RegisterTenantLoginFormData>({
		resolver: zodResolver(registerTenantLoginSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	useEffect(() => {
		const formData = getFormData();

		if (formData) {
			setValue('email', formData.email || '');
			setValue('password', formData.password || '');
		}
	}, [setValue, getFormData]);

	const { passwordInputType, handleIconEyeClick } = usePasswordInput();

	const handleSubmit = submit((data) => {
		setFormData(data);

		router.push('/tenant/register/confirmation');
	});

	return {
		passwordInputType,
		errors,
		dirtyFields,
		register,
		handleSubmit,
		handleIconEyeClick,
	};
};
