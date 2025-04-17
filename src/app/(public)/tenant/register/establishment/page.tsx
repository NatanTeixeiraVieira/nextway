import { getFormDataCookies } from '../_actions/tenant-form-data.action';
import { validateSteps } from '../_utils/validate-steps';
import { registerTenantResponsibleSchema } from '../responsible/_schemas/register-tenant-responsible.schema';
import RegisterTenantEstablishmentVM from './_mvvm/register-tenant-establishment.vm';

export default async function EstablishmentPage() {
	await validateSteps(registerTenantResponsibleSchema, 'responsible');
	const formData = await getFormDataCookies();

	return (
		<RegisterTenantEstablishmentVM formData={formData?.establishment ?? null} />
	);
}
