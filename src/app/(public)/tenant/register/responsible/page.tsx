import { getFormDataCookies } from '../_actions/tenant-form-data.action';
import { validateSteps } from '../_utils/validate-steps';
import { registerTenantAddressSchema } from '../address/_schemas/register-tenant-address.schema';
import ResponsibleVM from './_mvvm/register-tenant-responsible.vm';

export default async function ResponsiblePage() {
	await validateSteps(registerTenantAddressSchema, 'address');
	const formData = await getFormDataCookies();

	return <ResponsibleVM formData={formData?.responsible ?? null} />;
}
