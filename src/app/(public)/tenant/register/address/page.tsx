'use client';

import { useRegisterTenantAddress } from './register-tenant-address.model';
import RegisterTenantAddressView from './register-tenant-address.view';

export default function AddressPage() {
	const methods = useRegisterTenantAddress();

	return <RegisterTenantAddressView {...methods} />;
}
