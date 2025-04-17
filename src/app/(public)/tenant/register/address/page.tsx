import { getFormDataCookies } from '../_actions/tenant-form-data.action';
import RegisterTenantVM from './_mvvm/register-tenant-address.vm';

export default async function AddressPage() {
	const addressFormData = await getFormDataCookies();

	return <RegisterTenantVM addressData={addressFormData?.address ?? null} />;
}
