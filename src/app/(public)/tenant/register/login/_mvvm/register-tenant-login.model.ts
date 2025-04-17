import { usePasswordInput } from '@/hooks/use-password-input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { setFormDataCookies } from '../../_actions/tenant-form-data.action';
import { registerTenantLoginSchema } from '../_schemas/register-tenant-login.schema';
import type { RegisterTenantLoginFormData } from '../_types/register-tenant-address-form-data.type';
import type { RegisterTenantLoginVMProps } from './register-tenant-login.vm';

type Props = {
	loginData: RegisterTenantLoginVMProps['formData'];
};

export const useRegisterTenantLogin = ({ loginData }: Props) => {
	const router = useRouter();

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
		if (loginData) {
			setValue('email', loginData.email || '');
			setValue('password', loginData.password || '');
		}
	}, [setValue, loginData]);

	const { passwordInputType, handleIconEyeClick } = usePasswordInput();

	const handleSubmit = submit((data) => {
		setFormDataCookies({ login: data });

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
