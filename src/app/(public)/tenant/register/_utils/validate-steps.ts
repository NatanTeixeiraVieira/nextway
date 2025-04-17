import { AppError } from '@/errors/error';
import type { ZodObject } from 'zod';
import { ErrorConstants } from '../../../../../constants/errors';
import { getFormDataCookies } from '../_actions/tenant-form-data.action';
import type { RegisterTenatFormData } from '../_types/register-tenant.type';

export const validateSteps = async (
	previousStepSchema: ZodObject<Record<string, any>>,
	previousStepField: keyof RegisterTenatFormData,
) => {
	const registerTenantFormData = await getFormDataCookies();

	const isResponsibleFormDataValid = previousStepSchema.safeParse(
		registerTenantFormData?.[previousStepField],
	);

	if (!isResponsibleFormDataValid.success) {
		throw new AppError(403, 'Forbidden', ErrorConstants.FORBIDDEN_FORM_STEP);
	}
};
