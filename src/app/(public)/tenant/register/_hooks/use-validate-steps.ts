import { AppError } from '@/errors/error';
import { useEffect } from 'react';
import type { ZodObject } from 'zod';
import { ErrorConstants } from '../../../../../constants/errors';
import type { RegisterTenatFormData } from '../_types/register-tenant.type';
import { useTenantFormData } from './use-tenant-form-data';

export const useValidateSteps = (
	previousStepSchema: ZodObject<Record<string, any>>,
	previousStepField: keyof RegisterTenatFormData,
) => {
	useEffect(() => {
		const { getFormData } = useTenantFormData();

		const formData = getFormData();

		const isValid = previousStepSchema.safeParse(formData?.[previousStepField]);

		if (!formData || !isValid) {
			throw new AppError(403, 'Forbidden', ErrorConstants.FORBIDDEN_FORM_STEP);
		}
	}, [previousStepSchema, previousStepField]);
};
