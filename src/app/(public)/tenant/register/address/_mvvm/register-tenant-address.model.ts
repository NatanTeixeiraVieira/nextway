import { getInfosByZipcode } from '@/services/zipcode.service';
import { zipcodeMask } from '@/utils/masks';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTenantFormData } from '../../_hooks/use-tenant-form-data';
import { registerTenantAddressSchema } from '../_schemas/register-tenant-address.schema';
import type { RegisterTenantAddressFormData } from '../_types/register-tenant-address-form-data.type';

export const useRegisterTenantAddress = () => {
	const router = useRouter();
	const { getFormData, setFormData } = useTenantFormData();

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
		const formData = getFormData();

		if (formData) {
			setValue('zipcode', formData.zipcode || '');
			setValue('state', formData.state || '');
			setValue('city', formData.city || '');
			setValue('neighborhood', formData.neighborhood || '');
			setValue('street', formData.street || '');
			setValue('number', formData.number || '');
			setValue('complement', formData.complement || '');
		}
	}, [setValue, getFormData]);

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

	const handleSubmit = submit((data) => {
		setFormData(data);
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
