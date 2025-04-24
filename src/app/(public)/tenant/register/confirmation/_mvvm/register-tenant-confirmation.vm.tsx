'use client';

import type { RegisterTenatFormData } from '../../_types/register-tenant.type';
import { registerTenantConfirmationService } from '../_services/activate-account.service';
import { useRegisterTenantConfirmation } from './register-tenant-confirmation.model';
import RegisterTenantConfirmationView from './register-tenant-confirmation.view';

export type RegisterTenantConfirmationVMProps = {
	loginData: RegisterTenatFormData['login'] | null;
};

export default function RegisterTenantConfirmationVM({
	loginData,
}: RegisterTenantConfirmationVMProps) {
	const methods = useRegisterTenantConfirmation({
		loginData,
		registerTenantConfirmationService,
	});

	return <RegisterTenantConfirmationView {...methods} />;
}
