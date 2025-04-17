import { getInfosByZipcode } from '@/services/zipcode.service';
import { zipcodeMask } from '@/utils/masks';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { setFormDataCookies } from '../../_actions/tenant-form-data.action';
import { registerTenantAddressSchema } from '../_schemas/register-tenant-address.schema';
import type { RegisterTenantAddressFormData } from '../_types/register-tenant-address-form-data.type';
import type { RegisterTenantVMProps } from './register-tenant-address.vm';

type useRegisterTenantProps = {
	addressData: RegisterTenantVMProps['addressData'];
};

export const useRegisterTenantAddress = ({
	addressData,
}: useRegisterTenantProps) => {
	const router = useRouter();
	// const { getFormData, setFormData } = useTenantFormData();

	const {
		register,
		handleSubmit: submit,
		formState: { errors },
		setValue,
	} = useForm<RegisterTenantAddressFormData>({
		resolver: zodResolver(registerTenantAddressSchema),
		defaultValues: {
			zipcode: '',
			state: '',
			city: '',
			neighborhood: '',
			street: '',
			number: '',
			complement: '',
		},
	});

	useEffect(() => {
		if (addressData) {
			setValue('zipcode', addressData.zipcode || '');
			setValue('state', addressData.state || '');
			setValue('city', addressData.city || '');
			setValue('neighborhood', addressData.neighborhood || '');
			setValue('street', addressData.street || '');
			setValue('number', addressData.number || '');
			setValue('complement', addressData.complement || '');
		}
	}, [setValue, addressData]);

	const handleZipcodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const zipcodeMasked = zipcodeMask(event.target.value);
		setValue('zipcode', zipcodeMasked);
	};

	const handleZipcodeBlur = async (
		e: React.FocusEvent<HTMLInputElement>,
	): Promise<void> => {
		const zipcode = e.target.value.replace(/\D/g, '');

		if (zipcode.length !== 8) return;

		const zipcodeInfos = await getInfosByZipcode(zipcode);

		if (!zipcodeInfos.data) return;

		const { state, city, neighborhood, street } = zipcodeInfos.data;

		setValue('state', state);
		setValue('city', city);
		setValue('neighborhood', neighborhood);
		setValue('street', street);
	};

	const handleSubmit = submit(async (data) => {
		// setFormData(data);
		await setFormDataCookies({ address: data });
		router.push('/tenant/register/responsible');
	});

	return {
		errors,
		register,
		handleSubmit,
		handleZipcodeChange,
		handleZipcodeBlur,
	};
};
