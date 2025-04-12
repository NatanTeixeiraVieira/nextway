'use client';

import { cnpjService } from '@/services/cnpj.service';
import { useRegisterTenantEstablishment } from './register-tenant-establishment.model';
import RegisterTenantEstablishment from './register-tenant-establishment.view';

export default function EstablishmentPage() {
	const methods = useRegisterTenantEstablishment({ cnpjService });

	return <RegisterTenantEstablishment {...methods} />;
}
