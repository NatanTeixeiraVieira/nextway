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
import { useForm } from 'react-hook-form';
import { setFormDataCookies } from '../../_actions/tenant-form-data.action';
import type { RegisterTenantService } from '../../_types/register-tenant.type';
import { registerTenantLoginSchema } from '../_schemas/register-tenant-login.schema';
import type { RegisterTenantLoginFormData } from '../_types/register-tenant-address-form-data.type';
import type { RegisterTenantLoginVMProps } from './register-tenant-login.vm';

type Props = {
	formData: RegisterTenantLoginVMProps['formData'];
	registerTenantService: RegisterTenantService;
};

export const useRegisterTenantLogin = ({
	formData,
	registerTenantService,
}: Props) => {
	const router = useRouter();
	const { toast } = useToast();

	const { mutateAsync, isPending } = useMutation({
		mutationFn: registerTenantService.register,
		onSuccess: async () => {
			await setFormDataCookies({ login: true });
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
	} = useForm<RegisterTenantLoginFormData>({
		resolver: zodResolver(registerTenantLoginSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const { passwordInputType, handleIconEyeClick } = usePasswordInput();

	const handleSubmit = submit(async (data) => {
		if (
			!formData?.address ||
			!formData.responsible ||
			!formData.establishment
		) {
			return;
		}

		await mutateAsync({
			zipcode: removeZipcodeMask(formData.address.zipcode),
			streetName: formData.address.street,
			neighborhood: formData.address.neighborhood,
			streetNumber: formData.address.number,
			complement: formData.address.complement,

			responsibleName: formData.responsible.name,
			responsibleCpf: removeCpfMask(formData.responsible.cpf),
			responsiblePhoneNumber: removePhoneNumberMask(
				formData.responsible.responsiblePhoneNumber,
			),

			cnpj: removeCnpjMask(formData.establishment.cnpj),
			establishmentName: formData.establishment.establishmentName,
			establishmentPhoneNumber: removePhoneNumberMask(
				formData.establishment.establishmentPhoneNumber,
			),
			slug: formData.establishment.slug,

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
