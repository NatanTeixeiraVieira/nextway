'use client';

import { useRegisterTenantLogin } from './register-tenant-login.model';
import RegisterTenantLoginView from './register-tenant-login.view';

export default function LoginPage() {
	const methods = useRegisterTenantLogin();

	return <RegisterTenantLoginView {...methods} />;
}
