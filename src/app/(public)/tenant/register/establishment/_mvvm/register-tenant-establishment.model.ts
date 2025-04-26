import { getInfosByCnpjAction } from '@/actions/cnpj.action';
import { useToast } from '@/hooks/use-toast';
import { cnpjMask, phoneNumberMask } from '@/utils/masks';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { setFormDataCookies } from '../../_actions/tenant-form-data.action';
import { registerTenantEstablishmentSchema } from '../schemas/register-tenant-establishment.schema';
import type { RegisterTenantEstablishmentFormData } from '../types/register-tenant-establishment-form-data.type';
import type { RegisterTenantEstablishmentVMProps } from './register-tenant-establishment.vm';

type Props = {
	establishmentData: RegisterTenantEstablishmentVMProps['formData'];
};

export const useRegisterTenantEstablishment = ({
	establishmentData,
}: Props) => {
	const router = useRouter();
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

	const { toast } = useToast();

	useEffect(() => {
		if (establishmentData) {
			setValue('corporateReason', establishmentData.corporateReason || '');
			setValue('establishmentName', establishmentData.establishmentName || '');
			setValue(
				'establishmentPhoneNumber',
				establishmentData.establishmentPhoneNumber || '',
			);
			setValue('cnpj', establishmentData.cnpj || '');
			setValue('slug', establishmentData.slug || '');
		}
	}, [setValue, establishmentData]);

	const handleCnpjBlur = async (
		e: React.FocusEvent<HTMLInputElement>,
	): Promise<void> => {
		const cnpj = e.target.value.replace(/\D/g, '');

		if (cnpj.length !== 14) return;

		try {
			const cnpjInfos = await getInfosByCnpjAction(cnpj);
			if (!cnpjInfos) return;

			setValue('corporateReason', cnpjInfos.corporateReason);
		} catch (_) {
			toast({
				variant: 'destructive',
				className: 'get-establishment-cnpj-toast-error',
				title: 'CNPJ inválido ou não encontrado',
			});
		}
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

	const handleSubmit = submit(async (data) => {
		await setFormDataCookies({ establishment: data });

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
