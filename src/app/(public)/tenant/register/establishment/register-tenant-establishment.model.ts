import type { CnpjService } from '@/types/cnpj-service.type';
import { cnpjMask, phoneNumberMask } from '@/utils/masks';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTenantFormData } from '../hooks/use-tenant-form-data';
import { registerTenantEstablishmentSchema } from './schemas/register-tenant-establishment.schema';
import type { RegisterTenantEstablishmentFormData } from './types/register-tenant-establishment-form-data.type';

type Props = {
	cnpjService: CnpjService;
};

export const useRegisterTenantEstablishment = ({ cnpjService }: Props) => {
	const router = useRouter();
	const { getFormData, setFormData } = useTenantFormData();

	const {
		register,
		handleSubmit: submit,
		formState: { errors },
		setValue,
	} = useForm<RegisterTenantEstablishmentFormData>({
		resolver: zodResolver(registerTenantEstablishmentSchema),
		defaultValues: {
			cnpj: '',
			corporateReason: '',
			establishmentName: '',
			establishmentPhoneNumber: '',
		},
	});

	console.log('🚀 ~ useRegisterTenantEstablishment ~ errors:', errors);
	useEffect(() => {
		const formData = getFormData();

		if (formData) {
			setValue('corporateReason', formData.corporateReason || '');
			setValue('establishmentName', formData.establishmentName || '');
			setValue(
				'establishmentPhoneNumber',
				formData.establishmentPhoneNumber || '',
			);
			setValue('cnpj', formData.cnpj || '');
		}
	}, [setValue, getFormData]);

	const handleCnpjBlur = async (
		e: React.FocusEvent<HTMLInputElement>,
	): Promise<void> => {
		const cnpj = e.target.value.replace(/\D/g, '');

		if (cnpj.length !== 14) return;

		const { data } = await cnpjService.getInfosByCnpj(cnpj);
		// const cnpjInfos = await getInfosByCnpj(cnpj);

		if (!data) return;

		setValue('corporateReason', data.corporateReason);
	};

	const handleCnpjChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const cnpj = cnpjMask(event.target.value);
		setValue('cnpj', cnpj);
	};

	const handleEstablishmentPhoneNumberChange = (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		const phoneNumberMasked = phoneNumberMask(event.target.value);
		setValue('establishmentPhoneNumber', phoneNumberMasked);
	};

	const handleSubmit = submit((data) => {
		setFormData(data);

		router.push('/tenant/register/login');
	});

	return {
		errors,
		handleCnpjChange,
		handleCnpjBlur,
		register,
		handleEstablishmentPhoneNumberChange,
		handleSubmit,
	};
};
