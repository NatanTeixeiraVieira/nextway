'use client';

import type { RegisterTenatFormData } from '../../_types/register-tenant.type';
import { useRegisterTenantResponsible } from './register-tenant-responsible.model';
import RegisterTenantResponsibleView from './register-tenant-responsible.view';

export type RegisterTenantResponsibleVMProps = {
	formData: RegisterTenatFormData['responsible'] | null;
};

export default function ResponsibleVM({
	formData,
}: RegisterTenantResponsibleVMProps) {
	const methods = useRegisterTenantResponsible({ responsibleData: formData });

	return <RegisterTenantResponsibleView {...methods} />;
}
