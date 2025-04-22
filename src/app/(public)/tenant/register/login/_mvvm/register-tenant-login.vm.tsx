'use client';

import { registerTenantService } from '../../_services/register-tenant.service';
import type { RegisterTenatFormData } from '../../_types/register-tenant.type';
import { useRegisterTenantLogin } from './register-tenant-login.model';
import RegisterTenantLoginView from './register-tenant-login.view';

export type RegisterTenantLoginVMProps = {
	formData: RegisterTenatFormData | null;
};

export default function RegisterTenantLoginVM({
	formData,
}: RegisterTenantLoginVMProps) {
	const methods = useRegisterTenantLogin({
		formData: formData,
		registerTenantService,
	});

	return <RegisterTenantLoginView {...methods} />;
}
