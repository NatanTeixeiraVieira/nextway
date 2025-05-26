import { getFormDataCookies } from '../_actions/tenant-form-data.action';
import { validateSteps } from '../_utils/validate-steps';
import { registerTenantAddressSchema } from '../address/_schemas/register-tenant-address.schema';
import RegisterTenantResponsibleForm from './_components';

export default async function ResponsiblePage() {
	await validateSteps(registerTenantAddressSchema, 'address');
	const formData = await getFormDataCookies();

	return (
		<RegisterTenantResponsibleForm
			responsibleData={formData?.responsible ?? null}
		/>
	);
}
