'use client';

import type { RegisterTenatFormData } from '../../_types/register-tenant.type';
import { useRegisterTenantConfirmation } from './register-tenant-confirmation.model';
import RegisterTenantConfirmation from './register-tenant-confirmation.view';

export type RegisterTenantConfirmationVMProps = {
	loginData: RegisterTenatFormData['login'] | null;
};

export default function RegisterTenantConfirmationVM({
	loginData,
}: RegisterTenantConfirmationVMProps) {
	const methods = useRegisterTenantConfirmation({ loginData });

	return <RegisterTenantConfirmation {...methods} />;
}
