'use client';

import { recoverPasswordService } from '../../services/recover-password.service';
import { useRecoverPasswordForm } from './recover-password-form.model';
import RecoverPasswordFormView from './recover-password-form.view';

export type RecoverPasswordProps = {
	params: Promise<{
		token: string;
	}>;
};

export default function RecoverPasswordContent({
	params,
}: RecoverPasswordProps) {
	const methods = useRecoverPasswordForm({ params, recoverPasswordService });

	return <RecoverPasswordFormView {...methods} />;
}
