import { validateSteps } from '../_utils/validate-steps';
import { registerTenantLoginSchema } from '../login/_schemas/register-tenant-login.schema';
import RegisterTenantConfirmationVM from './_mvvm/register-tenant-confirmation.vm';

export default async function ConfirmationPage() {
	await validateSteps(registerTenantLoginSchema, 'login');

	return <RegisterTenantConfirmationVM />;
}
