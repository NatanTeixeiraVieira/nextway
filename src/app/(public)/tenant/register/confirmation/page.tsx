'use client';

import { useRegisterTenantConfirmation } from './register-tenant-confirmation.model';
import RegisterTenantConfirmation from './register-tenant-confirmation.view';

export default function ConfirmationPage() {
	const methods = useRegisterTenantConfirmation();

	return <RegisterTenantConfirmation {...methods} />;
}
