import { cpfMask, phoneNumberMask } from '@/utils/masks';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTenantFormData } from '../_hooks/use-tenant-form-data';
import { registerTenantResponsibleSchema } from './schemas/register-tenant-responsible.schema';
import type { RegisterTenantResponsibleFormData } from './types/register-tenant-responsible-form-data.type';

export const useRegisterTenantResponsible = () => {
	const router = useRouter();
	const { getFormData, setFormData } = useTenantFormData();

	const {
		register,
		handleSubmit: submit,
		formState: { errors },
		setValue,
	} = useForm<RegisterTenantResponsibleFormData>({
		resolver: zodResolver(registerTenantResponsibleSchema),
		defaultValues: {
			name: '',
			cpf: '',
			responsiblePhoneNumber: '',
		},
	});

	useEffect(() => {
		const formData = getFormData();

		if (formData) {
			setValue('cpf', formData.cpf || '');
			setValue('name', formData.name || '');
			setValue('responsiblePhoneNumber', formData.responsiblePhoneNumber || '');
		}
	}, [setValue, getFormData]);

	const handleCpfChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const cpfMasked = cpfMask(event.target.value);
		setValue('cpf', cpfMasked);
	};

	const handleResponsiblePhoneNumberChange = (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		const phoneNumberMasked = phoneNumberMask(event.target.value);
		setValue('responsiblePhoneNumber', phoneNumberMasked);
	};

	const handleSubmit = submit((data) => {
		setFormData(data);

		router.push('/tenant/register/establishment');
	});

	return {
		errors,
		register,
		handleCpfChange,
		handleResponsiblePhoneNumberChange,
		handleSubmit,
	};
};
