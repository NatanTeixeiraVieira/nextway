'use client';

import { useRegisterTenantAddress } from './register-tenant-address.model';
import RegisterTenantAddressView from './register-tenant-address.view';

export default function RegisterTenantVM() {
	const methods = useRegisterTenantAddress();

	return <RegisterTenantAddressView {...methods} />;
}
