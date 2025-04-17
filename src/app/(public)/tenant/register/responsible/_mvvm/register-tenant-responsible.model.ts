import { cpfMask, phoneNumberMask } from '@/utils/masks';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { setFormDataCookies } from '../../_actions/tenant-form-data.action';
import { registerTenantResponsibleSchema } from '../_schemas/register-tenant-responsible.schema';
import type { RegisterTenantResponsibleFormData } from '../_types/register-tenant-responsible-form-data.type';
import type { RegisterTenantResponsibleVMProps } from './register-tenant-responsible.vm';

type Props = {
	responsibleData: RegisterTenantResponsibleVMProps['formData'];
};

export const useRegisterTenantResponsible = ({ responsibleData }: Props) => {
	const router = useRouter();
	// const { getFormData, setFormData } = useTenantFormData();
	// useValidateSteps(registerTenantAddressSchema, 'address');

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

	// useEffect(() => {
	// 	const schemaKeys = getSchemaKeys(registerTenantAddressSchema);

	// 	blockStepByFormIsComplete(schemaKeys);
	// }, [blockStepByFormIsComplete]);

	useEffect(() => {
		if (responsibleData) {
			setValue('cpf', responsibleData.cpf || '');
			setValue('name', responsibleData.name || '');
			setValue(
				'responsiblePhoneNumber',
				responsibleData.responsiblePhoneNumber || '',
			);
		}
	}, [responsibleData, setValue]);

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

	const handleSubmit = submit(async (data) => {
		await setFormDataCookies({ responsible: data });

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
