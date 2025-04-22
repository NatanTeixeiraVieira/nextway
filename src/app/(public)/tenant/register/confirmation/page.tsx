import { ErrorConstants } from '@/constants/errors';
import { AppError } from '@/errors/error';
import { getFormDataCookies } from '../_actions/tenant-form-data.action';
import RegisterTenantConfirmationVM from './_mvvm/register-tenant-confirmation.vm';

export default async function ConfirmationPage() {
	const registerTenantFormData = await getFormDataCookies();

	if (!registerTenantFormData?.login) {
		throw new AppError(403, 'Forbidden', ErrorConstants.FORBIDDEN_FORM_STEP);
	}

	return <RegisterTenantConfirmationVM />;
}
