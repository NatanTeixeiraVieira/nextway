import { getFormDataCookies } from '../_actions/tenant-form-data.action';
import { validateSteps } from '../_utils/validate-steps';
import { registerTenantResponsibleSchema } from '../responsible/_schemas/register-tenant-responsible.schema';
import RegisterTenantEstablishmentForm from './_components';

export default async function EstablishmentPage() {
	await validateSteps(registerTenantResponsibleSchema, 'responsible');
	const formData = await getFormDataCookies();

	return (
		<RegisterTenantEstablishmentForm
			establishmentData={formData?.establishment ?? null}
		/>
	);
}
