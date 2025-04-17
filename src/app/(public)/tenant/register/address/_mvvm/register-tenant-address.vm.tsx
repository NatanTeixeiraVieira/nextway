'use client';

import type { RegisterTenatFormData } from '../../_types/register-tenant.type';
import { useRegisterTenantAddress } from './register-tenant-address.model';
import RegisterTenantAddressView from './register-tenant-address.view';

export type RegisterTenantVMProps = {
	addressData: RegisterTenatFormData['address'] | null;
};

export default function RegisterTenantVM({
	addressData,
}: RegisterTenantVMProps) {
	const methods = useRegisterTenantAddress({ addressData });

	return <RegisterTenantAddressView {...methods} />;
}
