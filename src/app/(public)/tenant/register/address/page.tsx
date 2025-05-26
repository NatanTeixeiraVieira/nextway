import { getFormDataCookies } from '../_actions/tenant-form-data.action';
import RegisterTenantAddressForm from './_components/address-form';

export default async function AddressPage() {
	const addressFormData = await getFormDataCookies();

	return (
		<RegisterTenantAddressForm addressData={addressFormData?.address ?? null} />
	);
}
