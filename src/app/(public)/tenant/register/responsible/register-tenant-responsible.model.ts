import { cpfMask, phoneNumberMask } from '@/utils/masks';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { registerTenantResponsibleSchema } from './schemas/register-tenant-responsible.schema';
import type { RegisterTenantResponsibleFormData } from './types/register-tenant-responsible-form-data.type';

export const useRegisterTenantResponsible = () => {
	const router = useRouter();

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
			phoneNumber: '',
		},
	});

	const handleCpfChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const cpfMasked = cpfMask(event.target.value);
		setValue('cpf', cpfMasked);
	};

	const handlePhoneNumberChange = (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		const phoneNumberMasked = phoneNumberMask(event.target.value);
		setValue('phoneNumber', phoneNumberMasked);
	};

	const handleSubmit = submit((data) => {
		const storedData = sessionStorage.getItem('register-tenant');
		if (!storedData) return;

		const parsedStoredData = JSON.parse(storedData);

		sessionStorage.setItem(
			'register-tenant',
			JSON.stringify({ ...parsedStoredData, ...data }),
		);

		router.push('/tenant/register/establishment');
	});

	return {
		errors,
		register,
		handleCpfChange,
		handlePhoneNumberChange,
		handleSubmit,
	};
};
