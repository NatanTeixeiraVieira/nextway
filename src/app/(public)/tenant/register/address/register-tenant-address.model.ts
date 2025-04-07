import { getInfosByZipcode } from '@/services/zipcode.service';
import { zipcodeMask } from '@/utils/masks';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import type { RegisterTenatFormData } from '../types/register-tenant.type';
import { registerTenantAddressSchema } from './schemas/register-tenant-address.schema';
import type { RegisterTenantAddressFormData } from './types/register-tenant-address-form-data.type';

export const useRegisterTenantAddress = () => {
	const router = useRouter();

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
		const storedData = sessionStorage.getItem('register-tenant');
		if (storedData) {
			const parsedData: RegisterTenatFormData = JSON.parse(storedData);
			setValue('zipcode', parsedData.zipcode || '');
			setValue('state', parsedData.state || '');
			setValue('city', parsedData.city || '');
			setValue('neighborhood', parsedData.neighborhood || '');
			setValue('street', parsedData.street || '');
			setValue('number', parsedData.number || '');
			setValue('complement', parsedData.complement || '');
		}
	}, [setValue]);

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
		sessionStorage.setItem('register-tenant', JSON.stringify(data));
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
