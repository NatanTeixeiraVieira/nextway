import { AppError } from '@/errors/error';
import { useCallback } from 'react';
import { ErrorConstants } from '../_constants/error';
import type { RegisterTenantFormDataKeys } from '../_types/register-tenant.type';
import { useTenantFormData } from './use-tenant-form-data';

export const useBlockStep = () => {
	const { getFormData } = useTenantFormData();

	const blockStepByFormIsComplete = useCallback(
		(formFields: string[]) => {
			console.log('🚀 ~ useBlockStep ~ formFields:', formFields);
			const formData = getFormData();
			console.log('🚀 ~ useBlockStep ~ formData:', formData);

			for (const field of formFields) {
				if (!formData || !formData[field as RegisterTenantFormDataKeys]) {
					throw new AppError(
						403,
						'Forbidden',
						ErrorConstants.FORBIDDEN_FORM_STEP,
					);
				}
			}
		},
		[getFormData],
	);

	return {
		blockStepByFormIsComplete,
	};
};
