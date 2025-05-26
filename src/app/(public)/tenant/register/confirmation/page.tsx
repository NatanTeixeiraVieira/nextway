import { ErrorConstants } from '@/constants/errors';
import { AppError } from '@/errors/error';
import { getFormDataCookies } from '../_actions/tenant-form-data.action';
import RegisterTenantConfirmationForm from './_components/confirmation-form';

export default async function ConfirmationPage() {
	const registerTenantFormData = await getFormDataCookies();

	if (!registerTenantFormData?.login) {
		throw new AppError(403, 'Forbidden', ErrorConstants.FORBIDDEN_FORM_STEP);
	}

	return (
		<RegisterTenantConfirmationForm loginData={registerTenantFormData.login} />
	);
}
