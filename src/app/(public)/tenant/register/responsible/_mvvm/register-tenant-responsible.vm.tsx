'use client';

import { useRegisterTenantResponsible } from './register-tenant-responsible.model';
import RegisterTenantResponsibleView from './register-tenant-responsible.view';

export default function ResponsibleVM() {
	const methods = useRegisterTenantResponsible();

	return <RegisterTenantResponsibleView {...methods} />;
}
