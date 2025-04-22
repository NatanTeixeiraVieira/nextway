import { getFormDataCookies } from '../_actions/tenant-form-data.action';
import { validateSteps } from '../_utils/validate-steps';
import { registerTenantEstablishmentSchema } from '../establishment/schemas/register-tenant-establishment.schema';
import RegisterTenantLoginVM from './_mvvm/register-tenant-login.vm';

export default async function LoginPage() {
	await validateSteps(registerTenantEstablishmentSchema, 'establishment');
	const formData = await getFormDataCookies();

	return <RegisterTenantLoginVM formData={formData ?? null} />;
}
