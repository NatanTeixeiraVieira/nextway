'use client';

import type { RegisterTenatFormData } from '../../_types/register-tenant.type';
import { useRegisterTenantEstablishment } from './register-tenant-establishment.model';
import RegisterTenantEstablishment from './register-tenant-establishment.view';

export type RegisterTenantEstablishmentVMProps = {
	formData: RegisterTenatFormData['establishment'] | null;
};

export default function RegisterTenantEstablishmentVM({
	formData,
}: RegisterTenantEstablishmentVMProps) {
	const methods = useRegisterTenantEstablishment({
		establishmentData: formData,
	});

	return <RegisterTenantEstablishment {...methods} />;
}
