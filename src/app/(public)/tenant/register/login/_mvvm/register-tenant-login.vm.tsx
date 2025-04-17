'use client';

import type { RegisterTenatFormData } from '../../_types/register-tenant.type';
import { useRegisterTenantLogin } from './register-tenant-login.model';
import RegisterTenantLoginView from './register-tenant-login.view';

export type RegisterTenantLoginVMProps = {
	formData: RegisterTenatFormData['login'] | null;
};

export default function RegisterTenantLoginVM({
	formData,
}: RegisterTenantLoginVMProps) {
	const methods = useRegisterTenantLogin({ loginData: formData });

	return <RegisterTenantLoginView {...methods} />;
}
