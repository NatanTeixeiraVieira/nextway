import { getFormDataCookies } from '../_actions/tenant-form-data.action';
import { validateSteps } from '../_utils/validate-steps';
import { registerTenantEstablishmentSchema } from '../establishment/schemas/register-tenant-establishment.schema';
import RegisterTenantLoginForm from './_components/login-form';

export default async function LoginPage() {
	await validateSteps(registerTenantEstablishmentSchema, 'establishment');
	const formData = await getFormDataCookies();

	return <RegisterTenantLoginForm loginData={formData ?? null} />;
}
