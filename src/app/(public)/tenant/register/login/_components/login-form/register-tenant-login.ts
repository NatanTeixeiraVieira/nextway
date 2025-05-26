import type { AppError } from '@/errors/error';
import { usePasswordInput } from '@/hooks/use-password-input';
import { useToast } from '@/hooks/use-toast';
import { requestErrorHandling } from '@/utils/error-handling';
import {
	removeCnpjMask,
	removeCpfMask,
	removePhoneNumberMask,
	removeZipcodeMask,
} from '@/utils/masks';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import type { RegisterTenantLoginFormProps } from '.';
import { setFormDataCookies } from '../../../_actions/tenant-form-data.action';
import { registerTenantService } from '../../../_services/register-tenant.service';
import { registerTenantLoginSchema } from '../../_schemas/register-tenant-login.schema';
import type { RegisterTenantLoginFormData } from '../../_types/register-tenant-address-form-data.type';

type Props = {
	loginData: RegisterTenantLoginFormProps['loginData'];
};

export const useRegisterTenantLogin = ({ loginData }: Props) => {
	const router = useRouter();
	const { toast } = useToast();

	const { mutateAsync, isPending } = useMutation({
		mutationFn: registerTenantService.register,
		onSuccess: async (_, { email }) => {
			await setFormDataCookies({ login: { email } });
			router.push('/tenant/register/confirmation');
		},
		onError: (error: AppError) => {
			toast({
				variant: 'destructive',
				className: 'tenant-send-email-toast-error',
				title: requestErrorHandling(
					error,
					'Falha ao cadastrar estabelecimento.',
				),
			});
		},
	});

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

	const { passwordInputType, handleIconEyeClick } = usePasswordInput();

	useEffect(() => {
		if (loginData?.login?.email) {
			setValue('email', loginData.login.email || '');
		}
	}, [loginData?.login?.email, setValue]);

	const handleSubmit = submit(async (data) => {
		if (
			!loginData?.address ||
			!loginData.responsible ||
			!loginData.establishment
		) {
			return;
		}

		await mutateAsync({
			zipcode: removeZipcodeMask(loginData.address.zipcode),
			streetName: loginData.address.street,
			neighborhood: loginData.address.neighborhood,
			streetNumber: loginData.address.number,
			complement: loginData.address.complement,

			responsibleName: loginData.responsible.name,
			responsibleCpf: removeCpfMask(loginData.responsible.cpf),
			responsiblePhoneNumber: removePhoneNumberMask(
				loginData.responsible.responsiblePhoneNumber,
			),

			cnpj: removeCnpjMask(loginData.establishment.cnpj),
			establishmentName: loginData.establishment.establishmentName,
			establishmentPhoneNumber: removePhoneNumberMask(
				loginData.establishment.establishmentPhoneNumber,
			),
			slug: loginData.establishment.slug,

			email: data.email,
			password: data.password,
		});
	});

	return {
		passwordInputType,
		errors,
		dirtyFields,
		isPending,
		register,
		handleSubmit,
		handleIconEyeClick,
	};
};
